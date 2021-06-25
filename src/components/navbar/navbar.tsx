import React, { FunctionComponent } from "react"
import { auth } from "../../App"
import { useAuthState } from "react-firebase-hooks/auth"
import { User, UserCredential, UserMetadata } from "@firebase/auth-types"
import { UserInfo } from "os"
import SignIn from "./SignIn"
import SignedInUser from "./SignedInUser"
import { Link } from "react-router-dom"

const NavBar: FunctionComponent = () => {

    const [user] = useAuthState(auth)

    const { currentUser } = auth

    return (
        <nav>
            <h1>Quizzaro</h1>

            {
                !currentUser ?
                <SignIn />
                :
                <SignedInUser />
            }
            <Link to={"/"}>Home</Link>
            <Link to={"/createquiz"}>New Quiz</Link>
        </nav>
    )
}

export default NavBar