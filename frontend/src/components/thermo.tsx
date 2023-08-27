"use client"

import { useEffect } from "react";
import { animated, useSpring } from "react-spring";
import styled from "styled-components";

const applySeparator = (num: number, locale?: string) => {
    return new Intl.NumberFormat(locale).format(num);
};

const toSiNumber = (val: number | string) => {
    const value = +val;
    let si: number = value;
    let symbol = "";

    if (value >= 1e9) {
        si = value / 1e9;
        symbol = "G";
    } else if (value >= 1e6) {
        si = value / 1e6;
        symbol = "M";
    } else if (value >= 1e3) {
        si = value / 1e3;
        symbol = "K";
    }
    const price = applySeparator(si);
    return `${price}${symbol}`;
};

const Container = styled.div`
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  width: 44px;
  border-radius: 50px;
  padding: 6px;
  padding-top: 16px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const Base = styled.div`
  width: 30px;
  height: 30px;
  background: #fc0;
  border-radius: 50px;
`;

const Line = styled(animated.div)`
  min-height: 240px;
  width: 12px;
  background-image: linear-gradient(rgb(147, 0, 0), #fc0);
  border-radius: 50px;
  margin-bottom: -10px;
  position: relative;
`;

const Value = styled.div`
  position: absolute;
  top: 120px;
  right: -92px;
  transform: rotate(-90deg);
  font-size: 11px;
  color: #fff;
  display: flex;
  height: 12px;
  width: 200px;
  text-align: right;
  justify-content: flex-end;
  gap: 2px;
`;

const Ticks = styled.div`
  position: absolute;
  background-image: linear-gradient(
    rgba(0, 0, 0, 0.3) 0%,
    rgba(0, 0, 0, 0.3) 10%,
    transparent 10%
  );
  background-size: 5px 20px;
  background-repeat: repeat-y;
  width: 100%;
  height: 100%;
`;

export default function Thermometer({ value = 0.9, goal = 0 }) {
    const [spring, set] = useSpring(() => ({ value }));

    useEffect(() => {
        set({ value });
    }, [value, set]);

    return (
        <Container>
            <Line
                style={{
                    WebkitMaskImage: spring.value.to(
                        (val) =>
                            `linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25) ${(1 - val) * 100
                            }%, black ${(1 - val) * 100}%, black)`
                    )
                }}
            >
                <Ticks />
            </Line>
            <Value>
                <animated.span style={{ color: "#fc0" }}>
                    {spring.value.to((val) => toSiNumber(val * goal))}
                </animated.span>
                <span>°C / {toSiNumber(goal)}</span>°C
            </Value>
            <Base />
        </Container>
    );
}
