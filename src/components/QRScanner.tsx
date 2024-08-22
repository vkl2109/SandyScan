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

export function QRScanner () {

    const [ showCamera, setShowCamera ] = useState(false)
    const [stream, setStream] = useState<MediaStream | null>(null);

    const { width } = useViewportSize()

    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const getVideo = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
            setStream(mediaStream);
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
            }
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
                </Box>
            }
        </>
    )
}