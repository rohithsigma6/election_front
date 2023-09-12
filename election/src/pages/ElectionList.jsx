import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_DEV_URL from '../utils/config';

const ElectionList = () => {
  const [elections, setElections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); 

  useEffect(() => {
    axios
      .get(`${API_DEV_URL}/get_all_elections`, {
        headers: {
          authorization: localStorage.getItem("voterToken"),
        },
      })
      .then((response) => {
        setElections(response.data.elections);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching elections:', error);
        setLoading(false);
      });
  }, []);

  const getElectionStatus = (election) => {
    const currentDate = new Date();
    const startDate = new Date(election.electionStartDate);
    const endDate = new Date(election.electionEndDate);

    if (currentDate < startDate) {
      return 'upcoming';
    } else if (currentDate > endDate) {
      return 'expired';
    } else {
      return 'live';
    }
  };

  const filteredElections = elections.filter((election) => {
    if (filter === 'all') {
      return true; 
    }
    const status = getElectionStatus(election);
    return filter === status;
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Election List</h2>
      <div className="mb-4">
        <label className="block text-gray-600">Filter by Status:</label>
        <select
          className="border rounded-md px-2 py-1"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="upcoming">Upcoming</option>
          <option value="live">Live</option>
          <option value="expired">Expired</option>
        </select>
        </div>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Constituency</th>
            <th className="px-4 py-2">Start Date</th>
            <th className="px-4 py-2">Start Time</th>
            <th className="px-4 py-2">End Date</th>
            <th className="px-4 py-2">End Time</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Candidates</th>
          </tr>
        </thead>
        <tbody>
          {filteredElections.map((election) => (
            <tr key={election._id}>
              <td className="border px-4 py-2">{election.constituency}</td>
              <td className="border px-4 py-2">{election.electionStartDate}</td>
              <td className="border px-4 py-2">{election.electionStartTime}</td>
              <td className="border px-4 py-2">{election.electionEndDate}</td>
              <td className="border px-4 py-2">{election.electionEndTime}</td>
              <td className="border px-4 py-2">{getElectionStatus(election)}</td>
              <td className="border px-4 py-2">
                <ul>
                  {election.candidates.map((candidate) => (
                    <li key={candidate._id}>
                      {candidate.candidateName} - {candidate.party} - Votes: {candidate.votes}
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ElectionList;
