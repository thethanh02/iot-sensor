"use client"

import React, { useEffect, useState } from 'react';

function TimeNow() {
    const [now, setNow] = useState<string>()

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(new Date().toUTCString())
        }, 1000)

        return () => {
            clearInterval(interval)
        }
    }, [])

    return (
        <div>
            {now}
        </div>
    );
}

export default TimeNow