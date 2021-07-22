import { DocumentData, Query } from '@firebase/firestore-types';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom"


interface IProps {
    query: Query<DocumentData>,
    action: (event: React.MouseEvent<HTMLDivElement>) => void
}

const SearchWindow: React.FC<IProps> = ({ query, action }) => {

    
    const [pageNumber, setPageNumber] = useState(-1);
    const loader = React.useRef<any>(null)
    const [lastVisible, setLastVisible] = useState<any>(null);
    const [searchResults, setSearchResults] = useState<any>([]);
    const [hasRendered, setHasRendered] = useState(false);
    const [isLoader, setIsLoader] = useState(true);

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
        if (hasRendered && isLoader) {
            query.limit(5)
                .orderBy("createdAt")
                .startAfter(lastVisible)
                .get()
                    .then((docList) => {
                        docList.forEach((doc) => {
                            setSearchResults((state: any) => [...state, {data: doc.data(), id: doc.id}])
                        })
                        setLastVisible(docList.docs[docList.docs.length - 1])
                        if (docList.docs.length !== 5) {
                            setIsLoader(false)
                        } else {
                            setIsLoader(true)
                        }
                    })
                }
        setHasRendered(true)
        // eslint-disable-next-line
    }, [pageNumber])
    
    useEffect(() => {
        setSearchResults([])
    }, [query])

    return (
        <div className={"homepage-search-backdrop"} onClick={action}>
            <div 
                className={"homepage-search-container"}
                onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                    e.stopPropagation();
                }}>
                {
                    searchResults && 
                    searchResults.map((doc: any, docIdx: number) => 
                        <div 
                            key={`SR-${docIdx}`}
                            className={"homepage-search-card"}>
                            <Link 
                                to={"/answerquiz/" + doc.id}
                                className={"homepage-recent-subheader"}>{doc.data.quiz.title.join(" ")[0].toUpperCase() + doc.data.quiz.title.join(" ").substring(1)}</Link>
                            <p className={"homepage-recent-details"}>Quiz ID: {doc.id}</p>
                            <p className={"homepage-recent-details"}>Number of questions: {doc.data.quiz.questions.length}</p>
                        </div>
                    )
                }
                <div 
                    ref={loader}
                    className={"homepage-search-card"}>{isLoader ? "Loading..." : "No more to display"}</div>
            </div>
        </div>
    )
}

export default SearchWindow