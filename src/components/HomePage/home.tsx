import React, { FunctionComponent } from 'react';
import NavBar from '../navbar/navbar';
import RecentQuiz from './RecentQuiz';
import SearchQuiz from './SearchQuiz';

const Home:FunctionComponent = () => {

    return (
        <div>
            <NavBar />
            <SearchQuiz />
            <RecentQuiz />
        </div>
    )
}

export default Home