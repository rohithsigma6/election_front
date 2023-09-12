import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_DEV_URL from '../utils/config';

const Voters = () => {
  const [allVoters, setAllVoters] = useState([]);
  const [filteredVoters, setFilteredVoters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVoter, setSelectedVoter] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedVoter, setEditedVoter] = useState({
    firstName: '',
    lastName: '',
    age: '',
    phoneNumber: '',
    constituency: '',
    voterId: '',
    gender: ''
  });

  
  const [filterName, setFilterName] = useState('');
  const [filterConstituency, setFilterConstituency] = useState('');

  useEffect(() => {
    fetchVoters();
  }, []);

  useEffect(() => {
    const filterVoters = () => {
      const filtered = allVoters.filter((voter) => {
        const nameMatch = voter.firstName.toLowerCase().includes(filterName.toLowerCase()) ||
          voter.lastName.toLowerCase().includes(filterName.toLowerCase());
        const constituencyMatch = filterConstituency === '' || voter.constituency === filterConstituency;
        return nameMatch && constituencyMatch;
      });
      setFilteredVoters(filtered);
    };
    
    filterVoters();
  }, [filterName, filterConstituency, allVoters]);
  
  const fetchVoters = () => {
    axios
      .post(`${API_DEV_URL}/get_all_users`, {}, {
        headers: {
          authorization: localStorage.getItem("voterToken")
        }
      })
      .then((response) => {
        const voters = response.data.allUsers;
        setAllVoters(voters);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching voter details:', error);
        setLoading(false);
      });
  };


  const handleEditClick = (voter) => {
    setSelectedVoter(voter);
    setEditedVoter({
      firstName: voter.firstName,
      lastName: voter.lastName,
      age: voter.age,
      phoneNumber: voter.phoneNumber,
      voterId: voter.voterId,
      constituency: voter.constituency,
      gender: voter.gender
    });
    setIsEditing(true);
  };

  const handleDeleteClick = (voter_id) => {
    axios
      .post(`${API_DEV_URL}/delete_user/${voter_id}`, {}, {
        headers: {
          authorization: localStorage.getItem("voterToken")
        }
      })
      .then(() => {
        setAllVoters((prevVoters) => prevVoters.filter((voter) => voter._id !== voter_id));
      })
      .catch((error) => {
        console.error('Error deleting voter:', error);
      });
  };

  const handleSaveClick = async (voter_id) => {
    try {
      const response = await axios.put(`${API_DEV_URL}/update_user/${voter_id}`, editedVoter, {
        headers: {
          authorization: localStorage.getItem("voterToken")
        }
      });
      console.log(response)
      setIsEditing(false);
      setSelectedVoter(null);
      console.log("Updated Voter Details:", editedVoter);
    }
    catch (err) {
      console.error('Error updating voter:', err);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setSelectedVoter(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedVoter((prevEditedVoter) => ({
      ...prevEditedVoter,
      [name]: value,
    }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Voters</h2>

    
      <div className="mb-4">
        <input
          type="text"
          placeholder="Filter by Name"
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
          className="border rounded-md px-2 py-1"
        />
        <select
          value={filterConstituency}
          onChange={(e) => setFilterConstituency(e.target.value)}
          className="border rounded-md px-2 py-1 ml-2"
        >
          <option value="">All Constituencies</option>
          <option value="Delhi">Delhi</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Chennai">Chennai</option>
              <option value="Mohali">Mohali</option>
              <option value="Kolkata">Kolkata</option>
              <option value="Lucknow">Lucknow</option>
              <option value="Ahmedabad">Ahmedabad</option>
              <option value="Jaipur">Jaipur</option>
              <option value="Hyderabad">Hyderbad</option>
        </select>
      </div>

      <table className="table-auto">
       
        <tbody>
          {filteredVoters.map((voter) => (
            <tr key={voter.id}>
              <td className="border px-4 py-2">{voter.voterId}</td>
              <td className="border px-4 py-2">{voter.firstName} {voter.lastName}</td>
              <td className="border px-4 py-2">{voter.constituency}</td>
              <td className="border px-4 py-2">{voter.gender}</td>
              <td className="border px-4 py-2">{voter.age}</td>
              <td className="border px-4 py-2">{voter.phoneNumber}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleEditClick(voter)}
                  className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(voter._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded-md"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

            {isEditing && selectedVoter && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded-lg">
                        <h3 className="text-lg font-semibold mb-2">Edit Voter Details</h3>
                        <form>
                            <div className="mb-2">
                                <label className="block text-gray-600">First Name:</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    className="border rounded-md px-2 py-1 w-full"
                                    value={editedVoter.firstName}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-2">
                                <label className="block text-gray-600">Last Name:</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    className="border rounded-md px-2 py-1 w-full"
                                    value={editedVoter.lastName}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-2">
                                <label className="block text-gray-600">Voter ID:</label>
                                <input
                                    type="text"
                                    name="voterId"
                                    className="border rounded-md px-2 py-1 w-full"
                                    value={editedVoter.voterId}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-2">
                                <label className="block text-gray-600">Age:</label>
                                <input
                                    type="text"
                                    name="age"
                                    className="border rounded-md px-2 py-1 w-full"
                                    value={editedVoter.age}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-2">
                                <label className="block text-gray-600">Phone Number:</label>
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    className="border rounded-md px-2 py-1 w-full"
                                    value={editedVoter.phoneNumber}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-2">
                                <label className="block text-gray-600">Constituency:</label>
                                <select
                                    name="constituency"
                                    className="border rounded-md px-2 py-1 w-full"
                                    value={editedVoter.constituency}
                                    onChange={handleInputChange}
                                >
                                    <option value="Delhi">Delhi</option>
                                    <option value="Mumbai">Mumbai</option>
                                    <option value="Bangalore">Bangalore</option>
                                    <option value="Chennai">Chennai</option>
                                    <option value="Mohali">Mohali</option>
                                    <option value="Kolkata">Kolkata</option>
                                    <option value="Lucknow">Lucknow</option>
                                    <option value="Ahmedabad">Ahmedabad</option>
                                    <option value="Jaipur">Jaipur</option>
                                    <option value="Hyderabad">Hyderbad</option>
                                </select>
                            </div>
                            <div className="mb-2">
                                <label className="block text-gray-600">Gender:</label>
                                <select
                                    name="gender"
                                    className="border rounded-md px-2 py-1 w-full"
                                    value={editedVoter.gender}
                                    onChange={handleInputChange}
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                            <div>
                                <button
                                    onClick={() => handleSaveClick(selectedVoter._id)}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={handleCancelClick}
                                    className="bg-gray-500 text-white px-4 py-2 rounded-md"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Voters;
