export const loader = async () => {
    const robotsTxtContent = `
# Sitemap is also available on /sitemap.xml
Sitemap: ${process.env.WEBSITE_URL}/sitemap.xml
User-agent: *
`.trim();

    return new Response(robotsTxtContent, {
        headers: {
            "Content-Type": "text/plain",
        },
    });
};
