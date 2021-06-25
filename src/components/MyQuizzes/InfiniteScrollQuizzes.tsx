import { UserCredential, UserInfo } from '@firebase/auth-types';
import { CollectionReference, DocumentData, DocumentReference } from '@firebase/firestore-types';
import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { firestore } from '../../App';
import { auth } from '../../App';

const InfiniteScrollQuizzes:React.FC<{userInfo: any}> = ({userInfo}) => {
    

    const [results, setResults] = useState<any>([]);
    const [pageNumber, setPageNumber] = useState(-1);
    const loader = useRef<any>(null);
    const [lastVisible, setLastVisible] = useState<any>(null);
    const [isLoader, setIsLoader] = useState(true);
    const [rendered, setRendered] = useState(false);
    

    const quizzesRef = firestore.collection("quizzes");
    let userRef = firestore.collection("users").doc(userInfo?.uid)
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
        if (isLoader && rendered) {
            quizQuery.orderBy("createdAt").startAfter(lastVisible).limit(5).get()
                .then((queryResults) => {
                    queryResults.forEach((doc) => {
                        setResults((state: any) => [...state, {data: doc.data(), id: doc.id}])
                    })
                    setLastVisible(queryResults.docs[queryResults.docs.length - 1])
                    if (queryResults.docs.length !== 5) {
                        setIsLoader(false)
                    } else {
                        setIsLoader(true)
                    }
                });
            }
        if (!rendered) {
            setRendered(true)
        }
    }, [userInfo, pageNumber])

    const deleteQuiz = (event: React.MouseEvent<HTMLButtonElement>) => {
        const toDeleteRef: DocumentReference = firestore.collection("quizzes").doc(event.currentTarget.name);
        toDeleteRef.delete()
            .then(() => {
                window.location.reload();
            })
    }

    return (
        <div>

            {results.map((elem:any, index:number) => (
                <div key={"MQ-" + index}>
                    <h3>{elem.data.quiz.title.join(" ")}</h3>
                    <p>Number of questions in quiz - {elem.data.quiz.questions.length}</p>
                    <p>Created on: {elem.data.createdAt.toDate().toLocaleString().split(",")[0]}</p>
                    <button onClick={deleteQuiz} name={elem.id}>Delete Quiz</button>
                </div>
            ))}

            
            <div ref={loader}>
                <p>{isLoader ? "Loading..." : "No more to display"}</p>
            </div>
        </div>
    )
}

export default InfiniteScrollQuizzes;