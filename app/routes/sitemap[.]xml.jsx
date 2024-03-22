import fetchSlugs from "@root/utils/fetchSlugs.js";


const WEBSITE_URL = process.env.WEBSITE_URL;

export const loader = async () => {
    const slugs = await fetchSlugs(WEBSITE_URL);

    return new Response(renderXML(slugs), {
        headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "x-content-type-options": "nosniff",
            "Cache-Control": `public, max-age=${60 * 10}, s-maxage=${60 * 60 * 24}`,
        },
    });
};

const renderXML = (slugs) => {
    const url = WEBSITE_URL;
    // Define the homepage entry
    const homepageEntry = `
  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`;
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${homepageEntry}${slugs
        .filter(Boolean)
        .map((item) => `<url>
    <loc>${url}/${item.slug}</loc>
    <lastmod>${item.lastmod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>${item.priority}</priority>
  </url>`)
        .join('')}
</urlset>`;
};