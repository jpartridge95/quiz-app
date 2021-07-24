import * as React from 'react';
import { useState, useEffect } from 'react';
import { firestore } from '../../App';
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
                        })
                })
            })

    },[])

    
    return(
        <aside data-testid={"recent-quiz-container"} className={"homepage-recent-container"}>
            <h2 className={"homepage-recent-header"}>Recent quizzes</h2>
            <div className={"homepage-recent-inner"}>
                {   
                    recentQuizzes && 
                    recentQuizzes.map((elem:any, index: number) => {
                        let { title } = elem.quiz;
                        return(
                            <div key={`recentQuiz-${index}`} className={"homepage-recent-component"}>
                                <Link 
                                    to={"/answerquiz/" + elem.uid}
                                    className={"homepage-recent-subheader"}>{title.join(" ")[0].toUpperCase() + title.join(" ").substring(1)}</Link>
                                <p className={"homepage-recent-details"}>Created by: {elem.displayName}</p>
                                <p className={"homepage-recent-details"}>Submitted on: {elem.createdAt.toDate().toLocaleString().split(",")[0]}</p>
                            </div>
                        )
                    })
                }
            </div>
        </aside>
    )
}

export default RecentQuiz