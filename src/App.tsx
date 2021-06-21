import { KeyPresser } from "./KeyPresser";
import { Atom } from "./shapes/Atom";
import { Circle } from "./shapes/Circle";


const App = () => {
  return (
    <KeyPresser
      mappings={[
        { key: "a", component: Atom },
        { key: "b", component: Circle },
      ]}
    />
  );
};

export default App;
