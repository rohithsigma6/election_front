import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_DEV_URL from '../utils/config';

const ElectionResults = () => {
  const [elections, setElections] = useState([]);
  const [selectedElection, setSelectedElection] = useState(null);

  useEffect(() => {
  
    axios
      .get(`${API_DEV_URL}/get_all_elections`, {
        headers: {
          authorization: localStorage.getItem('voterToken'),
        },
      })
      .then((response) => {
      
        const expiredElections = response.data.elections.filter((election) => {
          const currentDate = new Date();
          const endDate = new Date(election.electionEndDate);
          return currentDate > endDate;
        });
        setElections(expiredElections);
      })
      .catch((error) => {
        console.error('Error fetching elections:', error);
      });
  }, []);

  const handleElectionSelect = (electionId) => {
    setSelectedElection(electionId);
  };

  return (
    <div className="bg-blue-100 min-h-screen  w-full flex flex-col items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-semibold mb-4 text-blue-600"> Election Results</h1>

        <div className="mb-4">
          <h2 className="text-xl font-semibold">Select an Election:</h2>
          <ul>
            {elections.map((election) => (
              <li key={election._id}>
                <button
                  onClick={() => handleElectionSelect(election._id)}
                  className={`${
                    selectedElection === election._id
                      ? 'bg-blue-600 text-white'
                      : 'bg-white hover:bg-gray-200'
                  } py-2 px-4 rounded-full m-2 cursor-pointer`}
                >
                  {election.constituency} ({election.electionStartDate})
                </button>
              </li>
            ))}
          </ul>
        </div>

        {selectedElection && <ElectionResultDetails electionId={selectedElection} />}
      </div>
    </div>
  );
};

const ElectionResultDetails = ({ electionId }) => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
   
    axios
      .get(`${API_DEV_URL}/get_candidates_by_election/${electionId}`, {
        headers: {
          authorization: localStorage.getItem('voterToken'),
        },
      })
      .then((response) => {
        console.log(response);
        setCandidates(response.data.candidates.candidates);
      })
      .catch((error) => {
        console.error('Error fetching election results:', error);
      });
  }, [electionId]);


  const winnerVotes = Math.max(...candidates.map((candidate) => candidate.votes));
  
  const sortedCandidates = candidates.sort((a, b) => b.votes - a.votes);

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Election Results:</h2>
        <ul>
          {sortedCandidates.map((candidate, index) => (
            <li key={candidate._id}>
              <div className={`flex justify-between py-2 px-4 m-2 rounded-full ${
                candidate.votes === winnerVotes ? 'bg-green-100' : 'bg-red-100'
              }`}>
                <span className="font-semibold">{index + 1}. {candidate.candidateName}</span>
                <span className="font-bold">{candidate.votes} Votes</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ElectionResults;
