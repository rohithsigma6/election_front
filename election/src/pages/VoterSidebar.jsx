import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import Clock from './Clock';
const VoterSidebar = ({ children }) => {
    const Navigate = useNavigate()
  return (
    <div className="flex">
      <div className="bg-blue-600 h-screen w-64 text-white shadow-lg">
        <div className="p-4">
          <h1 className="text-3xl font-semibold mb-4">Voter Dashboard</h1>
          <ul>
            <li className="mb-2">
              <Link
                to="/voter_home"
                className="text-white hover:text-gray-300"
              >
                Home
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="/voter_profile"
                className="text-white hover:text-gray-300"
              >
                Profile
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="/ballot"
                className="text-white hover:text-gray-300"
              >
                Ballot
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="/voter_candidates"
                className="text-white hover:text-gray-300"
              >
                Candidates
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="/results"
                className="text-white hover:text-gray-300"
              >
                Results
              </Link>
            </li>
          </ul>
          <Clock/>
          <div className="mt-8">
            <button
              onClick={() => {
               localStorage.removeItem("voterToken")
               Navigate("/login")
              }}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded w-full"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <div className="flex-grow bg-gray-100 p-4">{children}</div>
    </div>
  );
};

export default VoterSidebar;
