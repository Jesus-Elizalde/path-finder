import React from "react";
import Grid from "./components/Grid";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Path Finder Visualizer</h1>
      <Grid />
    </div>
  );
};

export default App;
