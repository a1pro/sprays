import {Box, Button, Container, Heading, SimpleGrid, Stack, Text,} from '@chakra-ui/react'
import {ArrowForwardIcon} from "@chakra-ui/icons";
import {LightenDarkenColor} from "@root/utils/lightenDarkenColor.js";
import GetIcon from "@components/GetIcon/GetIcon.jsx";
import {documentToReactComponents} from "@contentful/rich-text-react-renderer";
import {richTextOptions} from "@components/RichTextSection/RichTextSection.jsx";
import {useState} from "react";

const ServiceSection = ({
                            preHeading,
                            title,
                            subtitle,
                            services: serviceArray,
                            brandColor,
                            website,
                            backgroundColor,
                            fontColor,
                            removeTopPadding
                        }) => {
    const [services] = useState([...serviceArray])
    if (services.length < 1) {
        return <></>
    }
    return (
        <Box bg={backgroundColor?.value} maxW={'full'}>
            <Container
                pt={{
                    base: removeTopPadding ? '0' : '16',
                    md: removeTopPadding ? '0' : '24',
                }}
                pb={{
                    base: '16',
                    md: '24',
                }}
                maxW={{
                    base: 'xl',
                    md: '6xl',
                }}
            >

                <Stack spacing="3" width="full" textAlign={'center'}>
                    <Text
                        fontSize={{
                            base: 'sm',
                            md: 'md',
                        }}
                        color="accent"
                        textTransform="uppercase"
                        fontWeight="bold"
                    >
                        {preHeading}
                    </Text>
                    <Stack
                        spacing={{
                            base: '4',
                        }}
                    >
                        <Heading
                            size={{
                                base: 'md',
                                md: 'xl',
                            }}
                            color={fontColor?.value || brandColor?.value || 'initial'}
                        >
                            {title}
                        </Heading>
                        <Text
                            fontSize={{
                                base: 'lg',
                                md: 'xl',
                            }}
                            color="fg.muted"
                            maxW="xl"
                            mx="auto"
                            px={0}
                        >
                            {subtitle}
                        </Text>
                    </Stack>
                </Stack>
                <SimpleGrid
                    columns={{
                        base: 1,
                        md: 2,
                        lg: 4,
                    }}
                    columnGap="8"
                    rowGap={{
                        base: '10',
                        lg: '12',
                    }}
                    flex="1"
                    pt={16}
                    maxW={'full'}
                >

                    {services.splice(0, 4).map((service) => {
                            return (
                                <Stack
                                    key={service.title}
                                    spacing={{
                                        base: '4',
                                        md: '5',
                                    }}
                                    direction="row"
                                    textAlign={'center'}
                                >
                                    <Stack spacing="4">
                                        <Stack alignItems={'center'}>
                                            <Box textAlign={'center'}>
                                                {service.iconLibrary && service.iconName &&
                                                    <Box style={{
                                                        background: '#e4e4e4',
                                                        width: '100px',
                                                        margin: '0 auto',
                                                        paddingTop: '30px',
                                                        borderRadius: '50%',
                                                        height: '100px',
                                                        marginBottom: '20px'
                                                    }}>
                                                        <GetIcon lib={service.iconLibrary} name={service.iconName}
                                                                 style={{margin: ' 0 auto'}}/>
                                                    </Box>
                                                }
                                                <Text fontWeight="bold" fontSize="lg">
                                                    {service.title}
                                                </Text>
                                            </Box>
                                            {documentToReactComponents(service['servicePageSnippet'].json, richTextOptions(website, 7))}
                                        </Stack>
                                    </Stack>
                                </Stack>
                            )
                        }
                    )
                    }
                    {services?.length > 5 && services.splice(3, 6).map((service) => {
                            return (
                                <Stack
                                    key={service.title}
                                    spacing={{
                                        base: '4',
                                        md: '5',
                                    }}
                                    direction="row"
                                    textAlign={'center'}
                                >
                                    <Stack spacing="4">
                                        <Stack alignItems={'center'}>
                                            <Box textAlign={'center'}>
                                                {service.iconLibrary && service.iconName &&
                                                    <Box style={{
                                                        background: '#e4e4e4',
                                                        width: '100px',
                                                        margin: '0 auto',
                                                        paddingTop: '30px',
                                                        borderRadius: '50%',
                                                        height: '100px',
                                                        marginBottom: '20px'
                                                    }}>
                                                        <GetIcon lib={service.iconLibrary} name={service.iconName}
                                                                 style={{margin: ' 0 auto'}}/>
                                                    </Box>
                                                }
                                                <Text fontWeight="bold" fontSize="lg">
                                                    {service.title}
                                                </Text>
                                            </Box>
                                            {documentToReactComponents(service['servicePageSnippet'].json, richTextOptions(website, 7))}
                                        </Stack>
                                    </Stack>
                                </Stack>
                            )
                        }
                    )
                    }
                </SimpleGrid>
                <Stack
                    spacing="3"
                    mt={10}
                    direction={{
                        base: 'column-reverse',
                        md: 'row',
                    }}
                    alignItems={'center'}
                >
                    <Button size="lg" mx='auto' mt={10} rightIcon={<ArrowForwardIcon/>} bgColor={brandColor?.value}
                            color={"white"}
                            as={'a'}
                            href={'/services'}
                            _hover={{
                                bg: `#${LightenDarkenColor(brandColor?.value.replace("#", ''), 40)}`
                            }}>See all of our
                        services</Button>
                </Stack>
            </Container>
        </Box>
    )
}

export default ServiceSection