import * as React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { firestore } from '../../App';
import { IQuestions, answer } from "../../types/types"
import "../../stylesheets/answerQuiz.css"

interface IQuestionDataInner {
    questions: IQuestions[],
    title: string
}

interface IQuestionData {
    createdAt: string,
    createdBy: string,
    quiz: IQuestionDataInner,
}

const AnswerQuiz: React.FC = () => {

    const [usefulData, setUsefulData] = useState<IQuestionData | undefined>();
    const [count, setCount] = useState<number>(0);
    const [score, setScore] = useState<number>(0);
    const [enabled, setEnabled] = useState<boolean>(true);

    const { id }:any = useParams()

    useEffect(() => {
        const quizRef = firestore.collection("quizzes").doc(id)
        quizRef.get().then((doc:any) => {
            setUsefulData(doc.data())
        }).catch((error) => {
            console.log(error)
        })
        // eslint-disable-next-line
    },[])

    const questionArray = usefulData?.quiz.questions.map((elem:IQuestions) => {
        return elem
    })

    const handleQuestionAdvance = (event: React.MouseEvent<HTMLButtonElement>):void => {
        event.preventDefault();
        setEnabled(false);
        if (event.currentTarget.name === "true") {
            setTimeout(() => {
                setScore((score: number) => score + 1)
            }, 2000)
        }
        setTimeout(() => {
            setCount((state:number) => state + 1)
            setEnabled(true)
        }, 2000);
    }

    const scoreFill = (score: number):string => {

        let result = "";

        if (score <= 100 && score > 75) {
            result = "#5B9C1B"
        } else if (score <= 75 && score > 50) {
            result = "#E58A00"
        } else if (score <= 50 && score > 25) {
            result = "#E55A00"
        } else  {
            result = "#FD353C"
        } 

        return result;
    }

    return (
        <div className={"answer-quiz"}>

            {
                questionArray && questionArray?.length > count
                ?
                <div className={"answer-quiz__question-container"}>
                    <p className={`
                        answer-quiz__title`}>{questionArray[count] && questionArray[count].rootQuestion}</p>
                    {
                        questionArray[count].rootAnswers.map((elem: answer, index: number) => {
                            return (
                                <button 
                                    name={elem.correct ? "true" : "false"}
                                    onClick={handleQuestionAdvance}
                                    key={`answer-${index}`}
                                    disabled={!enabled}
                                    className={`
                                        answer-quiz__answer
                                        answer-quiz__answer--${elem.correct ? "true" : "false"}`} >{elem.answerText}</button>
                            )
                        })
                    }
                </div>
                :
                <p className={"answer-quiz__question-container"}>That's the end, thank you for playing 😊</p>
            }
            <div className={"answer-quiz__score-container"}>
                <div className={"answer-quiz__score-inner"}>
                    <svg 
                        width="200" 
                        height="200" 
                        className="answer-quiz__svg-container">
                        <path 
                            d="M25 100a25 25 0 11 150 0 25 25 0 11 -150 0"
                            fill="none"
                            stroke="#434343"
                            strokeWidth="10"
                            className="answer-quiz__score-circle"
                            id="loading"
                            // path length 471
                            style={{
                                strokeDasharray: 471,
                                strokeDashoffset: count !== 0 ? (471 - ((score / count) * 471)) : 471,
                                stroke: scoreFill((score/count)*100)
                            }}></path>
                    </svg>
                    {questionArray && <p className={"answer-quiz__score-score"}>{score}/{questionArray.length}</p>}
                </div>
                {score === questionArray?.length ? <p>100%, well done</p> : <p>{!isNaN((score/count)*100) ? (score/count)*100 + "%" : "0%"}</p>}
            </div>
        </div>
    )
}

export default AnswerQuiz;