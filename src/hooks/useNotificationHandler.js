import React from "react";
import { DEFAULT_THROTTLE_TIME } from "../consts";

const useNotificationHandler = () => {
  const [isOnline, setIsOnline] = React.useState(true);
  const [throttledValue, setThrottledValue] = React.useState(true);
  const onIsOnlineChange = (isOnline) => {
    setIsOnline(isOnline);
  };
  const timeOut = React.useRef();
  React.useEffect(() => {
    if (timeOut) clearTimeout(timeOut.current);
    if (isOnline && !throttledValue) {
      setThrottledValue(true);
    } else {
      timeOut.current = setTimeout(() => {
        setThrottledValue((throttledValue) =>
          isOnline !== throttledValue ? isOnline : throttledValue
        );
      }, DEFAULT_THROTTLE_TIME);
    }
  }, [isOnline, throttledValue]);

  return { isOnline, onIsOnlineChange, throttledValue };
};

export default useNotificationHandler;
