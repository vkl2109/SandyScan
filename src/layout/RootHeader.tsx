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
import { useEffect, useMemo } from 'react';
import { useAuthStore, useOpenAuthStore } from '../zustand';
import { AuthModal } from '../components';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { notifications } from '@mantine/notifications';

export function RootHeader () {
    const { width } = useViewportSize();

    const cardWidth = useMemo(() => {
        return width < 400 ? (width - 10) : 400
    },[width])

    const [name, img, isLoggedIn, setAuth] = useAuthStore((state) => [state.name, state.img, state.isLogged, state.setAuth])
    const openAuth = useOpenAuthStore((state) => state.open)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log(user)
                setAuth({
                    name: user?.displayName || '',
                    img: user?.photoURL || '',
                    uid: user?.uid || '',
                    isLogged: true
                })
            } else {
                setAuth({
                    name: '',
                    img: '',
                    uid: '',
                    isLogged: false
                })
            }
        })

        return () => unsubscribe()
    },[])

    const handleSignOut = async () => {
        try {
            await signOut(auth)
        } catch (e) {
            console.log(e)
            notifications.show({
                title: 'Error',
                message: 'Please Try Again'
            })
        }
    }

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
                <Title 
                    visibleFrom="sm"
                    c="blue"
                    >
                    Sandy Scan
                </Title>
            </Group>
            {isLoggedIn ?
            <HoverCard width={cardWidth} shadow="md" openDelay={200} closeDelay={400}>
                <HoverCard.Target>
                    <Avatar 
                        radius="xl" 
                        size="lg" 
                        src={img}
                        />
                </HoverCard.Target>
                <HoverCard.Dropdown>
                    <Stack justify="center" align="center">
                        <Avatar 
                            size="xl" 
                            radius={rem(100)} 
                            src={img}
                            />
                        <Text
                            fw="lighter"
                            size="xl"
                            >
                            {name}
                        </Text>
                        <Divider w="100%"/>
                        <Button 
                            fullWidth 
                            size="xl" 
                            variant="subtle"
                            onClick={handleSignOut}
                            >
                            Sign Out
                        </Button>
                    </Stack>
                </HoverCard.Dropdown>
            </HoverCard>
            :
            <Button
                size="xl"
                variant="light"
                radius="md"
                onClick={openAuth}
                >
                Sign In
            </Button>
            }
            <AuthModal />
        </Group>
    )
}