import { 
    Button, 
    CheckIcon, 
    ColorSwatch, 
    Group, 
    Transition 
} from "@mantine/core";
import { ColorMap } from "./Constants";
import { useEffect, useState } from "react";

interface IndivColorProps {
    color: string,
    hexColor: string,
    k: number,
    current: string,
    setCurrent: (newColor: string) => void
}

function IndivColor ({
    color,
    k,
    hexColor,
    current,
    setCurrent
}: IndivColorProps) {

    const [ opened, setOpened ] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setOpened(true)
        }, k * 10)
        return () => clearTimeout(timer);
    },[k])

    const handleClick = () => {
        if (current == color) {
            setCurrent('')
        } else {
            setCurrent(color)
        }
    }

    return(
        <Transition
            mounted={opened}
            transition="slide-left"
            duration={400}
            timingFunction="ease"
            >
            {(styles) => 
                <Button 
                    style={styles}
                    m={0}
                    p={0}
                    variant="transparent"
                    onClick={handleClick}
                    >
                    <ColorSwatch color={hexColor}>
                        {current == color && 
                        <CheckIcon 
                            size={15}
                            color="black"
                            />
                        }
                    </ColorSwatch>
                </Button>
            }
            </Transition>
        
    )
}

interface ColorPickerProps {
    current: string,
    setCurrent: (newCurrent: string) => void
}

export function ColorPicker ({
    current,
    setCurrent
} : ColorPickerProps) {

    return(
        <Group
            justify="space-evenly"
            align="center"
            gap="sm"
            >
            {Object.entries(ColorMap).map((color, i) => {
                return (
                    <IndivColor 
                        key={i} 
                        k={i}
                        color={color[0]} 
                        hexColor={color[1]}
                        current={current}
                        setCurrent={setCurrent}
                        />
                )
            })}
        </Group>
    )
}