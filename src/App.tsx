import { WrappedAtom } from "./shapes/Atom";
import { Circle } from "./shapes/Circle";
import { Wiggler } from "./shapes/Wiggler";
import './style.css';
import { KeyPresser } from "./utils/KeyPresser";

const App = () => (
  <>
    <p>test</p>
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
