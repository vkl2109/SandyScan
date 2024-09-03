import { Button, Modal, Stack, TextInput } from "@mantine/core"
import { IconRefreshDot } from "@tabler/icons-react"
import { useState } from "react"
import { useQRStore } from "../../zustand"


interface GenerateModalProps {
    opened: boolean,
    close: () => void
}

export function GenerateModal ({
    opened,
    close,
} : GenerateModalProps) {
    const [ localLink, setLocalLink ] = useState('')

    const setLink = useQRStore((state) => state.setLink)

    const handleSubmit = () => {
        setLink(localLink)
    }

    return(
        <Modal
            opened={opened}
            onClose={close}
            centered
            withCloseButton={false}
            radius="lg"
            >
            <Stack>
                <TextInput 
                    w="100%"
                    value={localLink}
                    onChange={(e) => setLocalLink(e.currentTarget.value)}
                    size="xl"
                    placeholder="link"

                    />
                <Button
                    variant="light"
                    fullWidth
                    size="xl"
                    leftSection={<IconRefreshDot />}
                    onClick={handleSubmit}
                    disabled={localLink == ''}
                    >
                    Generate
                </Button>
            </Stack>
        </Modal>
    )
}