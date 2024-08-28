import { Button, Divider, Group, Modal, Stack, Text, Title } from "@mantine/core"
import { notifications } from "@mantine/notifications"
import { deleteDoc, doc } from "firebase/firestore"
import { db } from "../../../firebase"
import { useAuthStore } from "../../zustand"


interface DeleteModalProps {
    opened: boolean,
    close: () => void,
    uid: string,
    name: string,
}

export function DeleteModal ({
    opened,
    close,
    uid, 
    name
} : DeleteModalProps) {

    const userUID = useAuthStore((state) => state.uid)

    const handleDelete = async () => {
        try {
            await deleteDoc(doc(db, 'users', userUID, 'codes', uid))
            notifications.show({
                title: 'Success',
                message: 'Code Deleted'
            })
        } catch (e) {
            console.log(e)
            notifications.show({
                title: 'Error',
                message: 'Please Try Again'
            })
        }
    }

    return(
        <Modal
        opened={opened}
        onClose={close}
        withCloseButton={false}
        radius="lg"
        centered
        >
            <Stack
                justify="center"
                align="center"
                >
                <Title>Delete this code?</Title>
                <Divider w="100%" />
                <Text
                    size="xl"
                    >
                    {name}
                </Text>
                <Group
                    w="100%"
                    justify="space-between"
                    align="center"
                    >
                    <Button
                        size="lg"
                        w="45%"
                        radius="xl"
                        onClick={close}
                        variant="outline"
                        >
                        Back
                    </Button>
                    <Button
                        c="red"
                        variant="light"
                        size="lg"
                        w="45%"
                        radius="xl"
                        onClick={handleDelete}
                        >
                        Delete
                    </Button>
                </Group>
            </Stack>
        </Modal>
    )
}