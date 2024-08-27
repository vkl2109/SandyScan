import { 
    Stack,
    rem
} from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import {
    QRScannerCard,
    QRFormCard,
    SavedCodesCard,
    OpenScanCard
} from '../components'
import { useOpenScanStore, useQRStore } from "../zustand";

export function LandingPage () {

    const { width } = useViewportSize()

    const link = useQRStore((state) => state.link)
    const openScan = useOpenScanStore((state) => state.openScan)

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
                    <OpenScanCard />
                )
                :
                <QRFormCard />
                }
                <SavedCodesCard />
            </Stack>
        </Stack>
    )
}