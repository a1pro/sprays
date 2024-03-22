import {collectReferencedIds, collectReferencedIdsFromArray} from "./collectReferenceIds.js";
import client from "./contentfulClient.js";

export const getReferencedEntriesFromFields = async (items) => {
    // Collect all referenced IDs using a Set for automatic deduplication
    const allReferencedIds = new Set();
    items.forEach(component => {
        const componentIds = collectReferencedIds(component.fields);
        componentIds.forEach(id => allReferencedIds.add(id));
    });

    // Convert the Set back to an array for the Contentful query
    const uniqueIds = Array.from(allReferencedIds);

    let referencedEntries = [];
    if (uniqueIds.length > 0) {
        // Consider splitting this into smaller batches if the number of IDs exceeds Contentful's limit
        const referencesResponse = await client.getEntries({
            'sys.id[in]': uniqueIds.join(',')
        });
        referencedEntries = referencesResponse.items;
    }
    return referencedEntries;
}

export const getReferencedEntriesItems = async (items) => {
    let allReferencedIds = [...new Set(collectReferencedIdsFromArray(items))];
    let referencedEntries = [];

    // Define batch size, e.g., 100 IDs per batch
    const batchSize = 100;
    const batchPromises = [];

    for (let i = 0; i < allReferencedIds.length; i += batchSize) {
        const batchIds = allReferencedIds.slice(i, i + batchSize);
        batchPromises.push(client.getEntries({
            'sys.id[in]': batchIds.join(',')
        }));
    }

    // Fetch batches in parallel
    const responses = await Promise.all(batchPromises);
    responses.forEach(response => {
        referencedEntries = referencedEntries.concat(response.items);
    });

    return referencedEntries;
}