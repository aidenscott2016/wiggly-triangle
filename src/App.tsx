import React from "react";
import { WrappedAtom } from "./shapes/Atom";
import { Circle } from "./shapes/Circle";
import { Wiggler } from "./shapes/Wiggler";
import "./style.css";
import { KeyPresser } from "./utils/KeyPresser";
import henry from "./images/henry.gif";
import one245 from "./images/125.gif"
import circl from './images/circl.gif'
import coffee from './images/coffee.gif'
import firex from './images/firex.gif'
import orbital from './images/orbital.gif'
import squa from './images/squa.gif'
import trigant from './images/Triang.gif'
import Display from "seven-segment-display";
import { setInterval } from "timers";
import { format } from "date-fns/fp";
import { Gnarly } from "./shapes/Gnarly";

const App = () => (
  <>
    {/* <Gnarly/> */}
    <KeyPresser
      mappings={[
        { key: "a", component: WrappedAtom },
        { key: "h", component: Henry },
        { key: "w", component: Wiggler },
        { key: "n", component: Clock },
        { key: "o", component: One245 },
        { key: "c", component: Circl },
        { key: "b", component: Coffee },
        {key: 'f', component: Firex},
        {key: 'o', component: Orbital},
        {key: 's', component: Squa},
        {key: 't', component: Trigany},
      ]}
    />
  </>
);

export default App;

export const Henry = () => <img alt="" src={henry} />;
export const One245  = () => <img alt="" src={one245} />;
export const Circl  = () => <img alt="" src={circl} />;
export const Coffee  = () => <img alt="" src={coffee} />;
export const Firex  = () => <img alt="" src={firex} />;
export const Trigany = () => <img alt="" src={trigant} />;
export const Squa = () => <img alt="" src={squa} />;
export const Orbital = () => <img alt="" src={orbital} />;

export const Clock = () => {
  const formatTime = format("Hmm");

  const [time, setTime] = React.useState(formatTime(new Date()));
  React.useEffect(() => {
    setInterval(() => setTime(formatTime(Date.now())), 1000);
  });

  return (
    <div style={{ width: "25%" }}>
      <Display value={"hello"} />
    </div>
  );
};
