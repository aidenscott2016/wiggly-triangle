import { Mapping } from "../../utils/KeyPresser";
import { WrappedAtom } from "../../shapes/Atom";
import { Circle } from "../../shapes/Circle";
import { Key, KEY_A, KEY_B, KEY_C } from "../../types";
import { useSettings } from "./SettingsReducer";

type State = {
  map: Mapping[];
};


export const SettingsPane = () => (
  <div>
    <KeyBinds />
    <KeyBinder />
  </div>
);

export const KeyBinds = () => {
  const [{mappings}]= useSettings()
  return (
    <table>
      <thead>
        <tr><th colSpan={2}>Bound keys</th></tr>
        <tr>
          <th>Key</th>
          <th>Component</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(mappings).map(([k, v], i) => (
          <tr key={i}>
            <td>{k}</td>
            <td>{v}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export const KeyBinder = () => {
  const [{componentsAvailable}, dispatch]= useSettings()
  return (
    <div>
      <label htmlFor="key">key</label>
      <input type="text" name="key" />
      <select>
        {Object.entries(componentsAvailable).map((k, v) => (
          <option>{k}</option>
        ))}
      </select>
      <button>add</button>
    </div>
  );
};
