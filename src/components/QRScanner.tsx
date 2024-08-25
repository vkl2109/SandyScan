import { 
    Button,
    Divider,
    Stack,
    Title,
    rem
} from "@mantine/core";
import { useDisclosure, useViewportSize } from "@mantine/hooks";
import { IconCamera, IconUpload } from "@tabler/icons-react";
import { ScannerModal } from "./ScannerModal";

export function QRScanner () {

    const [opened, { open, close }] = useDisclosure(false);

    const { width } = useViewportSize()

    return(
        <>
            <Button
                p="sm"
                // bd="3px dashed"
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
            <Button
                leftSection={<IconUpload />}
                fullWidth
                mb="md"
                size="xl"
                radius="xl"
                variant="outline"
                >
                Upload
            </Button>
            <ScannerModal
            opened={opened}
            close={close}
            />
        </>
    )
}