import { firestore } from "../App"

export interface IAnswer {
    answerText: string,
    correct: boolean
}

export interface answer {
    answerText: string,
    correct: boolean
}

export interface IQuestions {
    rootQuestion: string,
    rootAnswers: answer[]
}


