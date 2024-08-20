
import { useNavigate } from "react-router-dom";
import { 
    Title, 
    Text, 
    Button, 
    Center, 
    Group,
    Stack,
    rem
} from '@mantine/core';

export function ErrorPage () {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate("/");
    }

    return(
        <Center w="full" h={"100vh"}>
            <Stack h="100%" justify="center" align="center">
                <Title fz={rem(100)} c="blue">404</Title>
                <Title>You have found a secret place.</Title>
                <Text c="dimmed" size="lg" ta="center">
                    Unfortunately, this is only a 404 page. You may have mistyped the address, or the page has
                    been moved to another URL.
                </Text>
                <Group>
                    <Button variant="subtle" size="md" onClick={handleRedirect}>
                    Take me back to home page
                    </Button>
                </Group>
            </Stack>
        </Center>
    )
}
