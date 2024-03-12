import React from 'react'

export default function FinishScreen({maxPoints,points,highscore,dispatch,question}) {

const percentage = (points/maxPoints)*100

  return (
    <p className='result'>  
    You scored <strong>
        {points}
    </strong>
    out of {maxPoints}
 {Math.ceil(percentage)}%

 <p>Your highscore is {highscore}</p>
 
 
 
 <button className='btn btn-ui' onClick={()=>dispatch({type:"restart",payload:question})}>

Restart
 </button>

    </p>
  )
}
