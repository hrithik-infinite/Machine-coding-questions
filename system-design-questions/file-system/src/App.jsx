/* eslint-disable react/prop-types */
import { useState } from "react";
import json from "./data.json";

const List = ({ list, addNodeToList, deletNodeFromList }) => {
  const [isExpanded, setIsExpanded] = useState({});

  return (
    <div className="container">
      {list.map((node) => (
        <div key={node.id}>
          {node.isFolder && (
            <span
              className="btn"
              onClick={() =>
                setIsExpanded((prev) => ({
                  ...prev,
                  [node.name]: !prev[node.name]
                }))
              }>
              {isExpanded?.[node.name] ? "- " : "+ "}
            </span>
          )}
          <span>{node.name}</span>
          {node.isFolder && (
            <>
              <span className="icon-btn" onClick={() => addNodeToList(node.id)}>
                📁
              </span>
              <span className="icon-btn">📄</span>
              <span className="icon-btn" onClick={() => deletNodeFromList(node.id)}>
                ❌
              </span>
            </>
          )}
          {isExpanded?.[node.name] && node.children && <List list={node.children} addNodeToList={addNodeToList} deletNodeFromList={deletNodeFromList} />}
        </div>
      ))}
    </div>
  );
};
function App() {
  const [data, setData] = useState(json);
  const addNodeToList = (id) => {
    const name = prompt("Enter Name");
    const updateTree = (list) => {
      return list.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            children: [
              ...node.children,
              {
                id: Date.now(),
                name: name,
                isFolder: true,
                children: []
              }
            ]
          };
        }
        if (node.children) {
          return {
            ...node,
            children: updateTree(node.children)
          };
        }
        return node;
      });
    };
    setData((prev) => updateTree(prev));
  };
  const deletNodeFromList = (id) => {
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
    <>
      <h1>File Explorer</h1>
      <div className="container">
        <List list={data} addNodeToList={addNodeToList} deletNodeFromList={deletNodeFromList} />
      </div>
    </>
  );
}

export default App;
