import { 
    Accordion,
    ActionIcon, 
    Anchor, 
    Button, 
    ColorSwatch, 
    CopyButton, 
    Divider, 
    Group, 
    Stack, 
    Text
} from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import {
    IconArrowsMaximize,
    IconCheck,
    IconCopy,
    IconExternalLink,
    IconPencil, 
    IconTrash
} from "@tabler/icons-react"
import { EditModal, ViewCodeModal } from '../modals'
import { 
    ColorType,
    ColorMap
} from "../utility";

interface CodeStateProps {
    id: string;
    color: ColorType;
    name: string;
    notes: string;
    link: string;
}

interface CodeCardState {
    code: CodeStateProps
}

export function CodeCard ({
    code
}: CodeCardState) {
    const [openedEdit, { open: openEdit, close: closeEdit }] = useDisclosure(false)
    const [openedViewCode, { open: openViewCode, close: closeViewCode }] = useDisclosure(false)

    return(
        <Accordion.Item
            key={code.id}
            value={code.id}
            >
            <Accordion.Control
                icon={<ColorSwatch color={ColorMap[code.color]}/>}
                >
                <Text>{code.name}</Text>
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
                        justify="space-between"
                        >
                        <ActionIcon
                            variant="transparent"
                            onClick={openViewCode}
                            >
                            <IconArrowsMaximize />
                        </ActionIcon>
                        <Group
                            justify="flex-end"
                            gap="xs"
                            >
                            <ActionIcon
                                variant="transparent"
                                onClick={openEdit}
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
                    </Group>
                    <EditModal 
                        opened={openedEdit}
                        close={closeEdit}
                        code={code}
                        />
                    <ViewCodeModal
                        opened={openedViewCode}
                        close={closeViewCode}
                        name={code.name}
                        link={code.link}
                        />
                </Stack>
            </Accordion.Panel>
        </Accordion.Item>
    )
}