import { Button, Group, Modal, Stack } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconDownload, IconShare2 } from "@tabler/icons-react";
import QRCode from "react-qr-code";
import { toPng } from 'html-to-image';
import { useRef } from "react";

interface ViewCodeModalProps {
    opened: boolean;
    close: () => void;
    name: string;
    link: string;
}

export function ViewCodeModal({opened, close, name, link}: ViewCodeModalProps) {
    const qrRef = useRef(null);

    const handleShare = async () => {
        try {
            const shareLink: ShareData = {
                title: name,
                url: link,
            }
            if (navigator.share) {
                await navigator.share(shareLink)
            } else {
                notifications.show({
                    title: 'Sorry',
                    message: 'Sharing Unavailable'
                })
            }
        } catch (e) {
            console.log(e)
        }
    }

    const handleDownload = async () => {
        try {
            if (qrRef.current) {
                const dataUrl = await toPng(qrRef.current);
                const link = document.createElement('a');
                link.href = dataUrl;
                link.download = 'qr-code.png';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        } catch (e) {
            console.log(e)
            notifications.show({
                title: 'Error',
                message: 'Download Failure'
            })
        }
    }

    return(
        <Modal
            opened={opened}
            onClose={close}
            centered
            radius="xs"
            withCloseButton={false}
            transitionProps={{ transition: 'fade', duration: 200 }}
            >
            <Stack
                justify="center"
                align="center"
                w="100%"
                >
                <div ref={qrRef}
                    style={{ 
                        height: "auto", 
                        maxWidth: "100%", 
                        width: "100%" 
                    }}
                    >
                    <QRCode
                        value={link}
                        style={{ 
                            height: "auto", 
                            maxWidth: "100%", 
                            width: "100%" 
                        }}
                        />
                </div>
                <Group
                    w="100%"
                    justify="space-between"
                    align="center"
                    >
                    <Button
                        variant="light"
                        size="lg"
                        radius="xl"
                        w="45%"
                        leftSection={<IconShare2 />}
                        onClick={handleShare}
                        >
                        Share
                    </Button>
                    <Button
                        variant="light"
                        size="lg"
                        radius="xl"
                        w="45%"
                        rightSection={<IconDownload />}
                        onClick={handleDownload}
                        >
                        Save
                    </Button>
                </Group>
            </Stack>
        </Modal>
    )
}