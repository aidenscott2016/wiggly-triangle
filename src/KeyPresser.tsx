import React from "react";

type Mapping = { key: string; component: () => JSX.Element };
type Props = {
  mappings: Mapping[];
};
export const KeyPresser = ({ mappings }: Props) => {
  const [keys, updateKeys] = React.useState({});

  const handleKeyDown: React.KeyboardEventHandler = (e) => {
    updateKeys({ ...keys, [e.key]: true });
  };
  const handleKeyUp: React.KeyboardEventHandler = (e) => {
    updateKeys({ ...keys, [e.key]: false });
  };
  return (
    <div tabIndex={1} onKeyDown={handleKeyDown} onKeyUp={handleKeyUp}>
      {JSON.stringify(keys)}
      {mappings.map((m, i) => {
        const style = keys[m.key] ? {} : { display: "none" } 
        return (
          <div key={i} style={style}>
            {m.component()}
          </div>
        );
      })}
    </div>
  );
};
