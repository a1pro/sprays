import {Box, Spinner} from "@chakra-ui/react";

export const Loading = ({minH}) => {
    return (
        <Box display={'flex'} as="section" minW={'full'} justifyContent={'center'} alignItems={'center'} minH={minH || '100vh'}>
            <Spinner
                thickness='1px'
                emptyColor='gray.200'
                size='xl'
            />
        </Box>
    )
}