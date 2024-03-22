import {Box, Button, Flex, Heading, Image, Link, Stack, Text} from '@chakra-ui/react'
import {formatPhone} from "@root/utils/formatPhone.js";
import {LightenDarkenColor} from "@root/utils/lightenDarkenColor.js";


const Hero = ({
                  heading,
                  subHeading,
                  backgroundImage,
                  colorOverlay,
                  overlayOpacity,
                  h1:isH1,
                  buttonBackgroundColor,
                  buttonTextColor,
                  fontColor,
                  accentColor,
                  phoneNumber
              }) => {
    const hoverVal = buttonBackgroundColor?.value || accentColor?.value
    return (
        <Box bg="gray.800" as="section" minH="140px" position="relative" minW={'full'}>
            <Box py={{base: '12', lg: '32'}} position="relative" zIndex={1} minW={'full'}>
                <Box
                    maxW={{
                        base: 'xl',
                        md: '7xl',
                    }}
                    mx={'auto'}
                    px={{
                        base: '6',
                        md: '8',
                    }}

                    color={fontColor?.value ? fontColor.value : 'white'}
                >
                    <Box maxW="5xl">
                        <Link href={`tel:${phoneNumber}`} _hover={{textDecoration: 'none'}}>
                            <Stack color={accentColor?.value || 'yellow.500'} fontWeight={'bold'} display={'flex'}
                                   flexDirection={{base: 'column', md: 'row'}} alignItems={{base: 'start', md: 'end'}}
                                   spacing={{base: 0, md: 2}}>
                                <Text textTransform={'uppercase'} fontSize={'x-large'}
                                      letterSpacing={'1px'}>call us anytime</Text>
                                <Text
                                    as={'span'} size={{
                                    base: 'md',
                                    md: 'large'
                                }} letterSpacing={'normal'}
                                    fontSize={{base: 'lg', md: 'xxx-large'}}> {formatPhone(phoneNumber)}</Text>
                            </Stack>
                        </Link>
                        <Heading as={isH1 ? 'h1' : 'h2'}  size={{base: 'xl', lg: '3xl'}} fontWeight={{base:'500',lg:'extrabold'}}>
                            {heading}
                        </Heading>
                        <Text
                            fontSize={{
                                md: '2xl',
                            }}
                            mt="4"
                            maxW="lg"
                        >
                            {subHeading}
                        </Text>
                        <Stack
                            direction={{
                                base: 'column',
                                md: 'row',
                            }}
                            mt="10"
                            spacing="4"
                        >
                            <Button as={'a'} href={`tel:${phoneNumber}`} fontSize={'20px'}
                                    bg={buttonBackgroundColor?.value || accentColor?.value}
                                    _hover={{
                                        bg: hoverVal ? `#${LightenDarkenColor(hoverVal.replace("#", ''), 40)}` : 'gray.700',
                                        color: buttonTextColor?.value,
                                        cursor: 'pointer'
                                    }}
                                    borderRadius={0}
                                    lineHeight={'26px'} minH={'56px'} px={10} fontWeight={'bold'} letterSpacing={'1px'}
                                    textTransform={'uppercase'}>call us toady!</Button>
                        </Stack>
                    </Box>
                </Box>
            </Box>
            <Flex
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
                        src={backgroundImage?.url}
                        alt="Main Image"
                        w="full"
                        h="full"
                        objectFit="cover"
                        objectPosition="top bottom"
                        position="absolute"
                        loading='lazy'
                        display={{ base: 'none', xl: 'block' }}
                    />
                    <Box position="absolute" w="full" h="full" bg={colorOverlay?.value || 'gray.800'}
                         opacity={(overlayOpacity || 50) / 100}/>
                </Box>
            </Flex>
        </Box>
    )
}

export default Hero