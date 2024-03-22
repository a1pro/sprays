import {Box, Container, Heading, HStack, Image, Link, SimpleGrid, Stack, Text} from "@chakra-ui/react";
import {json} from "@remix-run/node";
import {Outlet, useLoaderData, useLocation, useMatches} from "@remix-run/react";
import {formatDate} from "@root/utils/formatDate.js";
import {CenteredHero} from "@components/CenteredHero/CenteredHero.jsx";
import {ArrowForwardIcon} from "@chakra-ui/icons";
import {client} from "~/models/contentful.server.js";

export const loader = async () => {
    try {
        const data = await client.fetchContentfulBlogPostsDataGql()
        const {pageData, blogPosts} = data;
        return json({
            blogPageData: pageData,
            blogPosts: blogPosts,
        });
    } catch (error) {
        console.error(error);
        throw new Response("An error occurred", {status: 500});
    }
};

export const meta = ({data}) => {
    const {metaTitle = "", metaDescription = "", metaImage = ""} = data.blogPageData;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const matches = useMatches();
    const {globalData} = matches.find((route) => route.id === 'root').data
    const themeColor = globalData?.themeColor?.value || '#000'
    return [
        {title: metaTitle},
        {name: "description", content: metaDescription},
        {name: "og:image", content: metaImage.url},
        {name: "theme-color", content: themeColor}
    ];
};

const BlogPost = (props) => {
    const {post, isHero, brandColor} = props
    return (
        <Link _hover={{textDecor: 'none'}} role="group" boxShadow="xl" href={`/blog/${post.slug}`}>
            <Stack spacing="8">
                <Box overflow="hidden">
                    <Image
                        src={post.image.url}
                        alt={post?.imageAltText || post?.image?.title || post?.title}
                        width="full"
                        height={{base: '15rem', md: isHero ? 'sm' : '15rem'}}
                        objectFit="cover"
                        transition="all 0.2s"
                        _groupHover={{transform: 'scale(1.05)'}}
                        loading="lazy"
                    />
                </Box>
                <Stack spacing="6" pb={5} px={5}>
                    <Stack spacing="3">
                        <HStack spacing="1" fontSize="sm" fontWeight="semibold" color={brandColor}>
                            <Text>{formatDate(post.sys.firstPublishedAt)}</Text>
                        </HStack>
                        <Heading size="md" noOfLines={2}>{post.title}</Heading>
                        <Text color="fg.muted" noOfLines={5}>{post.excerpt}</Text>
                        <Text fontWeight={'bold'} color={brandColor}
                              _hover={{textDecoration: 'underline'}}>Read article <ArrowForwardIcon/></Text>
                    </Stack>
                </Stack>
            </Stack>
        </Link>
    )
}
const Blog01 = () => {
    const {blogPosts: posts, blogPageData} = useLoaderData()
    console.log(blogPageData, "blogPageData")
    const matches = useMatches();
    const {globalData} = matches.find((route) => route.id === 'root').data
    const location = useLocation();
    if (location.pathname === "/blog") {
        return (
            <div className="main_wrapper">
                <CenteredHero header={blogPageData.headerH1} subtitle={blogPageData.subHeader}
                              imgSrc={blogPageData?.heroBackgroundImage} useH1={true}
                              overlayOpacity={blogPageData.overlayOpacity}
                              phoneNumber={globalData.phoneNumber}/>
                <Container pb={{base: '16', md: '24'}} mt={{base: '16', md: '24'}} maxW={{
                    base: 'xl',
                    md: '6xl',
                }}>
                    <Stack spacing={{base: '16', md: '24'}}>
                        <Stack spacing={{base: '12', md: '16'}}>
                            {/*<BlogPost post={posts[0]} isHero/>*/}
                            <SimpleGrid columns={{base: 1, md: 2, lg: 3}} gap={{base: '12', lg: '8'}}>
                                {posts?.length > 0 && posts?.sort((a, b) => new Date(b.firstPublishedAt) - new Date(a.firstPublishedAt)).map((post, idx) => (
                                    <BlogPost key={`${post.id}-${idx}`} post={post}
                                              brandColor={globalData.brandColor.value}/>
                                ))}
                            </SimpleGrid>
                        </Stack>
                    </Stack>
                </Container>
            </div>
        )
    } else {
        return <Outlet/>
    }
};

export default Blog01;