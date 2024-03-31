import React, { useState } from "react";
import { Box, Button, Grid, grommet, Grommet, Header, Page, PageContent, 
         Text, Image, Layer} from 'grommet';
import {  FormSchedule, Moon, Sun } from 'grommet-icons';
import { deepMerge } from "grommet/utils";

import RSVPCardTemplate from "./RSVPCardTemplate";
import CalendarCardTemplate from "./CalendarCardTemplate";
import LocationCardTemplate from "./LocationCardTemplate";
import GraduationCountdown from "./GraduationCountdown";
import CustomFooter from "./CustomFooter";

export default function Invite() {

const image = require("../../imgs/pfp_nobg.png")

const theme = deepMerge(grommet, {
  global: {
    colors: {
      brand: "#4F2D7F",
      teal: "#00B1E1"
    },
    font: {
      family: "Kode Mono",
      size: "20px",
      height: "20px",
      color: "#00B1E1",
    },
  },
});

const AppBar = (props) =>(
  <Header
    animation={"slideDown"}
    alignSelf="center"
    pad={{ left: "medium", right: "small", vertical: "small" }}
    elevation="none"
    {...props}
  />
)

const rows = ['auto', 'auto'];
const columns = ['100%'];
const may11_4pm = '2024-05-11T16:00:00'
const testDate = '2024-03-11T16:00:00'

  const [dark, setDark] = useState(true);
  const [showForm, setShowForm] = useState(false);

  return <>
    <Grommet theme={theme} full themeMode={dark ? "dark" : "light"}>
      <Page kind="narrow">
        <Box animation="slideDown">
        <AppBar>
          <Box align="center" justify="center"  round="full">
              <Image src={image} style={{width: "60px"}}></Image>
          </Box>
          <Text size="large" color={dark ? "teal" : "brand"}> derek's graduation party</Text>
          <Button
            a11yTitle={dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            icon={dark ? <Moon color="teal"/> : <Sun color="brand"/>}
            onClick={() => setDark(!dark)}
            tip={{
              content: (
                <Box
                  pad="small"
                  round="small"
                  background={dark ? "dark-1" : "light-3"}>
                    {dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                  </Box>
              ),
              plain: true
            }}
            />
        </AppBar>
        </Box>
        <PageContent pad={{top: 'medium', bottom: "none"}} justifyContent="center">
          <Box background="background-contrast" animation={"slideDown"} align="center">
              <GraduationCountdown when={may11_4pm} 
                                   dark={dark}/>
              <Button icon={<FormSchedule color={dark ? "teal" : "brand"}/>}
                      label="RSVP" 
                      margin="medium"
                      color={dark ? "teal" : "brand"}
                      onClick={()=>{setShowForm(true)}}/>
                      {showForm && (
            <Layer onEsc={()=>{setShowForm(false)}}
                   onClickOutside={()=>{setShowForm(false)}}
                   animation={"slide"}>
                  
                  <RSVPCardTemplate title="RSVP " dark={dark} close={()=>{setShowForm(false)}}></RSVPCardTemplate>
            </Layer>
          )}
          </Box>
          <Grid justifyContent="center" align="center" columns={columns} rows={rows} gap="none">
            <LocationCardTemplate title="location:" dark={dark}></LocationCardTemplate>
            <CalendarCardTemplate title="date & time:" dark={dark}></CalendarCardTemplate>
          </Grid>
        </PageContent>
        <CustomFooter responsive={true} align="center"/>
      </Page> 
    </Grommet>
    </>;
}