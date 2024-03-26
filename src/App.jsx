import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Analytics from "./pages/Analytics";
import Navbar from './components/global/Navbar'

function App() {
  const [count, setCount] = useState(0);

  return <div className="h-screen bg-[#ebe2f8]">
    <Navbar />

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/analytics" element={<Analytics />} />
    </Routes>
  </div>
}

export default App;
