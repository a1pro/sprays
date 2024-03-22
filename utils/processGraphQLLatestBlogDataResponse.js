export function processGraphQLLatestBlogDataResponse(data) {
    return [
        ...data['blogPostCollection'].items
    ]
}
