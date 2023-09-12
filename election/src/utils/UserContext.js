
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import API_DEV_URL from './config';

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
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
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
}
