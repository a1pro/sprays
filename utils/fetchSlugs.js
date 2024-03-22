import client from "./contentfulClient.js";

async function fetchSlugs(website) {
    const contentTypes = [
        {content_type: 'page'},
        {content_type: 'blogPage'},
        {content_type: 'blogPost', 'fields.website': website},
    ];

    const requests = contentTypes.map((params) => client.getEntries(params));

    try {
        const [
            entries,
            blogPage,
            blogPosts
        ] = await Promise.all(requests);

        const slugs = entries.items.map((entry) => {
            if (entry?.fields?.slug) {
                return {
                    slug: entry.fields.slug,
                    lastmod:entry.sys.updatedAt,
                    priority: 1.0
                }
            }
            return null
        })

        const blogPageSlug = blogPage.items.map((page) => {
            if (page?.fields?.slug) {
                return {
                    slug: `${page.fields.slug}`,
                    lastmod:page.sys.updatedAt,
                    priority: 1.0
                }
            }
            return null
        })

        const blogSlugs = blogPosts.items.map((post) => {
            if (post?.fields?.slug) {
                return {
                    slug: `blog/${post.fields.slug}`,
                    lastmod:post.sys.updatedAt,
                    priority: .7
                }
            }
            return null
        })

        return [
            ...slugs,
            ...blogPageSlug,
            ...blogSlugs
        ];
    } catch (error) {
        console.error("Failed to fetch data from Contentful:", error);
        throw error; // or handle error as needed
    }
}

export default fetchSlugs