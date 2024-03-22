import {GLOBAL_DATA_QUERY} from "~/gql/fetchContentfulGlobalDataGraphQL.js";
import {processGlobalGraphQLResponse} from "@root/utils/processGlobalGraphQLResponse.js";
import {getHomepageQuery} from "~/gql/fetchContentfulHomepageDataGql.js";
import {processGraphQLResponse} from "@root/utils/processGraphQLResponse.js";
import {FETCH_ALL_BLOG_POSTS} from "~/gql/fetchContentfulBlogPostsDataGql.js";
import {processGraphQLBlogDataResponse} from "@root/utils/processGraphQLBlogDataResponse.js";
import {FETCH_LATEST_BLOG_POSTS} from "~/gql/fetchContentfulLatestBlogPostsDataGql.js";
import {processGraphQLLatestBlogDataResponse} from "@root/utils/processGraphQLLatestBlogDataResponse.js";
import {fetchBlogPostBySlug} from "~/gql/fetchContentfulBlogPostBySlugDataGql.js";
import {processGraphQLBlogPostResponse} from "@root/utils/processGraphQLBlogPostResponse.js";
import {getContentfulPageBySlugQuery} from "~/gql/fetchContentfulPageBySlugDataGql.js";

const SPACE = process.env.CONTENTFUL_SPACE_ID
const TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN


async function apiCall(query, variables) {
    const fetchUrl = `https://graphql.contentful.com/content/v1/spaces/${SPACE}/environments/master`;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify({query, variables}),
    }
    return await fetch(fetchUrl, options)
}

async function fetchContentfulGlobalDataGraphQL() {
    const response = await apiCall(GLOBAL_DATA_QUERY);
    const {data} = await response.json()
    return processGlobalGraphQLResponse(data)
}

async function fetchContentfulDataGraphQL(pageTitle) {
    const response = await apiCall(getHomepageQuery(pageTitle));
    const {data} = await response.json()
    return data?.pageCollection ? processGraphQLResponse(data) : {components: []}
}

async function fetchContentfulPageBySlugDataGql(slug) {
    const response = await apiCall(getContentfulPageBySlugQuery(slug));
    const {data} = await response.json()
    return processGraphQLResponse(data)
}

async function fetchContentfulBlogPostBySlugDataGql(slug) {
    const response = await apiCall(fetchBlogPostBySlug(slug));
    const {data} = await response.json()
    return processGraphQLBlogPostResponse(data)
}

async function fetchContentfulBlogPostsDataGql() {
    const response = await apiCall(FETCH_ALL_BLOG_POSTS);
    const {data} = await response.json()
    return processGraphQLBlogDataResponse(data)
}

async function fetchContentfulLatestBlogPostsDataGql() {
    const response = await apiCall(FETCH_LATEST_BLOG_POSTS);
    const {data} = await response.json()
    return processGraphQLLatestBlogDataResponse(data)
}

export const client = {
    fetchContentfulGlobalDataGraphQL,
    fetchContentfulDataGraphQL,
    fetchContentfulBlogPostsDataGql,
    fetchContentfulLatestBlogPostsDataGql,
    fetchContentfulPageBySlugDataGql,
    fetchContentfulBlogPostBySlugDataGql
}