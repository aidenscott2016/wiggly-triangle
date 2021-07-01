import React from "react";
import Draggable from "react-draggable";
import { isUpperCase } from "../util";

export type IsVisible = { visible?: boolean };
type Mapping = { key: string; component: (props: IsVisible) => JSX.Element };
type Props = {
  mappings: Mapping[];
};

type Seconds = number;
type Key = string;
type Note = [Seconds, Key];
type Timeline = Note[];

export const KeyPresser = ({ mappings }: Props) => {
  const useTimeElapsed = () => {
    const [startTime, setStartTime] = React.useState(0);
    React.useEffect(() => {
      setStartTime(performance.now());
    }, []);
    return () => performance.now() - startTime;
  };

  const [pressedKeys, updatePressedKeys] = React.useState({});
  const [timeline, updateTimeline] = React.useState<Timeline>([]);
  const timeElapsed = useTimeElapsed()

  const addToTimeline = (e: Event) => {
    updateTimeline([...timeline]);
  };

  const clearTimeline = () => updateTimeline([]);

  React.useEffect(() => {
    document.title = JSON.stringify(pressedKeys);
  }, [pressedKeys]);

  const handleKeyDown: React.KeyboardEventHandler = (e) => {
    console.log(timeElapsed())
    updatePressedKeys({ ...pressedKeys, [e.key.toLowerCase()]: true });
  };
  const handleKeyUp: React.KeyboardEventHandler = (e) => {
    if (!isUpperCase(e.key)) {
      updatePressedKeys({ ...pressedKeys, [e.key]: false });
    }
  };
  return (
    <div
      className="full-height"
      tabIndex={1}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
    >
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
