const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Helper to load env variables from .env.local
function loadEnv() {
  const envPath = path.join(process.cwd(), '.env.local');
  if (!fs.existsSync(envPath)) {
    console.error('Error: .env.local file not found in root.');
    process.exit(1);
  }
  const content = fs.readFileSync(envPath, 'utf8');
  const env = {};
  content.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    const firstEq = trimmed.indexOf('=');
    if (firstEq === -1) return;
    const key = trimmed.substring(0, firstEq).trim();
    const val = trimmed.substring(firstEq + 1).trim();
    env[key] = val;
  });
  return env;
}

const env = loadEnv();
const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Error: NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY not found in .env.local');
  process.exit(1);
}

// Initialize Supabase with service role key to bypass RLS and perform admin tasks
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function seedUser(email, password, name, role) {
  console.log(`Checking if user ${email} already exists...`);

  // Query our public.usuarios table
  const { data: existingUser, error: queryError } = await supabase
    .from('usuarios')
    .select('id')
    .eq('email', email)
    .maybeSingle();

  if (queryError) {
    console.error('Error checking existing user in db:', queryError);
  }

  let userId;

  if (existingUser) {
    console.log(`User profile found in public.usuarios for ${email} with ID: ${existingUser.id}`);
    userId = existingUser.id;
  } else {
    // Attempt to create user in Auth
    console.log(`Creating auth user for ${email}...`);
    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { nome: name }
    });

    if (authError) {
      if (authError.message.includes('already exists') || authError.code === 'email_exists') {
        console.log('User already exists in auth.users, searching for user ID...');
        const { data: usersList, error: listError } = await supabase.auth.admin.listUsers();
        if (listError) {
          console.error('Error listing users:', listError);
          return null;
        }
        const found = usersList.users.find(u => u.email === email);
        if (found) {
          userId = found.id;
          console.log(`Found auth user ID: ${userId}`);
        } else {
          console.error('Could not find user ID despite duplicate email error.');
          return null;
        }
      } else {
        console.error('Error creating auth user:', authError);
        return null;
      }
    } else {
      userId = authUser.user.id;
      console.log(`Auth user created successfully for ${email} with ID: ${userId}`);
    }

    // Now insert profile in public.usuarios
    console.log(`Upserting user profile into public.usuarios for ${email}...`);
    const { error: dbError } = await supabase
      .from('usuarios')
      .upsert({
        id: userId,
        nome: name,
        email: email,
        perfil: role
      }, { onConflict: 'id' });

    if (dbError) {
      console.error('Error inserting user profile:', dbError);
      return null;
    }
    console.log(`User profile created/updated successfully in public.usuarios for ${email}!`);
  }
  return userId;
}

async function main() {
  // 1. Seed Evaluator
  await seedUser(
    'avaliador@tocantins.gov.br',
    'AvaliadorJredd2026!',
    'Avaliador Demo GAIA',
    'avaliador'
  );

  // 2. Seed Proponent
  await seedUser(
    'proponente@teste.com',
    'ProponenteJredd2026!',
    'Proponente Demo GAIA',
    'proponente'
  );

  console.log('\n=============================================');
  console.log('CONTAS DE TESTE SEEDADAS COM SUCESSO!');
  console.log('--- AVALIADOR ---');
  console.log('Email: avaliador@tocantins.gov.br');
  console.log('Senha: AvaliadorJredd2026!');
  console.log('--- PROPONENTE ---');
  console.log('Email: proponente@teste.com');
  console.log('Senha: ProponenteJredd2026!');
  console.log('=============================================\n');
}

main().catch(err => {
  console.error('Unexpected error:', err);
  process.exit(1);
});
