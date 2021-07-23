import React, { StyleHTMLAttributes } from "react";
import Draggable from "react-draggable";
import { useKeyboardInstrument } from "../hooks/useKeyboardInstrument";
import { addNote, usePlayback } from "../hooks/usePlayback";
import { Event, Key } from "../types";
import { isUpperCase } from "../util";

export type IsVisible = { visible?: boolean };

export type KeyMapping = {
  key: string;
};

export type ShapeMapping = KeyMapping & {
  component: (props: IsVisible) => JSX.Element;
};

export type ActionMappings = Record<Key, Function>;

type Settings = {
  shapes: ShapeMapping[];
  actions: ActionMappings;
};

type Props = Settings;

export const KeyPresser = ({ shapes, actions }: Props) => {
  const masterKeyDown = (key: Key) => {
    addKeyDown(key);
    if (actions[key]) {
      console.log("sdpecial key");
      dispatch(actions[key](key));
      dispatchPlayback(actions[key](key));
    }
  };

  const masterKeyUp = (key: Key) => {
    if (!isUpperCase(key)) {
      addKeyUp(key);
    }
  };
  const { dispatch, addKeyDown, addKeyUp, pressedKeys, state } =
    useKeyboardInstrument();
  const { dispatch: dispatchPlayback, keys ,timline} = usePlayback({
    handleKeyDown: masterKeyDown,
    handleKeyUp: masterKeyUp,
  });

  React.useEffect(() => {}, [pressedKeys]);

  const handleKeyDown: React.KeyboardEventHandler = (e) => {
    e.preventDefault();
    dispatchPlayback(addNote({ key: e.key, e: Event.KeyDown }));
    return masterKeyDown(e.key);
  };

  const handleKeyUp: React.KeyboardEventHandler = (e) => {
    e.preventDefault();
    dispatchPlayback(addNote({ key: e.key, e: Event.KeyUp }));
    return masterKeyUp(e.key);
  };

  return (
    <>
      {/* <p style={{ zIndex: 100, position: 'absolute', margin: 0}}>{keys}</p>
      <p style={{ zIndex: 100, paddingTop: '4em'}}>{JSON.stringify(timline)}</p> */}
      <div
        className="full-height"
        tabIndex={1}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
      >
      {shapes.map((m, i) => {
        const visible = pressedKeys[m.key];
        let coords = {};
        if (state.currentKey === m.key) {
          coords = state.shapes[state.currentKey]
            ? state.shapes[state.currentKey].coords
            : {};
        }
        const style: React.CSSProperties = visible
          ? { position: "absolute", ...coords, mixBlendMode: "hard-light" }
          : { display: "none" };
        return (
          <div key={i} style={style}>
            {m.component({ visible })}
          </div>
        );
      })}
      </div>
    </>
  );
};
