import {json} from '@remix-run/node';
import {useLoaderData, useMatches} from "@remix-run/react";
import {renderComponentSection} from "@root/utils/renderComponentSection.jsx";
import {Box} from "@chakra-ui/react";
import {client} from "~/models/contentful.server.js";

export const loader = async () => {
    const response = await client.fetchContentfulDataGraphQL('Homepage')
    if (!response?.pageData) {
        return json({
            pageData: {},
            components: [],
            blogPosts: [],
            website: process.env.WEBSITE_URL,
            googleApiKey: process.env.GOOGLE_API_KEY
        })
    }
    const {components, blogPosts, pageData, servicePages} = response
    if (!components?.length) {
        throw new Response('Not Found', {status: 404});
    }
    return json({
        pageData,
        servicePages,
        components,
        blogPosts,
        website: process.env.WEBSITE_URL,
    });
};

export let action = async ({request}) => {
    const formData = await request.formData()
    const baseUrl = request.url
    await fetch(`${baseUrl}form`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(formData).toString()
    }).then((r) => {
        return r
    }).catch((e) => {
        return e
    });
    return json({success: true})
};

export const meta = ({data}) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const matches = useMatches();
    const {globalData} = matches.find((route) => route.id === 'root').data
    const themeColor = globalData?.themeColor?.value || '#000'
    return [
        {title: data?.pageData?.metaTitle || globalData?.websiteTitle},
        {name: "description", content: data?.pageData?.metaDescription},
        {name: "og:image", content: data?.pageData?.metaImage?.url},
        {name: "theme-color", content: themeColor}
    ];
};

export default function Index() {
    const {
        components,
        servicePages,
        blogPosts,
        website,
        googleApiKey
    } = useLoaderData();
    const matches = useMatches();
    const {globalData} = matches.find((route) => route.id === 'root').data
    return (
        <Box>
            {components.map((component, idx) => {
                return (
                    <Box key={`${component['__typename']}-${idx}`}>
                        {renderComponentSection(
                            component,
                            blogPosts,
                            globalData,
                            website,
                            servicePages,
                            googleApiKey
                        )}
                    </Box>
                )
            })}
        </Box>
    );
}