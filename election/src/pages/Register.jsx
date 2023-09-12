import React, { useState } from 'react';
import axios from 'axios'; 
import API_DEV_URL from '../utils/config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    voterId: '',
    gender: 'male', 
    age: '',
    phoneNumber: '',
    password: '',
    constituency: 'Delhi', 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_DEV_URL}/register`, formData);
      console.log(response)
      toast(response.data.message)
      console.log('Registration successful:', response.data);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex justify-center items-center"
      style={{ backgroundImage: `url('https://media.istockphoto.com/id/173932687/photo/united-we-vote.jpg?s=612x612&w=0&k=20&c=Jy6M3eootYN112fdb3Hk9dTL_aMjLNu8GxCjhH_lIlg=')` }} // Replace with your image path
    >
      <ToastContainer />
      <div className="bg-teal p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Register</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-white-700">
              First Name:
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="mt-1 p-2 rounded-md w-full"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-white-700">
              Last Name:
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="mt-1 p-2 rounded-md w-full"
            />
          </div>
          <div>
            <label htmlFor="voterId" className="block text-sm font-medium text-black-900">
              Voter ID:
            </label>
            <input
              type="text"
              name="voterId"
              id="voterId"
              value={formData.voterId}
              onChange={handleChange}
              required
              className="mt-1 p-2 rounded-md w-full"
            />
          </div>
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-white-700">
              Gender:
            </label>
            <select
              name="gender"
              id="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="mt-1 p-2 rounded-md w-full"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-white-700">
              Age:
            </label>
            <input
              type="number"
              name="age"
              id="age"
              value={formData.age}
              onChange={handleChange}
              required
              className="mt-1 p-2 rounded-md w-full"
            />
          </div>
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-white-700">
              Phone Number:
            </label>
            <input
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              className="mt-1 p-2 rounded-md w-full"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white-700">
              Password:
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 p-2 rounded-md w-full"
            />
          </div>
          <div>
            <label htmlFor="constituency" className="block text-sm font-medium text-red-700">
              Constituency:
            </label>
            <select
              name="constituency"
              id="constituency"
              value={formData.constituency}
              onChange={handleChange}
              required
              className="mt-1 p-2 rounded-md w-full"
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
          <button
            type="submit"
            className="col-span-2 bg-blue-500 text-white rounded-full py-2 px-4 hover:bg-blue-700"
          >
            Register
          </button>
        </form>
        <h1 className='p-2 m-1 bg-green-900 hover:bg-blue-700 rounded-full'>Already an user ? <Link to='/login'>Login</Link></h1>
      </div>
    </div>
  );
}

export default Register;
