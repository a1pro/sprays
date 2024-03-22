import {Box, Button, Container, Hide, Stack, Text} from "@chakra-ui/react";
import {BsClockHistory} from "react-icons/bs";

export const TopBar = ({topBarText, hoursOfOperation, themeColor, phoneNumber}) => {
    return (
        <Hide below={'md'}>
            <Box borderBottomWidth="1px" bg={themeColor?.value || "gray.800"} color='#fff' minW={'full'}>
                <Container
                    minW={'full'}
                    py={{
                        base: '1',
                        md: '3.5',
                    }}
                >
                    <Box maxW={'1170px'}
                         mx={'auto'}
                    >
                        <Stack
                            spacing={{base: 1, md: 4}}
                            justify={{
                                base: 'flex-end',
                                md: 'space-between',
                            }}
                            justifyContent={{
                                base: 'center',
                                md: 'flex-end'
                            }}
                            direction={{
                                base: 'column',
                                md: 'row',
                            }}
                        >
                            <Stack
                                direction={{
                                    base: 'row',
                                    md: 'row',
                                }}
                                spacing={{base: 1, md: 3}}
                                align={{
                                    base: 'center',
                                    md: 'center',
                                }}
                            >
                                <Text display={'flex'} alignItems={'center'} gap={2} fontWeight={'bold'}
                                      size={'xs'}><BsClockHistory/>{hoursOfOperation}</Text>
                                <Button size={'xs'} variant={'ghost'} color='#FFA903' _hover={{bg: '#051050'}}
                                        as={'a'}
                                        href={`tel:${phoneNumber}`}>{topBarText}</Button>
                            </Stack>
                        </Stack>
                    </Box>
                </Container>
            </Box>
        </Hide>
    )
}