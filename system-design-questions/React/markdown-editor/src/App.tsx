import { useEffect, useRef, useState } from "react";

const parsemkd = (text: string) => {
  const lines = text.split("\n");
  const parsedLines = [];
  let inList = false;
  for (const line of lines) {
    if (line.trim() === "") {
      if (inList) {
        parsedLines.push("</ul>");
        inList = false;
      }
      continue;
    }
    if (line.startsWith("### ")) {
      parsedLines.push(`<h3>${line.slice(4)}</h3>`);
      continue;
    }
    if (line.startsWith("## ")) {
      parsedLines.push(`<h2>${line.slice(3)}</h2>`);
      continue;
    }
    if (line.startsWith("# ")) {
      parsedLines.push(`<h1>${line.slice(2)}</h1>`);
      continue;
    }
    if (line.startsWith("- ")) {
      if (!inList) {
        parsedLines.push("<ul>");
        inList = true;
      }
      parsedLines.push(`<li>${line.slice(2)}</li>`);
      continue;
    } else {
      if (inList) {
        parsedLines.push("</ul>");
        inList = false;
      }
    }

    const inlineFormatted = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\*(.*?)\*/g, "<em>$1</em>");

    parsedLines.push(`<p>${inlineFormatted}</p>`);
  }

  if (inList) parsedLines.push("</ul>");

  return parsedLines.join("\n");
};

function App() {
  const [data, setData] = useState<string>("");
  const resRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (resRef.current) {
      resRef.current.innerHTML = parsemkd(data);
    }
  }, [data]);

  return (
    <div className="container">
      <textarea className="markdown-input" placeholder="Enter Markdown" value={data} onChange={(e) => setData(e.target.value)}></textarea>
      <div className="markdown-preview" ref={resRef}></div>
    </div>
  );
}
export default App;
