import { 
    Stack,
    rem
} from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import {
    QRScannerCard,
    QRFormCard,
    SearchCard
} from '../components'
import { useQRStore } from "../zustand";
// import { v4 as uuidv4 } from 'uuid';

export function LandingPage () {

    const { width } = useViewportSize()

    const link = useQRStore((state) => state.link)

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
                <QRScannerCard />
                :
                <QRFormCard />
                }
                <SearchCard />
            </Stack>
        </Stack>
    )
}