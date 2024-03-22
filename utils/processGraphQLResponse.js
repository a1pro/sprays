import pkg from 'lodash';

const {omit} = pkg;

export function processGraphQLResponse(data) {
    return {
        pageData: data?.pageCollection?.items?.length > 0 ? omit(data['pageCollection'].items[0], ['componentsCollection']) : {},
        servicePages: !data?.servicePageCollection ? [] : data['servicePageCollection'].items,
        components: data?.pageCollection?.items[0]?.componentsCollection?.items?.length > 0 ? data['pageCollection'].items[0]['componentsCollection'].items : {},
        blogPosts: data?.['blogPostCollection'] ? data['blogPostCollection'].items : []
    }
}
