import React, { useEffect, useState } from "react";
import { IsVisible } from "../KeyPresser";
import { randomPos } from "../util";
import Confetti, { ConfettiConfig } from "react-dom-confetti";
/*

@media (prefers-reduced-motion: no-preference) {
  .App-logo {
    animation: App-logo-spin infinite 20s linear;
  }
}


@keyframes App-logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
 */

export const Circle = () => {
  return (
    <div>
      <div
        style={{
          backgroundColor: "red",
          height: "50px",
          width: "50px",
          borderRadius: "25px",
          position: "absolute",
        }}
      ></div>
    </div>
  );
};

const RandomPosition = ({ children }: React.PropsWithChildren<{}>) => {
  const [position, updatePosition] = useState({});
  useEffect(() => updatePosition(randomPos()), []);
  return <div style={{ ...position, position: "absolute" }}>{children}</div>;
};

export const ConfettiCircle = ({ visible }: IsVisible) => {
  const config: ConfettiConfig = {
    angle: 191,
    spread: 360,
    startVelocity: 64,
    elementCount: 70,
    dragFriction: 0.12,
    duration: 2070,
    stagger: 3,
    width: "9px",
    height: "10px",
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
  };
  return (
    <RandomPosition>
      <Confetti active={visible!!} config={config} />
      <Circle />
    </RandomPosition>
  );
};
