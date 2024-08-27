import { 
    AppShell
} from '@mantine/core';
import { RootHeader } from './RootHeader'
import { Outlet } from "react-router-dom";
import { useHeadroom } from '@mantine/hooks';

export function RootLayout () {
    const pinned = useHeadroom({ fixedAt: 100 });

    return(
        <AppShell 
            header={{ 
                height: 100,
                collapsed: !pinned, 
                offset: false,
            }}
            >
            <AppShell.Header>
                <RootHeader />
            </AppShell.Header>
            <AppShell.Main pt={100}>
                <Outlet />
            </AppShell.Main>
        </AppShell>
    )
}