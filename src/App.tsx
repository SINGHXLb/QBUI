import React from 'react'; 
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CredentialResponse, GoogleLogin  } from '@react-oauth/google';



import './App.css';
import Login from './Login';
import axios from 'axios'; 
import Layout from './Layout';
import Student from './Student';
import Admin from './Admin';

function App() { 


    const responseMessage = (response:CredentialResponse) => {
        console.log(response);
    };
    const errorMessage = () => {
        console.log("error");
    };


    const appstateO = {
        token:"x",
        userId: "x",
        guid:"x",
        emailId:"x",
        sessionId: "x",
        loginTime: "x", 
        isAuthenticated: false,
        isAdmin: false
    };

    const setLocalStorage = (key: string, value: any) => {
        window.localStorage.setItem(key, JSON.stringify(value));
    } 
    const getLocalStorage = (key: string, initialValue: any) => {
        try {
            const value = window.localStorage.getItem(key);
            return value ? JSON.parse(value) : initialValue;
        } catch (e) {
       
            // if error, return initial value
            return initialValue;
        }
    } 
    const [applicationSession, setApplicationSession] = useState(() =>
        getLocalStorage("applicationSession", appstateO));  


    const handleLogin = (event: React.MouseEvent<HTMLButtonElement>) => {

        const urlP = 'http://13.250.108.181/api/login';

        //const data = '{"useremail": "' +applicationSession.emailID +'"}'


        axios.post(urlP, applicationSession)
            .then((response) => {

                var loginResponse: {
                    token: string,
                    userName: string,
                    validaty: string, 
                    id: string,
                    emailId: string,
                    guid: string
                }; 

                var token: string;  
                var userGuid :string; 
                loginResponse = response.data; 
                token = loginResponse.token;
                userGuid = loginResponse.guid;
              
                setApplicationSession((applicationSession:any) => {
                    var newState = Object.assign({}, applicationSession);
                    if (token !== "") {
                        newState.isAuthenticated = true;
                        newState.token = token;
                        newState.guid = userGuid; 
                    }
                    setLocalStorage("applicationSession", newState);
                    return newState;
                }); 

            })
            .catch(error => console.error('error login in'))   

    }
    const handleLogout = () =>
    {
           setLocalStorage("applicationSession", ""); //session
          setApplicationSession(""); //React variable  
    }
 
        const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setApplicationSession((applicationSession:any) => {
            var newState = Object.assign({}, applicationSession);
            newState.emailId = event.target.value.toString();
            return newState;
        }); 
    } 
    if (! applicationSession.isAuthenticated)
    {
        return  (
           
         <Login handleLogin={handleLogin} handleEmailChange={handleEmailChange} />
        
        
        );
        
    }

    return ( 
        <>
           
            {
                applicationSession.isAuthenticated &&
                <BrowserRouter>
                    <Routes>
                            <Route   path="/student" element={<Student data={applicationSession} />}></Route>
                            <Route   path="/admin" element={<Admin />}></Route>
                            <Route  path="/" element={<Layout data={applicationSession} handleMenuLogout={handleLogout} />}>
                            {/*<Route path="/faculty/:id" element={<FacultyDetial />}></Route>*/}
                            {/*<Route path="/faculty/add" element={<FacultyAdd />}></Route>*/}
                            {/*<Route path="/faculty/edit/:id" element={<FacultyAdd />}></Route>*/}
                        </Route>
                    </Routes>
                </BrowserRouter>
            }
            
   </>
  );
}

export default App;
