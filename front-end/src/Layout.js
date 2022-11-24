import React from 'react';



export default function Layout({children}){
    
    return (
        <div id='site'>

            <div>
                { children }
            </div>
        </div>
    )
}
