import * as React from 'react';
import MyQuizzes from './MyQuizzes';
import SignOut from './SignOut';
import { Link } from 'react-router-dom';

interface IProps {
    action: (event: React.MouseEvent<HTMLDivElement>) => void
}

const UserDropdown: React.FC<IProps> = ({ action }) => {

    return (
        <div 
            onClick={action}
            className={"navbar-modal-background"}>
            <div 
                className={"navbar-dropdown"}
                onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                    e.stopPropagation();
                }}>
                <SignOut />
                <MyQuizzes />
                <Link 
                    to={"/createquiz"}
                    className={"navbar-dropdown-link"}>New Quiz</Link>
            </div>
        </div>
    )
}

export default UserDropdown