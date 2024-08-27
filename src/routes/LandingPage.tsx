import { 
    Card, 
    Stack,
    TextInput,
    rem
} from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import {
    QRScannerCard,
    QRFormCard
} from '../components'
import { useQRStore } from "../zustand";
import { IconSearch } from "@tabler/icons-react";
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
                <Card
                    shadow="sm" 
                    p="xl" 
                    radius="xl"
                    w="100%"
                    >
                    <TextInput 
                        size="xl"
                        radius="xl"
                        placeholder="search"
                        leftSection={<IconSearch />}
                        />
                </Card>
            </Stack>
        </Stack>
    )
}