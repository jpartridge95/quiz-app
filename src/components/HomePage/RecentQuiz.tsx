import * as React from 'react';
import { useState, useEffect } from 'react';
import { firestore } from '../../App';
import { IAnswer, IQuestions, answer } from "../../types/types"



const RecentQuiz: React.FC = () => {

    const [recentQuizzes, setRecentQuizzes] = useState<any>();
    

    useEffect(() => {
        const collectionRef = firestore.collection("quizzes")
        collectionRef.orderBy("createdAt").limit(3).get()
            .then((query) => {
                let queryResults: any = []
                query.forEach((doc) => {
                    let docData = doc.data()
                    docData.createdBy.get()
                        .then((document: any) => {
                            let allInfo = document.data();
                            const displayName = allInfo.displayName
                            queryResults = [...queryResults, {...docData, uid: doc.id, displayName}]
                            setRecentQuizzes(queryResults)
                            console.log(queryResults)
                        })
                })
            })

    },[])

    
    return(
        <aside data-testid={"recent-quiz-container"}>
            {   
                recentQuizzes && 
                recentQuizzes.map((elem:any, index: number) => {
                    return(
                        <div key={`recentQuiz-${index}`}>
                            <p>{elem.quiz.title}</p>
                            <p>{elem.displayName}</p>
                            <p>{elem.createdAt.toDate().toLocaleString()}</p>
                        </div>
                    )
                })
            }
        </aside>
    )
}

export default RecentQuiz