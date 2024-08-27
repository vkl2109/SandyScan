import { Button, Card } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useOpenScanStore } from "../../zustand";


export function OpenScanCard () {
    const toggle = useOpenScanStore((state) => state.toggle)

    return(
        <Card
            p={0}
            shadow="sm"
            radius="lg"
            >
            <Button 
                variant="light"
                size="xl"
                radius="lg"
                leftSection={<IconPlus />}
                fullWidth
                onClick={toggle}
                >
                Add Code
            </Button>
        </Card>
    )
}