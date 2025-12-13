import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login({ setUser }) {
  const [role, setRole] = useState('user');
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    console.log('Login as', role, form);

    if (role === 'admin') {
      navigate('/products');
    } else {
      navigate('/purchase');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-sm rounded-xl p-6">
        <div className="flex rounded-lg overflow-hidden mb-6 border border-red-200">
          <button
            type="button"
            onClick={() => setRole('user')}
            className={`flex-1 px-4 py-2 text-sm font-semibold ${role === 'user' ? 'bg-red-600 text-white' : 'bg-white text-red-600'
              }`}
          >
            User
          </button>
          <button
            type="button"
            onClick={() => setRole('admin')}
            className={`flex-1 px-4 py-2 text-sm font-semibold border-l border-red-200 ${role === 'admin' ? 'bg-red-600 text-white' : 'bg-white text-red-600'
              }`}
          >
            Admin
          </button>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">Login</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm text-gray-700 mb-1">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              required
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm text-gray-700 mb-1">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={onChange}
              required
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg px-4 py-2"
          >
            Login as {role === 'admin' ? 'Admin' : 'User'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          New here?{' '}
          <Link to="/signup" className="text-red-600 hover:underline">Create an account</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;