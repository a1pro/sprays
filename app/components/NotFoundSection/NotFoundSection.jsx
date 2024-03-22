import {Button, Container, Flex, Heading, Link, Text, VStack} from "@chakra-ui/react";

export const NotFoundSection = () => {
    return (
        <Flex
            direction="column"
            alignItems="center"
            justifyContent="center"
            minH="100vh"
            bgGradient="linear(to-r, blue.600, blue.400)"
        >
            <Container
                maxW="xl"
                py="8"
                px={{base: '4', sm: '10'}}
                bg="white"
                boxShadow="xl"
                borderRadius="xl"
            >
                <VStack spacing="8">
                    <Heading size="xl" textAlign="center">Oops! Page Not Found</Heading>
                    <Text color="gray.600" textAlign="center">
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        The page you're looking for doesn't exist or has been moved.
                    </Text>
                    <Text color="gray.600" textAlign="center">
                        If you think this is a mistake, please <Link color="blue.500" href="/contact">contact
                        support</Link>.
                    </Text>
                    <Button colorScheme="blue" as="a" href="/">
                        Go Back Home
                    </Button>
                </VStack>
            </Container>
        </Flex>
    );
}