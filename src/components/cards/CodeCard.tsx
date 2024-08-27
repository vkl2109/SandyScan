import { 
    Accordion,
    ActionIcon, 
    Divider, 
    Group, 
    Stack, 
    Text 
} from "@mantine/core"
import {
    IconPencil, 
    IconQrcode, 
    IconTrash 
} from "@tabler/icons-react"

interface CodeCardState {
    code: any
}

export function CodeCard ({
    code
}: CodeCardState) {

    return(
        <Accordion.Item
            key={code.id}
            value={code.id}
            >
            <Accordion.Control
                icon={<IconQrcode />}
                >
                {code.name}
            </Accordion.Control>
            <Accordion.Panel>
                <Stack 
                    justify="center"
                    align="center"
                    gap={0}
                    >
                    <Divider 
                        w="100%" 
                        m="xs"
                        label="notes"
                        />
                    <Text>
                        {code.notes}
                    </Text>
                    <Group
                        w="100%"
                        justify="flex-end"
                        gap="xs"
                        >
                        <ActionIcon
                            variant="transparent"
                            >
                            <IconPencil />
                        </ActionIcon>
                        <ActionIcon
                            c="red"
                            variant="transparent"
                            >
                            <IconTrash />
                        </ActionIcon>
                    </Group>
                </Stack>
            </Accordion.Panel>
        </Accordion.Item>
    )
}