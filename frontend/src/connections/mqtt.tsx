"use client"

import { useEffect, useState } from 'react';
import io from "socket.io-client";

export function getCurrentSensorVal() {
    const [sensor, setSensor] = useState<any>({})

    useEffect(() => {
        const socket = io("http://localhost:5678")

        socket.on('esp/sensor', (data) => {
            setSensor(JSON.parse(data));
        })

        return () => {
            socket.disconnect()
        }
    }, [])

    return sensor;
}

export const pubLedY = (inputState: boolean) => {
    const socket = io("http://localhost:5678")
    socket.emit("esp/ledy", inputState ? "on" : "off")
}

export const pubFan = (inputState: boolean) => {
    console.log(inputState)
    const socket = io("http://localhost:5678")
    socket.emit("esp/fan", inputState ? "on" : "off")
}