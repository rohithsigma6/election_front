import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_DEV_URL from '../utils/config';
const VoterProfile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});

  useEffect(() => {
 
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

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedData({ ...user });
  };

  const closeModal = () => {
    setIsEditing(false);
  };

  const handleSave =async () => {

    const response = await axios.put(`${API_DEV_URL}/update_user/${user._id}`, editedData, {
        headers: {
          authorization: localStorage.getItem("voterToken")
        }
      });
      if(response.data.success) {
        setUser(response.data.user)
        closeModal()
      }
     
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  return (
    <div className="bg-blue-100 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-semibold mb-4 text-blue-600">
          Voter Profile
        </h1>
        <button
          onClick={handleEditClick}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Edit Profile
        </button>
        <p className="mt-4">
          First Name: <span className="font-semibold">{user?.firstName}</span>
        </p>
        <p>
          Last Name: <span className="font-semibold">{user?.lastName}</span>
        </p>
        <p>
          Voter ID: <span className="font-semibold">{user?.voterId}</span>
        </p>
        <p>
          Gender: <span className="font-semibold">{user?.gender}</span>
        </p>
        <p>
          Age: <span className="font-semibold">{user?.age}</span>
        </p>
        <p>
          Phone Number: <span className="font-semibold">{user?.phoneNumber}</span>
        </p>
        <p>
          Constituency: <span className="font-semibold">{user?.constituency}</span>
        </p>
      </div>
      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal">
            <div className="modal-content p-4 bg-white rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
              <label className="block mb-2">
                First Name:
                <input
                  type="text"
                  name="firstName"
                  value={editedData.firstName}
                  onChange={handleChange}
                  className="form-input mt-1 block w-full"
                />
              </label>
              <label className="block mb-2">
                Last Name:
                <input
                  type="text"
                  name="lastName"
                  value={editedData.lastName}
                  onChange={handleChange}
                  className="form-input mt-1 block w-full"
                />
              </label>
              <label className="block mb-2">
                Voter ID:
                <input
                  type="text"
                  name="voterId"
                  value={editedData.voterId}
                  onChange={handleChange}
                  className="form-input mt-1 block w-full"
                  disabled
                />
              </label>
              <label className="block mb-2">
                Gender:
                <input
                  type="text"
                  name="gender"
                  value={editedData.gender}
                  onChange={handleChange}
                  className="form-input mt-1 block w-full"
                />
              </label>
              <label className="block mb-2">
                Age:
                <input
                  type="number"
                  name="age"
                  value={editedData.age}
                  onChange={handleChange}
                  className="form-input mt-1 block w-full"
                />
              </label>
              <label className="block mb-2">
                Phone Number:
                <input
                  type="text"
                  name="phoneNumber"
                  value={editedData.phoneNumber}
                  onChange={handleChange}
                  className="form-input mt-1 block w-full"
                />
              </label>
          
              <div className="flex justify-end mt-4">
                <button
                  onClick={handleSave}
                  className="bg-blue-600 text-white py-2 px-4 rounded mr-2 hover:bg-blue-700"
                >
                  Save
                </button>
                <button
                  onClick={closeModal}
                  className="bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoterProfile
