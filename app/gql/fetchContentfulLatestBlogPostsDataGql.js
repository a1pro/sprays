import {gql} from 'graphql-request'

export const FETCH_LATEST_BLOG_POSTS = gql`
    query {
      blogPostCollection(
        order: sys_firstPublishedAt_DESC
        limit: 4
        where: {
          website_contains_all: "${process.env.WEBSITE_URL}"
        }
      ) {
        items {
          title
          slug
          sys {
            publishedAt
            firstPublishedAt
          }
          excerpt
          image {
            url
            title
          }
        }
      }
    }
`
