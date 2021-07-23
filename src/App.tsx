import React from "react";
import { cycleLocationBack, cycleLocationFore } from "./hooks/useKeyboardInstrument";
import { clearTimeLine, togglePlaying, toggleRec } from "./hooks/usePlayback";
import { WrappedAtom } from "./shapes/Atom";
import {
  Circl,
  Coffee,
  Firex, Henry,
  One245, Orbital,
  Squa,
  Trigany
} from "./shapes/simple";
import { Wiggler } from "./shapes/Wiggler";
import "./style.css";
import { KeyPresser } from "./utils/KeyPresser";

export const settings = {
  shapes: [
    { key: "1", component: Trigany },
    { key: "2", component: Circl },
    { key: "3", component: Squa },
    { key: "4", component: Henry },
    { key: "5", component: WrappedAtom },
    { key: "6", component: Wiggler },
    { key: "7", component: One245 },
    { key: "8", component: Coffee },
    { key: "9", component: Firex },
    { key: "0", component: Orbital },
  ],
  actions: {
    '[': cycleLocationBack,
    ']': cycleLocationFore,
    'Tab': toggleRec,
    'Enter': togglePlaying,
    'Escape': clearTimeLine
  }
};
const App = () => (
  <>
    <KeyPresser {...settings} />
  </>
);

export default App;

