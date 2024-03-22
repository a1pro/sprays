import {Button, Popover, PopoverContent, PopoverTrigger, Stack, useDisclosure,} from '@chakra-ui/react'
import {PopoverIcon} from './PopoverIcon'
import {getNavPath} from "@root/utils/getNavPath.js";

export const DocumentPopover = ({items, title, href}) => {
    const {isOpen, onOpen, onClose} = useDisclosure()
    return (
        <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose} trigger="hover" openDelay={0}>
            <PopoverTrigger>
                <Button as={'a'} href={href} rightIcon={<PopoverIcon isOpen={isOpen}/>} color={'gray.800'}
                        css={` border: 0;
                            font-family: "Nunito Sans", sans-serif;
                            font-size: 17px;
                            line-height: 26px;
                            position: relative;
                            text-align: center;
                            font-weight: 700;
                            text-decoration: none;
                            padding: 0;
                        `}>{title}</Button>
            </PopoverTrigger>
            <PopoverContent p="2" maxW="fit-content">
                <Stack spacing="0" alignItems="stretch">
                    {/* eslint-disable-next-line react/prop-types */}
                    {items?.map((navItem) => {
                        if (!navItem?.title){
                            return null;
                        }
                        return (
                            <Button as={'a'} href={getNavPath(navItem?.slug)}
                                    key={navItem.title}
                                    variant="tertiary" justifyContent="start" color={'gray.800'}>
                                {navItem.title}
                            </Button>
                        )
                    })}
                </Stack>
            </PopoverContent>
        </Popover>
    )
}
