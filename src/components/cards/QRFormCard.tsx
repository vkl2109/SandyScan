import { 
    Button,
    Card,
    CopyButton,
    Group,
    LoadingOverlay, 
    Stack,
    TextInput,
    Textarea,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form"
import { useState } from "react";
import { notifications } from '@mantine/notifications';
import { useAuthStore, useQRStore } from "../../zustand";
import QRCode from "react-qr-code";
import { IconCheck, IconCopy, IconTrash } from "@tabler/icons-react";
import { v4 as uuidv4 } from 'uuid';
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { ColorPicker } from "../utility";

export function QRFormCard () {
    const [ addingQRCode, setAddingQRCode ] = useState(false)

    const [link, setLink] = useQRStore((state) => [state.link, state.setLink])
    const uid = useAuthStore((state) => state.uid)
    const [ localColor, setLocalColor ] = useState('blue')

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            name: '',
            notes: '',
        },
        validate: {
            name: isNotEmpty('Please Input Name')
        }
    });

    const handleSubmit = async (values: { name: string; notes: string; }) => {
        if (addingQRCode) return
        try {
            setAddingQRCode(true)
            console.log(values)
            const newCodeID = uuidv4()
            await setDoc(doc(db, 'users', uid, 'codes', newCodeID), {
                name: values.name,
                notes: values.notes,
                link: link,
                color: localColor == '' ? 'blue': localColor,
            })
            notifications.show({
                title: 'Success',
                message: 'Code Saved',
            })
            form.reset()
            setLink('')
        }
        catch (e) {
            console.log(e)
            notifications.show({
                title: 'Message Error',
                message: 'Please try again',
            })
        }
        finally {
            setAddingQRCode(false)
        }
    }

    return(
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <Card 
                shadow="sm" 
                p="xl" 
                radius="xl"
                w="100%"
                >
                <Stack 
                    justify="flex-start"
                    align="center"
                    >
                    <LoadingOverlay 
                        visible={addingQRCode} 
                        zIndex={1000} 
                        overlayProps={{ 
                            radius: "sm", 
                            blur: 2 
                        }} 
                        />
                    <QRCode
                        value={link}
                        style={{ 
                            height: "auto", 
                            maxWidth: "100%", 
                            width: "100%" 
                        }}
                        />
                    <Group justify="space-between" w="100%">
                        <CopyButton value={link}>
                        {({ copied, copy }) => (
                            <Button 
                                onClick={copy}
                                leftSection={
                                    copied ?
                                    <IconCheck />
                                    :
                                    <IconCopy />
                                }
                                variant="light"
                                size="lg"
                                radius="xl"
                                w="45%"
                                color={copied ? 'teal' : 'blue'}
                                >
                                {copied ? 'Copied' : 'Copy'}
                            </Button>
                        )}
                        </CopyButton>
                        <Button 
                            variant="outline"
                            onClick={() => setLink('')}
                            size="lg"
                            radius="xl"
                            w="45%"
                            rightSection={<IconTrash />}
                            >
                            Clear
                        </Button>
                    </Group>
                    <TextInput
                        size="lg"
                        w="100%"
                        placeholder="name"
                        {...form.getInputProps('name')}
                        />
                    <Textarea
                        size="lg"
                        w="100%"
                        placeholder="notes"
                        {...form.getInputProps('notes')}
                        />
                    <ColorPicker
                        current={localColor}
                        setCurrent={setLocalColor}
                        />
                    <Button 
                        size="lg" 
                        radius="md"
                        variant="light"
                        type="submit"
                        fullWidth
                        disabled={form.getValues().name == ''}
                        >
                        Save Code
                    </Button>
                </Stack>
            </Card>
        </form>
    )
}