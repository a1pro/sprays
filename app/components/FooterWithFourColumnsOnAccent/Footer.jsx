import {
    Box,
    Button,
    ButtonGroup,
    Container,
    Divider,
    Grid,
    GridItem,
    IconButton,
    Link,
    Stack,
    Text,
    VStack,
} from '@chakra-ui/react'
import {FaClock, FaFacebook, FaLinkedin, FaTwitter, FaYelp} from 'react-icons/fa'
import {getNavPath} from "@root/utils/getNavPath.js";
import {formatPhone} from "@root/utils/formatPhone.js";
import {PhoneIcon} from "@chakra-ui/icons";
import {TbMapPinFilled} from "react-icons/tb";

export const Footer = ({
                           hoursOfOperation,
                           heading,
                           subtitle,
                           copyrightText,
                           navigation,
                           themeColor,
                           phoneNumber,
                           footerSocialLinks,
                           servicePages
                       }) => {
    return (
        <Box bg={themeColor?.value || 'gray.800'} color="white">
            <Container as="footer" role="contentinfo" maxW={'1170px'} mx={'auto'} w={'full'} px={{base: 5, xl: 0}}>
                <Stack
                    justify="space-between"
                    align="top"
                    direction={{
                        base: 'column',
                        md: 'row',
                    }}
                    py={{
                        base: '12',
                        md: '16',
                    }}
                    spacing="8"
                >
                    <Stack
                        spacing={{
                            base: '3',
                            md: '3',
                        }}
                        align="start"
                        maxW={'300px'}
                    >
                        <Text color="fg.accent.muted" fontSize={'x-large'}
                              fontWeight={'bold'}>{heading}</Text>
                        <Text color="fg.accent.muted">{subtitle}</Text>
                        {/*<Text color="fg.accent.muted">{SiteData.homepage.footerText2}</Text>*/}
                        <VStack spacing={2} textAlign={'left'} alignItems={'start'}>
                            <Text color="fg.accent.muted"><Link href={`tel:${phoneNumber}`}
                                                                _hover={{textDecoration: 'none'}}><PhoneIcon/>&nbsp;{formatPhone(phoneNumber)}
                            </Link></Text>
                            <Text color="fg.accent.muted"><span style={{display: 'flex'}}><FaClock
                                style={{
                                    position: 'relative',
                                    top: '4px',
                                    paddingRight: '3px'
                                }}/>&nbsp;{hoursOfOperation}</span></Text>
                        </VStack>

                    </Stack>
                    <Grid templateColumns={{base: 'repeat(2, 1fr)', md: 'repeat(5, 1fr)'}} gap={{base: 8, md: 4}}
                          w={'full'}>
                        <GridItem colStart={{base: '0', md: 2}} colSpan={2}>
                            {servicePages?.length > 0 &&
                                <Stack
                                    spacing="4"
                                    minW={{
                                        lg: '40',
                                    }}
                                >
                                    <Text fontSize="lg" fontWeight="semibold" color="fg.accent.subtle">
                                        Our Services
                                    </Text>
                                    <Stack spacing="0" align={'start'}>
                                        {/* eslint-disable-next-line react/prop-types */}
                                        {servicePages.map((page, idx) => {
                                            return (
                                                <Button fontWeight="normal" key={idx} as="a" variant="text.accent"
                                                        justifyContent={'start'} h={8} px={0}
                                                        href={`/${page.slug}`}>
                                                    {page.title}
                                                </Button>
                                            )
                                        })}
                                    </Stack>
                                </Stack>
                            }
                        </GridItem>
                        <GridItem colStart={6} colEnd={8}>
                            {navigation?.length > 0 &&
                                <Stack
                                    spacing="4"
                                    minW={{
                                        lg: '40',
                                    }}
                                >
                                    <Text fontSize="lg" fontWeight="semibold" color="fg.accent.subtle">
                                        Useful Links
                                    </Text>
                                    <Stack spacing="0" align={'start'}>
                                        {/* eslint-disable-next-line react/prop-types */}
                                        {navigation.map((navItem, idx) => {
                                            return (
                                                <Button fontWeight="normal" h={8} px={0} key={idx} as="a"
                                                        variant="text.accent"
                                                        justifyContent={'start'}
                                                        href={getNavPath(navItem.page.slug)}>
                                                    {navItem.title}
                                                </Button>
                                            )
                                        })}
                                    </Stack>
                                </Stack>
                            }
                        </GridItem>
                    </Grid>
                </Stack>
                <Divider borderColor="bg.accent.subtle"/>
                <Stack
                    pt="8"
                    pb="12"
                    justify="space-between"
                    direction={{
                        base: 'column-reverse',
                        md: 'row',
                    }}
                    align="center"
                >
                    <Text fontSize="sm" color="fg.accent.subtle">&copy; {new Date().getFullYear()} {copyrightText}
                    </Text>
                    {footerSocialLinks &&
                        <ButtonGroup variant="tertiary.accent">
                            {footerSocialLinks?.facebook &&
                                <IconButton as="a" href={footerSocialLinks.facebook} target="_blank"
                                            aria-label="LinkedIn"
                                            icon={<FaFacebook/>}/>}
                            {footerSocialLinks?.twitter &&
                                <IconButton as="a" href={footerSocialLinks.twitter} target="_blank"
                                            aria-label="GitHub"
                                            icon={<FaTwitter/>}/>}
                            {footerSocialLinks?.linkedIn &&
                                <IconButton as="a" href={footerSocialLinks.linkedIn} target="_blank"
                                            aria-label="Twitter"
                                            icon={<FaLinkedin/>}/>}
                            {footerSocialLinks?.yelp &&
                                <IconButton as="a" href={footerSocialLinks.yelp} target={"_blank"}
                                            aria-label="Twitter"
                                            icon={<FaYelp/>}/>}
                            {footerSocialLinks?.googleBusinessURL &&
                                <IconButton as="a" href={footerSocialLinks.googleBusinessURL} target="_blank"
                                            aria-label="Twitter" icon={<TbMapPinFilled/>}/>}
                        </ButtonGroup>
                    }
                </Stack>
            </Container>
        </Box>
    )
}
