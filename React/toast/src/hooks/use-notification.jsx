import React, { useCallback, useState } from "react";
import Notification from "../components/Notification";
import { v4 as uuidv4 } from "uuid";
const useNotification = (position = "bottom-right") => {
  const [notifications, setNotifications] = useState([]);
  const triggerNotification = useCallback((props) => {
    const toastId = uuidv4();
    setNotifications((prev) => [
      ...prev,
      {
        id: toastId,
        ...props,
      },
    ]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== toastId));
    }, props.duration || 3000);
  }, []);
  const handleClose = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const NotificationComponent = (
    <div className={`notification-container ${position} ${position.split("-")[0]}`}>
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          {...notification}
          onClose={() => {
            handleClose(notification.id);
          }}
        />
      ))}
    </div>
  );
  return { NotificationComponent, triggerNotification };
};

export default useNotification;
