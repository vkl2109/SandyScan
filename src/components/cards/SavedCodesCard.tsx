import { 
    Accordion,
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
import { useEffect, useState } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../../firebase";
import { CodeCard } from "./CodeCard";

export function SavedCodesCard () {
    const [ search, setSearch ] = useSearchStore((state) => [state.search, state.setSearch])
    const [ codes, setCodes ] = useState<Array<any>>([])
    const uid = useAuthStore((state) => state.uid)

    const loggedIn = useAuthStore((state) => state.isLogged)

    useEffect(() => {
        const q = query(collection(db, 'users', uid, 'codes'))
        const unsubscribe = onSnapshot(
            q,
            (qSnap) => {
                const newCodes: Array<any> = []
                qSnap.forEach((newCode) => {
                    newCodes.push({
                        ...newCode.data(),
                        id: newCode.id
                    })
                })
                setCodes(newCodes)
            }
        )

        return () => unsubscribe()
    },[])

    return(
        <Card
            shadow="sm" 
            p="xl"
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
                <Accordion w="100%">
                    {codes.map((code) => {
                        return(
                            <CodeCard code={code}/>
                        )
                    })}
                </Accordion>
            </Stack>
        </Card>
    )
}