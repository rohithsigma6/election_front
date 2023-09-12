import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Clock from './Clock';

const AdminSidebar = ({children}) => {
  const Navigate = useNavigate()
  const logout = () => {
   localStorage.removeItem("voterToken")
   Navigate("/login")
  };

  return (
    <div className='flex'>
    <div className="bg-gray-800 text-white w-64 h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <ul>
        <li className="mb-2">
          <Link to="/dashboard" className="text-blue-300 hover:text-blue-500">
            Dashboard
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/create_election" className="text-blue-300 hover:text-blue-500">
            Create Election
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/voters" className="text-blue-300 hover:text-blue-500">
            Voters
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/election_results" className="text-blue-300 hover:text-blue-500">
            Election Results
          </Link>
        </li>
      </ul>
      <button
        onClick={logout}
        className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        Logout
      </button>
      
      <div className="mt-4">
        <Clock />
      </div>
      
    </div>
    {children}
    </div>
  );
};

export default AdminSidebar;
