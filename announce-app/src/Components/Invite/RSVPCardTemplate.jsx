import React, { useState } from "react";
import { Card, CardBody, CardHeader, CardFooter, Box, Heading, Button, Form, FormField, TextInput, Select, Paragraph} from 'grommet';
import { FormClose, MailOption } from "grommet-icons";

export default function RSVPCardTemplate(props) {
    const [attend, setAttend] = useState('attending');
    const [numPeople, setNumPeople] = useState(0);
    const [value, setValue] = useState({ planned_attendance: attend, people: numPeople });
  
    const handleRSVPSubmit = (value) => {
        console.log(value)
   }

    return (
      <Card animation={"fadeIn"} responsive={true} elevation="xsmall" round="none">
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
            <FormField name="planned-attendance" htmlFor="planned-attendance-id">
              <Paragraph>I plan on</Paragraph>
              <Select
                  name="planned-attendance"
                  id='planned-attendance-id'
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
            <FormField name="people" htmlFor="num-of-people-id" label={"Est. Number of People"}>
            <Select
                  name="people"
                  id='num-of-people-id'
                  options={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                  value={numPeople}
                  onChange={({ option }) => setNumPeople(option)}
                />    
            </FormField>
            <FormField name="note" htmlFor="text-input-id-4" label="Additional Notes">
              <TextInput id="text-input-id-4" name="note" />
            </FormField>
            <Box direction="row" gap="medium">
              <Button type="submit" primary label="Submit" color={props.dark ? "teal" : "brand"}/>
              <Button type="reset" label="Reset" color={props.dark ? "teal" : "brand"}/>
            </Box>
          </Form>
        </CardBody>
        <CardFooter pad="small" background="background-contrast" justify="center">
          <Box align="center">
          <Paragraph justify="center" size="small">Encounter issues? </Paragraph>
          <Paragraph justify="center" size="small"> <MailOption size="small"/> dhopkins@buildtechsys.com</Paragraph>
          </Box>
        </CardFooter>
        </Card>
      );
  };