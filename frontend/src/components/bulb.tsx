"use client"

import '../styles/bulb.css'

function Bulb() {
    return (
        <div className='bulbContainer1'>
            <i className="bulb1">
                <span className="bulbCenter1"></span>
                <span className="reflections1"><span></span></span>
                <span className="sparks1">
                    <i className="spark11"></i>
                    <i className="spark12"></i>
                    <i className="spark13"></i>
                    <i className="spark14"></i>
                </span>
            </i>
        </div>
    );
}

export default Bulb;