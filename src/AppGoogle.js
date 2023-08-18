
import React, {useEffect , useState} from 'react'; 
import jwt_decode from "jwt-decode" ;

//import axios from 'axios'; 
 

function App() {
    
    
const [ user, setUser ] = useState({}); 
 function   handleCallbackResponse(response){
 var userObject = jwt_decode(response.credential);
 console.log(userObject);
 setUser(userObject); 
 document.getElementById("singinDIV").hidden= true;
 }

 function handleSignOut(event ){
    setUser({});
    document.getElementById("singinDIV").hidden= false;
 }

useEffect(()=>{
 /*global google*/
google.accounts.id.initialize({
        client_id : "443838011211-rs3kis9u9g534snqhrae3egprovdmjg1.apps.googleusercontent.com",
        callback: handleCallbackResponse
    }
);

google.accounts.id.renderButton(
    document.getElementById("singinDIV"),
    {theme:"filled_blue", size:"large"}
);

//google.accounts.id.prompt();
} ,[]);

   
    return (
         
        <div className='App'>
        <div id="singinDIV"></div>
        { Object.keys(user).length !== 0  
            && <button onClick={(e)=> handleSignOut(e)}>Sign out</button>
         
        }
        {
              Object.keys(user).length !== 0  
              &&  <div>
                  <img src={user.picture} alt="user" /> 
                  <p>Name: {user.name}</p>
                  <p>Email Address: {user.email}</p>
              </div>

        } 
      
        </div>
    );
}
export default App;