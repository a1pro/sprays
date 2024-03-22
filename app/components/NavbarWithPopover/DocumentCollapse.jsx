import {Button, Collapse, Stack, Text, useDisclosure} from '@chakra-ui/react'
import {PopoverIcon} from './PopoverIcon'

export const DocumentCollapse = ({items, title}) => {
    const {isOpen, onToggle} = useDisclosure()
    return (
        <>
            <Button justifyContent="space-between" variant="tertiary" size="lg" onClick={onToggle}>
                <Text as="span">{title}</Text>
                <PopoverIcon isOpen={isOpen}/>
            </Button>
            <Collapse in={isOpen} animateOpacity>
                <Stack spacing="1" alignItems="stretch" ps="4">
                    {/* eslint-disable-next-line react/prop-types */}
                    {items.map(({title, slug}) => {
                        return (
                            <Button as={'a'} href={slug} key={title} size="lg" variant="tertiary"
                                    justifyContent="start">
                                {title}
                            </Button>
                        )
                    })}
                </Stack>
            </Collapse>
        </>
    )
}
