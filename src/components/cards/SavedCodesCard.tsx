import { 
    Card, 
    Stack, 
    Text,
    TextInput,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { 
    useAuthStore, 
    useSearchStore
} from "../../zustand";

export function SavedCodesCard () {
    const [ search, setSearch ] = useSearchStore((state) => [state.search, state.setSearch])

    const loggedIn = useAuthStore((state) => state.isLogged)

    return(
        <Card
            shadow="sm" 
            px="xl" 
            pt="xl"
            radius="xl"
            w="100%"
            >
            <Stack
                justify="flex-start"
                align="center"
                w="100%"
                >
                <TextInput 
                    size="xl"
                    radius="xl"
                    placeholder="search"
                    leftSection={<IconSearch />}
                    value={search}
                    onChange={(event) => setSearch(event.currentTarget.value)}
                    />
                {!loggedIn && 
                <Text
                    fs="italic"
                    fw="lighter"
                    >
                    Sign In for your codes...
                </Text>
                }
            </Stack>
        </Card>
    )
}