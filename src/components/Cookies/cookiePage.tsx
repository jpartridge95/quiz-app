import * as React from 'react';
import { useState, useEffect } from 'react';
import NavBar from "../navbar/navbar"
import ButtonOneAction from '../reusables/buttoneOneAction';

const CookiePage: React.FC = () => {

    const [cookiesAccepted, setCookiesAccepted] = useState<boolean>(false);

    const setCookiesYes = () => {
        setCookiesAccepted(true);
        localStorage.setItem("cookies-accepted", "yes");
    }

    const setCookiesNo = () => {
        setCookiesAccepted(false);
        localStorage.setItem("cookies-accepted", "no");
    }

    useEffect(() => {
        if (localStorage.getItem("cookies-accepted") === "yes") {
            setCookiesAccepted(true)
        }
    }, [])

    return (
        <div>
            <NavBar />
            <p>cookies and shizz</p>
            <ButtonOneAction 
                action={setCookiesYes}
                text={"I am okay with cookies"}/>
            <ButtonOneAction 
                action={setCookiesNo}
                text={"I do not like cookies"}/>
            <p>{cookiesAccepted ? "thanks!" : "aww, shucks"}</p>
        </div>
    )
}

export default CookiePage