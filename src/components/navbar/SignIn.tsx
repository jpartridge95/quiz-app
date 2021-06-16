import * as React from 'react';
import { useState } from 'react';
import { auth, firestore } from "../../App"
import firebase from "firebase"
import { GoogleAuthProvider } from '@firebase/auth-types';

const SignIn: React.FC = () => {

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
            })
            .catch((error:any) => console.log(error))
        })
    }
    

    return (
        <button onClick={SignInWithGoogle}>Sign in with Google</button>
    )
}

export default SignIn