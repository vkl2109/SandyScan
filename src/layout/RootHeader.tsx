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

export function RootHeader () {
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
                <Title>Sandy Scan</Title>
            </Group>
            <HoverCard width={320} shadow="md" openDelay={200} closeDelay={400}>
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