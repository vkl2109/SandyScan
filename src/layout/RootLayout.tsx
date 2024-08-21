import { 
    AppShell,
    rem
} from '@mantine/core';
import { RootHeader } from './RootHeader'
import { Outlet } from "react-router-dom";

export function RootLayout () {
    return(
        <AppShell header={{ height: rem(100) }}>
            <AppShell.Header>
                <RootHeader />
            </AppShell.Header>
            <AppShell.Main pb={rem(100)}>
                <Outlet />
            </AppShell.Main>
        </AppShell>
    )
}