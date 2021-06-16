import * as React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { firestore } from '../../App';
import NavBar from '../navbar/navbar';
import { IQuestions, answer } from "../../types/types"

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
    const [currentQuestion, setCurrentQuestion] = useState<IQuestions | undefined>();
    const [count, setCount] = useState<number>(0);
    const [score, setScore] = useState<number>(0);

    const { id }:any = useParams()

    const errorQuiz:IQuestions = {
        rootQuestion: "",
        rootAnswers: [
            {
                answerText: "Big error boi",
                correct: false,
            },
            {
                answerText: "Click here to try again",
                correct: true
            }
        ]
    }

    useEffect(() => {
        const quizRef = firestore.collection("quizzes").doc(id)
        quizRef.get().then((doc:any) => {
            setUsefulData(doc.data())
        }).catch((error) => {
            console.log(error)
        })
    },[])

    const questionArray = usefulData?.quiz.questions.map((elem:IQuestions) => {
        return elem
    })

    const handleQuestionAdvance = (event: React.MouseEvent<HTMLButtonElement>):void => {
        event.preventDefault()
        setCount((state:number) => state + 1)
        if (event.currentTarget.name === "true") {
            setScore((score: number) => score + 1)
        }
    }

    return (
        <div>
            <NavBar />

            {
                questionArray && questionArray?.length > count
                ?
                <div>
                    <p>{questionArray[count] && questionArray[count].rootQuestion}</p>
                    {
                        questionArray[count].rootAnswers.map((elem: answer, index: number) => {
                            return (
                                <button 
                                    name={elem.correct ? "true" : "false"}
                                    onClick={handleQuestionAdvance}
                                    key={`answer-${index}`} >{elem.answerText}</button>
                            )
                        })
                    }
                </div>
                :
                <p>End of quiz</p>
            }
            <p>Total Score:</p>
            {questionArray && <p>{score}/{questionArray.length}</p>}
        </div>
    )
}

export default AnswerQuiz