import { 
    Button, 
    Center, 
    Modal
} from "@mantine/core";

interface ScannerModalProps {
    opened: boolean;
    close: () => void;
}

const GoogleIcon = (
    <svg width="24" height="25" viewBox="0 0 24 25" fill="none"><path d="M20 12.68C20 12.1533 19.9523 11.6533 19.8706 11.1667H12.1738V14.1733H16.5807C16.3832 15.16 15.8042 15.9933 14.946 16.56V18.56H17.5752C19.1145 17.1667 20 15.1133 20 12.68Z" fill="#4285F4" shapeRendering="geometricPrecision"></path><path d="M12.1738 20.4999C14.3806 20.4999 16.2265 19.7799 17.5751 18.5599L14.946 16.5599C14.2104 17.0399 13.2772 17.3332 12.1738 17.3332C10.0419 17.3332 8.23687 15.9266 7.58979 14.0266H4.87891V16.0866C6.22073 18.6999 8.97929 20.4999 12.1738 20.4999Z" fill="#34A853" shapeRendering="geometricPrecision"></path><path d="M7.58986 14.0267C7.41957 13.5467 7.33103 13.0333 7.33103 12.5C7.33103 11.9667 7.42638 11.4533 7.58986 10.9733V8.91333H4.87897C4.30118 10.0243 4 11.2533 4 12.5C4 13.7467 4.30118 14.9757 4.87897 16.0867L7.58986 14.0267Z" fill="#FBBC05" shapeRendering="geometricPrecision"></path><path d="M12.1738 7.66667C13.3794 7.66667 14.4556 8.07333 15.307 8.86667L17.6364 6.58667C16.2265 5.29333 14.3806 4.5 12.1738 4.5C8.97929 4.5 6.22073 6.3 4.87891 8.91333L7.58979 10.9733C8.23687 9.07333 10.0419 7.66667 12.1738 7.66667Z" fill="#EA4335" shapeRendering="geometricPrecision"></path></svg>
)

export function AuthModal({ opened, close }: ScannerModalProps) {
    return(
        <Modal
            opened={opened}
            onClose={close}
            centered
            radius="lg"
            transitionProps={{ transition: 'fade', duration: 200 }}
            >
            <Center>
                <Button
                    fullWidth
                    variant="light"
                    size="xl"
                    leftSection={GoogleIcon}
                    >
                    Sign In
                </Button>
            </Center>
        </Modal>
    )
}