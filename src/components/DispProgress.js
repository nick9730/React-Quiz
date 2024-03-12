import React from 'react'

export default function DispProgress({index,numQuestions,points,maxPoints,answer}) {
  return (
    <header className='progress'>
        <progress max={numQuestions} value={index + Number(answer!==null)} />   
     <p>Question {index+1}/{numQuestions}</p>
     <p>{points}/{maxPoints}</p>

    </header>
  )
}
