import * as React from 'react';
import { useState, useEffect } from 'react';
import MyQuizzes from './MyQuizzes';
import SignOut from './SignOut';

const UserDropdown: React.FC = () => {

    return (
        <div>
            <SignOut />
            <MyQuizzes />
        </div>
    )
}

export default UserDropdown