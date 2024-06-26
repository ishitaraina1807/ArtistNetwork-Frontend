import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [form, setForm] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!form.email) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(form.email)) {
            newErrors.email = 'Invalid email format';
        }
        if (!form.password) newErrors.password = 'Password is required';

        if (Object.keys(newErrors).length === 0) {
            try {
              const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  email: form.email,
                  password: form.password,
                }),
              });
      
              if (response.ok) {
                const data = await response.json();
                // Successful login
                alert('Login successful!'); // Consider a better approach like showing a success message or redirecting
                localStorage.setItem('token', data.token);
                navigate('/profile'); // Redirect to profile or home page
              } else {
                // Login failed - handle specific errors based on response status code
                const data = await response.json();
                if (response.status === 400) {
                  setApiError(data.message || 'Invalid email or password');
                } else {
                  setApiError('An error occurred. Please try again.');
                }
              }
            } catch (error) {
              setApiError('An error occurred. Please try again.');
            }
          } else {
            setErrors(newErrors);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Login to ArtistsNetwork</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={form.email}
                            onChange={handleChange}
                        />
                        {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={form.password}
                            onChange={handleChange}
                        />
                        {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
                    </div>
                    <div className="flex gap-2">
                        <p>Don't have an account?</p>
                        <Link className='text-indigo-600 hover:text-indigo-400 hover:underline duration-200' to="/register">Register</Link>
                    </div>
                    {apiError && <div className="text-red-500 text-sm mt-2">{apiError}</div>}
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
