import React from "react";
import Countdown from 'react-countdown';
import { Box, Markdown, Paragraph, Stack} from "grommet";
import { Launch, Deploy } from 'grommet-icons';

export default function GraduationCountdown(props){

    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            return <>
            <Box animation={"pulse"} align="center">                    
                <Deploy color="teal"/>
                <Paragraph color="teal">Let's Party</Paragraph>
            </Box>
            </>
        }
        else {
                return <>
                    <Box align="center" style={{justifyContent: "center"}} animation={"fadeIn"}>
                        <Launch color="teal"/>
                        <Markdown>![Typing SVG](https://readme-typing-svg.demolab.com?font=Kode+Mono&pause=3000&color=00B1E1&center=true&vCenter=true&random=false&height=60&width=435&lines=graduating+in+.+.+.)</Markdown>
                        <Paragraph>{days} \ Days</Paragraph>
                        <Paragraph>{hours} \ Hours</Paragraph>
                        <Paragraph>{minutes} \ Minutes</Paragraph>
                        <Paragraph>{seconds} \ Seconds</Paragraph>
                    </Box>
                </>
        }
    }

    return <>
    <Box {...props}>
    <Stack anchor="top" margin={{top: "large"}}>
    <Countdown date={props.when} renderer={renderer}></Countdown>
    </Stack>
    </Box>
    </>
}