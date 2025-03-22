import { useState } from "react";
import json from "./data.json";

const List = ({ list, addNodeToList, deleteNodeFromList }) => {
  const [isExpanded, setIsExpanded] = useState({});

  return (
    <div className="container">
      {list.map((val) => (
        <div key={val.id} className="item">
          {val.isFolder && (
            <span
              className="toggle-icon"
              onClick={() =>
                setIsExpanded((prev) => ({
                  ...prev,
                  [val.id]: !prev[val.id]
                }))
              }>
              {isExpanded[val.id] ? "➖" : "➕"}
            </span>
          )}
          <span className={`node-name ${val.isFolder ? "folder" : "file"}`}>{val.name}</span>
          {val.isFolder ? (
            <>
              <span className="add-file" onClick={() => addNodeToList(val.id, false)}>
                📄
              </span>
              <span className="add-folder" onClick={() => addNodeToList(val.id, true)}>
                📁
              </span>
              <span className="delete-icon" onClick={() => deleteNodeFromList(val.id)}>
                ❌
              </span>
            </>
          ) : (
            <span className="delete-icon" onClick={() => deleteNodeFromList(val.id)}>
              ❌
            </span>
          )}
          {isExpanded[val.id] && val.children && (
            <div className="children">
              <List list={val.children} addNodeToList={addNodeToList} deleteNodeFromList={deleteNodeFromList} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

function App() {
  const [data, setData] = useState(json);

  const addNodeToList = (id, isFolder) => {
    const name = prompt("Enter Name");
    if (!name) return;

    const updateTree = (list) => {
      return list.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            children: [
              ...(node.children || []),
              {
                id: Date.now(),
                name: name,
                isFolder: isFolder,
                ...(isFolder ? { children: [] } : {})
              }
            ]
          };
        }
        if (node.children) {
          return { ...node, children: updateTree(node.children) };
        }
        return node;
      });
    };
    setData((prev) => updateTree(prev));
  };

  const deleteNodeFromList = (id) => {
    const updateTree = (list) => {
      return list
        .filter((node) => node.id !== id)
        .map((node) => {
          if (node.children) {
            return { ...node, children: updateTree(node.children) };
          }
          return node;
        });
    };
    setData((prev) => updateTree(prev));
  };

  return (
    <div className="app">
      <h1>File Explorer</h1>
      <List list={data} addNodeToList={addNodeToList} deleteNodeFromList={deleteNodeFromList} />
    </div>
  );
}

export default App;
