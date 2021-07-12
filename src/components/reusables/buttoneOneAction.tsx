import * as React from 'react';
import { useState, useEffect } from 'react';

interface IButton {
    action: () => void,
    text: string
}

const ButtonOneAction: React.FC<IButton> = ({action, text}) => {

    return (
        <button onClick={action}>{text}</button>
    )
}

export default ButtonOneAction;