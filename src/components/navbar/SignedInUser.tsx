import * as React from 'react';
import { useState } from 'react';
import { auth } from "../../App"
import UserDropdown from './UserDropdown';
 
const SignedInUser: React.FC = () => {

    const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);

    const { photoURL }: any  = auth.currentUser || {photoURL: "#"}

    const toggleDropdown = (event: React.MouseEvent<HTMLElement>): void => {
        event.preventDefault();
        setDropdownVisible((state: boolean) => !state )
    }

    const closeModal = (event: React.MouseEvent<HTMLDivElement>) => {
        setDropdownVisible(false)
    }

    return (
        <>
            <img 
                src={photoURL}
                alt={"User Pic"}
                onClick={toggleDropdown} 
                data-testid={"dropdown-button"}
                className={"navbar-picture"}></img>
            {
                dropdownVisible &&
                <UserDropdown
                    action={closeModal} />
            }
        </>
    )
}

export default SignedInUser