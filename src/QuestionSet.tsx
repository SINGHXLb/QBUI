import React from 'react';
import { useEffect , useState } from "react";
import axios from 'axios'; 

import FlashCard from './FlashCard'
import Button from 'react-bootstrap/Button';


interface LoginInfo {
    data: {
        token: string,
        userId: string,
        guid: string,
        emailId: string,
        sessionId: string,
        loginTime: string,
        isAuthenticated: boolean,
        isAdmin: boolean
    }
}


export const QuestionSet = (prop: LoginInfo) => {    
     
    
    const initialQuestionset =
    {
        guid: "",
        questionSetName: "",
        data: "",
        creationDate: "",
        createdBy: ""
    };

   const initialQuestionsets = [initialQuestionset];
   const  [questionsets, setQuestionSet] = useState(initialQuestionsets);
   const [currentQuestionSetID, setCurrentQuestionSetID] = useState("");


   useEffect(() =>{

       var url = "http://13.250.108.181/api/user/" + prop.data.guid + "/QuestionSets/"; 
            axios.get(url)
                .then((response) => {
                    setQuestionSet(response.data);
                })
                .catch(error => console.error('error'));
        },

        [prop.data.guid]);     


    return ( 
        < >   
            {
                currentQuestionSetID  === ""  && questionsets.map((questionset, index) =>  
                    <div>
                        <Button variant="secondary" onClick={() => setCurrentQuestionSetID(questionset.guid)} >  {questionset.questionSetName}  </Button> 
                    </div> 
                )
            }
            
            {
                currentQuestionSetID !== "" && <FlashCard userGUID={prop.data.guid} questionsetId={currentQuestionSetID} />
            }
      </ >
  );
}

export default QuestionSet;
 