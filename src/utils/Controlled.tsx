import React from 'react'
export const Controlled = () => {
  const props = { number: 1, letter: "a" };
  return <Boy config={props} children={Number} />;
};

const Number = ({ number, letter }: { number: number; letter: string }) => {
  return (
    <p>
      {number}
      {letter}
    </p>
  );
};

type Props<T extends Object> = {
  config: T;
  children: (props: T) => JSX.Element;
};

function Boy<T>({ config, children }: Props<T>) {
  const [controlledProps, setControlledProps] = React.useState(config);
  const entries = Object.entries(controlledProps);

  return (
    <div>
      <div>
        <Settings
          entries={entries}
          controlledProps={controlledProps}
          setControlledProps={setControlledProps}
        />
      </div>
      <div>{children(controlledProps)}</div>
    </div>
  );
}

const Settings = ({
  entries,
  setControlledProps,
  controlledProps,
}: {
  entries: [string, any][];
  setControlledProps: (props: any) => void;
  controlledProps: any;
}) => (
  <>
    {entries.map((e) => {
      const [k, v] = e;
      return (
        <input
          value={v}
          onChange={(e) =>
            setControlledProps({ ...controlledProps, [k]: e.target.value })
          }
        />
      );
    })}
  </>
);