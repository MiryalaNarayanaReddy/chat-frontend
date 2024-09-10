import React, { useState } from "react";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import "./App.css";
import Auth from "./pages/auth";


const App = () => {

  return (
    <>
      <BrowserRouter>
      
        <Routes>
          <Route path="/" element={<Auth />} />
        </Routes>
      </BrowserRouter>
    </>
  )
};

export default App;
