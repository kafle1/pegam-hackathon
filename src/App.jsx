import React from "react";
import CreateMessage from "./components/CreateMessage";
import SendMessage from "./components/SendMessage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShowMessage from "./components/ShowMessage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/send-message" element={<SendMessage />} />
          <Route path="/" element={<CreateMessage />} />
          <Route path="/:messageId" element={<ShowMessage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
