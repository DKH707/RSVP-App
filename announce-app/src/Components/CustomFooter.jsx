import React from "react";
import { ReactComponent as MountainSVG} from '../imgs/mountains3.svg';
import {Box, Stack, Image} from 'grommet';

const tarletonLogo = require('../imgs/uniSeal.png')

export default function CustomFooter(props){
    return <>
    <Stack anchor="center">
    <Box {...props}>
        <MountainSVG style={{width: "100%", height: "auto"}}/>
    </Box>
    <Box align="center" justify="center" round="full" overflow="hidden" responsive="shrink">
        <Image alignSelf="center" 
               src={tarletonLogo} 
               style={{width: "120px", height: "auto", backgroundColor: "white"}}>
               </Image>
    </Box>
    </Stack>
    </>
}