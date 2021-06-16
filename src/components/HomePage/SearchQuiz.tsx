import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom"

const SearchQuiz: React.FC = () => {

    const [searchTerm, setSearchTerm] = useState<string>("");

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setSearchTerm(event.target.value)
    }

    return(
        <form>
            <input 
                type="text" 
                value={searchTerm} 
                onChange={handleSearchChange}
                data-testid={"quiz-search-input"} />

            <button
                data-testid={"quiz-search-button"}>Search quiz</button>
            <Link to={`/answerquiz/${searchTerm}`} data-testid={"quiz-id-link"}>Find quiz by ID</Link>
        </form>
    )
}

export default SearchQuiz