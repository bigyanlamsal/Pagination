import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Head from "./Components/Head";
import { useState } from "react";
import ReactDOM from "react-dom/client";
import EditProfile from "./Components/EditProfile";

function App() {
  return (
    <div className="App">
      <Head />
      {/* <EditProfile /> */}
    </div>
  );
}

export default App;
