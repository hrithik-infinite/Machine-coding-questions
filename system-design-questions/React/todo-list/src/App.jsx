import { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskVal, setTaskVal] = useState("");
  const [isEdit, setIsEdit] = useState(null);
  const [editVal, setEditVal] = useState("");

  const addTask = e => {
    e.preventDefault();
    const val = taskVal.trim();
    if (val) {
      setTasks([...tasks, val]);
    }
    setTaskVal("");
  };

  const handleChange = e => {
    const { value } = e.target;
    setTaskVal(value);
  };

  const deleteTask = i => {
    const newTasks = tasks.filter((_, index) => index !== i);
    setTasks(newTasks);
  };

  const saveEdit = i => {
    const val = editVal.trim();
    if (val) {
      const updatedTasks = [...tasks];
      updatedTasks[i] = val;
      setTasks(updatedTasks);
      setIsEdit(null);
      setEditVal("");
    }
  };

  return (
    <>
      <form onSubmit={addTask}>
        <label>
          Task:
          <input value={taskVal} placeholder="Enter Task" onChange={handleChange} aria-label="Task input" />
        </label>
        <button type="submit" aria-label="Add Task">
          Add Task
        </button>
      </form>
      <ul>
        {tasks.map((val, i) => (
          <li key={`${val}-${i}`}>
            {isEdit === i ? (
              <>
                <input value={editVal} onChange={e => setEditVal(e.target.value)} aria-label={`Edit task ${i}`} />
                <button onClick={() => saveEdit(i)} aria-label="Save Task">
                  Save
                </button>
                <button
                  onClick={() => {
                    setIsEdit(null);
                    setEditVal("");
                  }}
                  aria-label="Cancel Edit">
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span>{val}</span>
                <button
                  onClick={() => {
                    setIsEdit(i);
                    setEditVal(val);
                  }}
                  aria-label="Edit Task">
                  Edit
                </button>
                <button onClick={() => deleteTask(i)} aria-label="Delete Task">
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
