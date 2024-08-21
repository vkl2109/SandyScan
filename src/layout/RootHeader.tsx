import {
    Group,
    Image,
    Title,
    Avatar,
    HoverCard,
    rem,
    Stack,
    Divider,
    Button,
    Text
} from '@mantine/core'
import logo from '/vite.svg'
import { useViewportSize } from '@mantine/hooks';
import { useMemo } from 'react';

export function RootHeader () {
    const { width } = useViewportSize();

    const cardWidth = useMemo(() => {
        return width < 400 ? (width - 10) : 400
    },[width])

    return(
        <Group
            justify="space-between"
            align="center"
            p="lg"
            >
            <Group>
                <Image
                src={logo}
                h={rem(50)}
                w={rem(50)}
                />
                <Title visibleFrom="sm">Sandy Scan</Title>
            </Group>
            <HoverCard width={cardWidth} shadow="md" openDelay={200} closeDelay={400}>
                <HoverCard.Target>
                    <Avatar radius="xl" size="lg" />
                </HoverCard.Target>
                <HoverCard.Dropdown>
                    <Stack justify="center" align="center">
                        <Avatar size="xl" radius={rem(100)} />
                        <Text>Insert Name</Text>
                        <Divider w="100%"/>
                        <Button fullWidth size="xl" variant="subtle">
                            Sign Out
                        </Button>
                    </Stack>
                </HoverCard.Dropdown>
            </HoverCard>
        </Group>
    )
}