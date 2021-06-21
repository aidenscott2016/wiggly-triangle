import React, { useEffect, useState } from 'react';
import { randomPos } from '../util';
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
  const [position, updatePosition] = useState({});
  useEffect(() => updatePosition(randomPos()), []);
  return (
    <div>
      <div
        style={{
          ...position,
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