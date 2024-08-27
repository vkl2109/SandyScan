import { Button, Modal, Stack, Text } from "@mantine/core";
import { useOpenAuthStore } from "../../zustand";
import { GoogleIcon } from "../utility";
import { notifications } from "@mantine/notifications";


export function AuthModal () {
    const [ openAuth, close ] = useOpenAuthStore((state) => [state.openAuth, state.close])

    const handleGoogleAuth = async () => {
        try {
            
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
            opened={openAuth}
            onClose={close}
            centered
            withCloseButton={false}
            radius="lg"
            >
            <Stack
                justify="center"
                align="center"
                w="100%"
                >
                <Button
                    fullWidth
                    variant="light"
                    size="xl"
                    radius="md"
                    leftSection={<GoogleIcon size={40} />}
                    onClick={handleGoogleAuth}
                    >
                    Sign In
                </Button>
                <Text
                    fw="bold"
                    >
                    Sign in to save your codes!
                </Text>
            </Stack>
        </Modal>
    )
}