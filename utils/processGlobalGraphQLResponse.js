export function processGlobalGraphQLResponse(data) {
    const globalData = data['globalDataCollection'].items[0];
    return {
        globalData: data?.globalDataCollection?.items?.length > 0 ? globalData : [],
        navigation: !globalData?.navigation ? [] : globalData.navigation['navigationItemsCollection'].items,
        footerNavigation: !globalData?.navigation ? [] : globalData.navigation['navigationItemsCollection'].items
    }
}