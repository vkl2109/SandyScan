import { 
    Card, 
    Stack,
    rem
} from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import {
    QRScanner,
    QRForm
} from '../components'
import { useQRStore } from "../zustand";
// import { v4 as uuidv4 } from 'uuid';

export function LandingPage () {

    const { width } = useViewportSize()

    const link = useQRStore((state) => state.link)

    return(
        <Stack 
            p="lg" 
            justify="flex-start"
            align="center"
            >
            <Card 
                shadow="sm" 
                p="xl" 
                w={rem(400)}
                maw={width - 100}
                radius="xl"
                >
                {link == '' ?
                <QRScanner />
                :
                <QRForm />
                }
            </Card>
        </Stack>
    )
}