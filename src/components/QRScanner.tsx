import { 
    Button,
    Divider,
    FileButton,
    Stack,
    Title,
    rem
} from "@mantine/core";
import { useDisclosure, useViewportSize } from "@mantine/hooks";
import { IconCamera, IconUpload } from "@tabler/icons-react";
import { ScannerModal } from "./ScannerModal";
import { Html5Qrcode, Html5QrcodeResult } from "html5-qrcode";
import { notifications } from '@mantine/notifications';
import { useQRStore } from "../zustand";

export function QRScanner () {

    const [opened, { open, close }] = useDisclosure(false);
    const setLink = useQRStore((state) => state.setLink)

    const checkFile = async (newFile: File | null) => {
        if (newFile) {
            try {
                const scanner = new Html5Qrcode("qr-reader");
                const result: Html5QrcodeResult = await scanner.scanFileV2(newFile, false);
                console.log(result);
                setLink(result.decodedText)
            } catch (e) {
                console.log(e)
                notifications.show({
                    title: 'Error',
                    message: 'Code Not Found'
                })
            }
        }
    }

    const { width } = useViewportSize()

    return(
        <Stack w="100%" justify="center" align="center">
            <Button
                p="sm"
                mx="lg"
                radius="xl"
                variant="outline"
                h={rem(300)}
                mah={width - 164}
                w={"100%"}
                onClick={open}
                >
                <Stack>
                    <IconCamera size={75}/>
                    <Title>Scan</Title>
                </Stack>
            </Button>
            <Divider label="or" w="100%" />
            <FileButton
                onChange={checkFile} 
                accept="image/png,image/jpeg"
                >
                {(props) => 
                <Button
                    leftSection={<IconUpload />}
                    fullWidth
                    size="xl"
                    radius="xl"
                    variant="outline"
                    {...props}
                    >
                    Upload
                </Button>}
            </FileButton>
            <div 
                id="qr-reader" 
                style={{ display: 'none' }} 
                />
            <ScannerModal
                opened={opened}
                close={close}
                />
        </Stack>
    )
}