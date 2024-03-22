import {gql} from 'graphql-request'


export const GLOBAL_DATA_QUERY = gql`
    query {
      globalDataCollection(
        limit:1
        where: {
          website: {
            website_contains_all: [
              "${process.env.WEBSITE_URL}"
            ]
          }
        }
      ) {
        items {
          heading
          subtitle
          cta
          websiteTitle
          googleTagManagerId
          favicon {
            url
          }
          splashImage {
            url
          }
          maskableIcon {
            url
          }
          footerSocialLinks {
            facebook
            twitter
            linkedIn
            googleBusinessUrl
            yelp
          }
          phoneNumber
          topBarText
          hoursOfOperation
          copyrightText
          brandColor
          themeColor
          logo {
            url
          }
          navigation {
            navigationItemsCollection(limit:10) {
              items {
              title
                page {
                  slug
                  title
                }
                hideFromTopNav
                childrenCollection {
                  items {
                    title
                    slug
                  }
                }
              }
            }
          }
          footerNavigation {
            navigationItemsCollection(limit:10) {
              items {
              title
                page {
                  slug
                  title
                }
                childrenCollection(limit:10) {
                  items {
                    title
                    slug
                  }
                }
              }
            }
          }
        }
      }
    }
`
