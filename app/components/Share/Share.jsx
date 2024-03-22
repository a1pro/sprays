import {chakra, HStack, Icon, Stack, Tag, useColorModeValue,} from '@chakra-ui/react'
import {FaEnvelope, FaFacebook} from 'react-icons/fa'

export const Share = (props) => {
    const {label = 'Share this post', facebookUrl, emailUrl, rootProps} = props
    return (
        <Stack {...rootProps}>
            <HStack spacing="5">
                <Tag>{label}</Tag>
                <ShareButton aria-label="Share on Facebook" as={'a'} href={facebookUrl} target="_blank"
                             rel="noopener noreferrer">
                    <Icon as={FaFacebook}/>
                </ShareButton>
                {/*<ShareButton aria-label="Share on Twitter">*/}
                {/*    <Icon as={FaTwitter}/>*/}
                {/*</ShareButton>*/}
                {/*<ShareButton aria-label="Share on LinkedIn">*/}
                {/*    <Icon as={FaLinkedin}/>*/}
                {/*</ShareButton>*/}
                {/*<ShareButton aria-label="Share on Yelp">*/}
                {/*    <Icon as={FaYelp}/>*/}
                {/*</ShareButton>*/}
                <ShareButton aria-label="Share with Mail" as={'a'} href={emailUrl} target="_blank"
                             rel="noopener noreferrer">
                    <Icon as={FaEnvelope}/>
                </ShareButton>
            </HStack>
        </Stack>
    )
}

const ShareButton = (props) => (
    <chakra.button
        fontSize="xl"
        transition="all 200ms"
        lineHeight="1"
        color={"#112b81"}
        _hover={{
            color: useColorModeValue('blue.500', 'blue.200'),
        }}
        _focus={{boxShadow: 'none'}}
        _focusVisible={{boxShadow: 'outline', outline: 'none'}}
        {...props}
    />
)