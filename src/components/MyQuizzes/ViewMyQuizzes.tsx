import * as React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../App';
import InfiniteScrollQuizzes from './InfiniteScrollQuizzes';
import UserInfo from './UserInfo';
import "../../stylesheets/myQuizzes.css"

const ViewMyQuizzes: React.FC = () => {

    const [user] = useAuthState(auth)

    return (
        <div>
            <div className={"outer-container"}>
                <InfiniteScrollQuizzes userInfo={user} />
                <UserInfo />
            </div>
        </div>
    )
}

export default ViewMyQuizzes