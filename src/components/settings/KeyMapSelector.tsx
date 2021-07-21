import { Mapping } from "../../utils/KeyPresser";
import { WrappedAtom } from "../../shapes/Atom";
import { Circle } from "../../shapes/Circle";
import { Key, KEY_A, KEY_B, KEY_C } from "../../types";

type State = {
  map: Mapping[];
};

const COMPONENT_ATOM = "Atom";
const COMPONENT_CIRCLE = "Circle";
type ComponentNames = typeof COMPONENT_ATOM | typeof COMPONENT_CIRCLE;
type Components = Record<ComponentNames, () => JSX.Element>;
const allComponents: Components = {
  Atom: WrappedAtom,
  Circle: Circle,
};

type Mapping2 = Record<Key, keyof Components>;
const mapping: Mapping2 = {
  [KEY_A]: COMPONENT_ATOM,
  [KEY_C]: COMPONENT_CIRCLE,
  [KEY_B]: COMPONENT_CIRCLE,
};

export const SettingsPane = () => (
  <div>
    <KeyBinds />
    <KeyBinder />
  </div>
);

export const KeyBinds = () => (
  <table>
    <thead>
      <tr><th colSpan={2}>Bound keys</th></tr>
      <tr>
        <th>Key</th>
        <th>Component</th>
      </tr>
    </thead>
    <tbody>
      {Object.entries(mapping).map(([k, v],i) => (
        <tr key={i}>
          <td>{k}</td>
          <td>{v}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export const KeyBinder = () => {
  return (
    <div>
      <label htmlFor="key">key</label>
      <input type="text" name="key" />
      <select>
        {Object.entries(allComponents).map((k, v) => (
          <option>{k}</option>
        ))}
      </select>
    </div>
  );
};
