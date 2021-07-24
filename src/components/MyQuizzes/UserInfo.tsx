import * as React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../App';
import "../../stylesheets/myQuizzes.css"

const UserInfo: React.FC = () => {

    let { photoURL }: any = auth.currentUser || {photoURL: "#"}

    return (
        <aside className={"user-info-outer"}>
            <div className={"details-container"}>
                <h3 className={"user-info-header"}>{auth.currentUser?.displayName}</h3>
                <img 
                    alt={""} 
                    src={photoURL}
                    className={"user-info-image"}></img>
                <p className={"user-info-details"}><span>Email:</span> <br></br> {auth.currentUser?.email}</p>
            </div>
            <div className={"create-quiz-container"}>
                <Link 
                    to={"/createquiz"}
                    className={"create-quiz-button"}>New Quiz</Link>
            </div>
        </aside>
    )
}

export default UserInfo