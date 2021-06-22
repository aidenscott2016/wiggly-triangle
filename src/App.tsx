import { KeyPresser } from "./KeyPresser";
import { Atom } from "./shapes/Atom";
import { Circle, ConfettiCircle } from "./shapes/Circle";


const App = () => {
  return (
    <KeyPresser
      mappings={[
        { key: "a", component: Atom },
        { key: "b", component: Circle },
        { key: "c", component: ConfettiCircle },
      ]}
    />
  );
};

export default App;
