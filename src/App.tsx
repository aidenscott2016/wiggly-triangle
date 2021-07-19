import { WrappedAtom } from "./shapes/Atom";
import { Circle } from "./shapes/Circle";
import { Wiggler } from "./shapes/Wiggler";
import './style.css';
import { KeyPresser } from "./utils/KeyPresser";
import henry from './images/henry.gif'


const App = () => (
  <>
    <KeyPresser
      mappings={[
        { key: "a", component: WrappedAtom },
        { key: "h", component:  Henry},
        { key: "b", component: Circle },
        { key: "w", component: Wiggler },
      ]} />
  </>
);

export default App;


export const Henry =  () => <img alt='' src={henry}/>