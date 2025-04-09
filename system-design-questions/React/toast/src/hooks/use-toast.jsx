import { useState } from "react";
import Toast from "../components/Toast";

const useToast = (position = "bottom-right") => {
  const [notification, setNotifications] = useState([]);
  const handleClose = (id) => {
    setNotifications((prev) => prev.filter((val) => val.id !== id));
  };
  const triggerToast = (props) => {
    const toastId = Date.now();
    setNotifications((prev) => [...prev, { id: toastId, ...props }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((val) => val.id !== toastId));
    }, props.duration || 3000);
  };
  const ToastComponent = (
    <div className={`notification-container ${position} ${position.split("-")[0]}`}>
      {notification.map((val) => (
        <Toast key={val.id} {...val} onClose={() => handleClose(val.id)} />
      ))}
    </div>
  );
  return { ToastComponent, triggerToast };
};

export default useToast;
