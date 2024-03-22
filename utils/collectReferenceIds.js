export const collectReferencedIdsFromArray = (items) => {
    return items.map(entry => entry.sys.id);
}
export const collectReferencedIds = (fields) => {
    let ids = [];
    for (const key in fields) {
        if (Array.isArray(fields[key])) {
            fields[key].forEach(item => {
                // Check if it's a reference by looking for sys.type === 'Link' and sys.linkType === 'Entry'
                if (item.sys && item.sys.type === 'Link' && item.sys.linkType === 'Entry') {
                    ids.push(item.sys.id);
                } else if (typeof item === 'object') {
                    // Recursively collect IDs from nested objects
                    ids = ids.concat(collectReferencedIds(item));
                }
            });
        } else if (typeof fields[key] === 'object') {
            // This could be a single linked entry or another nested object
            const item = fields[key];
            if (item.sys && item.sys.type === 'Link' && item.sys.linkType === 'Entry') {
                ids.push(item.sys.id);
            } else {
                ids = ids.concat(collectReferencedIds(item));
            }
        }
    }
    return ids;
};