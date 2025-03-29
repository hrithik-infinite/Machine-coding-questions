import { AiOutlineCheckCircle, AiOutlineInfoCircle, AiOutlineWarning, AiOutlineCloseCircle, AiOutlineClose } from "react-icons/ai";
import "./Toast.css";
const iconStyle = { marginRight: "10px" };
const icons = {
  success: <AiOutlineCheckCircle style={iconStyle} />,
  info: <AiOutlineInfoCircle style={iconStyle} />,
  warning: <AiOutlineWarning style={iconStyle} />,
  error: <AiOutlineCloseCircle style={iconStyle} />
};
const animations = {
  fade: "fadeIn",
  pop: "popup",
  slide: "slideIn"
};
const Toast = ({ type = "info", message, onClose, animation = "fade" }) => {
  return (
    <div className={`toast ${type} ${animations[animation]}`}>
      {icons[type]}
      {message}
      <AiOutlineClose color="white" className="closeBtn" onClick={onClose} />
    </div>
  );
};

export default Toast;
