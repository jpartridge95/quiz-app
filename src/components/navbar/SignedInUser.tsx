import { AdditionalUserInfo, FirebaseAuth, GoogleAuthProvider, User, UserCredential, UserInfo } from '@firebase/auth-types';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { auth } from "../../App"
import SignOut from './SignOut';
import UserDropdown from './UserDropdown';
 
const SignedInUser: React.FC = () => {

    const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);

    const { photoURL }: any  = auth.currentUser || {photoURL: "#"}

    const toggleDropdown = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        setDropdownVisible((state: boolean) => !state )
    }

    return (
        <>
            <img src={photoURL} data-testid={"user-image"}></img>
            <button onClick={toggleDropdown} data-testid={"dropdown-button"}>V</button>
            {
                dropdownVisible &&
                <UserDropdown />
            }
        </>
    )
}

export default SignedInUser