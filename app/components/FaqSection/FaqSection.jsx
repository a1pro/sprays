import {Box, Grid, Heading, Stack, Text} from "@chakra-ui/react";

const FaqSection = ({heading, subtitle, removeTopPadding, faqsCollection}) => {
    return (
        <Box as="section" mx="auto" pb={24} pt={removeTopPadding ? '0' : 24} maxW={{
            base: 'xl',
            md: '6xl',
        }}>
            <Stack px={5}>
                <Heading as="h2" size="lg" mb={2}>
                    {heading}
                </Heading>
                <Text
                    fontSize={{
                        base: 'md',
                    }}
                >
                    {subtitle}
                </Text>
                <Grid templateColumns={{base: "repeat(1, 1fr)", md: "repeat(2, 1fr)"}} gap={6} mt={5}>
                    {faqsCollection?.items?.map((data, index) => {
                            const {question, answer} = data
                            return (
                                <Box
                                    p={5}
                                    // shadow="md"
                                    borderWidth="1px"
                                    borderRadius="lg"
                                    key={index}
                                >
                                    <Heading fontSize="xl">{question}</Heading>
                                    <Text mt={4}>{answer}</Text>
                                </Box>
                            )
                        }
                    )
                    }
                </Grid>
            </Stack>
        </Box>
    )
}

export default FaqSection