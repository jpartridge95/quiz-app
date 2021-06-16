import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth } from "../../App"

const MyQuizzes: React.FC = () => {

    const { uid }:any = auth.currentUser || {uid: "null"}

    return (
        <Link to={`/myquizzes/${uid}`} data-testid={"view-user-quiz"}>View my quizzes</Link>
    )
}

export default MyQuizzes