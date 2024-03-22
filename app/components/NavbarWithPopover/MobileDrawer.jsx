import {Button, Drawer, DrawerBody, DrawerContent, Stack, useDisclosure} from '@chakra-ui/react'
import {DocumentCollapse} from './DocumentCollapse'
import {ToggleButton} from './ToggleButton'
import {getNavPath} from "@root/utils/getNavPath.js";

export const MobileDrawer = ({navigation}) => {
    const {isOpen, onToggle, onClose} = useDisclosure()
    return (
        <>
            <ToggleButton
                isOpen={isOpen}
                onClick={onToggle}
                aria-label="Open menu"
                display={{
                    base: 'inline-flex',
                    lg: 'none'
                }}
            />
            <Drawer placement="top" isOpen={isOpen} onClose={onClose}>
                <DrawerContent>
                    <DrawerBody mt="72px" p="4">
                        <Stack spacing="1">
                            {/* eslint-disable-next-line react/prop-types */}
                            {navigation?.length > 0 && navigation?.map((navItem, index) => {
                                if (navItem?.hideFromTopNav) {
                                    return null
                                }
                                if (navItem['childrenCollection'].items.length > 0) {
                                    return (
                                        <DocumentCollapse items={navItem['childrenCollection'].items}
                                                          title={navItem.page.title}
                                                          key={navItem.page.slug}/>
                                    )
                                }
                                return (
                                    <Button size="lg" variant="tertiary" justifyContent="start" as={'a'}
                                            key={navItem.page.title} mt={index === 0 ? '5' : '0'}
                                            href={getNavPath(navItem.page.slug)}>{navItem.page.title}</Button>
                                )
                            })}
                            <Button size="lg" variant="tertiary" justifyContent="start" as={'a'}
                                    href={'/blog'}>Blog</Button>
                        </Stack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}
