import {Box, Container, Heading, Image, Link, Stack, Text} from '@chakra-ui/react'
import {formatPhone} from "@root/utils/formatPhone.js";

const CallToAction = ({
                          bannerText,
                          subtitle,
                          bannerCta,
                          imgSrc,
                          backgroundColor,
                          fontColorLight,
                          phoneNumber,
                          addPadding
                      }) => (
    <Container
        py={{
            base: addPadding ? '8' : '0',
            md: addPadding ? '16' : '0'
        }}
        maxW={{
            base: 'xl',
            md: '7xl',
        }}
    >
        <Link href={`tel:${phoneNumber}`} color={fontColorLight ? "white" : 'gray.800'}
              _hover={{textDecoration: 'none', color: 'initial'}}>
            <Box
                bg={backgroundColor?.value || 'gray.400'}
                color={fontColorLight ? "#fff" : 'gray.800'}
                borderRadius="xl"
                maxW={'full'}
                px={{
                    base: '6',
                    lg: '16',
                }}
                py={{
                    base: '10',
                    lg: '16',
                }}
            >
                <Stack
                    spacing="8"
                    direction={{
                        base: 'column',
                        lg: 'row',
                    }}
                    justify="space-between"
                    align={'center'}
                >
                    {imgSrc?.url &&
                        <Stack>
                            <Image src={imgSrc?.url} alt={'cta icon image'} width="100%" height="100%" loading='lazy'/>
                        </Stack>
                    }
                    <Stack spacing="2" maxW="2xl" borderRight={{base: 'none', xl: '1px solid #fff'}}>
                        <Heading size="lg" fontWeight={'bold'} textAlign={{base: 'center', xl: 'left'}}
                                 color={fontColorLight ? "white" : 'gray.800'}>{bannerText}</Heading>
                        {subtitle &&
                            <Text
                                textAlign={{base: 'center', xl: 'left'}}
                                color={fontColorLight ? "white" : 'gray.800'}
                                fontSize={{
                                    base: 'lg',
                                    lg: 'xl',
                                }}
                                maxW={{
                                    base: 'unset',
                                    md: 'xl',
                                }}
                                pr={{base: '0', md: '16'}}
                            >
                                {subtitle}
                            </Text>
                        }
                    </Stack>
                    <Stack
                        spacing="3"
                        direction={{
                            base: 'column',
                            sm: 'row',
                        }}
                        justify={{
                            base: 'start',
                        }}
                    >

                        <Stack spacing={-1} textAlign={'center'} lineHeight={'2.5rem'}>
                            <Text textTransform={'capitalize'} color={fontColorLight ? "white" : 'gray.800'}
                                  fontSize={'xx-large'}
                                  fontWeight={'bold'}>{bannerCta}</Text>
                            <Text fontSize={'xx-large'} fontWeight={'bold'}
                                  color={fontColorLight ? 'gray.800' : "white"}>{formatPhone(phoneNumber)}</Text>
                        </Stack>
                    </Stack>
                </Stack>
            </Box>
        </Link>
    </Container>
)

export default CallToAction