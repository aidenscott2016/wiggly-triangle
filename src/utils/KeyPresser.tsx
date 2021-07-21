import React from "react";
import Draggable from "react-draggable";
import { useKeyboardInstrument } from "../hooks/useKeyboardInstrument";
import { usePlayback } from "../hooks/usePlayback";
import { Event } from "../types";
import { isUpperCase } from "../util";

export type IsVisible = { visible?: boolean };
export type Mapping = { key: string; component: (props: IsVisible) => JSX.Element };
type Props = {
  mappings: Mapping[];
};

export const KeyPresser = ({ mappings }: Props) => {
  const { addKeyDown, addKeyUp, pressedKeys } = useKeyboardInstrument();
  const { addToTimeline, play, toggleRecording, isRecording , isPlaying} =
    usePlayback({
      handleKeyDown: addKeyDown,
      handleKeyUp: addKeyUp,
    });

  React.useEffect(() => {
    console.log(pressedKeys);
  }, [pressedKeys]);

  const handleKeyDown: React.KeyboardEventHandler = ({ key }) => {
    addToTimeline(key, Event.KeyDown);
    addKeyDown(key);
  };
  const handleKeyUp: React.KeyboardEventHandler = ({ key }) => {
    addToTimeline(key, Event.KeyUp);
    if (!isUpperCase(key)) {
      addKeyUp(key);
    }
  };

  const RecordButton = () => (
    <button onClick={toggleRecording}>
      {isRecording ? "stop recording" : "record"}
    </button>
  );

  const PlayButton = () => (
    <button onClick={play}>
      {isPlaying ? 'playing' : 'play'}
    </button>
  );

  return (
    <div
      className="full-height"
      tabIndex={1}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
    >
      <RecordButton/>
      <PlayButton/>
      {mappings.map((m, i) => {
        const visible = pressedKeys[m.key];
        const style = visible ? {} : { display: "none" };
        return (
          <div key={i} style={style}>
            <Draggable>{m.component({ visible })}</Draggable>
          </div>
        );
      })}
    </div>
  );
};
