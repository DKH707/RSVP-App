import React, { useState } from "react";
import { Box, Button, 
  Card, CardHeader, CardBody, CardFooter, 
  Grid, grommet,Grommet, 
  Header, Heading, 
  Page, PageContent, Paragraph,
  Text, Calendar,Image} from 'grommet';
import { Bookmark, Location, Moon, Sun } from 'grommet-icons';
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

const LocationCardTemplate = ({ title }) => {
  return (
    <Card animation={"slideUp"} responsive={true} elevation="none" round="false">
      <CardHeader pad="medium" background="background-contrast">
        <Heading level={3} margin="none" color="teal">
        {title}
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
        <Location color="brand"/> 
          <Paragraph>808 Red Oak Ct <br/> Crowley, TX 76036</Paragraph>
        </CardFooter>
      </Card>
    );
};

const CalendarCardTemplate = ({ title }) => {
  return (
    <Card animation={"slideUp"} responsive={true} elevation="none" round="false">
      <CardHeader pad="medium" background="background-contrast">
        <Heading level={3} margin="none" color="teal">
        {title}
        </Heading>
      </CardHeader>
      <CardBody pad="medium" background="background-contrast">
        <Calendar fill={true} size="medium" date="2024-5-11" daysOfWeek={true}/>
      </CardBody>
      <CardFooter pad="small" background="background-contrast" justify="center">
        <Bookmark color="brand"/> 
        <Paragraph>May 11 4:00 pm</Paragraph>
      </CardFooter>
      </Card>
    );
};

const rows = ['auto', 'auto'];
const columns = ['100%'];
const may11_4pm = '2024-05-11T16:00:00'
const testDate = '2024-03-11T16:00:00'

const App = () => {
  const [dark, setDark] = useState(true);
  return (
    <Grommet theme={theme} full themeMode={dark ? "dark" : "light"}>
      <Page kind="narrow">
        <Box animation="slideDown">
        <AppBar>
          <Box align="center" justify="center"  round="full">
              <Image src={image} style={{width: "60px"}}></Image>
          </Box>
          <Text size="large" style={{color: "#00B1E1"}}> derek's graduation party</Text>
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
          <GraduationCountdown when={may11_4pm} 
                               animation={"zoomIn"}
                               background="background-contrast"/>
          <Grid justifyContent="center" align="center" columns={columns} rows={rows} gap="none">
            <LocationCardTemplate title="location:"></LocationCardTemplate>
            <CalendarCardTemplate title="date & time:"></CalendarCardTemplate>
          </Grid>
        </PageContent>
        <CustomFooter responsive={true} align="center"/>
      </Page> 
    </Grommet>
  );
}
export default App;
