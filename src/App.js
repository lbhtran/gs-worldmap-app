import React, { useState } from "react";
import MapChart from "./MapChart";
import ReactTooltip from "react-tooltip";
import "./styles.css";

export default function App() {
  const [content, setContent] = useState("");

  return (
    <div className="App">
      <MapChart setTooltipContent={setContent} />
      <ReactTooltip multiline={true} html={true} className="ToolTip">
        {content}
      </ReactTooltip>
    </div>
  );
}
