import {Box, Container, Heading, SimpleGrid, Stack, Text} from '@chakra-ui/react';
import {lazy, Suspense, useMemo} from "react";
import {LightenDarkenColor} from "@root/utils/lightenDarkenColor.js";

const ServiceItem = lazy(() => import('@components/ServiceItem/ServiceItem.jsx'))

const ServicesLeftAligned = ({
                                 preHeading,
                                 title,
                                 subtitle,
                                 services: serviceArray,
                                 brandColor,
                                 backgroundColor,
                                 fontColor,
                                 removeTopPadding,
                                 website
                             }) => {

    const filteredServices = useMemo(() => {
        const uniqueServices = [...new Set(serviceArray?.map(JSON.stringify))].map(JSON.parse);
        return uniqueServices.slice(0, Math.min(uniqueServices.length, 6));
    }, [serviceArray]);


    const textColor = useMemo(() => LightenDarkenColor('000', 80), []);
    if (filteredServices.length < 1) {
        return <></>;
    }
    return (
        <Box as="section" bg={backgroundColor}>
            <Container
                pt={{base: removeTopPadding ? '0' : '16', md: removeTopPadding ? '0' : '24'}}
                pb={{base: '16', md: '24'}}
                maxW={{base: 'xl', md: '6xl'}}
            >
                <Stack spacing={{base: '12', md: '16'}}>
                    <Stack spacing={{base: '4', md: '5'}} maxW="3xl">
                        <Stack spacing="3">
                            <Text fontSize={{base: 'sm', md: 'md'}} fontWeight="semibold" color="accent"
                                  textTransform="uppercase">
                                {preHeading}
                            </Text>
                            <Heading size={{base: 'sm', md: 'lg'}}
                                     color={fontColor?.value || brandColor?.value || 'initial'}>
                                {title}
                            </Heading>
                        </Stack>
                        <Text color={`#${textColor}`} fontSize={{base: 'lg', md: 'xl'}}>
                            {subtitle}
                        </Text>
                    </Stack>
                    <SimpleGrid columns={{base: 1, md: 2, lg: 3}} columnGap={8} rowGap={{base: 10, md: 16}}>
                        {filteredServices?.map((service) => {
                            return (
                                <Suspense fallback={<Box w={'full'} minH={'250px'}/>} key={service.title}>
                                    <ServiceItem service={service} website={website}/>
                                </Suspense>
                            )
                        })}
                    </SimpleGrid>
                </Stack>
            </Container>
        </Box>
    );
}

export default ServicesLeftAligned;
