import React from 'react';
import './App.css';
import Register from './auth/Register';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
