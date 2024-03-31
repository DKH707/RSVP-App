import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactCodeInput from 'react-code-input';
import {grommet, Grommet, Page, PageContent, Box, Paragraph, Form, FormField, Button, TextInput, Markdown} from 'grommet';
import { deepMerge } from "grommet/utils";
import { Code, Cpu, Key, Moon, Sun, Technology, Terminal, Lock } from 'grommet-icons';
import CustomFooter from '../Invite/CustomFooter';
import axios from 'axios';

export default function Authorize(){

    const [dark, setDark] = useState(true);
    const [value, setValue] = useState({})

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

    useEffect(()=> {
      if(value){
        console.log(value)}},[value])

    return <>
        <Grommet theme={theme} full themeMode={dark ? "dark" : "light"}>
        <Page kind="narrow" fill="vertical">
            <PageContent>
                <Box alignSelf="center" gap="medium" align="center">
                  <Button icon={dark ? <Moon/> : <Sun/>} onClick={()=>setDark(!dark)} 
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
                          }}></Button>
                    {dark ? 
                    <Markdown>![Typing SVG](https://readme-typing-svg.demolab.com?font=Kode+Mono&pause=3000&color=00B1E1&center=true&vCenter=true&random=false&width=435&height=60&lines=Insert+Access+Code)</Markdown>
                  : <Markdown>![Typing SVG](https://readme-typing-svg.demolab.com?font=Kode+Mono&pause=3000&color=4F2D7F&center=true&vCenter=true&random=false&width=435&height=60&lines=Insert+Access+Code)</Markdown>}
                    
                    { dark ? 
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
                </Box>
            </PageContent>
        </Page>
        </Grommet>
    </>
}