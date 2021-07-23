import React, { StyleHTMLAttributes } from "react";
import Draggable from "react-draggable";
import { useKeyboardInstrument } from "../hooks/useKeyboardInstrument";
import { usePlayback } from "../hooks/usePlayback";
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
    }
  };

  const masterKeyUp = (key: Key) => {
    if (!isUpperCase(key)) {
      addKeyUp(key);
    }
  };
  const { dispatch, addKeyDown, addKeyUp, pressedKeys, state } =
    useKeyboardInstrument();
  const {
    addToTimeline,
    play,
    toggleRecording,
    isRecording,
    isPlaying,
    timeline,
  } = usePlayback({
    handleKeyDown: masterKeyDown,
    handleKeyUp: masterKeyUp,
  });

  React.useEffect(() => {}, [pressedKeys]);

  const handleKeyDown: React.KeyboardEventHandler = ({ key }) => {
    addToTimeline(key, Event.KeyDown);
    return masterKeyDown(key);
  };

  const handleKeyUp: React.KeyboardEventHandler = ({ key }) => {
    addToTimeline(key, Event.KeyUp);
    return masterKeyUp(key);
  };

  const RecordButton = () => (
    <button onClick={toggleRecording}>
      {isRecording ? "stop recording" : "record"}
    </button>
  );

  const PlayButton = () => (
    <button onClick={play}>{isPlaying ? "playing" : "play"}</button>
  );
  return (
    <div
      className="full-height"
      tabIndex={1}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
    >
      {JSON.stringify(timeline)}
      <RecordButton />
      <PlayButton />
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
  );
};
