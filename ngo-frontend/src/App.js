import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Transaction from "./components/Transaction"; // Your transaction page
import NewTransaction from "./components/newTransaction"; // Your new-transaction page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/new-transaction" element={<NewTransaction />} />
      </Routes>
    </Router>
  );
}

export default App;
