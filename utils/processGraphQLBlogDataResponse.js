export function processGraphQLBlogDataResponse(data) {
    return {
        pageData: data['blogPageCollection'].items[0],
        blogPosts: data['blogPostCollection'].items
    }
}
