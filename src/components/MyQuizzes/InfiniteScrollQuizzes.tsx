import { DocumentReference } from '@firebase/firestore-types';
import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { firestore } from '../../App';
import { Link } from 'react-router-dom';
import "../../stylesheets/myQuizzes.css"


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
                    }  // control flow to stop infinite scroll when !more results
                });
            }
        if (!rendered) {
            setRendered(true) 
            // stops initial render, thereby preventing double render of first five results
        }
     // eslint-disable-next-line
    }, [userInfo, pageNumber])
   

    const deleteQuiz = (event: React.MouseEvent<HTMLButtonElement>) => {
        const toDeleteRef: DocumentReference = firestore.collection("quizzes").doc(event.currentTarget.name);
        toDeleteRef.delete()
            .then(() => {
                window.location.reload();
            })
    }

    return (
        <div className={"infinite-container"}>

            {results.map((elem:any, index:number) => (
                <div 
                    key={"MQ-" + index}
                    className={"infinite-card"}>
                    <Link  
                        to={"/answerquiz/" + elem.id}
                        className={"infinite-header"}>{elem.data.quiz.title.join(" ")[0].toUpperCase() + elem.data.quiz.title.join(" ").substring(1)}</Link>
                    <p className={"infinite-details"}>Number of questions in quiz - {elem.data.quiz.questions.length}</p>
                    <p className={"infinite-details"}>Created on: {elem.data.createdAt.toDate().toLocaleString().split(",")[0]}</p>
                    <button 
                        onClick={deleteQuiz} 
                        name={elem.id}
                        className={"delete-button"}>Delete Quiz</button>
                </div>
            ))}

            
            <div 
                ref={loader}
                className={"infinite-card"}>
                <p>{isLoader ? "Loading..." : "No more to display"}</p> 
                {/*Probably have an animated svg for the loader*/}
            </div>
        </div>
    )
}

export default InfiniteScrollQuizzes;