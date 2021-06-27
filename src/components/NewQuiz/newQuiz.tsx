import * as React from 'react';
import { useState, useEffect, FunctionComponent, MouseEvent } from 'react';
import QuestionComponent from './QuestionComponent';
import firebase from "firebase"
import { auth, firestore } from "../../App"
import NavBar from '../navbar/navbar';
import { Link } from 'react-router-dom';
import { IAnswer, IQuestions, answer } from "../../types/types"


const NewQuiz: React.FC = (): JSX.Element => {

    const [quizTitle, setQuizTitle]         = useState<string>("My Quiz");
    const [questions, setQuestions] = useState<IQuestions[]>([
        {
            rootQuestion: "",
            rootAnswers:[
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
    ]);
    const [error, setError] = useState<string>("");
    const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
    const [submittedQuizID, setSubmittedQuizID] = useState<string>("");

    const handleQuizTitleChange = (event: React.ChangeEvent<HTMLInputElement>):void => {
        setQuizTitle(event.target.value)
    }

    const addQuestionComponent = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault()
        setQuestions(state => ([...state, {
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
        }]))
    }

    const handleComponentUpdate = (
        answerArray: answer[], 
        questionTitle: string, 
        componentKey: number
        ): void => {

            const middleMan: IQuestions[] = [...questions]
            middleMan.splice(componentKey, 1, {
                rootQuestion: questionTitle,
                rootAnswers: [...answerArray]
            })

            setQuestions(middleMan)
    }

    const removeComponent = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault()
        const stringFromName: string = (event.currentTarget.id).split("-")[1]
        const indexFromName: number = + stringFromName

        const theMiddle = [...questions]
        theMiddle.splice(indexFromName, 1)

        setQuestions(theMiddle)
    }

    // I am sure there is a more space/time efficient way to do this, however, I am focusing primarily
    // on making it work first

    const submitQuiz = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault()
        const regex: RegExp = /^(?!\s*$).+/

        setError("")

        if (!auth.currentUser) {
            setError("You must be signed in to submit a question")
        }

        questions.forEach((element: IQuestions) => {
            let count: number = 0
            element.rootAnswers.forEach((elem: answer) => {
                if (elem.correct === true) {
                    ++count
                }
            })
            if (count < 1) {
                setError("One or more question is missing a correct answer")
            }
        })

        questions.forEach((elem: IQuestions): void => {
            elem.rootAnswers.forEach((answersElem: answer) => {
                if (!regex.test(answersElem.answerText)) {
                    setError("One or more answer fields are empty")
                }
            })
        })

        questions.forEach((elem: IQuestions): void => {
            if (!regex.test(elem.rootQuestion)) {
                setError("One or more question fields are empty")
            }
        })

        if (error === "" && auth.currentUser) {
            firestore.collection("quizzes").add({
                quiz: {
                    title: quizTitle.toLowerCase().split(" "),
                    questions: questions,
                },
                createdBy: firestore.doc("users/" + auth.currentUser.uid),
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            }).then((docRef) => setSubmittedQuizID(docRef.id))
            setQuizSubmitted(true)
        }

    }

    return (
        <div>
            <nav>
                <NavBar />
            </nav>
            <section>
                {
                    !quizSubmitted ?
                    <>    
                        <input 
                            type={"text"} 
                            onChange={handleQuizTitleChange} 
                            value={quizTitle}></input>

                            {
                                questions.map((elem: IQuestions, index: number) => {
                                    return (
                                        <div key={`QC-${index}`}>
                                            <button 
                                                data-testid={"remove-question-button"}
                                                id={`deleteButton-${index}`} 
                                                onClick={removeComponent}>X</button>

                                            <QuestionComponent 
                                                qCIndex={`QC-${index}`} 
                                                newQuestion={elem}
                                                updateQuestion={handleComponentUpdate}
                                                data-testid={"question-component"} />
                                        </div>
                                    )
                                })
                            }
                        <button 
                            data-testid={"add-question-button"}
                            onClick={addQuestionComponent}>Add a new question</button>
                        <button
                            onClick={submitQuiz}
                            data-testid={"submit-quiz-button"}>Submit quiz</button>
                        <p>{error}</p>
                    </>
                    :
                    <>
                        <p>Thank you for submitting a quiz</p>
                        <p>Your quiz ID is {submittedQuizID}</p>
                        <Link to={`/answerquiz/${submittedQuizID}`}>Preview Quiz</Link>
                    </>
                }
            </section>
        </div>
    )
}

export default NewQuiz