import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google'; 

import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './AppGoogle'; 
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
<GoogleOAuthProvider clientId="443838011211-rs3kis9u9g534snqhrae3egprovdmjg1.apps.googleusercontent.com">  
<React.StrictMode>
    <App/>
</React.StrictMode>
</GoogleOAuthProvider>,
);




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
