import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_DEV_URL from '../utils/config';

const Ballot = () => {
  const [elections, setElections] = useState([]);
  const [selectedElection, setSelectedElection] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  useEffect(() => {
    axios
      .get(`${API_DEV_URL}/get_specified_election`, {
        headers: {
          authorization: localStorage.getItem('voterToken'),
        },
      })
      .then((response) => {
        const filteredElections = response.data.elections.filter((election) => {
          const currentDate = new Date();
          return (
            new Date(election.electionStartDate) <= currentDate &&
            new Date(election.electionEndDate) >= currentDate
          );
        });
        setElections(filteredElections);
      })
      .catch((error) => {
        console.error('Error fetching elections:', error);
      });
  }, []);

  const handleElectionSelect = (electionId) => {
    axios
      .get(`${API_DEV_URL}/get_candidates_by_election/${electionId}`, {
        headers: {
          authorization: localStorage.getItem('voterToken'),
        },
      })
      .then((response) => {
        setCandidates(response.data.candidates.candidates);
        setSelectedElection(electionId);
        setSelectedCandidate(null);
        setFeedbackMessage('');
      })
      .catch((error) => {
        console.error('Error fetching candidates:', error);
        setFeedbackMessage('Failed to fetch candidates. Please try again later.');
      });
  };

  const handleCandidateSelect = (candidateId) => {
    setSelectedCandidate(candidateId);
  };

  const handleVoteSubmit = () => {
    if (!selectedElection || !selectedCandidate) {
      setFeedbackMessage('Please select both an election and a candidate.');
      return;
    }

    axios
      .post(
        `${API_DEV_URL}/submit_vote`,
        {
          electionId: selectedElection,
          candidateId: selectedCandidate,
        },
        {
          headers: {
            authorization: localStorage.getItem('voterToken'),
          },
        }
      )
      .then((response) => {
        setFeedbackMessage('Vote submitted successfully!');
        
      })
      .catch((error) => {
        console.error('Error submitting vote:', error);
        setFeedbackMessage('Failed to submit vote. Please try again later.');
      });
  };

  return (
    <div className="bg-blue-100 min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-semibold mb-4 text-blue-600">Ballot</h1>

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

        {selectedElection && (
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Select a Candidate:</h2>
            <ul>
              {candidates.map((candidate) => (
                <li key={candidate._id}>
                  <button
                    onClick={() => handleCandidateSelect(candidate._id)}
                    className={`${
                      selectedCandidate === candidate._id
                        ? 'bg-blue-600 text-white'
                        : 'bg-white hover:bg-gray-200'
                    } py-2 px-4 rounded-full m-2 cursor-pointer`}
                  >
                    {candidate.candidateName} - {candidate.party}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {selectedCandidate && (
          <div>
            <button
              onClick={handleVoteSubmit}
              className="bg-blue-600 text-white py-2 px-4 rounded-full m-2 cursor-pointer"
            >
              Vote
            </button>
          </div>
        )}

        {feedbackMessage && <p className="text-red-600">{feedbackMessage}</p>}
      </div>
    </div>
  );
};

export default Ballot;
