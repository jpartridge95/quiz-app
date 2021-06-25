import { DocumentData, Query } from '@firebase/firestore-types';
import * as React from 'react';
import { useState, useEffect } from 'react';


interface IProps {
    query: Query<DocumentData>,
    action: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const SearchWindow: React.FC<IProps> = ({query, action}) => {


    return (
        <div>
            <p>hi</p>
            <button onClick={action} >Close window</button>
        </div>
    )
}

export default SearchWindow