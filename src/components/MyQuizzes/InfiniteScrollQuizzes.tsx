import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { firestore } from '../../App';
import { auth } from '../../App';

const InfiniteScrollQuizzes:React.FC = () => {
    

    const [results, setResults] = useState<any>([]);
    const [pageNumber, setPageNumber] = useState(0);
    const loader = useRef<any>(null);
    const [user, loading, error] = useAuthState(auth)
    

    const quizzesRef = firestore.collection("quizzes");
    let userRef = firestore.collection("users").doc(user?.uid)
    let quizQuery = quizzesRef.where("createdBy", "==", userRef)
    // add useeffect/useauth to get uid and usestate to store uid



    const handleObserver = React.useCallback((entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
            setPageNumber((prev) => prev + 1);
        }
    },[])

    useEffect(() => {
        const interObserver = new IntersectionObserver(handleObserver);
        if (loader.current) {
            interObserver.observe(loader.current)
        }
    }, [handleObserver])
    
    useEffect(() => {
        quizQuery.orderBy("createdAt").limit(5).startAt(pageNumber).get()
            .then((queryResults) => {
                queryResults.forEach((doc) => {
                    setResults((state:any) => [...state, doc.data()])
                })
            })
    }, [user])
    // needs stored uid as dependency

    return (
        <div>

            {results.map((elem:any, index:number) => (
                <div key={"MQ-" + index}>
                    <h3>{elem.quiz.title}</h3>
                    <p>Number of questions in quiz - {elem.quiz.questions.length}</p>
                    <p>Created on: {elem.createdAt.toDate().toLocaleString().split(",")[0]}</p>
                </div>
            ))}

            
            <div ref={loader}></div>
        </div>
    )
}

export default InfiniteScrollQuizzes;