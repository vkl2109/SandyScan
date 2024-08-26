import { 
    ActionIcon,
    Box,
    Group,
    Modal, 
    Slider, 
    Stack,
    rem, 
} from "@mantine/core";
import { 
    useEffect, 
    useRef, 
    useState 
} from "react";
import { Html5Qrcode, Html5QrcodeResult } from "html5-qrcode";
import { IconMinus, IconPlus, IconX } from "@tabler/icons-react";
import { Scan } from './Scan'
import { useQRStore } from "../zustand";

interface ScannerModalProps {
    opened: boolean;
    close: () => void;
}

export function ScannerModal({ opened, close }: ScannerModalProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [ zoom, setZoom ] = useState(1);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [qrScanner, setQrScanner] = useState<Html5Qrcode | null>(null);

    const setLink = useQRStore((state) => state.setLink)

    useEffect(() => {
        const getVideo = async () => {
            try {
                const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
                setStream(mediaStream);

                if (videoRef.current) {
                    videoRef.current.srcObject = mediaStream;
                }

                const scanner = new Html5Qrcode("qr-reader");
                setQrScanner(scanner);
            } catch (err) {
                console.error("Error accessing the camera: ", err);
            }
        };

        if (opened) {
            getVideo();
        }
        else {
            if (stream) {
                stream.getTracks().forEach((track: { stop: () => any; }) => track.stop());
                setStream(null);
            }
        }
    }, [opened]);

    useEffect(() => {
        const interval = setInterval(() => {
          captureAndScan();
        }, 100);
    
        return () => clearInterval(interval);
    }, [qrScanner]);

    const captureAndScan = async () => {
        if (!qrScanner) return;
    
        const canvas = canvasRef.current;
        const video = videoRef.current;
    
        if (canvas && video) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const context = canvas.getContext('2d');
            if (context) {
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
                canvas.toBlob(async (blob) => {
                    if (blob) {
                        try {
                            const file : File = new File([blob], "temp", {
                                type: blob.type,
                                lastModified: Date.now()
                            });
                            const result: Html5QrcodeResult = await qrScanner.scanFileV2(file, false);
                            console.log(result);
                            setLink(result.decodedText)
                            if (stream) {
                                stream.getTracks().forEach((track: { stop: () => any; }) => track.stop());
                                setStream(null);
                            }
                            close();
                        } catch (err) {
                        }
                    }
                }, 'image/jpeg');
            }
        }
    };

    return(
        <Modal.Root
            opened={opened}
            onClose={close}
            fullScreen
            padding={0}
            centered
            transitionProps={{ transition: 'fade', duration: 200 }}
            >
            <Modal.Content>
                <Stack 
                    justify="center" 
                    align="center" 
                    h="100%"
                    pos="relative"
                    style={{
                        overflow: 'hidden'
                    }}
                    >
                    <Group
                        pos="absolute"
                        bottom={rem(50)}
                        w="100%"
                        justify="center"
                        align="center"
                        style={{
                            zIndex: 1000
                        }}
                        >
                        <IconMinus color="white"/>
                        <Slider 
                            label={null}
                            value={zoom} 
                            onChange={setZoom}
                            min={1}
                            max={5}
                            step={0.01}
                            size="xl"
                            w="50%"
                            style={{
                                zIndex: 1000
                            }}
                            />
                        <IconPlus color="white"/>
                    </Group>
                    <Box
                        pos="absolute"
                        h="100%"
                        w="100%"
                        style={{
                            zIndex: 10
                        }}
                        >
                        <Scan />
                    </Box>
                    <ActionIcon
                        pos="absolute"
                        right={rem(25)}
                        top={rem(25)}
                        onClick={close}
                        variant="light"
                        radius="xl"
                        c="white"
                        style={{
                            zIndex: 1000
                        }}
                        size="xl"
                        >
                        <IconX 
                            size={25}
                            />
                    </ActionIcon>
                    <video 
                        ref={videoRef} 
                        autoPlay 
                        style={{
                            height:'100%',
                            transform: `scale(${zoom})`
                        }} 
                        />
                    <canvas 
                        ref={canvasRef} 
                        style={{ display: 'none' }} 
                        />
                    <div 
                        id="qr-reader" 
                        style={{ display: 'none' }} 
                        />
                </Stack>
            </Modal.Content>
        </Modal.Root>
    )
}