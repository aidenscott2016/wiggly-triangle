import React from 'react'

export const useGetTimeElapsed = () => {
  const [startTime, setStartTime] = React.useState(0);
  React.useEffect(() => {
    setStartTime(performance.now());
  }, []);
  return () => performance.now() - startTime;
};