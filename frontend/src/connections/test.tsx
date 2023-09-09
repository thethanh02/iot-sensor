"use client"

import { connect } from "mqtt";

export function test() {
    const client = connect('mqtt://localhost:1884');
    client.on('connect', () => {
        console.log('Connected');
    });
    client.on('error', (error) => {
        console.log(error);
    });
    client.on('message', (topic, message) => {
        var rawMess = message.toString()
        var newMess = rawMess.substring(0, rawMess.length-1) + `,"time": "${new Date().toLocaleString()}"}`
        console.log(topic, message.toString())
    });
    client.subscribe('esp/sensor');
}

export function testPub(inputState: boolean) {
    const client = connect('mqtt://localhost:1884');
    client.on('connect', () => {
        console.log('Connected');
    });
    client.on('error', (error) => {
        console.log(error);
    });
    client.on('message', (topic, message) => {
        console.log(topic, message.toString())
    });
    client.publish('esp/ledy', inputState ? "on" : "off");
}