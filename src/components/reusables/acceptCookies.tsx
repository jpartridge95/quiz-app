import * as React from 'react';
import { useState, useEffect } from 'react';
import ButtonOneAction from './buttoneOneAction';

const CookieNotification: React.FC = () => {

    const [answered, setAnswered] = useState(false);
    const [cookiesAccepted, setCookiesAccepted] = useState(false);

    let localState: string | null = localStorage.getItem("cookies-accepted")

    useEffect(() => {
        if (localStorage.getItem("cookies-accepted") === "yes") {
            setAnswered(true);
            setCookiesAccepted(true);
        } else if (localStorage.getItem("cookies-accepted") === "no") {
            setAnswered(true);
        }
    }, [localState])

    const acceptCookies = () => {
        setCookiesAccepted(true);
        setAnswered(true);
        localStorage.setItem("cookies-accepted", "yes")
    }

    const rejectCookies = () => {
        setAnswered(true);
        localStorage.setItem("cookies-accepted", "no")
    }

    return (
        <div>
            {!answered && <p>Do you accept cookies?</p>}
            <ButtonOneAction 
                action={acceptCookies}
                text={"Okay"}/>
            <ButtonOneAction 
                action={rejectCookies}
                text={"No thanks"}/>
            {!cookiesAccepted && 
            <ButtonOneAction 
                action={acceptCookies}
                text={"I would like cookies actually"}/>}
        </div>
    )
}

export default CookieNotification