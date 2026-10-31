import next from 'eslint-config-next';

const config = [...next, { ignores: ['.next/**', 'node_modules/**', '.open-next/**', '.wrangler/**', 'cloudflare-env.d.ts'] }];

export default config;
