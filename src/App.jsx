import React, { useState } from "react";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import "./App.css";
import Auth from "./pages/auth";
import Chat from "./pages/Chat";


const App = () => {

  return (
    <>
      <BrowserRouter>
      
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </>
  )
};

export default App;
