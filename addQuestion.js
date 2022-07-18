import React, { useEffect, useState } from "react"; 
import { db } from "../firebase"

import {  addDoc, collection, doc, setDoc} from "@firebase/firestore";


export default function AddQuestion()  { 
    // state
    // questionid 
    // question subject 
    // option A 
    // option B 
    // option C 
    // option D 
    // Answer
    const [questionID, setQuestionID] = useState(""); 
    const [questionSubject, setQuestionSubject] = useState("");
    const [questionText, setQuestionText] = useState('');
    const [questionOptionA, setQuestionOptionA] = useState('');
    const [questionOptionB, setQuestionOptionB] = useState(""); 
    const [questionOptionC, setQuestionOptionC] = useState(""); 
    const [questionOptionD, setQuestionOptionD] = useState(""); 
    const [questionAnswer, setQuestionAnswer] = useState("");
    const [showPreview, setShowPreview] = useState(false);

    const colRef = collection(db, 'quiz');

    const addQuestionToDb = async() => { 
        await addDoc(colRef, data)
    }

    const data = { 
        "questionID": questionID, 
        "question text": questionText, 
        "question Subject": questionSubject,
        "option A": questionOptionA, 
        'option B': questionOptionB, 
        "option C": questionOptionC, 
        "option D": questionOptionD, 
        "answer": questionAnswer
    }


    const addQuestionSubmitForm = async (e) => { 
        e.preventDefault(); 
        try { 
            await addQuestionToDb()
            alert('question submitted to Database')
            await console.log(data)

        } catch (e) { 
            console.log(e.message)
        }
        e.target.reset();
        setQuestionID(""); 
        setQuestionOptionA(null);
        setQuestionOptionB(null);
        setQuestionOptionC(null);
        setQuestionOptionD(null);
        setQuestionSubject(null);
        setQuestionAnswer("");


    }

    // consider adding a preview function??
  
    return (
      <div className="mb-5">
          <div>

          <h1>Add questions</h1>
          </div>

          <div>

          {/* <div>
              <div>
                <p> its below </p>
              <input className="border border-black"
              onChange={(event)=>{setQuestionText(event.target.value)}}>
              </input>

              <button onClick={addQ}> Submit</button>
            

              </div> */}

            <form onSubmit={addQuestionSubmitForm}> 

                <p>Question ID Number:</p>
                <input className="border border-black"
                placeholder="questionSubjectNumber eg. questionAnatomyUpperLimb0001"
                onChange={(event)=>setQuestionID(event.target.value)}/>


                <p>Question subject:</p>  
                <select onChange={(event)=>setQuestionSubject(event.target.value)}>
                    <option value="select">select</option>
                    <option value="Anatomy Upper Limb">Upper Limb Anatomy</option>
                    <option value="Cardiac Physiology">Cardiac Physiology</option>
                    <option value="Thorax Anatomy">Thorax Anatomy</option>
                    <option value="Renal Physiology">Renal Physiology</option>
                </select>


                <p>Question text:</p>
                <textarea className="border border-black"
                placeholder="question text goes here"
                onChange={(event)=>setQuestionText(event.target.value)}>

                </textarea>


            <p>Question Option A</p>
            <input placeholder="option A:"
            onChange={(event)=>setQuestionOptionA(event.target.value)}
            />

            <p>Question Option B</p>
            <input placeholder="option B:"
            onChange={(event)=>setQuestionOptionB(event.target.value)}/>

            <p>Question Option C</p>
            <input placeholder="option C:"
            onChange={(event)=>setQuestionOptionC(event.target.value)}/>

            <p>Question Option D</p>
            <input placeholder="option D:"
            onChange={(event)=>setQuestionOptionD(event.target.value)}/>

            <p>Answer (please insert text):</p>
            <input placeholder="The answer is..."
            onChange={(event)=>setQuestionAnswer(event.target.value)}/>

            <div>
            <button>Submit</button>
            </div>



            </form> 
            </div>
{/* 
            <button onClick={setShowPreview(!showPreview)}>Preview</button>
             */}

             <button onClick={()=>setShowPreview(!showPreview)}
             >preview</button>

             

             { showPreview ? (
                <div className= 'border text-xl'>
                
                <h1 className="text-2xl"> preview is below</h1>

                <div className="flex items-center justify-center space-x-4">
                
                <h3>Question ID</h3>
                <p> {data.questionID} </p>
                </div>

                <div className="flex items-center justify-center space-x-4">


                <h3 className="flex items-center justify-center space-x-4">Question Subject</h3>
                <p>
                    {data["question Subject"]}
                </p>    
                </div>
                

                <div className="flex items-center justify-center space-x-4">
                <h3>Question text</h3>
                <p>{data["question text"]}</p>

                </div>

                <div className="flex items-center justify-center space-x-4">
                <h3>option A:</h3>
                <p>{data["option A"]}</p>

                </div>
                <div className="flex items-center justify-center space-x-4">

                    <h3>Option B:</h3>
                    <p className="">
                    {data["option B"]}
                    </p>
                </div>

                <div className="flex items-center justify-center space-x-4">
                    <h3>Option C:</h3>
                    <p>{data["option C"]}</p>
                </div>




                <div   className="flex items-center justify-center space-x-4">
                <h3>Option D:</h3>
                <p>{data["option D"]}</p>
                </div>

                <div className="flex items-center justify-center space-x-4">
                <h3>Answer:</h3>
                <p>{data['answer']}</p>
                </div>

    
                </div>
                
                

             ) : ( 
                 <div></div>
             )}

            
            
      </div>
    )
  
  
  }