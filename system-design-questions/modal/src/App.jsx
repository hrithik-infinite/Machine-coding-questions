import { useState } from "react";
import "./App.css";
import Modal from "./Components/Modal";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () =>{
    setIsModalOpen(false);

  }

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={openModal}>Open Modal</button>
      {isModalOpen && <Modal onClose={closeModal} />}
    </div>
  );
}

export default App;
