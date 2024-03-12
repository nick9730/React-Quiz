
 import { Children, useEffect, useReducer } from 'react'
import DateCounter from './DateCounter'
import Header from './Header'
import Main  from './Main'
import  Loader from './Loader'
import StartScreen from './StartScreen'
import Question from './Question'
import NextButton from './NextButton'
import Error from './Error'
import FinishScreen from './FinishScreen'

import DispProgress from './DispProgress'
import Footer from './Footer'
import Timer from './Timer'

const SECS_PER_QUESTIONS = 30


const initialState= { 
    questions:[],
    status: "loading",
    index:0,
    answer:null,
    points : 0,
    highscore:0,
    secondRemaining:null,
}


function reducer(state,action){
    switch(action.type){
        case "dataReceived" : 
        return{
            ...state,
            questions:action.payload,
            status: "ready",
        }
       
       case 'dataFailed ': 
       return{
            ...state,
            status:"error"
       }

       case 'start': 
       return{
        ...state,
          status:"active",
        secondRemaining:state.questions.length * SECS_PER_QUESTIONS,
     }
        case 'newAnswer':
            const question = state.questions.at(state.index)
        return{
            ...state,
            answer : action.payload,
            points:action.payload ===question.correctOption
            ?state.points+question.points : state.points,
        }
        case 'nextQuestion':
            return{
                ...state,
                index:state.index +1,
                answer:null
            }

        case 'finish':
            return{...state,status:"finished",
         highscore :state.points> state.highscore ? state.points : state.highscore,
        }

        case 'restart':
            return{
                ...initialState,questions:state.questions,status:'ready'}
               // status: "ready",
    //index:0,
    //answer:null,
    //points : 0,
    //highscore:0,
    //questions:action.payload

             case 'tick':
                return{
                    ...state ,
                    secondRemaining:state.secondRemaining-1,
                    status: state.secondRemaining === 0 ? 'finished' : state.status,
                }

        
        default:
            throw new Error ("Action unkown")
    }
}

export default function App(){


const [{questions,status,index,answer,points,highscore,secondRemaining},dispatch] = useReducer(reducer,initialState)


const numQuestions = questions.length;

const maxPoints = questions.reduce((prec,cur)=>prec+cur.points,0 )


   useEffect(
    function(){

        fetch("http://localhost:9000/questions")
        .then((res)=>res.json())
        .then((data)=>dispatch({type:"dataReceived",payload:data}))
        .catch((err)=> dispatch({type:"dataFailed"}))
     
    }
    
  ,[])


    return( 
        <div className='app'> 
         <Header/>
         
         <Main> 
       {status==="loading" && <Loader/>}
       {status==="error"  && <Error/>}
       {status==="ready" && <StartScreen numQuestions={numQuestions} dispatch={dispatch} />}
       {status=== "active" && (


           <>
           <DispProgress index={index} numQuestions={numQuestions} points={points} maxPoints={maxPoints} answer={answer}/>
       <Question question= {questions[index]} dispatch={dispatch}  answer={answer}/>  
       

       <Footer>

       <Timer dispatch={dispatch} secondRemaining={secondRemaining}/>
       <NextButton dispatch={dispatch} answer={answer} numQuestions={numQuestions} index={index}/>
       </Footer>
       </>
       )}
       
       {status==='finished' && <FinishScreen dispatch={dispatch} question={questions}  highscore={highscore} points={points} maxPoints={maxPoints}/>}
       </Main>
          
        </div>
    )
}