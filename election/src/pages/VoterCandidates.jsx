import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_DEV_URL from '../utils/config';

const ElectionList = () => {
  const [elections, setElections] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming':
        return 'text-blue-600';
      case 'live':
        return 'text-green-600';
      case 'expired':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const sortedElections = elections.sort((a, b) => {
    const statusA = getElectionStatus(a);
    const statusB = getElectionStatus(b);

    if (statusA === statusB) return 0;
    if (statusA === 'live') return -1;
    if (statusB === 'live') return 1;
    if (statusA === 'upcoming') return -1;
    if (statusB === 'upcoming') return 1;
    return 0;
  });

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Election List</h2>
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
          {sortedElections.map((election) => (
            <tr key={election._id}>
              <td className="border px-4 py-2">{election.constituency}</td>
              <td className="border px-4 py-2">{election.electionStartDate}</td>
              <td className="border px-4 py-2">{election.electionStartTime}</td>
              <td className="border px-4 py-2">{election.electionEndDate}</td>
              <td className="border px-4 py-2">{election.electionEndTime}</td>
              <td className={`border px-4 py-2 ${getStatusColor(getElectionStatus(election))}`}>
                {getElectionStatus(election).toUpperCase()}
              </td>
              <td className="border px-4 py-2">
                <ul>
                  {election.candidates.map((candidate) => (
                    <li key={candidate._id}>
                    {candidate.candidateName} - {candidate.party} 
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
