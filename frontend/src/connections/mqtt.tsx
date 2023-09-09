"use client"

import { useEffect, useState } from 'react';
import io from "socket.io-client";

export function getSensorVal() {
    const [sensor, setSensor] = useState<any>([])

    useEffect(() => {
        const socket = io("http://localhost:5678")

        socket.on('esp/sensor', (data) => {
            setSensor((preData: any) => {
                if (preData.length > 10) {
                    preData.splice(0, 1)
                }
                return [...preData, JSON.parse(data)]
            });
        })

        return () => {
            socket.disconnect()
        }
    }, [])

    return sensor;
}

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

export const pubLedRGB = (inputState: boolean) => {
    console.log(inputState)
    const socket = io("http://localhost:5678")
    socket.emit("esp/ledrgb", inputState ? "on" : "off")
}