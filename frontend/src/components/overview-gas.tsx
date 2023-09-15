"use client"

import { useState } from "react";
import { Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import moment from 'moment'

export function OverviewGas(data: any) {
  const [opacity, setOpacity] = useState<any>({
    gas: 1
  });

  const handleMouseClick = (e: any) => {
    const { dataKey } = e;
    setOpacity({ ...opacity, [dataKey]: 1 - opacity[dataKey] });
  };

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data.data}>
        <XAxis
          dataKey="time"
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
                        Gas
                      </span>
                      <span className="font-bold">
                        {payload[0].value}
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
        <Line type="monotone" dataKey="gas" stroke="#b7410e" strokeWidth={2} animationDuration={800} strokeOpacity={opacity.gas} dot={opacity.gas === 1} />
      </LineChart>
    </ResponsiveContainer>
  )
}
