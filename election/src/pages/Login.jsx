import React, { useState } from 'react';
import axios from 'axios';
import API_DEV_URL from '../utils/config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate,Link } from 'react-router-dom';
function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    voterId: '',
    password: '',
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
      const response = await axios.post(`${API_DEV_URL}/login`, formData);
      toast(response.data.message)
      if (response.data.success) {
        localStorage.setItem("voterToken", response.data.token)
        if (response.data.details.role === "voter") {

          navigate("/voter_home")
        }
        else {
          navigate("/dashboard")
        }

      }
    } catch (error) {
      toast("Login failed")
      console.error('Login failed:', error);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex justify-center items-center"
      style={{ backgroundImage: `url('https://media.istockphoto.com/id/173932687/photo/united-we-vote.jpg?s=612x612&w=0&k=20&c=Jy6M3eootYN112fdb3Hk9dTL_aMjLNu8GxCjhH_lIlg=')` }} // Replace with your image path
    >
      <ToastContainer />
      <div className="bg-teal p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

          <div>
            <label htmlFor="voterId" className="block text-sm font-medium text-white-700">
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

          <button
            type="submit"
            className="col-span-2 bg-blue-500 text-white rounded-full py-2 px-4 hover:bg-blue-700"
          >
            Login
          </button>
        </form>
        <h1 className='p-2 m-1 bg-green-900 hover:bg-blue-700 rounded-full'>Not an user ? <Link to='/'>Register</Link></h1>
      </div>
      
    </div>
  );
}

export default Login;
