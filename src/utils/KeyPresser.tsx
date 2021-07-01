import React from "react";
import Draggable from "react-draggable";
import { useGetTimeElapsed } from "../hooks/useGetTimeElapsed";
import { usePlayback } from "../hooks/usePlayback";
import { isUpperCase } from "../util";

export type IsVisible = { visible?: boolean };
type Mapping = { key: string; component: (props: IsVisible) => JSX.Element };
type Props = {
  mappings: Mapping[];
};

type Seconds = number;
type Key = string;
type Note = [Seconds, Key, Event];
type Timeline = Note[];
enum Event {
  KeyUp,
  KeyDown,
}

export const KeyPresser = ({ mappings }: Props) => {
  const {timeline, addToTimeline, clearTimeline} = usePlayback()


  const [pressedKeys, updatePressedKeys] = React.useState({});

  const addKeyDown = (k: Key) =>
    updatePressedKeys({ ...pressedKeys, [k.toLowerCase()]: true });
  const addKeyUp = (k: Key) =>
    updatePressedKeys({ ...pressedKeys, [k.toLowerCase()]: false });

  React.useEffect(() => {
      console.log(pressedKeys)
  }, [pressedKeys]);

  const play = () =>
    timeline.forEach(([t, k, e]) => {
      setTimeout(() => {
        switch (e) {
          case Event.KeyDown:
            addKeyDown(k);
            break;
          case Event.KeyUp:
            addKeyUp(k);
        }
      }, t);
    });

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

  return (
    <div
      className="full-height"
      tabIndex={1}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
    >
      {/* <button onClick={}>record</button> */}
      {/* <button>stop recording</button> */}
      <button onClick={play}>play</button> 
      <button onClick={play}>loop</button> 
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
