import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './auth//Login';
import Register from './auth//Register';
import Profile from './components/Profile'; 
import ProtectedRoute from './auth/ProtectedRoute';

const App = () => {
    return (

            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                } />
            </Routes>

    );
};

export default App;
