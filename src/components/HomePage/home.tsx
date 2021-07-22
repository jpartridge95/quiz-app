import React, { FunctionComponent } from 'react';
import RecentQuiz from './RecentQuiz';
import SearchQuiz from './SearchQuiz';
import "../../stylesheets/homepage.css";

const Home:FunctionComponent = () => {

    return (
        <div>
            <div className={"homepage-container"}>
                <SearchQuiz />
                <RecentQuiz />
            </div>
        </div>
    )
}

export default Home