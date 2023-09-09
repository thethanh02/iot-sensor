"use client"

import { pubLedY } from '@/connections/mqtt'
import '../styles/test.css'

function LightBulb() {
    const handleToggle = (e:any) => {
        pubLedY(e.target.checked)
    }

    return (
        <div className="switch large flex">
            <input type="checkbox" name="toggle" onChange={handleToggle} />
            <label htmlFor="toggle">
                <i className="bulb">
                    <span className="bulbCenter"></span>
                    <span className="reflections"><span></span></span>
                    <span className="sparks">
                        <i className="spark1"></i>
                        <i className="spark2"></i>
                        <i className="spark3"></i>
                        <i className="spark4"></i>
                    </span>
                </i>
            </label>
        </div>
    );
}

export default LightBulb;