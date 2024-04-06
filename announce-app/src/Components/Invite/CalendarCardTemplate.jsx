import React, { useEffect, useState } from 'react';
import { Box, Calendar, Card, CardBody, CardHeader, CardFooter,Heading, Paragraph, Spinner} from 'grommet';
import { Bookmark } from 'grommet-icons';


export default function CalendarCardTemplate(props) {

    const [dateTime, setDateTime] = useState({});
    const [loading, setLoading] = useState(false);
    let data = {};

    useEffect(()=>{
      load()
    },[])

    const load = async () => {
      setLoading(true)
      let results = null;
      try{
        results = await fetch(`/api/info`,
        {
          method: "POST",
          headers:{
          "Content-Type": "application/json"
          }
        })
      }
      catch (e) {
        console.log(e)
      }
      data = await results.json()
      setDateTime(data[0])
      setLoading(false)
    }

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
          {!loading && <Paragraph>{dateTime.when} @ {dateTime.time}</Paragraph>}
          {loading && 
          <Box align="center" animation={"slideUp"}>
            <Spinner size="small" color={{dark: "teal",light: "brand"}}/>
          </Box>}
        </CardFooter>
        </Card>
      );
  };