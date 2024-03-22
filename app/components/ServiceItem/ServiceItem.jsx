import {Button, Image, Stack, Text} from "@chakra-ui/react";
import {documentToReactComponents} from "@contentful/rich-text-react-renderer";
import {richTextOptions} from "@components/RichTextSection/RichTextSection.jsx";
import {FiArrowRight} from "react-icons/fi";

const ServiceItem = ({service, website}) => {
    return (
        <Stack key={service.title} spacing={{base: '4', md: '5'}}>
            {service?.metaImage?.url &&
                <Image src={service.metaImage.url} alt={service.metaImage.title} height={{base:'100%',lg:'150px'}} objectFit={'cover'}
                       maxW={{base:'100%',lg:'414px'}} w='full' loading="lazy"/>
            }
            <Stack spacing={{base: '1', md: '2'}} flex="1">
                <Text fontSize={{base: 'lg', md: 'xl'}} fontWeight="medium">
                    {service.title}
                </Text>
                {documentToReactComponents(service['servicePageSnippet'].json, richTextOptions(website, 7))}
            </Stack>
            <Button variant="text" colorScheme="blue" rightIcon={<FiArrowRight/>}
                    alignSelf="start"
                    p={0} as={'a'} href={`/${service.slug}`}>
                {service.title}
            </Button>
        </Stack>
    )
}
export default ServiceItem