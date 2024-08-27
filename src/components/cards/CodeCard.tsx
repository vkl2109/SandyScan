import { 
    Accordion,
    ActionIcon, 
    Anchor, 
    Button, 
    CopyButton, 
    Divider, 
    Group, 
    Stack, 
    Text 
} from "@mantine/core"
import {
    IconCheck,
    IconCopy,
    IconExternalLink,
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
                    <Group 
                        w="100%"
                        justify="space-between"
                        align="center"
                        >
                        <CopyButton value={code.link}>
                        {({ copied, copy }) => (
                            <Button 
                                onClick={copy}
                                leftSection={
                                    copied ?
                                    <IconCheck size={15} />
                                    :
                                    <IconCopy size={15} />
                                }
                                variant="light"
                                size="xs"
                                color={copied ? 'teal' : 'blue'}
                                >
                                {copied ? 'Copied' : 'Copy'}
                            </Button>
                        )}
                        </CopyButton>
                        <Anchor
                            href={code.link}
                            target="_blank"
                            >
                            <Button
                                size="xs"
                                variant="outline"
                                rightSection={<IconExternalLink size={15} />}

                                >
                                Open
                            </Button>
                        </Anchor>
                    </Group>
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