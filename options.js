import { db } from "../firebase";
import React, { useEffect, useState } from 'react';
import { collection, doc, getDoc, getDocs, setDoc, query, onSnapshot, Firestore } from "@firebase/firestore";
import { UserAuth } from "../AuthContext";
import { getAuth } from "firebase/auth";
import { OneOption } from "./optionButton";
import './options.css';



export default function Options() { 
    const questionRef = collection(db,"quiz"); 
    

    const [questions, setQuestions] = useState([]);
    // need to add something here so that if answer submitted, don't show options....
    const [showAnswer, setShowAnswer] = useState(false);
    const [questionNumber, setQuestionNumber] = useState(0); 
    const [userOptionSelection, setUserOptionSelection] = useState(''); 
    const [clicked, setClicked] = useState(false) // this is just to check the functionality of the button styling!
    const [correctAnswerStreak, setCorrectAnswerStreak] = useState(0);
    

    useEffect(()=> { 

      const getQuestion = async() => { 
        const data = await getDocs(questionRef);
        setQuestions(data.docs.map((doc)=>({...doc.data(), id: doc.id})))
        console.log("done");
        console.log(data)
        
        

      }
      getQuestion();
  
  
    }, []);

    // const whenClicked = async(option) => { 
    //     const email = user.email;
    //     const selection = option
    //     const write = await setDoc(doc(db, "answers", "question1"), {
    //         userEmail: email,
    //         answer: selection,
    //       });
    //     console.log("answer submitted");
    //     const answerRef = doc(db, "answers","question1")
    //     const answerSnap = await getDoc(answerRef);
    //     console.log(answerSnap)

    // };


    // this is for next question 
    
    const onSubmitted = () => { 
        
        setQuestionNumber(questionNumber+1); 
        console.log(questionNumber); 
        setShowAnswer(false);
        setUserOptionSelection(''); 
        if (questionNumber > 3) { 
            setQuestionNumber(0)
        }
        // read the users selection for the specific question 
        // read the actual answer from the database 
        // check if answer is correct or not 
        // if correct, tell the user that they got it right and / or show the explanation to the question 
        //const docRef = doc(db, "cities", "SF");
        //const docSnap = await getDoc(docRef);
    };


    const onSubmit = (e) => { 
        e.preventDefault();
        setShowAnswer(true);
        console.log(showAnswer);
    }


    const optionData = { 
        userSelection: userOptionSelection,
    }



    const saveUserSelection = (option) => { 
        setUserOptionSelection(option); 

        console.log(userOptionSelection);

    }


    const handleButtonClick = () => { 
        setClicked(!clicked);

    }
    


    return ( 
        <div>

        <h1>Welcome</h1>


        {/* <input type="checkbox" id="demo"/>
        <label for="demo">Click me.</label> */}

        <div>
    
            <div>
        {questions.slice(questionNumber,questionNumber+1).map((question)=> { 
            // could set current question and then just add one and loop through
            return (
                <div 
                className=" border border-solid">
                    <form onSubmit={onSubmit}>
                    <h1
                    className="text-xl"
                    >{question["question text"]}</h1>
                    <ul className = "">
                        <li onClick={()=>saveUserSelection(question["option A"])} 
                        
                        id = "option" 
                        key='1'>A): {question["option A"]}</li>
                        <li onClick={()=>saveUserSelection(question["option B"])} key="2">B): {question["option B"]}</li>
                        <li onClick={()=>saveUserSelection(question["option C"])} key="3">C): {question["option C"]}</li>
                        <li onClick={()=>saveUserSelection(question["option D"])}key="4">D): {question["option D"]}</li>
                        
                    </ul>

                    <div className="mb-5 mt-5">
                    <p> You have selected the option: </p> <p className="underline">{optionData.userSelection} </p>
                    </div>


                    { (!showAnswer) ? <button 
                    className="border">
                        Submit answer</button> : <div></div> }
                    
                    </form>


                    
                        { (showAnswer) ? 
                        (<div>
                            {  (question['answer'] === optionData.userSelection ) ? (   <div>You are correct! Well done!</div>) : <div>You're wrong :( Read the explanation, make sure you understand the solution and ask if you're unsure!</div> }
                            <div className="mb-5"> 
                            <p>The answer was: </p> <p className="underline">{question["answer"]}</p>
                            </div>
                            <button 
                            className="border border-separate"
                            onClick={onSubmitted}>next question</button>
                        </div>) : 
                        <div></div>}
                </div>
            )})}

                
                    <button
                    onClick={()=>handleButtonClick()} 
                    className={ (clicked) ? "turnButtonRed" : "default" }
                
                    >Option
                    </button>

    </div>

        </div>

        <div> 
                            
            <OneOption/>

    
        </div>
        </div>
    )
}