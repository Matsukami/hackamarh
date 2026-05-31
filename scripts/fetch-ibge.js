const fs = require('fs');
const https = require('https');

const fetchJson = (url) => {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Node.js' } }, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
};

async function main() {
  console.log('Fetching municipalities metadata...');
  const municipios = await fetchJson('https://servicodados.ibge.gov.br/api/v1/localidades/estados/17/municipios');
  
  const munMap = {};
  municipios.forEach(m => {
    munMap[m.id.toString()] = {
      name: m.nome,
      regionId: m.microrregiao.id.toString(),
      regionName: m.microrregiao.nome,
    };
  });

  console.log('Fetching GeoJSON malha for Tocantins...');
  const geojson = await fetchJson('https://servicodados.ibge.gov.br/api/v2/malhas/17/?resolucao=5&formato=application/vnd.geo+json');

  console.log('Merging data...');
  geojson.features = geojson.features.map(f => {
    const id = f.properties.codarea;
    const meta = munMap[id];
    if (meta) {
      f.properties = {
        id,
        name: meta.name,
        regionId: meta.regionId,
        regionName: meta.regionName
      };
    }
    return f;
  });

  const outputPath = './src/lib/geo/tocantins-malha.json';
  fs.writeFileSync(outputPath, JSON.stringify(geojson));
  console.log(`Saved enriched GeoJSON to ${outputPath}`);
}

main().catch(console.error);
