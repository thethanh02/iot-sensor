"use client"

import { useState } from "react";
import { Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    "name": "A",
    "humidity": 400,
    "temperature": 240,
    "lux": 240
  },
  {
    "name": "B",
    "humidity": 300,
    "temperature": 139,
    "lux": 221
  },
  {
    "name": "C",
    "humidity": 200,
    "temperature": 980,
    "lux": 229
  },
  {
    "name": "D",
    "humidity": 278,
    "temperature": 390,
    "lux": 200
  },
  {
    "name": "E",
    "humidity": 189,
    "temperature": 480,
    "lux": 218
  },
  {
    "name": "F",
    "humidity": 239,
    "temperature": 380,
    "lux": 250
  },
  {
    "name": "G",
    "humidity": 349,
    "temperature": 430,
    "lux": 210
  }
]

export function Overview() {
  const [opacity, setOpacity] = useState<any>({
    temperature: 1,
    humidity: 1,
    lux: 1
});
  const handleMouseClick = (e: any) => {
    const { dataKey } = e;
    setOpacity({ ...opacity, [dataKey]: 1 - opacity[dataKey] });
  };

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        {/* <CartesianGrid
          vertical={false}
          strokeDasharray="5 15"
        /> */}
        <XAxis
          dataKey="name"
          // stroke="#888888"
          fontSize={0}
          tickLine={false}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
        />
        <Tooltip />
        {/* <Legend onClick={e => {setOpacity({ ...opacity, [e.dataKey]: 1 - opacity[e.dataKey]})}} /> */}
        <Legend onClick={handleMouseClick} />
        <Line type="monotone" dataKey="temperature" stroke="#8884d8" strokeWidth={2} strokeOpacity={opacity.temperature} dot={opacity.temperature === 1} />
        <Line type="monotone" dataKey="humidity" stroke="#0047ab" strokeWidth={2} strokeOpacity={opacity.humidity} dot={opacity.humidity === 1} />
        <Line type="monotone" dataKey="lux" stroke="#ffd700" strokeWidth={2} strokeOpacity={opacity.lux} dot={opacity.lux === 1} />
      </LineChart>
    </ResponsiveContainer>
  )
}