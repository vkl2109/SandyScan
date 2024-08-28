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
    useSearchColorStore, 
    useSearchStore
} from "../../zustand";
import { useEffect, useMemo, useState } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../../firebase";
import { CodeCard } from "./CodeCard";
import classes from './CodeCard.module.css'
import { ColorPicker } from "../utility";
import { Reorder } from "framer-motion";

export function SavedCodesCard () {
    const [ search, setSearch ] = useSearchStore((state) => [state.search, state.setSearch])
    const [ codes, setCodes ] = useState<Array<any>>([])
    const uid = useAuthStore((state) => state.uid)

    const loggedIn = useAuthStore((state) => state.isLogged)

    const [current, setCurrent ] = useSearchColorStore(state => [state.current, state.setCurrent])

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

    const searchedCodes = useMemo(() => {
        let filteredCodes = codes
        if (current != '') {
            filteredCodes = filteredCodes.filter(code => code.color == current)
        } else if (search != '') {
            filteredCodes = filteredCodes.filter(code => code.name.startsWith(search))
        }
        return filteredCodes
    },[current, codes, search])

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
                    <ColorPicker 
                        current={current}
                        setCurrent={setCurrent}
                        />
                    <Reorder.Group axis="y"
                        values={searchedCodes}
                        onReorder={setCodes}
                        style={{
                            width: '100%',
                            margin: 0,
                            padding: 0,
                        }}
                        >
                        <Accordion 
                            w="100%" 
                            radius="md"
                            classNames={classes}
                            >
                            {searchedCodes.map((code, i) => {
                                return(
                                    <Reorder.Item 
                                        key={code.id} 
                                        value={code}
                                        style={{
                                            listStyle: 'none'
                                        }}
                                        >
                                        <CodeCard 
                                            k={i}
                                            code={code}
                                            />
                                    </Reorder.Item>
                                )
                            })}
                        </Accordion>
                    </Reorder.Group>
                </>
                }
            </Stack>
        </Card>
    )
}