import { format } from "date-fns/fp";
import React from "react";
import { setInterval } from "timers";
import { SettingsPane } from "./components/settings/KeyMapSelector";
import { Henry, One245, Circl, Coffee, Firex, Orbital, Squa, Trigany } from "./shapes/simple";
import { WrappedAtom } from "./shapes/Atom";
import { Gnarly } from "./shapes/Gnarly";
import { Wiggler } from "./shapes/Wiggler";
import "./style.css";
import { KeyPresser } from "./utils/KeyPresser";

const settings = [
        {key: '1', component: Trigany},
        { key: "2", component: Circl },
        {key: '3', component: Squa},
        { key: "4", component: Henry },
        { key: "5", component: WrappedAtom },
        { key: "6", component: Wiggler },
        { key: "7", component: One245 },
        { key: "8", component: Coffee },
        {key: '9', component: Firex},
        {key: '0', component: Orbital},
];
const App = () => (
  <>
    {/* <Gnarly/> */}
    {/* <SettingsPane/> */}
    <KeyPresser mappings={settings} />
  </>
);


export default App;


export const Clock = () => {
  const formatTime = format("Hmm");

  const [time, setTime] = React.useState(formatTime(new Date()));
  React.useEffect(() => {
    setInterval(() => setTime(formatTime(Date.now())), 1000);
  });

  return (
    <div style={{ width: "25%" }}>
      you're mum
    </div>
  );
};
