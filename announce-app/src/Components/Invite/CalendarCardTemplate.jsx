import React from 'react';
import { Calendar, Card, CardBody, CardHeader, CardFooter,Heading, Paragraph} from 'grommet';
import { Bookmark } from 'grommet-icons';


export default function CalendarCardTemplate(props) {
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