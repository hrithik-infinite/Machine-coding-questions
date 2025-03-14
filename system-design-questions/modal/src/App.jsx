import { useState } from "react";

const Modal = ({ title, bodyContent, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>{title}</h3>
        {bodyContent()}
        <button className="close-btn" onClick={onClose}>
          x
        </button>
      </div>
    </div>
  );
};

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  const body = () => {
    return <div>This is body</div>;
  };
  return (
    <>
      <h3>Modal</h3>
      <button className="open-btn" onClick={handleOpen}>
        Open Modal
      </button>
      {isOpen && <Modal onClose={handleClose} title={"This is title"} bodyContent={body} />}
    </>
  );
}

export default App;
