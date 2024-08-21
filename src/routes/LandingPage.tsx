import { 
    Button,
    Card, 
    Input, 
    LoadingOverlay, 
    Stack,
    Textarea,
    rem
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useViewportSize } from "@mantine/hooks";
import { IconQrcode } from "@tabler/icons-react";
import { useState } from "react";
import { notifications } from '@mantine/notifications';
// import { v4 as uuidv4 } from 'uuid';

export function LandingPage () {
    const [ addingQRCode, setAddingQRCode ] = useState(false)

    const { width } = useViewportSize()
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            name: '',
            notes: '',
        },
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
        <Stack 
            p="lg" 
            justify="flex-start"
            align="center"
            >
            <Card 
                shadow="sm" 
                p="xl" 
                w={rem(400)}
                maw={width - 100}
                radius="xl"
                >
                <IconQrcode size={rem(10)}/>
                <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                    <Stack 
                        justify="flex-start"
                        align="center"
                        >
                        <LoadingOverlay visible={addingQRCode} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
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
                            variant="outline"
                            type="submit"
                            fullWidth
                            >
                            Add QR Code
                        </Button>
                    </Stack>
                </form>
            </Card>
        </Stack>
    )
}