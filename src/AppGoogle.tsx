import React, { useState, useEffect } from 'react';
import { useGoogleLogin  , googleLogout, TokenResponse} from '@react-oauth/google';
import axios from 'axios';
import './AppGoogle.css';


function App() {


const _TokenResponse0 : TokenResponse = 
{
access_token:"",
expires_in:0,
prompt:"",
scope:"",
token_type:"",
error:undefined,
hd:undefined,
error_description:undefined,
error_uri:undefined,
state:undefined

};  
const  _googleUserProfile0 = {
    id: "" ,
    name: "" ,
    email: "",
    picture : ""
  }


const [ user, setUser ] = useState(_TokenResponse0);
const [ profile, setProfile ] = useState(_googleUserProfile0);
 

    const login = useGoogleLogin({
        onSuccess: (res: TokenResponse) => { 
        console.log('Login Success: ', res);
          setUser(res) ;
        },
        onError: (error) => console.log('Login Failed:', error)
    });
    
    

    useEffect(
        () => {
            if (user) {
                axios
                .get('https://www.googleapis.com/oauth2/v1/userinfo?access_token'+ user.access_token, {
                        headers: {
                            Authorization: 'Bearer ' + user.access_token,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        setProfile(res.data);
                    })
                    .catch((err) => console.log(err));
            }
        },
        [ user ]
    );

    // log out function to log the user out of google and set the profile array to null
    const logOut = () => {
        googleLogout();
        setProfile(_googleUserProfile0);
    };

   


    return (
        <div>
           
           
            
            {profile.id !== "" ? (
                <div>
                    <img src={profile.picture} alt="user" /> 
                    <p>Name: {profile.name}</p>
                    <p>Email Address: {profile.email}</p>
                    <br />
                    <br />
                    <button onClick={logOut}>Log out</button>
                </div>
            ) : (
                <button className="google-signin-button" onClick={() => login()}>Sign in with Google </button>
            )}
        </div>
    );
}
export default App;