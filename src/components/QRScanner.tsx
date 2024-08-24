import { 
    Button,
    Stack,
    Title,
    rem
} from "@mantine/core";
import { useDisclosure, useViewportSize } from "@mantine/hooks";
import { IconCamera } from "@tabler/icons-react";
import { ScannerModal } from "./ScannerModal";

export function QRScanner () {

    const [opened, { open, close }] = useDisclosure(false);

    const { width } = useViewportSize()

    return(
        <>
            {
            // QRCodeVal 
            // ?
            // <QRCode
            //     size={256}
            //     style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            //     value={QRCodeVal.decodedText}
            //     viewBox={`0 0 256 256`}
            //     />
            // :
            <Button
                p="sm"
                bd="5px dashed grey"
                m="lg"
                style={{
                    borderRadius: rem(36),
                }}
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
            }
            <ScannerModal
            opened={opened}
            close={close}
            />
        </>
    )
}