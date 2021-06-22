import React from "react";
import Draggable from "react-draggable";
import { isUpperCase } from "./util";


export type IsVisible = {visible?: boolean}
type Mapping = { key: string; component: (props: IsVisible) => JSX.Element };
type Props = {
  mappings: Mapping[];
};
export const KeyPresser = ({ mappings }: Props) => {
  const [pressedKeys, updatePressedKeys] = React.useState({});

  const handleKeyDown: React.KeyboardEventHandler = (e) => {
    updatePressedKeys({ ...pressedKeys, [e.key.toLowerCase()]: true });
  };
  const handleKeyUp: React.KeyboardEventHandler = (e) => {
    if (!isUpperCase(e.key)) {
      updatePressedKeys({ ...pressedKeys, [e.key]: false });
    }
  };
  return (
    <div tabIndex={1} onKeyDown={handleKeyDown} onKeyUp={handleKeyUp}>
      {JSON.stringify(pressedKeys)}
      {mappings.map((m, i) => {
        const visible = pressedKeys[m.key]
        const style = visible ? {} : { display: "none" };
        return (
          <div key={i} style={style}>
            <Draggable>
            {m.component({visible})}
            </Draggable>
          </div>
        );
      })}
    </div>
  );
};
