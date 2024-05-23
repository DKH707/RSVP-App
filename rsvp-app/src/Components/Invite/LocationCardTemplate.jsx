import React, {useEffect, useState} from 'react';
import { Box, Card, CardBody, CardHeader, CardFooter,Heading, Paragraph, Spinner} from 'grommet';
import { Location } from 'grommet-icons';

export default function LocationCardTemplate(props) {

  const [location, setLocation] = useState({});
  const [loading, setLoading] = useState(false);
  let data = {};

  useEffect(()=>{
    load()
  },[])

  const load = async () => {
    setLoading(true)
    let results = null;
    try{

      results = await fetch(`http://localhost:5050/api/info`,

      {
        method: "POST",
        headers:{
        "Content-Type": "application/json"
      }})
    }
    catch (e) {
      console.log(e)
    }
    data = await results.json()
    setLocation(data[0])
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
            <iframe
            title="Location" 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d214634.91532840187!2d-97.45412681362794!3d32.80099362393252!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864e6e122dc807ad%3A0xa4af8bf8dd69acbd!2sFort%20Worth%2C%20TX!5e0!3m2!1sen!2sus!4v1716480935544!5m2!1sen!2sus"
            width="auto" height="auto" style={{border:0}} allowFullScreen="" loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"></iframe>
          </CardBody>
          <CardFooter pad="small" background="background-contrast" justify="center">
          <Location color={props.dark ? "teal" : "brand"}/> 
          {!loading && <Paragraph>{location.streetAddress} <br/> {location.city}, {location.state} {location.zip}</Paragraph>}
          {loading && 
          <Box align="center" animation={"slideUp"}>
            <Spinner size="small" color={{dark: "teal",light: "brand"}}/>
          </Box>}
          </CardFooter>
        </Card>
      );
  };