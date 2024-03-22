'use client'
import {Box, Button, ButtonGroup, Container, css, HStack, Link, SlideFade, Stack} from '@chakra-ui/react'
import {DocumentPopover} from './DocumentPopover'
import {Logo} from './Logo'
import {MobileDrawer} from './MobileDrawer'
import {useEffect, useState} from "react";
import {FaPhone} from "react-icons/fa";
import {formatPhone} from "@root/utils/formatPhone.js";
import {getNavPath} from "@root/utils/getNavPath.js";

export const NavBar = ({logo, phoneNumber, navigation}) => {
    const [isOpen, setIsOpen] = useState(false)
    useEffect(() => {
        setIsOpen(true)
    }, [])
    return (
        <Box as="section" minW={'100%'}>
            <Box borderBottomWidth="1px" bg="bg.surface" position="relative" zIndex="tooltip" minW={'100%'}>
                <Container py={2} minW={'100%'}>
                    <Box maxW={'1170px'}
                         mx={'auto'}
                    >
                        <HStack justify="space-between" spacing={{base: 0, md: 8}}>
                            <HStack spacing="10">
                                <HStack spacing="3">
                                    <MobileDrawer navigation={navigation}/>
                                    {logo?.url &&
                                        <Logo logoSrc={logo?.url}/>
                                    }
                                </HStack>
                                <ButtonGroup
                                    size="lg"
                                    variant="text"
                                    spacing="10"
                                    display={{
                                        base: 'none',
                                        lg: 'flex',
                                    }}
                                    alignItems={'center'}
                                    color={'gray.800'}
                                    css={css`
                                        border: 0;
                                        font-family: "Nunito Sans", sans-serif;
                                        font-size: 17px;
                                        line-height: 26px;
                                        position: relative;
                                        text-align: center;
                                        font-weight: 700;
                                        text-decoration: none;`}
                                >
                                    {/* eslint-disable-next-line react/prop-types */}
                                    {navigation?.length > 0 && navigation?.map((navItem, idx) => {
                                        if (navItem?.hideFromTopNav) {
                                            return null
                                        }
                                        if (navItem['childrenCollection'].items.length > 0) {
                                            return (
                                                <DocumentPopover items={navItem['childrenCollection'].items}
                                                                 title={navItem.page.title}
                                                                 key={`${navItem.page.slug}-${idx}`}
                                                                 href={getNavPath(navItem.page.slug)}/>
                                            )
                                        }
                                        return (
                                            <Link href={getNavPath(navItem.page?.slug)}
                                                  key={`${navItem.page.title}-${idx}`}
                                                  color={'gray.800'}>{navItem.title}</Link>
                                        )
                                    })}
                                    <Link href={'/blog'} color={'gray.800'}>{'Blog'}</Link>
                                </ButtonGroup>
                            </HStack>
                            <Stack
                                direction={{
                                    base: 'column',
                                    md: 'row',
                                }}
                                spacing="3"
                                align={{
                                    base: 'stretch',
                                    md: 'center',
                                }}
                            >
                                <SlideFade direction='top' in={isOpen} style={{zIndex: 10}} offsetY='70px'
                                           transition={{exit: {delay: 1}, enter: {duration: 0.5}}}>
                                    <Button rightIcon={<FaPhone/>} variant='ghost' size='lg' minH={'60px'} as={'a'}
                                            href={`tel:${phoneNumber}`} _hover={{bg: 'white'}} color={'gray.800'}>
                                        Call Us Anytime<br/>
                                        {formatPhone(phoneNumber)}
                                    </Button>
                                </SlideFade>
                            </Stack>
                        </HStack>
                    </Box>
                </Container>
            </Box>
        </Box>
    )
}
