import React from "react";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import OnlineStatusMock from "./OnlineStatusMock";
import "./App.css";
import useNotificationHandler from "./hooks/useNotificationHandler";

/* 
Feel free to edit this all. If you don't need the HoC, go remove it. 
If you wish to save the state somewhere else, go for it. 
Just keep rendering <OnlineStatusMock /> 
*/

const App = () => {
  const {
    isOnline,
    onIsOnlineChange,
    throttledValue
  } = useNotificationHandler();
  return (
    <>
      <OnlineStatusMock onIsOnlineChange={onIsOnlineChange} />
      <NotifactionHandler isOnline={isOnline} throttledValue={throttledValue} />
    </>
  );
};

const NotifactionHandler = (props) => {
  const renderTimes = React.useRef(0);

  React.useEffect(() => {
    const firstRender = renderTimes.current === 0;
    if (firstRender) {
      renderTimes.current++;
      return;
    }
    NotificationManager.info(props.throttledValue ? "Online" : "Offline");
  }, [props.throttledValue]);

  const { isOnline } = props;

  return (
    <>
      <div className={isOnline ? "online" : "offline"}>
        {isOnline ? "Online" : "Offline"}
        <NotificationContainer />
      </div>
    </>
  );
};

export default App;
