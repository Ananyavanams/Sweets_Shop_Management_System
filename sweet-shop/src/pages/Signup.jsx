import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
  const [role, setRole] = useState('user');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [isSignedUp, setIsSignedUp] = useState(false);
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log('Signup as', role, form);

    // Select registration endpoint based on user choice
    const endpoint = role === 'admin'
      ? 'http://localhost:8080/auth/admin/register'
      : 'http://localhost:8080/auth/user/register';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Send registration details to backend
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
      });

      if (response.ok) {
        // Show success message instead of redirecting
        setIsSignedUp(true);
      } else {
        const errorText = await response.text();
        alert(`Signup failed: ${errorText}`);
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('An error occurred during signup');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-sm rounded-xl p-6">
        {isSignedUp ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Success!</h2>
            <p className="text-gray-600 mb-6">You have successfully signed up. Now login to continue.</p>
            <Link
              to="/login"
              className="inline-block w-full bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg px-4 py-2"
            >
              Go to Login
            </Link>
          </div>
        ) : (
          <>
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

            <h2 className="text-2xl font-bold text-gray-800 mb-4">Create Account</h2>
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm text-gray-700 mb-1">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={onChange}
                  required
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Enter your name"
                />
              </div>
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
                  placeholder="Enter a secure password"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg px-4 py-2"
              >
                Sign up as {role === 'admin' ? 'Admin' : 'User'}
              </button>
            </form>

            <p className="text-center text-sm text-gray-600 mt-4">
              Already have an account?{' '}
              <Link to="/login" className="text-red-600 hover:underline">Login</Link>

            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default Signup;