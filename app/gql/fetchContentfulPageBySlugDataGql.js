import {gql} from 'graphql-request'

export const getContentfulPageBySlugQuery = (slug) => {
    return gql`
    query {
       blogPostCollection(
        limit:3,
        order:sys_publishedAt_DESC,
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
      pageCollection(
        limit:1
        where: {
          slug_contains: "${slug}"
          website: {
            website_contains_all: [
              "${process.env.WEBSITE_URL}"
            ]
          }
        }
      ) {
        items {
          metaTitle
          metaDescription
          metaImage {
            url
          }
          slug
          title
          servicePage
          iconLibrary
          componentsCollection(limit:15) {
            items {
              ... on BlogSection {
                __typename
                cta
                heading
                preHeading
                backgroundColor
              }
              ... on ContactSection {
                __typename
                removePadding
                cta
                heading
                subHeader
                buttonText
                imgSrc {
                    url
                    title
                }
              }
              ... on CenteredHero {
                __typename
                cta
                header
                useH1
                subtitle
                imgSrc {
                    url
                }
                buttonColor
                overlayOpacity
                backgroundColor
              }
              ... on HeaderSection {
                __typename
                preHeadingCta
                cta
                heading
                subHeader
                colorOverlay
                preHeadingCta
                ctaLInk
                overlayOpacity
                h1
                fontColor
                buttonTextColor
                backgroundImage {
                  url
                }
                buttonBackgroundColor
              }
              ... on FaqSection {
                __typename
                heading
                subtitle
                removeTopPadding
                faqsCollection(limit:20) {
                  items {
                    question
                    answer
                  }
                }
              }
              ... on TestimonialSection {
                __typename
                heading
                testimonialAccentColor
                testimonialsCollection(limit:3){
                  items {
                    name
                    avatar {
                      url
                    }
                    location
                    testimonial
                  }
                }
              }
              ... on ContactSection {
                __typename
                removePadding
                cta
                heading
                subHeader
                preHeading
                imgSrc {
                    url
                    title
                }
              }
              ... on ValuePropSection {
                __typename
                valuePropsCollection(limit: 5) {
                  items {
                    icon
                    title
                    description
                  }
                }
              }
              ... on ServiceSection {
                __typename
                removeTopPadding
                preHeading
                backgroundColor
                subtitle
                title
              }
               ... on RichTextSection {
                __typename
                content {
                  json
                }
              }
               ... on MapSection {
                   __typename
                   pixelHeight
                   city
              }
              ... on BannerSection {
                __typename
                addPadding
                bannerCta
                bannerText
                backgroundColor
                imgSrc {
                  url
                }
                fontColorLight
              }
            }
          }
        }
      }
      servicePageCollection: pageCollection(where:{
        website: {
            website_contains_all: [
              "${process.env.WEBSITE_URL}"
            ]
        },
        servicePage:true
      }, limit:10) {
        items{
          slug
          title
          servicePageSnippet {
            json
          }
          metaImage {
            url
            title
          }
          iconLibrary
          iconName
        }
      }
    }
`
}
