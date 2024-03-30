import React, { useState, useEffect } from "react";
import { Box, Button, 
  Card, CardHeader, CardBody, CardFooter, 
  Grid, grommet,Grommet, 
  Header, Heading, 
  Page, PageContent, Paragraph,
  Text, Calendar,Image, Layer, Form, FormField, TextInput, Select} from 'grommet';
import { Bookmark, FormClose, FormSchedule, Location, Moon, Sun } from 'grommet-icons';
import { deepMerge } from "grommet/utils";
import GraduationCountdown from "./Components/GraduationCountdown";
import CustomFooter from "./Components/CustomFooter";

const image = require(".//imgs/pfp_nobg.png")

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

const LocationCardTemplate = (props) => {
  return (
    <Card animation={"slideDown"} responsive={true} elevation="none" round="false">
      <CardHeader pad="medium" background="background-contrast">
        <Heading level={3} margin="none" color={props.dark ? "teal" : "brand"}>
        {props.title}
        </Heading>
      </CardHeader>
        <CardBody pad="medium" background="background-contrast">
          <iframe
          title="Location" 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3362.9297191233113!2d-97.35032732381435!3d32.5547208953123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864e697c23ccd25d%3A0x6cdf50aa0430abc4!2s808%20Red%20Oak%20Ct%2C%20Crowley%2C%20TX%2076036!5e0!3m2!1sen!2sus!4v1711753782688!5m2!1sen!2sus" 
          width="auto" height="auto" style={{border:0}} allowfullscreen="" loading="lazy" 
          referrerpolicy="no-referrer-when-downgrade"></iframe>
        </CardBody>
        <CardFooter pad="small" background="background-contrast" justify="center">
        <Location color={props.dark ? "teal" : "brand"}/> 
          <Paragraph>808 Red Oak Ct <br/> Crowley, TX 76036</Paragraph>
        </CardFooter>
      </Card>
    );
};

const CalendarCardTemplate = (props) => {
  return (
    <Card animation={"slideDown"} responsive={true} elevation="none" round="false">
      <CardHeader pad="medium" background="background-contrast">
        <Heading level={3} margin="none" color={props.dark ? "teal" : "brand"}>
        {props.title}
        </Heading>
      </CardHeader>
      <CardBody pad="medium" background="background-contrast">
        <Calendar fill={true} size="medium" date="2024-5-11" daysOfWeek={true}/>
      </CardBody>
      <CardFooter pad="small" background="background-contrast" justify="center">
        <Bookmark color={props.dark ? "teal" : "brand"}/> 
        <Paragraph>May 11 4:00 pm</Paragraph>
      </CardFooter>
      </Card>
    );
};

const RSVPCardTemplate = (props) => {
  const [attend, setAttend] = useState('attending');
  const [value, setValue] = useState({ planned_attendance: attend });

  // useEffect(()=>{setValue(prev => ({...prev, planned_attendance: attend}))},[attend])

  return (
    <Card animation={"zoomIn"} responsive={true} elevation="xsmall" round="none">
      <CardHeader pad="medium" background="background-contrast">
        <Heading level={3} margin="none" color={props.dark ? "teal" : "brand"}>
        {props.title}
        </Heading>
        <Button align="right" icon={<FormClose/>} onClick={props.close}></Button>
      </CardHeader>
      <CardBody pad="medium">
        <Form value={value}
              onChange={nextValue => setValue(nextValue)}
              onReset={() => setValue({})}
              onSubmit={({ value }) => {handleRSVPSubmit(value)}}>
          <FormField name="planned_attendance" htmlFor="planned_attendance-id">
            <Paragraph>I plan on</Paragraph>
            <Select
                name="planned_attendance"
                id='planned_attendance-id'
                options={['attending', 'not attending']}
                value={attend}
                onChange={({ option }) => setAttend(option)}
              />
          </FormField>
          <FormField name="name" htmlFor="text-input-id-1" label="* Name" required>
            <TextInput id="text-input-id-1" name="name" />
          </FormField>
          <FormField name="email" htmlFor="text-input-id-2" label="Email">
            <TextInput id="text-input-id-2" name="email" />
          </FormField>
          <FormField name="phone" htmlFor="text-input-id-3" label="Phone">
            <TextInput id="text-input-id-3" name="phone" />
          </FormField>
          <FormField name="people" htmlFor="text-input-id-4" label="* Est. Number of People" required>
            <TextInput id="text-input-id-4" name="people" />
          </FormField>
          <FormField name="note" htmlFor="text-input-id-5" label="Note">
            <TextInput id="text-input-id-5" name="note" />
          </FormField>
          <Box direction="row" gap="medium">
            <Button type="submit" primary label="Submit" color={props.dark ? "teal" : "brand"}/>
            <Button type="reset" label="Reset" color={props.dark ? "teal" : "brand"}/>
          </Box>
        </Form>
      </CardBody>
      <CardFooter pad="small" background="background-contrast" justify="center">
        <Box align="center">
        <Paragraph justify="center" size="small">Encounter issues? <br/></Paragraph>
        <Paragraph justify="center" size="small"> Email: dhopkins@buildtechsys.com</Paragraph>
        </Box>
      </CardFooter>
      </Card>
    );
};

const rows = ['auto', 'auto'];
const columns = ['100%'];
const may11_4pm = '2024-05-11T16:00:00'
const testDate = '2024-03-11T16:00:00'

const handleRSVPSubmit = (value) => {
     console.log(value)
}

const App = () => {
  const [dark, setDark] = useState(true);
  const [showForm, setShowForm] = useState(false);

  return (
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
                                   animation={"zoomIn"}
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
  );
}
export default App;
