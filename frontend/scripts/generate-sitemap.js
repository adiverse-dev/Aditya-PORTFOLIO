import fs from 'fs';
import path from 'path';

// Using the ES module syntax since Vite projects usually use "type": "module"
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOMAIN = 'https://adityasingh-dev.netlify.app';

// Since this is a single page application, we only have the root route for now.
const routes = [
  '/',
];

function generateSitemap() {
  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${DOMAIN}${route}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

  // Write to the public directory so Vite copies it to dist on build
  const publicDir = path.resolve(__dirname, '../public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const sitemapPath = path.join(publicDir, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemapContent, 'utf8');

  console.log(`✅ Sitemap successfully generated at: ${sitemapPath}`);
}

generateSitemap();
