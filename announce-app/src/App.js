import React, { useState, useContext } from "react";
import { Avatar, Box, Button, Card, CardHeader, CardBody, CardFooter, Grid, grommet,
   Grommet, Header, Heading, Page, PageContent, PageHeader, Paragraph,
    ResponsiveContext, Text, Stack, Clock, Calendar } from 'grommet';
import { Moon, Sun } from 'grommet-icons';
import { deepMerge } from "grommet/utils";

import Mountains from "./Components/Mountains";
import CustomAvatar from "./Components/CustomAvatar";

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
    elevation="small"
    {...props}
  />
)

const CardTemplate = ({ title }) => {
  const size = useContext(ResponsiveContext);
  return (
    <Card animation={"slideUp"} responsive={true}>
      <CardHeader pad="medium">
        <Heading level={3} margin="none" color="teal">
        {title}
        </Heading>
      </CardHeader>
        <CardBody pad="medium">
          <p>808 Red Oak Ct</p>
          <p>Crowley, TX 76036
          </p>
          <iframe
          title="Location" 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3362.9297191233113!2d-97.35032732381435!3d32.5547208953123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864e697c23ccd25d%3A0x6cdf50aa0430abc4!2s808%20Red%20Oak%20Ct%2C%20Crowley%2C%20TX%2076036!5e0!3m2!1sen!2sus!4v1711753782688!5m2!1sen!2sus" 
          width="auto" height="auto" style={{border:0}} allowfullscreen="" loading="lazy" 
          referrerpolicy="no-referrer-when-downgrade"></iframe>
        </CardBody>
      </Card>
    );
};

const CalendarCardTemplate = ({ title }) => {
  const size = useContext(ResponsiveContext);
  return (
    <Card animation={"slideUp"} responsive={true}>
      <CardHeader pad="medium">
        <Heading level={3} margin="none" color="teal">
        {title}
        </Heading>
      </CardHeader>
        <CardBody pad="medium">
          <Calendar fill={true} size="medium" date="2024-5-11" daysOfWeek={true}/>
        </CardBody>
      <CardFooter pad="small" background="background-contrast" justify="center">
        {/* <Clock type="digital" size="large" time="T04:00:00" run={false}/> */}
        <p>May 11 4:00 pm</p>
        {/* <Clock type="digital" size="large" time="T04:00:00" run={false}/> */}
      </CardFooter>
      </Card>
    );
};

const rows = ['auto', 'auto'];
const columns = ['100%'];

const App = () => {
  
  const [dark, setDark] = useState(true);

  return (
    <Grommet theme={theme} full themeMode={dark ? "dark" : "light"}>
      <Page kind="full">
      <AppBar>
        {/* <Avatar src="../imgs/pfp_nobg.png"></Avatar> */}
        <CustomAvatar></CustomAvatar>
        <Text size="large" style={{color: "#00B1E1"}}>derek's graduation party</Text>
        <Button
          a11yTitle={dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          icon={dark ? <Moon /> : <Sun />}
          onClick={() => setDark(!dark)}
          tip={{
            content: (
              <Box
                pad="small"
                round="small"
                background={dark ? "dark-1" : "light-3"}
                >
                  {dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                </Box>
            ),
            plain: true
          }}
          />
      </AppBar>
      <PageContent pad={{top: 'medium', bottom: "none"}} justifyContent="center">
        <Grid justifyContent="center" align="center" columns={columns} rows={rows} gap="small">
          {/* <Stack anchor="top"> */}
          <CardTemplate title="location:"></CardTemplate>
          <CalendarCardTemplate title="date & time:"></CalendarCardTemplate>
          <Mountains animation={"zoomIn"} style={{position: "relative", bottom: "0", width: "100%", height:"100%"}}/>          
          {/* </Stack> */}
        </Grid>
        
      </PageContent>
      
      </Page>      
    </Grommet>
  );
}

export default App;
