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

    const closeSearch = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        setWindowVisible(false)
    }

    return(
        <form>
            <input 
                type="text" 
                value={searchTerm} 
                onChange={handleSearchChange}
                data-testid={"quiz-search-input"} />

            <button
                data-testid={"quiz-search-button"}
                onClick={handleSearch}>Search quiz</button>
            <Link to={`/answerquiz/${searchTerm}`} data-testid={"quiz-id-link"}>Find quiz by ID</Link>
            {
                windowVisible && 
                <div>
                    <p>
                        you have searched for {searchTerm}
                    </p>
                </div>
            }

            {
                query && windowVisible &&
                <SearchWindow query={query} action={closeSearch}/>
            }
        </form>
    )
}

export default SearchQuiz