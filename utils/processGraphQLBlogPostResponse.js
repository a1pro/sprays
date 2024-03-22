export const processGraphQLBlogPostResponse = (data) => {
    return {
        ...data['blogPostCollection'].items[0],
    }
}