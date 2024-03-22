export const getNavPath = (slug) => {
    if (!slug) {
        return '/'
    }
    return `/${slug}`
}