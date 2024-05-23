import React, { useEffect, useState } from "react";
import Countdown from 'react-countdown';
import { Box, Markdown, Paragraph, Stack} from "grommet";
import { Launch, Deploy } from 'grommet-icons';

export default function EventCountdown(props){

    const [dark, setDark] = useState(props.dark);

    useEffect(()=>{setDark(props.dark)},[props.dark])

    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            return <>
            <Box animation={"pulse"} align="center">                    
                <Deploy color={dark ? "teal" : "brand"}/>
                <Paragraph color={dark ? "teal" : "brand"}>Let's Party</Paragraph>
            </Box>
            </>
        }
        else {
                return <>
                    <Box align="center" style={{justifyContent: "center"}} animation={"fadeIn"}>
                        <Launch color={dark ? "teal" : "brand"}/>

                        {dark ? <Markdown>![Typing SVG](https://readme-typing-svg.demolab.com?font=Kode+Mono&pause=3000&color=00B1E1&center=true&vCenter=true&random=false&height=60&width=435&lines=event+countdown+.+.+.)</Markdown> : <Markdown>![Typing SVG](https://readme-typing-svg.demolab.com?font=Kode+Mono&pause=3000&color=4F2D7F&random=false&width=435&center=true&vCenter=true&height=60&lines=event+countdown+.+.+.)</Markdown>}

                        <Paragraph>{days} \ Days</Paragraph>
                        <Paragraph>{hours} \ Hours</Paragraph>
                        <Paragraph>{minutes} \ Minutes</Paragraph>
                        <Paragraph>{seconds} \ Seconds</Paragraph>
                    </Box>
                </>
        }
    }

    return <>
        <Stack anchor="top" margin={{top: "large"}}>
        <Countdown date={props.when} renderer={renderer}></Countdown>
        </Stack>
    </>
}