import React from 'react'

export const useGetTimeElapsed = (recording: boolean) => {
  const [startTime, setStartTime] = React.useState(0);
  React.useEffect(() => {
    setStartTime(performance.now());
  }, [recording]);
  return () => performance.now() - startTime;
};