import { AppShell } from '@mantine/core';
import { RootHeader } from './RootHeader'

export function RootLayout () {
    return(
        <AppShell>
            <AppShell.Header>
                <RootHeader />
            </AppShell.Header>
        </AppShell>
    )
}