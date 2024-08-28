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
    Text,
    Transition
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
import { DeleteModal, EditModal, ViewCodeModal } from '../modals'
import { 
    ColorType,
    ColorMap
} from "../utility";
import { useEffect, useState } from "react";

interface CodeStateProps {
    id: string;
    color: ColorType;
    name: string;
    notes: string;
    link: string;
}

interface CodeCardState {
    code: CodeStateProps;
    k: number;
}

export function CodeCard ({
    code,
    k
}: CodeCardState) {
    const [openedEdit, { open: openEdit, close: closeEdit }] = useDisclosure(false)
    const [openedViewCode, { open: openViewCode, close: closeViewCode }] = useDisclosure(false)
    const [openedDelete, { open: openDelete, close: closeDelete }] = useDisclosure(false)

    const [ opened, setOpened ] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setOpened(true)
        }, k * 100)
        return () => clearTimeout(timer);
    },[k])

    return(
        <Transition
            mounted={opened}
            transition="slide-left"
            duration={400}
            timingFunction="ease"
            >
        {(styles) => 
        <Accordion.Item
            key={code.id}
            value={code.id}
            style={styles}
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
                                size="sm"
                                radius="xl"
                                w="45%"
                                color={copied ? 'teal' : 'blue'}
                                >
                                {copied ? 'Copied' : 'Copy'}
                            </Button>
                        )}
                        </CopyButton>
                        <Anchor
                            href={code.link}
                            target="_blank"
                            w="45%"
                            >
                            <Button
                                size="sm"
                                radius="xl"
                                fullWidth
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
                                onClick={openDelete}
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
                    <DeleteModal
                        opened={openedDelete}
                        close={closeDelete}
                        uid={code.id}
                        name={code.name}
                        />
                </Stack>
            </Accordion.Panel>
        </Accordion.Item>
        }
        </Transition>
    )
}