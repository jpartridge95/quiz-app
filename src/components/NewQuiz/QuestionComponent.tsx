import React, { useState, useEffect, ButtonHTMLAttributes } from 'react';
import { JsxChild } from 'typescript';
import { IAnswer, IQuestions, answer } from "../../types/types"

interface IProps {
    qCIndex: string
    newQuestion?: IQuestions,
    updateQuestion: (argOne: answer[], argTwo: string, keyArg: number) => void
}

// Upon reflection this should be refactored into a more stateless component.
// However this is functional with currently only a minor perf hit.

const QuestionComponent = ({ qCIndex, newQuestion, updateQuestion }: IProps):JSX.Element => {

    const { rootAnswers, rootQuestion } = newQuestion || {
        rootQuestion: "",
        rootAnswers: [
            {
                answerText: "",
                correct: false
            },
            {
                answerText: "",
                correct: false
            }
        ]
    }

    const [answers, setAnswers] = useState<IAnswer[]>(rootAnswers);
    const [question, setQuestion] = useState<string>(rootQuestion);
    const indexFromKey: number = parseInt(qCIndex.split("-")[1])
    

    const addAnswerField = ():void => {
        setAnswers((state:answer[]) => (
            [...state, {answerText: "", correct: false}])
        )
    }

    const handleQuestionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuestion(event.target.value)
    }

    const handleCheckChange = (event: React.ChangeEvent<HTMLInputElement>):void => {
        const needToParse: string = (event.target.name).split("-")[1]
        const index: number = + needToParse

        const middleMan: answer[] = [...answers]

        middleMan.splice(index, 1, {
            answerText: answers[index].answerText,
            correct: !answers[index].correct
        })

        setAnswers(middleMan)
    }

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>):void => {

        const indexToChange: string = (event.target.name).split("-")[1]
        const intIndex: number = + indexToChange

        const middleMan: answer[] = [...answers]

        middleMan.splice(intIndex, 1, {
            answerText: event.target.value,
            correct: answers[intIndex].correct
        })
    
        setAnswers(middleMan)
    }

    const removeAnswerHandler = (event: React.MouseEvent<HTMLButtonElement>):void => {
        event.preventDefault()

        const indexToRemove: string = (event.currentTarget.name).split("-")[1]
        const intIndex: number = + indexToRemove

        setAnswers(state => state.filter((elem, index) => index !== intIndex))
    }


    useEffect(() => {
        updateQuestion(answers, question, indexFromKey)
    }, [answers, question])


    return (
        <div>
            <input data-testid={"question-input-field"} value={newQuestion?.rootQuestion} onChange={handleQuestionChange}></input>
            {
                rootAnswers.map((element: answer, index: number):JSX.Element => {
                    return (
                       <div key={`question-${index}`}>
                           {(index > 1) && <button 
                                                data-testid={"remove-answer-button"} 
                                                onClick={removeAnswerHandler}
                                                name={`remove-${index}`}>X</button> }
                           
                           <input
                                name={`answer-${index}`} 
                                type={"text"} 
                                data-testid={"answer-input-field"}
                                value={element.answerText}
                                onChange={handleTextChange}></input>

                           <input 
                                name={`check-${index}`}
                                type={"checkbox"} 
                                data-testid={index === 0?"correct-check-test":"correct-checkbox"}
                                checked={element.correct}
                                onChange={handleCheckChange}></input>
                        </div>
                    )
                })
            }
            <button data-testid={"add-answer-button"} onClick={addAnswerField}></button>
        </div>
    )
}

export default QuestionComponent