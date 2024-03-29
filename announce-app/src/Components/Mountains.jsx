import React from "react";
import { ReactComponent as MountainSVG} from '../imgs/mountains3.svg';
import Countdown from 'react-countdown';
import { Box, Stack } from "grommet";

export default function Mountains(props){

    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            return <></>
        }
        else {
                return <>
                    <p>{days} Days</p>
                    <p>{hours} Hours</p>
                    <p>{minutes} Minutes</p>
                    <p>{seconds} Seconds</p>
                </>
        }
    }

    return <>
    <Box {...props}>
    <Stack anchor="top" margin={{top: "large"}}>
    <MountainSVG style={{width: "100%", height: "auto"}}/>
    <Countdown date='2024-05-11T16:00:00' renderer={renderer}></Countdown>
    </Stack>
    </Box>
    </>
}