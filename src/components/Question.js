import React from 'react'
import Option from './Option'
export default function Question({question, dispatch,  answer}) {
  return (
    <div>
  <h4>{question.question}</h4>
<Option dispatch={dispatch}  answer={answer} question={question}/>
   
   
   
    </div>
  )
}
