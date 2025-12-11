import "./App.css";
import Home from "./Home";
import Predict from "./Predict";
import { Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import Pipeline from "./Pipeline";
function App() {
  const [page, setPage] = useState("home");
  function goTo(p) {
    setPage(p);
  }

  return (
    <>
      {page === "home" && <Home goTo={goTo} />}
      {page === "inf" && <Predict goTo={goTo} />}
      {page === "pipeline" && <Pipeline goTo={goTo} />}
    </>
  );
}

export default App;
