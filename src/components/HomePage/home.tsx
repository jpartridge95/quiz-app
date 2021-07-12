import React, { FunctionComponent } from 'react';
import NavBar from '../navbar/navbar';
import RecentQuiz from './RecentQuiz';
import SearchQuiz from './SearchQuiz';
import "../../stylesheets/homepage.css";

const Home:FunctionComponent = () => {

    return (
        <div>
            <NavBar />
            <div className={"homepage-container"}>
                <SearchQuiz />
                <RecentQuiz />
            </div>
        </div>
    )
}

export default Home