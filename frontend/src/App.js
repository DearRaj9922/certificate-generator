import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import Home from "./components/Home/home.js";
import Certificate from "./components/Certificate/certificate.js";
import Winner from "./components/Winners/winners.js";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact={true} path='/' element={<Home />} />
          <Route exact={true} path='/certificate' element={<Certificate />} />
          <Route exact={true} path='/winner' element={<Winner />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;