import React from 'react'
import './tgButton.css'
function ToogleButton() {
    return (
        <>
            <label className="switch">
                <input type="checkbox" defaultChecked="" />
                <span className="slider round" />
            </label>


        </>
    )
}

export default ToogleButton