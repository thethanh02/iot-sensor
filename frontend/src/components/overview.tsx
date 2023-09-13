"use client"

import { useState } from "react";
import { Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import moment from 'moment'

export function Overview(data: any) {
  const [opacity, setOpacity] = useState<any>({
    temperature: 1,
    humidity: 1,
    light: 1
  });

  const handleMouseClick = (e: any) => {
    const { dataKey } = e;
    setOpacity({ ...opacity, [dataKey]: 1 - opacity[dataKey] });
  };

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data.data}>
        {/* <CartesianGrid
          vertical={false}
          strokeDasharray="5 15"
        /> */}
        <XAxis
          dataKey="time"
          // stroke="#888888"
          fontSize={10}
          tickLine={true}
          tickFormatter={(label) => moment(label).format('MMM Do, h:mm:ss a')}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <span className="text-[0.9rem] uppercase">
                    {moment(label).format('MMM Do YY, h:mm:ss a')}
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        Temperature
                      </span>
                      <span className="font-bold">
                        {payload[0].value}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        Humidity
                      </span>
                      <span className="font-bold">
                        {payload[1].value}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        Light
                      </span>
                      <span className="font-bold">
                        {payload[2].value}
                      </span>
                    </div>
                  </div>
                </div>
              )
            }

            return null
          }}
        />
        <Legend onClick={handleMouseClick} />
        <Line type="monotone" dataKey="temperature" stroke="#e32428" strokeWidth={2} animationDuration={800} strokeOpacity={opacity.temperature} dot={opacity.temperature === 1} />
        <Line type="monotone" dataKey="humidity" stroke="#8884d8" strokeWidth={2} animationDuration={800} strokeOpacity={opacity.humidity} dot={opacity.humidity === 1} />
        <Line type="monotone" dataKey="light" stroke="#ffd700" strokeWidth={2} animationDuration={800} strokeOpacity={opacity.light} dot={opacity.light === 1} />
      </LineChart>
    </ResponsiveContainer>
  )
}
