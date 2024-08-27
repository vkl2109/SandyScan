import { Button, Modal, Stack, Text } from "@mantine/core";
import { useOpenAuthStore } from "../../zustand";
import { GoogleIcon } from "../utility";
import { notifications } from "@mantine/notifications";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from '../../../firebase'

export function AuthModal () {
    const [ openAuth, close ] = useOpenAuthStore((state) => [state.openAuth, state.close])
    const provider = new GoogleAuthProvider();

    const handleGoogleAuth = async () => {
        try {
            await signInWithPopup(auth, provider)
            close()
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
                    Save your codes!
                </Text>
            </Stack>
        </Modal>
    )
}