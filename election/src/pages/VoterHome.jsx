
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_DEV_URL from '../utils/config';

const VoterHome = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    
    console.log("hello")
    axios.post(`${API_DEV_URL}/get_user`,{},{
        headers:{
            authorization:localStorage.getItem("voterToken")
        }
    })
      .then(response => {
       
        console.log(response)
        setUser(response.data.user);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  return (
    <div className="bg-blue-100 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-semibold mb-4 text-blue-600">
          Welcome {user ? user.firstName : 'Voter'}
        </h1>
        <p className="text-gray-700">
          Your Constituency: {user ? user.constituency : 'N/A'}
        </p>
      </div>
    </div>
  );
};

export default VoterHome;
