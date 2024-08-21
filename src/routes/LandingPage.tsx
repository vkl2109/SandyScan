import { 
    ActionIcon,
    Box,
    Button,
    Card, 
    Center, 
    Input, 
    LoadingOverlay, 
    Stack,
    Textarea,
    Title,
    rem
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useViewportSize } from "@mantine/hooks";
import { useState } from "react";
import { notifications } from '@mantine/notifications';
import { IconCamera, IconX } from "@tabler/icons-react";
import {
    useRef,
    useEffect
} from 'react'
// import { v4 as uuidv4 } from 'uuid';

export function LandingPage () {
    const [ addingQRCode, setAddingQRCode ] = useState(false)
    const [ showCamera, setShowCamera ] = useState(false)
    const [stream, setStream] = useState<MediaStream | null>(null);

    const { width } = useViewportSize()
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            name: '',
            notes: '',
        },
    });

    const handleSubmit = async (values: { name: string; notes: string; }) => {
        if (addingQRCode) return
        try {
            setAddingQRCode(true)
            console.log(values)
            // const newContactID = uuidv4()
            // await setDoc(doc(db, 'contact', newContactID), {
            //     name: values.name,
            //     notes: values.notes,
            // })
            notifications.show({
                title: 'Message Submitted',
                message: 'Thanks for reaching out!',
            })
            form.reset()
        }
        catch (e) {
            console.log(e)
            notifications.show({
                title: 'Message Error',
                message: 'Please try again',
            })
        }
        finally {
            setAddingQRCode(false)
        }
    }

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
        <Stack 
            p="lg" 
            justify="flex-start"
            align="center"
            >
            <Card 
                shadow="sm" 
                p="xl" 
                w={rem(400)}
                maw={width - 100}
                radius="xl"
                >
                <Stack w="100%" justify="center" align="center">
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
                </Stack>
                <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                    <Stack 
                        justify="flex-start"
                        align="center"
                        >
                        <LoadingOverlay visible={addingQRCode} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
                        <Input
                            size="lg"
                            w="100%"
                            placeholder="name"
                            {...form.getInputProps('name')}
                            />
                        <Textarea
                            size="lg"
                            w="100%"
                            placeholder="notes"
                            {...form.getInputProps('notes')}
                            />
                        <Button 
                            size="lg" 
                            radius="md"
                            variant="outline"
                            type="submit"
                            fullWidth
                            >
                            Add QR Code
                        </Button>
                    </Stack>
                </form>
            </Card>
        </Stack>
    )
}