import * as React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../App';
import InfiniteScrollQuizzes from './InfiniteScrollQuizzes';
import NavBar from "../navbar/navbar"

const ViewMyQuizzes: React.FC = () => {

    const [user] = useAuthState(auth)

    return (
        <div>
            <NavBar />
            <p>Hello {user?.displayName}, here are all of your quizzes</p>
            <InfiniteScrollQuizzes userInfo={user} />
        </div>
    )
}

export default ViewMyQuizzes