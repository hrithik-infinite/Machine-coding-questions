import "./App.css";
import useNotification from "./hooks/use-notification";

function App() {
  const { NotificationComponent, triggerNotification } = useNotification();
  return (
    <div className="container">
      <button
        onClick={() =>
          triggerNotification({
            type: "success",
            message: "Upload Success",
            duration: 8000,
          })
        }>
        Trigger Success
      </button>
      <button
        onClick={() =>
          triggerNotification({
            type: "error",
            message: "Upload Failed",
            duration: 8000,
          })
        }>
        Trigger Failed
      </button>
      <button
        onClick={() =>
          triggerNotification({
            type: "info",
            message: "Upload Info",
            duration: 8000,
          })
        }>
        Trigger Info
      </button>
      <button
        onClick={() =>
          triggerNotification({
            type: "warning",
            message: "Upload Warning",
            duration: 8000,
          })
        }>
        Trigger Warning
      </button>
      {NotificationComponent}
    </div>
  );
}

export default App;
