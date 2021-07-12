import { CollectionReference, DocumentData, DocumentReference, Query, QueryDocumentSnapshot, QuerySnapshot } from '@firebase/firestore-types';
import { QueryArgs } from '@testing-library/react';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom"
import { firestore } from '../../App';
import SearchWindow from './SearchWindow';

const SearchQuiz: React.FC = () => {

    const [searchTerm, setSearchTerm] = useState<string>("");
    const [query, setQuery] = useState<Query<DocumentData>>();
    const [windowVisible, setWindowVisible] = useState<boolean>(false);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setSearchTerm(event.target.value)
        if (windowVisible === true) {
            setWindowVisible(false)
        }
    }


    // for this to work, titles and search terms have to be split into an array of words
    const handleSearch = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const quizRef: CollectionReference = firestore.collection("quizzes");
        const quizQuery: Query<DocumentData> = quizRef
            .where("quiz.title", "array-contains-any", searchTerm.toLowerCase().split(" "))
        setQuery(quizQuery)
        setWindowVisible(true)
    }

    const closeSearch = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault()
        setWindowVisible(false)
    }

    return(
        <div className={"homepage-input-container"}>
            <form className={"homepage-input-inner"}>
                <h3 className={"homepage-search-header"}>Find a Quiz</h3>
                <input 
                    type="text" 
                    value={searchTerm} 
                    onChange={handleSearchChange}
                    data-testid={"quiz-search-input"} 
                    className={"homepage-search-input"}/>

                <button
                    data-testid={"quiz-search-button"}
                    onClick={handleSearch}
                    className={"homepage-search-button homepage-green-button"}>Search quiz</button>
                <Link 
                    to={`/answerquiz/${searchTerm}`} 
                    data-testid={"quiz-id-link"}
                    className={"homepage-search-button homepage-red-button"}>Find quiz by ID</Link>

                {
                    query && windowVisible &&
                    <SearchWindow query={query} action={closeSearch}/>
                }
            </form>
        </div>
    )
}

export default SearchQuiz