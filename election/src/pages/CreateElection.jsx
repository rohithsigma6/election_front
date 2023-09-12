import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import API_DEV_URL from '../utils/config';
import axios from 'axios';

const CreateElection = () => {
  const validationSchema = yup.object().shape({
    constituency: yup.string().required('Constituency is required'),
    electionStartDate: yup.date().required('Start Date is required'),
    electionStartTime: yup.string().required('Start Time is required'),
    electionEndDate: yup.date().required('End Date is required'),
    electionEndTime: yup.string().required('End Time is required'),
    candidates: yup.array().of(
      yup.object().shape({
        candidateName: yup.string().required('Candidate Name is required'),
        party: yup.string().required('Party is required'),
      })
    ),
  });

  const initialValues = {
    constituency: '',
    electionStartDate: '',
    electionStartTime: '',
    electionEndDate: '',
    electionEndTime: '',
    candidates: [
      {
        candidateName: '',
        party: '',
      },
    ],
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
 
        const response = await axios.post(`${API_DEV_URL}/create_election`, values,{
            headers:{
                authorization:localStorage.getItem("voterToken")
            }
        });
        console.log('API Response:', response.data);
        formik.resetForm();
      } catch (error) {
        console.error('API Error:', error);
      }
    },
  });
  

  const addCandidate = () => {
    formik.values.candidates.push({
      candidateName: '',
      party: '',
    });
    formik.setValues({ ...formik.values });
  };

  const removeCandidate = (index) => {
    formik.values.candidates.splice(index, 1);
    formik.setValues({ ...formik.values });
  };

  const constituencyOptions = [
 'Hyderabad','Banglore','Mumbai','Lucknow','Chennai','Jaipur','Delhi','Kolkata','Mohali','Ahmedabad'
  ];
  return (
    <div className="max-w-md mx-auto mt-10 p-4 border border-gray-300 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Create Election</h2>
      <form onSubmit={formik.handleSubmit}>
 
        <div className="mb-4">
          <label htmlFor="constituency" className="block text-gray-700 text-sm font-bold mb-2">
            Constituency
          </label>
          <select
            id="constituency"
            name="constituency"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.constituency}
            className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
          >
            <option value="" disabled>Select Constituency</option>
            {constituencyOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {formik.touched.constituency && formik.errors.constituency ? (
            <div className="text-red-600 text-sm mt-1">{formik.errors.constituency}</div>
          ) : null}
        </div>
        

        <div className="mb-4">
          <label htmlFor="electionStartDate" className="block text-gray-700 text-sm font-bold mb-2">
            Election Start Date
          </label>
          <input
            type="date"
            id="electionStartDate"
            name="electionStartDate"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.electionStartDate}
            className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
          />
          {formik.touched.electionStartDate && formik.errors.electionStartDate ? (
            <div className="text-red-600 text-sm mt-1">{formik.errors.electionStartDate}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <label htmlFor="electionStartTime" className="block text-gray-700 text-sm font-bold mb-2">
            Election Start Time
          </label>
          <input
            type="time"
            id="electionStartTime"
            name="electionStartTime"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.electionStartTime}
            className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
          />
          {formik.touched.electionStartTime && formik.errors.electionStartTime ? (
            <div className="text-red-600 text-sm mt-1">{formik.errors.electionStartTime}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <label htmlFor="electionEndDate" className="block text-gray-700 text-sm font-bold mb-2">
            Election End Date
          </label>
          <input
            type="date"
            id="electionEndDate"
            name="electionEndDate"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.electionEndDate}
            className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
          />
          {formik.touched.electionEndDate && formik.errors.electionEndDate ? (
            <div className="text-red-600 text-sm mt-1">{formik.errors.electionEndDate}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <label htmlFor="electionEndTime" className="block text-gray-700 text-sm font-bold mb-2">
            Election End Time
          </label>
          <input
            type="time"
            id="electionEndTime"
            name="electionEndTime"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.electionEndTime}
            className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
          />
          {formik.touched.electionEndTime && formik.errors.electionEndTime ? (
            <div className="text-red-600 text-sm mt-1">{formik.errors.electionEndTime}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Candidates</label>
          {formik.values.candidates.map((candidate, index) => (
            <div key={index} className="flex mb-2">
              <div className="w-1/2 mr-2">
                <input
                  type="text"
                  name={`candidates[${index}].candidateName`}
                  placeholder="Candidate Name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={candidate.candidateName}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
                />
                {formik.touched.candidates?.[index]?.candidateName && formik.errors.candidates?.[index]?.candidateName ? (
                  <div className="text-red-600 text-sm mt-1">{formik.errors.candidates?.[index]?.candidateName}</div>
                ) : null}
              </div>
              <div className="w-1/2 mr-2">
                <input
                  type="text"
                  name={`candidates[${index}].party`}
                  placeholder="Party"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={candidate.party}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
                />
                {formik.touched.candidates?.[index]?.party && formik.errors.candidates?.[index]?.party ? (
                  <div className="text-red-600 text-sm mt-1">{formik.errors.candidates?.[index]?.party}</div>
                ) : null}
              </div>
              <div className="flex items-center">
                <button
                  type="button"
                  className="bg-red-500 text-white px-2 py-1 rounded-md"
                  onClick={() => removeCandidate(index)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            className="bg-blue-500 text-white px-2 py-1 rounded-md"
            onClick={addCandidate}
          >
            Add Candidate
          </button>
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Create Election
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateElection;
