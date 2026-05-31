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

async function main() {
  const email = 'avaliador@tocantins.gov.br';
  const password = 'AvaliadorJredd2026!'; // Credentials for demo
  const name = 'Avaliador Demo GAIA';

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
    console.log(`User profile found in public.usuarios with ID: ${existingUser.id}`);
    userId = existingUser.id;
  } else {
    // Attempt to create user in Auth
    console.log('Creating user in auth.users...');
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
          process.exit(1);
        }
        const found = usersList.users.find(u => u.email === email);
        if (found) {
          userId = found.id;
          console.log(`Found auth user ID: ${userId}`);
        } else {
          console.error('Could not find user ID despite duplicate email error.');
          process.exit(1);
        }
      } else {
        console.error('Error creating auth user:', authError);
        process.exit(1);
      }
    } else {
      userId = authUser.user.id;
      console.log(`Auth user created successfully with ID: ${userId}`);
    }

    // Now insert profile in public.usuarios
    console.log('Upserting user profile into public.usuarios...');
    const { error: dbError } = await supabase
      .from('usuarios')
      .upsert({
        id: userId,
        nome: name,
        email: email,
        perfil: 'avaliador'
      }, { onConflict: 'id' });

    if (dbError) {
      console.error('Error inserting user profile:', dbError);
      process.exit(1);
    }
    console.log('User profile created/updated successfully in public.usuarios!');
  }

  console.log('\n=============================================');
  console.log('CONTA DE AVALIADOR SEEDADA COM SUCESSO!');
  console.log(`Email: ${email}`);
  console.log(`Senha: ${password}`);
  console.log('=============================================\n');
}

main().catch(err => {
  console.error('Unexpected error:', err);
  process.exit(1);
});
