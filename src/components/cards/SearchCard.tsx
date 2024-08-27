import { Card, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useSearchStore } from "../../zustand";

export function SearchCard () {
    const [ search, setSearch ] = useSearchStore((state) => {
        return [state.search, state.setSearch]
    })

    return(
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
                value={search}
                onChange={(event) => setSearch(event.currentTarget.value)}
                />
        </Card>
    )
}