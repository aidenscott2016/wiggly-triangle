import React from "react";
import logo from "./logo.svg";
import "./App.css";


type Keymapping = Record<string, () => () => JSX.Element>
type Config = {
  keymap: Keymapping
}

const keymap: Keymapping = {
  q : () => Atom,
  w : () => Circle
}


const Atom = () => <img src={logo} className="App-logo" alt="logo" />;
const Circle = () => <div style={{backgroundColor: 'red', height:"50px", width:"50px", borderRadius: "25px"}}></div>
function App() {
  const [atomVisibile, setAtomVisibile] = React.useState(false);
  return (
    <div id='app' style={{width: "100%", height:"100%"}}
      tabIndex={1}
      onKeyUp={(e: { key: string; }) => {
        if (e.key === "q") {
          setAtomVisibile(false);
        }
      }}
      onKeyDown={(e: { key: string; }) => {
        console.log('a button was pressed')
        if (e.key === "q") {
        console.log('it was q')

          setAtomVisibile(true);
        }
      }}
    >
      <Circle/>
      {atomVisibile ? <Atom /> : null}
    </div>
  );
}

export default App;
