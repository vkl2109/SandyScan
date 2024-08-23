import { 
    ActionIcon,
    Box,
    Button,
    Stack,
    Title,
    rem
} from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { useState } from "react";
import { IconCamera, IconX } from "@tabler/icons-react";
import {
    useRef,
    useEffect
} from 'react'
import { Html5Qrcode, Html5QrcodeResult } from "html5-qrcode";

export function QRScanner () {

    const [ showCamera, setShowCamera ] = useState(false)
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [qrScanner, setQrScanner] = useState<Html5Qrcode | null>(null);

    const { width } = useViewportSize()

    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

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

        if (showCamera) {
            getVideo();
        }
        else {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
                setStream(null);
            }
        }
    }, [showCamera]);

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
                        } catch (err) {
                        }
                    }
                }, 'image/jpeg');
            }
        }
    };

    const toggleCamera = () => {
        setShowCamera(showCamera => !showCamera)
    }

    return(
        <>
            {!showCamera ?
                <Button
                    p="sm"
                    bd="5px dashed grey"
                    m="lg"
                    style={{
                        borderRadius: rem(36),
                    }}
                    variant="outline"
                    h={rem(300)}
                    mah={width - 164}
                    w={"100%"}
                    onClick={toggleCamera}
                    >
                    <Stack>
                        <IconCamera size={75}/>
                        <Title>Scan</Title>
                    </Stack>
                </Button>
            :
                <Box style={{
                        borderRadius: rem(36),
                        overflow: 'hidden',
                        position: 'relative',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    h={rem(300)}
                    mah={width - 164}
                    w="100%"
                    m="lg"
                    bd="5px dashed grey"
                    >
                    <ActionIcon 
                        onClick={toggleCamera}
                        style={{
                            position: 'absolute',
                            right: '35px',
                            top: '20px',
                            zIndex: 10,
                        }}
                        c="black"
                        variant="transparent"
                        >
                        <IconX />
                    </ActionIcon>
                    <video 
                        ref={videoRef} 
                        autoPlay 
                        style={{
                            borderRadius: rem(20),
                            height: rem(300),
                            width: 'auto',
                        }} 
                        />
                    <canvas 
                        ref={canvasRef} 
                        style={{ display: 'none' }} 
                        />
                    <div id="qr-reader" style={{ display: 'none' }} />
                    {/* <QRCodePlugin /> */}
                </Box>
            }
        </>
    )
}