import Toast from "./components/Toast";
import useToast from "./hooks/use-toast";

function App() {
  const { ToastComponent, triggerToast } = useToast();
  return (
    <div className="container">
      <button onClick={() => triggerToast({ type: "success", message: "Success Toast", duration: 5000 })}>Trigger Success</button>
      <button onClick={() => triggerToast({ type: "error", message: "Error Toast", duration: 5000 })}>Trigger Error</button>
      <button onClick={() => triggerToast({ type: "warning", message: "Warning Toast", duration: 5000 })}>Trigger Warning</button>
      <button onClick={() => triggerToast({ type: "info", message: "Info Toast", duration: 5000 })}>Trigger Info</button>
      {ToastComponent}
    </div>
  );
}

export default App;
