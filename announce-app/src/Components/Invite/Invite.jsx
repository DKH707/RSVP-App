import React, { useState, useEffect } from "react";
import { Box, Button, Grid, grommet, Grommet, Header, Page, PageContent, 
         Paragraph, Text, Image, Layer} from 'grommet';
import {  FormSchedule, MailOption, Moon, Sun } from 'grommet-icons';
import { deepMerge } from "grommet/utils";

import RSVPCardTemplate from "./RSVPCardTemplate";
import CalendarCardTemplate from "./CalendarCardTemplate";
import LocationCardTemplate from "./LocationCardTemplate";
import GraduationCountdown from "./GraduationCountdown";
import CustomFooter from "./CustomFooter";

export default function Invite(props) {

  const image = require("../../imgs/pfp_nobg.png")

  const [currentTheme, setCurrentTheme] = useState(localStorage.getItem('theme'));
  const [showForm, setShowForm] = useState(false);

  useEffect(()=>{},[currentTheme])

  const theme = deepMerge(grommet, {
    global: {
      colors: {
        focus: {dark: "#00B1E1", light: "#4F2D7F"},
        brand: "#4F2D7F",
        teal: "#00B1E1"
      },
      font: {
        family: "Kode Mono",
        size: "20px",
        height: "20px",
        color: "#00B1E1",
      }
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

  const rsvpSubmitSuccess = () => {

    setTimeout(()=>{setShowForm(false)},7000)

  }

  const rsvpSubmitFail = () => {
    
    setTimeout(()=>{setShowForm(false)},7000)

  }

  return <>
    <Grommet theme={theme} full themeMode={(currentTheme === 'dark') ? "dark" : "light"}>
      <Page kind="narrow">
        <Box animation="slideDown">
        <AppBar>
          <Box align="center" justify="center"  round="full">
              <Image src={image} style={{width: "60px"}}></Image>
          </Box>
          <Text size="large" color={(currentTheme === 'dark') ? "teal" : "brand"}> derek's graduation party</Text>
          <Button
            a11yTitle={(currentTheme === 'dark') ? "Switch to Light Mode" : "Switch to Dark Mode"}
            icon={(currentTheme === 'dark') ? <Moon color="teal"/> : <Sun color="brand"/>}
            onClick={()=>{
              if(currentTheme === 'dark'){
              props.updateTheme('light')
              setCurrentTheme('light')}
            else {
              props.updateTheme('dark')
              setCurrentTheme('dark')
            }}}
            tip={{
              content: (
                <Box
                  pad="small"
                  round="small"
                  background={(currentTheme === 'dark') ? "dark-1" : "light-3"}>
                    {(currentTheme === 'dark') ? "Switch to Light Mode" : "Switch to Dark Mode"}
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
                                   dark={(currentTheme === 'dark')}/>
              <Button icon={<FormSchedule color={(currentTheme === 'dark') ? "teal" : "brand"}/>}
                      label="rsvp" 
                      margin="medium"
                      color={(currentTheme === 'dark') ? "teal" : "brand"}
                      onClick={()=>{setShowForm(true)}}/>
              <Paragraph justify="center" size="small" color="orange"> encountered an issue? </Paragraph>
              <Paragraph justify="center" size="small"> <MailOption size="small"/> dhopkins@buildtechsys.com</Paragraph>
          
            {showForm && (
            <Layer onEsc={()=>{setShowForm(false)}}
                   onClickOutside={()=>{setShowForm(false)}}
                   animation={"slide"}
                   responsive={false}>
                  <RSVPCardTemplate title="rsvp " dark={(currentTheme === 'dark')} onSuccess={rsvpSubmitSuccess} onFailure={rsvpSubmitFail} close={()=>{setShowForm(false)}}></RSVPCardTemplate>
            </Layer>
          )}
          </Box>
          <Grid justifyContent="center" align="center" columns={columns} rows={rows} gap="none">
            <LocationCardTemplate title="location:" dark={(currentTheme === 'dark')}></LocationCardTemplate>
            <CalendarCardTemplate title="date & time:" dark={(currentTheme === 'dark')}></CalendarCardTemplate>
          </Grid>
        </PageContent>
        <CustomFooter responsive={true} align="center"/>
      </Page> 
    </Grommet>
    </>;
}