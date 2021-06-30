import { Atom, WrappedAtom } from "./shapes/Atom";
import { Wiggler } from "./shapes/Wiggler";
import Wiv from 'react-wiv'
import { Circle } from "./shapes/Circle";
import { KeyPresser } from "./utils/KeyPresser";
import './style.css'

const App = () => (
  <>
    <KeyPresser
      mappings={[
        { key: "a", component: WrappedAtom },
        { key: "b", component: Circle },
        { key: "w", component: Wiggler },
        // { key: "c", component:s ConfettiCircle },
      ]} />
  </>
);

export default App;
