import { 
    ActionIcon,
    Button,
    Card,
    Divider,
    FileButton,
    Stack,
    Title,
    Transition,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { 
    IconCamera, 
    IconRefreshDot, 
    IconUpload 
} from "@tabler/icons-react";
import { ScannerModal } from "../modals/ScannerModal";
import { Html5Qrcode, Html5QrcodeResult } from "html5-qrcode";
import { notifications } from '@mantine/notifications';
import { useOpenScanStore, useQRStore } from "../../zustand";
import { useEffect, useState } from "react";
import { GenerateModal } from "../modals/GenerateModal";

export function QRScannerCard () {

    const [opened, { open, close }] = useDisclosure(false);
    const [ openedGenerate, {open: openGenerate, close: closeGenerate }] = useDisclosure(false)
    const setLink = useQRStore((state) => state.setLink)
    const toggle = useOpenScanStore((state) => state.toggle)

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

    const [ openedTransition, setOpenedTransition ] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setOpenedTransition(true)
        }, 0)
        return () => clearTimeout(timer);
    },[])

    return(
        <Transition
            mounted={openedTransition}
            transition="slide-down"
            duration={400}
            timingFunction="ease"
            exitDelay={300}
            >
            
            {(styles) => 
        <Card 
            shadow="sm" 
            px="xl" 
            pt="xl"
            radius="xl"
            w="100%"
            style={styles}
            >
            <Stack w="100%" justify="center" align="center">
                <Button
                    mx="lg"
                    radius="xl"
                    variant="outline"
                    pb="100%"
                    pos="relative"
                    w={"100%"}
                    onClick={open}
                    >
                    <Stack
                        pos="absolute"
                        top={0}
                        bottom={0}
                        left={0}
                        right={0}
                        justify="center"
                        align="center"
                        >
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
                        radius="lg"
                        variant="outline"
                        {...props}
                        >
                        Upload
                    </Button>}
                </FileButton>
                <Button
                    fullWidth
                    radius="lg"
                    variant="light"
                    size="xl"
                    leftSection={<IconRefreshDot />}
                    onClick={openGenerate}
                    >
                    Generate
                </Button>
                <ActionIcon 
                    variant="transparent"
                    onClick={toggle}
                    w="25%"
                    >
                    <Divider 
                        w="100%"
                        c="blue"
                        size="xl"
                        />
                </ActionIcon>
                <div 
                    id="qr-reader" 
                    style={{ display: 'none' }} 
                    />
                <ScannerModal
                    opened={opened}
                    close={close}
                    />
                <GenerateModal
                    opened={openedGenerate}
                    close={closeGenerate}
                    />
            </Stack>
        </Card>
        }
    </Transition>
    )
}