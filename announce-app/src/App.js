import React, { useState, useContext } from "react";
import { Box, Button, Card, CardHeader, CardBody, CardFooter, Grid, grommet, Grommet, Header, Heading, Page, PageContent, PageHeader, Paragraph, ResponsiveContext, Text, Clock, Calendar } from 'grommet';
import { Moon, Sun } from 'grommet-icons';
import { deepMerge } from "grommet/utils";
import Countdown from 'react-countdown';

const now = new Date();

const theme = deepMerge(grommet, {
  global: {
    colors: {
      brand: "#4F2D7F",
    },
    font: {
      family: "Roboto",
      size: "18px",
      height: "20px"
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
    <Card animation={"slideUp"} basis="medium" responsive={true}>
      <CardHeader pad="medium">
        <Heading level={2} margin="none">
        {title}
        </Heading>
      </CardHeader>
        <CardBody pad="medium">
          <Calendar fill={true} size="medium" date="2024-5-11"/>
        </CardBody>
      <CardFooter pad="medium" background="background-contrast" justify="center">
        {/* <Clock type="digital" size="large" time="T04:00:00" run={false}/> */}
        
        <Clock type="digital" size="large" time="T04:00:00" run={false}/>
      </CardFooter>
      </Card>
    );
};


const App = () => {
  
  const [dark, setDark] = useState(true);

  return (
    <Grommet theme={theme} full themeMode={ dark ? "dark" : "light" }>
      <Page>
      <AppBar>
        <Text size="large" color={'green'}>derek's graduation party</Text>
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
      <PageContent pad={{top: 'large'}}>
        <Grid justifyContent="center" align="center" pad={{bottom: "large"}}>
          <CardTemplate title="Date & Time"></CardTemplate>
          <Countdown date='2024-05-11T16:00:00'></Countdown>
        </Grid>
      </PageContent>
      </Page>
    </Grommet>
  );
}

export default App;
