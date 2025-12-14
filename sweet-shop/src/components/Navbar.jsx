import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/Logo1.jfif';

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-red-600 hover:text-red-700">
            <img src={logo} alt="Sweet Shop Logo" className="h-10 w-10 rounded-full object-cover" />
            Sweet Shop
          </Link>

          <div className="flex items-center gap-3">
            <Link to="/home" className="text-gray-700 hover:text-red-600 font-medium px-4">
              Home
            </Link>
            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-end">
                  <span className="text-sm font-bold text-gray-800 capitalize">{user.role}</span>
                  <span className="text-xs text-gray-500">{user.email}</span>
                </div>
                <button
                  onClick={() => {
                    setUser(null);
                    // Clear session storage to logout user 
                    sessionStorage.removeItem('user');
                    navigate('/home');
                  }}
                  className="text-red-600 border border-red-600 hover:bg-red-50 rounded-lg px-4 py-2 text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="text-red-600 border border-red-600 hover:bg-red-50 rounded-lg px-4 py-2">
                  Signin
                </Link>
                <Link to="/signup" className="text-white bg-red-600 hover:bg-red-700 rounded-lg px-4 py-2">
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

