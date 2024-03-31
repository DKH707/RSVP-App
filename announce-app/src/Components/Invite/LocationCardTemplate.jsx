import React from 'react';
import { Card, CardBody, CardHeader, CardFooter,Heading, Paragraph} from 'grommet';
import { Location } from 'grommet-icons';

export default function LocationCardTemplate(props) {
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