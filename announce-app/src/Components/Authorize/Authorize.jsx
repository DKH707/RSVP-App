import React, { useEffect, useState } from 'react';
import ReactCodeInput from 'react-code-input';
import './codeInputField.css';
import {grommet, Grommet, Page, PageContent, Box, Button, Markdown, Text, Image} from 'grommet';
import { deepMerge } from "grommet/utils";
import { Key, Lock, Moon, Sun, Unlock } from 'grommet-icons';
import { Navigate } from 'react-router-dom';
import CustomFooter from '../Invite/CustomFooter';


export default function Authorize(props){

    const redBlackImg = require('.//../../imgs/redBlackBTS.png')
    const whiteRedImg = require('.//../../imgs/whiteRedBTS.png')

    const [currentTheme, setCurrentTheme] = useState(localStorage.getItem('theme'));
    const [value, setValue] = useState({})
    const [authorized, setAuthorized] = useState(false);
    const [navigate, setNavigate] = useState(false);

    useEffect(()=>{},[currentTheme])

    useEffect(()=> {
      if(value.length === 6) {
      checkPasscode()
      console.log('verifying code with HQ. . .')
      }
    },[value])

    useEffect(()=> {
      if(authorized)
        setTimeout(()=>{setNavigate(true)},3000)
    },[authorized])

    const theme = deepMerge(grommet, {
        global: {
          colors: {
            brand: "#4F2D7F",
            teal: "#00B1E1",
            border: {
                dark: "#00B1E1", light: "#4F2D7F"
            },
            focus: {
                dark: "#00B1E1", light: "#4F2D7F"
            }
          },
          font: {
            family: "Kode Mono",
            size: "20px",
            height: "20px",
            color: "#00B1E1",
          },
        },
      });

    const darkInputStyle = {
        inputStyle: {
          fontFamily: 'Kode Mono',
          margin:  '4px',
          MozAppearance: 'textfield',
          width: '20px',
          borderRadius: '3px',
          fontSize: '20px',
          height: '26px',
          paddingLeft: '7px',
          backgroundColor: 'black',
          color: "#00B1E1",
          border: '1px solid #00B1E1'
        },
        inputStyleInvalid: {
          fontFamily: 'Kode Mono',
          margin:  '4px',
          MozAppearance: 'textfield',
          width: '20px',
          borderRadius: '3px',
          fontSize: '14px',
          height: '26px',
          paddingLeft: '7px',
          backgroundColor: 'black',
          color: 'red',
          border: '1px solid red'
        }
    }

    const lightInputStyle = {
        inputStyle: {
          fontFamily: 'Kode Mono',
          margin:  '4px',
          MozAppearance: 'textfield',
          width: '20px',
          borderRadius: '3px',
          fontSize: '20px',
          height: '26px',
          paddingLeft: '7px',
          backgroundColor: 'white',
          color: "#4F2D7F",
          border: '1px solid #4F2D7F'
        },
        inputStyleInvalid: {
          fontFamily: 'Kode Mono',
          margin:  '4px',
          MozAppearance: 'textfield',
          width: '20px',
          borderRadius: '3px',
          fontSize: '20px',
          height: '26px',
          paddingLeft: '7px',
          backgroundColor: 'white',
          color: 'red',
          border: '1px solid red'
        }
    }

    const checkPasscode = async() => {
      try{  
        const resp = await fetch(`http://localhost:5050/api/auth`,
        {
          method: "POST",
          headers:{
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            input: value
          })
        })
        const data = resp.ok
        console.log(`code match? | ${data}`)
        if(data){
          setAuthorized(true)
          props.onSuccess()

        } else {
          setAuthorized(false)
          props.onFail()
        }
      }
      catch (e){
        console.log(e)
      }
    }
    
    return <>
        <Grommet theme={theme} full themeMode={(currentTheme === 'dark') ? "dark" : "light"}>
        <Page kind="narrow" fill="horizontal" overflow="hidden">
            <PageContent >
                <Box alignSelf="center" gap="medium" align="center" style={{height: "77vh"}}>
                  <Button icon={(currentTheme === 'dark') ? <Moon/> : <Sun/>} 
                  onClick={()=>{
                              if(currentTheme === 'dark'){
                                props.updateTheme('light')
                                setCurrentTheme('light')}
                              else {
                                props.updateTheme('dark')
                                setCurrentTheme('dark')
                              }}} 
                          tip={{
                                  content: (
                                    <Box
                                      pad="small"
                                      round="small"
                                      background={(currentTheme === 'dark') ? "dark-1" : "light-3"}>
                                        {(currentTheme === 'dark') ? "Switch to Light Mode" : "Switch to Dark Mode"}
                                      </Box>
                                  ),
                                  plain: true}}></Button>
                    {(currentTheme === 'dark') ? 
                    <Markdown>![Typing SVG](https://readme-typing-svg.demolab.com?font=Kode+Mono&pause=3000&color=00B1E1&center=true&vCenter=true&random=false&width=435&height=60&lines=Enter+Access+Code)</Markdown>
                  : <Markdown>![Typing SVG](https://readme-typing-svg.demolab.com?font=Kode+Mono&pause=3000&color=4F2D7F&center=true&vCenter=true&random=false&width=435&height=60&lines=Enter+Access+Code)</Markdown>}
                    <Text>{"< "}<Key size="small"/> {" >"}</Text>
                    { (currentTheme === 'dark') ? 
                    <ReactCodeInput type='number'
                                    inputMode='numeric'
                                    fields={6}
                                    value={value}
                                    onChange={(val)=>setValue(val)}
                                    pattern={/^[0-9]+$/}
                                    {...darkInputStyle}/>
                    :
                    <ReactCodeInput type='number'
                                    inputMode='numeric' 
                                    fields={6}
                                    value={value}
                                    onChange={(val)=>setValue(val)}
                                    pattern={/^[0-9]+$/}
                                    {...lightInputStyle}/>}
                  {!authorized && 
                  <Box style={{height: "60px", width:"435px"}} align="center" animation={"slideUp"}>
                    <Lock color="red"/>
                    </Box>}
                  {authorized && 
                  <Box style={{height: "60px", width:"435px"}} align="center" animation={"slideUp"}>
                    <Unlock color="#02E100"/>
                    <Box animation={"pulse"} style={{height: "60px", width:"435px"}} align="center">
                      <Markdown>![Typing SVG](https://readme-typing-svg.demolab.com?font=Kode+Mono&duration=2000&pause=3000&color=02E100&center=true&vCenter=true&random=false&width=435&height=60&lines=Access+Granted)</Markdown>
                    </Box>
                  </Box>}
                  {navigate && <Navigate to="/" replace/>}
                  <Box align='center'>
                    {(currentTheme === 'dark') ? <Image src={whiteRedImg} style={{width:"40vw"}}/>: <Image src={redBlackImg} style={{width:"40vw"}}/>}
                  </Box>
                </Box>
            </PageContent>
            <CustomFooter responsive={true} align="center"/>
        </Page>
        </Grommet>
    </>
}