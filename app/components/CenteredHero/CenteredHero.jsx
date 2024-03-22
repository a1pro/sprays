import {Box, Button, Flex, Heading, Image, LightMode, Stack, Text} from "@chakra-ui/react";

export const CenteredHero = ({
                                 header,
                                 subtitle,
                                 cta,
                                 imgSrc,
                                 badgeSrc,
                                 badgeTwoSrc,
                                 useH1,
                                 phoneNumber,
                                 buttonColor,
                                 colorOverlay,
                                 overlayOpacity,
                                 headerFontColor,
                                 backgroundColor,
                             }) => {
    return (
        <Box>
            <Box as="section" color={headerFontColor ? headerFontColor.value : 'white'} py={{base: '10', md: '32'}}
                 minH="140px" position="relative"
                 bg={imgSrc ? 'unset' : (backgroundColor?.value || 'gray.800')}>
                <Box
                    zIndex={1}
                    maxW={{
                        base: 'xl',
                        md: '5xl',
                    }}
                    mx="auto"
                    px={{
                        base: '6',
                        md: '8',
                    }}
                >
                    <Box textAlign="center">
                        {badgeSrc || badgeTwoSrc &&
                            <Box display={'flex'} gap={55} alignItems={'center'} justifyContent={'center'} pb={10}>
                                {badgeSrc &&
                                    <img src={badgeSrc} alt=""/>
                                }
                                {badgeTwoSrc &&
                                    <img src={badgeTwoSrc} alt=""/>
                                }
                            </Box>
                        }
                        <Heading
                            as={useH1 ? 'h1' : 'h2'}
                            size={{base: 'xl', lg: '3xl'}}
                            fontWeight={useH1 ? 'extrabold' : 'bold'}
                            mx="auto"
                            lineHeight="1.2"
                            letterSpacing="tight"
                        >
                            {header}
                        </Heading>
                        {subtitle &&
                            <Text fontSize="xl" mt="4" mx="auto">
                                {subtitle}
                            </Text>
                        }
                    </Box>

                    <Stack
                        justify="center"
                        direction={{
                            base: 'column',
                            md: 'row',
                        }}
                        mt="10"
                        spacing="4"
                    >
                        <LightMode>
                            <Button as={'a'} href={`tel:${phoneNumber}`} fontSize={'20px'}
                                    bg={buttonColor?.value || 'blue.800'} color={'white'}
                                    _hover={{bg: 'gray.700', color: 'white', cursor: 'pointer'}} borderRadius={0}
                                    lineHeight={'26px'} minH={'56px'} px={10} fontWeight={'bold'} letterSpacing={'1px'}
                                    textTransform={'uppercase'}>{cta || 'call us toady!'}</Button>
                        </LightMode>
                    </Stack>
                </Box>
                {imgSrc &&
                    <Flex
                        zIndex={-1}
                        id="image-wrapper"
                        position="absolute"
                        insetX="0"
                        insetY="0"
                        w="full"
                        h="full"
                        overflow="hidden"
                        align="center"
                    >
                        <Box position="relative" w="full" h="full">
                            <Image
                                src={imgSrc?.url}
                                alt="Main Image"
                                w="full"
                                h="full"
                                objectFit="cover"
                                objectPosition="top bottom"
                                position="absolute"
                                loading="lazy"
                            />
                            <Box position="absolute" w="full" h="full" bg={colorOverlay || 'gray.800'}
                                 opacity={(overlayOpacity || 50) / 100}/>
                        </Box>
                    </Flex>
                }
            </Box>
        </Box>
    )
}