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
import classes from './CodeCard.module.css'
import { ColorPicker } from "../utility";

export function SavedCodesCard () {
    const [ search, setSearch ] = useSearchStore((state) => [state.search, state.setSearch])
    const [ codes, setCodes ] = useState<Array<any>>([])
    const uid = useAuthStore((state) => state.uid)

    const loggedIn = useAuthStore((state) => state.isLogged)

    useEffect(() => {
        if (uid == '') return
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
    },[uid])

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
                {!loggedIn ? 
                <Text
                    fs="italic"
                    fw="lighter"
                    >
                    Sign In for your codes...
                </Text>
                :
                <>
                    <ColorPicker />
                    <Accordion 
                        w="100%" 
                        radius="md"
                        classNames={classes}
                        >
                        {codes.map((code, i) => {
                            return(
                                <CodeCard 
                                    key={code.id} 
                                    k={i}
                                    code={code}
                                    />
                            )
                        })}
                    </Accordion>
                </>
                }
            </Stack>
        </Card>
    )
}