import { 
    Button,
    Stack,
    rem
} from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import {
    QRScannerCard,
    QRFormCard,
    SavedCodesCard
} from '../components'
import { useOpenScanStore, useQRStore } from "../zustand";
import { IconCamera } from "@tabler/icons-react";
// import { v4 as uuidv4 } from 'uuid';

export function LandingPage () {

    const { width } = useViewportSize()

    const link = useQRStore((state) => state.link)
    const [ openScan, toggle ] = useOpenScanStore((state) => [state.openScan, state.toggle])

    return(
        <Stack 
            justify="center"
            align="center"
            w="100%"
            h="100%"
            >
            <Stack
                p="md"
                w={rem(400)}
                maw={width}
                >
                {link == '' ?
                (openScan ?
                    <QRScannerCard />
                    :
                    <Button 
                        variant="light"
                        size="xl"
                        radius="lg"
                        leftSection={<IconCamera />}
                        fullWidth
                        onClick={toggle}
                        >
                        Scan
                    </Button>
                )
                :
                <QRFormCard />
                }
                <SavedCodesCard />
            </Stack>
        </Stack>
    )
}