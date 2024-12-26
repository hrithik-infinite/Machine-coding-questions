/* eslint-disable react/prop-types */
const Modal = ({ onClose }) => {
  return (
    <div className="modalOverlay">
      <div className="modalBody">
        <div>Header</div>
        <div>This is Content</div>
        <div>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
