import React from "react";
import "./Notification.css";
import { AiOutlineCheckCircle, AiOutlineInfoCircle, AiOutlineWarning, AiOutlineCloseCircle, AiOutlineClose } from "react-icons/ai";
const iconStyle = { marginRight: "10px" };
const icons = {
  success: <AiOutlineCheckCircle style={iconStyle} />,
  info: <AiOutlineInfoCircle style={iconStyle} />,
  warning: <AiOutlineWarning style={iconStyle} />,
  error: <AiOutlineCloseCircle style={iconStyle} />,
};
const animations = {
  fade: "fadeIn",
  pop: "popup",
  slide: "slideIn",
};
const Notification = ({ type = "error", message, onClose = () => {}, animation = "fade" }) => {
  return (
    <div className={`notification ${type} ${animations[animation]}`}>
      {icons[type]}
      {message}
      <AiOutlineClose color="white" className="closeBtn" onClick={() => onClose()} />
    </div>
  );
};

export default Notification;
