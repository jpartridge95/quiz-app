import * as React from 'react';
import "../../stylesheets/misc.css"


const Loading: React.FC = () => {

    return (
        <div className={"loading__container"}>
            <svg width="100" height="100" className="circle-svg">
                <path 
                    d="M25 50a25 25 0 1150 0 25 25 0 11-50 0"
                    fill="none"
                    stroke="#C6E1EC"
                    strokeWidth="20"></path>
                <path 
                    d="M25 50a25 25 0 1150 0 25 25 0 11-50 0"
                    fill="none"
                    stroke="#434343"
                    strokeWidth="20"
                    className="loading"
                    id="loading"></path>
            </svg>
        </div>
    )
}

export default Loading