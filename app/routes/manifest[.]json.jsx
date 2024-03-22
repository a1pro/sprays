import {json} from "@remix-run/node";
import {client} from "~/models/contentful.server.js";

export const loader = async () => {
    const global = await client.fetchContentfulGlobalDataGraphQL()

    const {globalData} = global
    return json({
        "short_name": globalData?.websiteTitle || "",
        "name": globalData?.websiteTitle || "",
        "icons": [
            {
                "src": globalData?.splashImage?.url || "",
                "type": "image/png",
                "sizes": "512x512"
            },
            {
                "src": globalData?.favicon?.url || "",
                "sizes": "16x16 48x48 72x72 96x96 128x128",
                "type": "image/x-icon"
            },
            {
                "src": globalData?.maskableIcon?.url || "",
                "sizes": "192x192",
                "type": "image/png",
                "purpose": "maskable"
            }
        ],
        "start_url": ".",
        "display": "standalone",
        "background_color": "#ffffff"
    });
};