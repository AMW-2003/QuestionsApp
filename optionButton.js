import React, {useEffect, useReducer, useState} from "react";

import "./optionButton.css"


function reducer(selection, action) { 

    // set the selected option to option A 
    switch (action.type) { 
        case 'option A selected': 
        return { options: [{ A: true, B: false, C: false, D: false}]}
        case 'option B selected': 
        return { options: [{ A: false, B: true, C: false, D: false}]}
        case 'option C selected': 
        return { options: [{ A: false, B: false, C: true, D: false}]}
        case 'option D selected': 
        return { options: [{ A: false, B: false, C: false, D: true}]}
        default: 
            return selection
    }

}


export const OneOption = (props) => { 

    const [{options}, dispatch] = useReducer(reducer, {options: [{A: false, B: false, C: false, D: false}]})

    // const {answerOption, onClickFunction, key, selected} = props

    // const [A, setA] = useState(false);
    // const [B, setB] = useState(false);
    // const [C, setC] = useState(false);
    // const [D, setD] = useState(false);


    useEffect(()=>console.log(options),[options])

   


    return ( 
        <div>
                <button
                onClick={()=>{ 
                    dispatch({ type: 'option A selected'}); 
                    }
                }
                className= { (options[0]) ? 'bg-white': 'bg-indigo-700'}
                > 
                hi
                </button>
                <div>
                <button onClick={()=>{dispatch({ type: 'option B selected'})}}> B</button>
                

                <div>
                <button
                onClick={()=>dispatch({ type: 'option C selected'})}
                // className={A ? 'optionSelected' : 'hello'}
                > 
                C
                </button>

                </div>

                <div>


                <button
                onClick={()=>dispatch({ type: 'option D selected'})}
                // className={A ? 'optionSelected' : 'hello'}
                > 
                D
                </button>
                </div>


                </div>
                
                
                <pre>
                    {JSON.stringify(options, null, 2)}
                </pre>
        </div>
    )
}