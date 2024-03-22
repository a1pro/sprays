import {json} from '@remix-run/node';
import {useLoaderData, useMatches} from "@remix-run/react";
import {renderComponentSection} from "@root/utils/renderComponentSection.jsx";
import {Box} from "@chakra-ui/react";
import pkg from 'lodash';
import {client} from "~/models/contentful.server.js";

const {isEmpty} = pkg;
export const loader = async ({params}) => {
    const {components, blogPosts, pageData, servicePages} = await client.fetchContentfulPageBySlugDataGql(params.slug)
    if (isEmpty(pageData)) {
        throw new Response('Not Found', {status: 404});
    }
    return json({
        pageData,
        servicePages,
        components,
        blogPosts,
        website: process.env.WEBSITE_URL,
        googleApiKey: process.env.GOOGLE_API_KEY
    });
};

export const meta = ({data}) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const matches = useMatches();
    const {globalData} = matches.find((route) => route.id === 'root').data
    const themeColor = globalData?.themeColor?.value || '#000'
    return [
        {title: data?.pageData?.metaTitle},
        {name: "description", content: data?.pageData?.metaDescription},
        {name: "og:image", content: data?.pageData?.metaImage?.url},
        {name: "theme-color", content: themeColor}
    ];
};

export default function Page() {
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
            {components?.length > 0 && components?.map((component, idx) => {
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