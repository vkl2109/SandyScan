import { 
    Button, 
    Divider, 
    Group, 
    LoadingOverlay, 
    Modal, 
    Stack, 
    TextInput, 
    Textarea, 
    Title
} from "@mantine/core";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { useState } from "react";
import { useAuthStore } from "../../zustand";
import { notifications } from "@mantine/notifications";
import { IconCloudUpload, IconReload } from "@tabler/icons-react";
import { ColorPicker } from "../utility";

interface CodeStateProps {
    id: string;
    color: string;
    name: string;
    notes: string;
}

interface EditModalProps {
    opened: boolean;
    close: () => void;
    code: CodeStateProps;
}

export function EditModal({ opened, close, code }: EditModalProps) {
    const [ addingQRCode, setAddingQRCode ] = useState(false)
    const [ localName, setLocalName ] = useState(code.name)
    const [ localNotes, setLocalNotes ] = useState(code.notes)
    const [ localColor, setLocalColor ] = useState(code.color)

    const uid = useAuthStore((state) => state.uid)

    const handleSubmit = async () => {
        if (addingQRCode) return
        try {
            setAddingQRCode(true)
            await updateDoc(doc(db, 'users', uid, 'codes', code.id), {
                name: localName,
                notes: localNotes,
                color: localColor == '' ? code.color : localColor,
            })
            notifications.show({
                title: 'Success',
                message: 'Details Updated',
            })
            close()
        }
        catch (e) {
            console.log(e)
            notifications.show({
                title: 'Error',
                message: 'Please try again',
            })
        }
        finally {
            setAddingQRCode(false)
        }
    }

    const handleReset = () => {
        setLocalName(code.name)
        setLocalNotes(code.notes)
        setLocalColor(code.color)
    }

    return(
        <Modal
            opened={opened}
            onClose={close}
            centered
            radius="lg"
            withCloseButton={false}
            transitionProps={{ transition: 'fade', duration: 200 }}
            >
            <Stack
                w="100%"
                justify="center"
                align="center"
                ta="start"
                gap="md"
                >
                <Title 
                    order={1}
                    >
                    Edit
                </Title>
                <Divider w="100%" mt="-xs" />
                <LoadingOverlay 
                    visible={addingQRCode} 
                    zIndex={1000} 
                    overlayProps={{ 
                        radius: "sm", 
                        blur: 2 
                    }} 
                    />
                <TextInput
                    size="lg"
                    w="100%"
                    label="Name"
                    placeholder="name"
                    value={localName}
                    onChange={(event) => setLocalName(event.currentTarget.value)}
                    />
                <Textarea
                    size="lg"
                    w="100%"
                    label="Notes"
                    placeholder="notes"
                    value={localNotes}
                    onChange={(event) => setLocalNotes(event.currentTarget.value)}
                    />
                <ColorPicker
                    current={localColor}
                    setCurrent={setLocalColor}
                    />
                <Group 
                    w="100%"
                    justify="space-between"
                    align="center"
                    >
                    <Button 
                        variant="outline"
                        w="47.5%"
                        size="lg"
                        radius="xl"
                        onClick={handleReset}
                        leftSection={<IconReload size={20} />}
                        >
                        Reset
                    </Button>
                    <Button
                        w="47.5%"
                        size="lg"
                        radius="xl"
                        variant="light"
                        onClick={handleSubmit}
                        rightSection={<IconCloudUpload size={20} />}
                        >
                        Update
                    </Button>
                </Group>
            </Stack>
        </Modal>
    )
}