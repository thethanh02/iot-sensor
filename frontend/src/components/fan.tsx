"use client"

import { pubLedRGB } from '@/connections/mqtt';
import '../styles/fan.css'

function Fan() {
    const handleToggle = (e:any) => {
        pubLedRGB(e.target.checked)
    }

    return (
        <div className="fan-switch large">
            <input type="checkbox" name="toggle" onChange={handleToggle} />
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