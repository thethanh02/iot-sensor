"use client"

import '../styles/fan.css'

function Fan() {
    return (

        <div className="fan-switch large">
            <input type="checkbox" name="toggle" />
            <label htmlFor="toggle">
                <i className="fan-container">
                    <div className="fan__blades">
                        <div className="center"></div>
                        <div className="blade"><span></span></div>
                        <div className="blade"><span></span></div>
                        <div className="blade"><span></span></div>
                        <div className="blade"><span></span></div>
                    </div>
                </i>
            </label>
        </div>
    );
}

export default Fan;