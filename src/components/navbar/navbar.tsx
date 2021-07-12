import React, { FunctionComponent } from "react"
import { auth } from "../../App"
import { useAuthState } from "react-firebase-hooks/auth"
import SignIn from "./SignIn"
import SignedInUser from "./SignedInUser"
import { Link } from "react-router-dom"
import "../../stylesheets/navbar.css"

const NavBar: FunctionComponent = () => {

    //eslint-disable-next-line
    const [user] = useAuthState(auth)

    const { currentUser } = auth

    return (
        <nav className={"navbar-body"}>
            <Link to={"/"} className={"navbar-header"}>Quizzaro</Link>

            {
                !currentUser ?
                <SignIn />
                :
                <SignedInUser />
            }
            {/* <Link to={"/cookies"}>Cookie Preferences</Link> */}
        </nav>
    )
}

export default NavBar