import React, { useState } from "react";
import { Card, CardBody, CardHeader, Box, Heading, Button, 
  Form, FormField, TextInput, Select, Spinner, Paragraph, Notification, MaskedInput} from 'grommet';
import { CaretDown, Down, FormCheckmark, FormClose, FormDown, Group, MailOption, Note, Phone, StatusCritical, StatusGood, Terminal, Validate } from "grommet-icons";

export default function RSVPCardTemplate(props) {
    const [attend, setAttend] = useState('attending');
    const [numPeople, setNumPeople] = useState(0);
    const [value, setValue] = useState({ plannedAttendance: attend, people: numPeople });
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [failed, setFailed] = useState(false);
  
    const handleRSVPSubmit = (val) => {
      setLoading(true)
      fetch(`/api/people`,{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(value)
      })
      .then(()=>{
        setLoading(false)
        setSubmitted(true)
        setFailed(false)
        props.onSuccess()
      })
      .catch((e)=>{
        setLoading(false)
        setFailed(true)
        setSubmitted(false)
        console.log(e)
        props.onFail()
      })  
   }

    return (
      <Card animation={"fadeIn"} responsive={true} elevation="none" round="none">
        <CardHeader pad="medium" background="background-contrast">
          <Heading level={3} margin="none" color={props.dark ? "teal" : "brand"}>
          {props.title}
          </Heading>
          <Button align="right" icon={<FormClose/>} onClick={props.close}></Button>
        </CardHeader>
        <CardBody pad="medium" overflow={"auto"}>
          {!loading && !submitted && <Form value={value}
                onChange={nextValue => setValue(nextValue)}
                onSubmit={({ value }) => {handleRSVPSubmit(value)}}>
            <FormField name="plannedAttendance" htmlFor="planned-attendance-id">
              <Paragraph>I plan on</Paragraph>
              <Select
                  name="plannedAttendance"
                  icon={<Down size="small"/>}
                  id='planned-attendance-id'
                  options={['attending', 'not attending']}
                  value={attend}
                  onChange={({ option }) => setAttend(option)}
                />
            </FormField>
            <FormField name="name" htmlFor="text-input-id-1" label="Name*" required>
              <TextInput id="text-input-id-1" name="name" icon={<Terminal size="small"/>} reverse/>
            </FormField>
            <FormField name="email" htmlFor="emailAddress" label="Email">
              <MaskedInput id="emailAddress" name="email" icon={<MailOption size="small"/>} reverse
                           mask={[{placeholder: "fake@fake.com"}]}/>
            </FormField>
            <FormField name="phone" htmlFor="phoneNumber" label="Phone">
              <MaskedInput id="phoneNumber" name="phone" icon={<Phone size="small"/>} reverse
                           mask={[{length: 3, placeholder: 555,},{ fixed: "-"},{length: 3, placeholder: 555},{ fixed: "-"}, {length: 4, placeholder: 5555}]}/>
            </FormField>
            <FormField name="people" htmlFor="num-of-people-id" label={"Est. Number of People"}>
            <Select
                  name="people"
                  icon={<Group size="small"/>}
                  id='num-of-people-id'
                  options={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                  value={numPeople}
                  onChange={({ option }) => setNumPeople(option)}
                />    
            </FormField>
            <FormField name="note" htmlFor="text-input-id-4" label="Additional Notes">
              <TextInput id="text-input-id-4" name="note" icon={<Note size="small"/>} reverse/>
            </FormField>
            <Box direction="row" gap="medium">
              <Button type="submit" primary label="Submit" color={props.dark ? "teal" : "brand"} icon={<Validate/>}/>
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