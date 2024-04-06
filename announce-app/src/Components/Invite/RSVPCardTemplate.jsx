import React, { useState } from "react";
import { Card, CardBody, CardHeader, Box, Heading, Button, 
  Form, FormField, TextArea, TextInput, Select, Spinner, Paragraph, Notification, MaskedInput} from 'grommet';
import { Down, FormClose, Group, MailOption, Phone, StatusCritical, StatusGood, Terminal, Validate } from "grommet-icons";

export default function RSVPCardTemplate(props) {
    const [attend, setAttend] = useState('attending');
    const [numPeople, setNumPeople] = useState(0);
    const [value, setValue] = useState({ plannedAttendance: attend, people: numPeople });
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [failed, setFailed] = useState(false);
  
    const handleRSVPSubmit = (val) => {
      setLoading(true)
      fetch(`http://localhost:5050/api/people`,{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(value)
      })
      .then((resp)=>{
        if (resp.status < 400){
        setLoading(false)
        setSubmitted(true)
        setFailed(false)
        props.onSuccess()
        }
        else{
          setLoading(false)
          setFailed(true)
          setSubmitted(false)
          props.onFailure()
        }
      })
      .catch((e)=>{
        setLoading(false)
        setFailed(true)
        setSubmitted(false)
        console.log(e)
        props.onFailure()
      })  
   }

    return (
      <Card animation={"fadeIn"} responsive={true} elevation="none" round="none">
        <CardHeader pad="small" background="background-contrast">
          <Heading level={3} margin="none" color={props.dark ? "teal" : "brand"}>
          {props.title}
          </Heading>
          <Button align="right" icon={<FormClose/>} onClick={props.close}></Button>
        </CardHeader>
        <CardBody pad="medium" overflow={"auto"}>
          {!loading && !submitted && <Form value={value}
                onChange={nextValue => setValue(nextValue)}
                onSubmit={({ value }) => {handleRSVPSubmit(value)}}>
            <FormField size={"small"} name="plannedAttendance" htmlFor="planned-attendance-id" label="I plan on">
              <Select
                  name="plannedAttendance"
                  icon={<Down size="small"/>}
                  id='planned-attendance-id'
                  options={['attending', 'not attending']}
                  value={attend}
                  size="small"
                  onChange={({ option }) => setAttend(option)}
                />
            </FormField>
            <FormField name="name" htmlFor="text-input-id-1" label="Name*" size={"small"} required>
              <TextInput id="text-input-id-1" name="name" size="small" icon={<Terminal size="small"/>} reverse/>
            </FormField>
            <FormField name="email" htmlFor="emailAddress" label="Email" size={"small"}>
              <MaskedInput id="emailAddress" size={"small"} name="email" icon={<MailOption size="small"/>} reverse
                           mask={[{placeholder: "fake@fake.com"}]}/>
            </FormField>
            <FormField name="phone" htmlFor="phoneNumber" label="Phone" size={"small"}>
              <MaskedInput id="phoneNumber" size={"small"} name="phone" icon={<Phone size="small"/>} reverse
                           mask={[{length: 3, placeholder: 555,},{ fixed: "-"},{length: 3, placeholder: 555},{ fixed: "-"}, {length: 4, placeholder: 5555}]}/>
            </FormField>
            <FormField size={"small"} name="people" htmlFor="num-of-people-id" label={"Est. Number of People"}>
            <Select
                  name="people"
                  size={"small"}
                  icon={<Group size="small"/>}
                  id='num-of-people-id'
                  options={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                  value={numPeople}
                  onChange={({ option }) => setNumPeople(option)}
                />    
            </FormField>
            <FormField name="note" size={"small"} htmlFor="text-input-id-4" label="Additional Notes">
              <TextArea size={"small"} id="text-input-id-4" name="note"/>
            </FormField>
            <Box size={"small"} direction="row" gap="medium" animation="slideRight" style={{paddingBottom: "10vh"}}>
              <Button size={"small"} type="submit" primary label="Submit" color={props.dark ? "teal" : "brand"} icon={<Validate/>}/>
            </Box>
          </Form>}
          {loading && 
          <Box align="center" animation={"slideUp"}>
            <Spinner size="large" color={{dark: "teal",light: "brand"}}/>
          </Box>}
          {submitted && 
          <Box align="center" justfiyContent="center" animation={"slideUp"} elevation="none">
            <StatusGood style={{paddingTop: "auto"}} size="large" color={{dark: "#22FF13", light:"#1C6018"}}/>
            <Paragraph color={{dark: "#22FF13", light:"#1C6018"}}>RSVP Received Successfully</Paragraph>
          </Box>}
          {failed && <Notification
                      toast
                      icon={<StatusCritical/>}
                      status="critical"
                      title="Submission Failed"
                      message="Please contact dhopkins@buildtechsys.com"
                      onClose={()=>{setFailed(false)}}/>}
        </CardBody>
        </Card>
      );
  };