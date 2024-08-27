import { 
    Button,
    Card,
    CopyButton,
    Group,
    Input, 
    LoadingOverlay, 
    Stack,
    Textarea,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form"
import { useState } from "react";
import { notifications } from '@mantine/notifications';
import { useQRStore } from "../../zustand";
import QRCode from "react-qr-code";
import { IconCheck, IconCopy } from "@tabler/icons-react";

export function QRFormCard () {
    const [ addingQRCode, setAddingQRCode ] = useState(false)

    const link = useQRStore((state) => state.link)
    const setLink = useQRStore((state) => state.setLink)

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
            // const newContactID = uuidv4()
            // await setDoc(doc(db, 'contact', newContactID), {
            //     name: values.name,
            //     notes: values.notes,
            // })
            notifications.show({
                title: 'Message Submitted',
                message: 'Thanks for reaching out!',
            })
            form.reset()
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
                                size="md"
                                color={copied ? 'teal' : 'blue'}
                                >
                                {copied ? 'Copied' : 'Copy'}
                            </Button>
                        )}
                        </CopyButton>
                        <Button 
                            variant="subtle"
                            onClick={() => setLink('')}
                            size="md"
                            >
                            Clear
                        </Button>
                    </Group>
                    <Input
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