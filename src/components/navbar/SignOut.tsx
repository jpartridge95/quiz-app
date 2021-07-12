import * as React from 'react';
import { auth } from "../../App"

const SignOut: React.FC = () => {

    const handleSignOut = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault()
        auth.signOut()
    }

    return (
        <button 
            onClick={handleSignOut} 
            data-testid={"sign-out-button"}
            className={"navbar-signout navbar-dropdown-link"}>Sign Out</button>
    )
}

export default SignOut