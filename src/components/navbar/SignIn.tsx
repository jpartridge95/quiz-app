import * as React from 'react';
import { useState } from 'react';
import { auth, firestore } from "../../App"
import firebase from "firebase"
import { GoogleAuthProvider } from '@firebase/auth-types';

const SignIn: React.FC = () => {

    const [cookiesAccepted, setcookiesAccepted] = useState(true);

    let localCookies: string | null = localStorage.getItem("cookies-accepted")

    React.useEffect(() => {
        if (localStorage.getItem("cookies-accepted") === "yes") {
            setcookiesAccepted(true)
        }
    }, [localCookies])

    const SignInWithGoogle = (event: React.MouseEvent<HTMLButtonElement>):void => {
        event.preventDefault()
        const provider:GoogleAuthProvider = new firebase.auth.GoogleAuthProvider()
        auth.signInWithPopup(provider)
        
        .then(() => {
            const signedInUserRef:firebase.firestore.DocumentReference = firestore.collection("users").doc(auth.currentUser?.uid);

            signedInUserRef.set({
                displayName: auth.currentUser?.displayName,
                email: auth.currentUser?.email,
                photoURL: auth.currentUser?.photoURL,
                lastSignIn: firebase.firestore.FieldValue.serverTimestamp()
            }, {merge: true})
            .catch((error:any) => console.log(error))
        })
    }
    

    return (
            cookiesAccepted 
                ? 
                <button 
                    onClick={SignInWithGoogle}
                    className={"navbar-sign-in"}>Sign in with Google</button>
                :
                <button>You must accept cookies to sign in</button>
    )
}

export default SignIn