import * as React from 'react';
import { useState, useEffect } from 'react';
import { firestore } from '../../App';
import { IAnswer, IQuestions, answer } from "../../types/types"
import { Link } from 'react-router-dom';



const RecentQuiz: React.FC = () => {

    const [recentQuizzes, setRecentQuizzes] = useState<any>();
    

    useEffect(() => {
        const collectionRef = firestore.collection("quizzes")
        collectionRef.orderBy("createdAt", "desc").limit(3).get()
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
                    let { title } = elem.quiz;
                    return(
                        <div key={`recentQuiz-${index}`}>
                            <Link to={"/answerquiz/" + elem.uid}>{title.join(" ")[0].toUpperCase() + title.join(" ").substring(1)}</Link>
                            <p>Created by: {elem.displayName}</p>
                            <p>Submitted on: {elem.createdAt.toDate().toLocaleString().split(",")[0]}</p>
                        </div>
                    )
                })
            }
        </aside>
    )
}

export default RecentQuiz