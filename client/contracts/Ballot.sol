pragma solidity ^0.4.17;

import "./Ownable.sol";

contract Ballot is Ownable {

    struct Candidate {
        bytes32 name;
        bytes32 party;
        uint voteCount;
    }

    struct Voter {
        uint ssn;
        bool voted;
        uint vote;
        uint weight;
    }

  address public owner;

  mapping(address => Voter) public voters;

  Candidate[] public candidates;

  function Ballot(bytes32[] candidateNames, bytes32[] candidateParties) public {
      owner = msg.sender;
      voters[owner].weight = 1;

      for (uint i = 0; i < candidateNames.length; i++) {
        candidates.push(Candidate({
            name: candidateNames[i],
            party: candidateParties[i],
            voteCount: 0
        }));
      }
  }

  function createVoter(address _address, uint _ssn) public returns(uint) {

      voters[_address].ssn = _ssn;
      voters[_address].voted = false;
      voters[_address].weight = 1;

      return (voters[_address].ssn);
  }

  function getNumCandidates() public view returns(uint) {
      uint length = candidates.length;
      return length;
  }

  function getCandidate(uint index) public view returns(bytes32, bytes32, uint) {
      return (candidates[index].name, candidates[index].party, candidates[index].voteCount);
  }

  function giveRightToVote(address voter) onlyOwner public {
      require(!voters[voter].voted && (voters[voter].weight == 0));
      voters[voter].weight = 1;
  }

  function vote(uint candidate) public {
      Voter storage sender = voters[msg.sender];
      require(!sender.voted && sender.weight == 1);
      sender.voted = true;
      sender.vote = candidate;

      candidates[candidate].voteCount += sender.weight;
      sender.weight -= 1;
  }

  function winningCandidate() public view
          returns (uint winningCandidate)
  {
      uint winningVoteCount = 0;
      for (uint p = 0; p < candidates.length; p++) {
          if (candidates[p].voteCount > winningVoteCount) {
              winningVoteCount = candidates[p].voteCount;
              winningCandidate = p;
          }
      }
  }

    function winnerName() public view
            returns (bytes32 winnerName)
    {
        winnerName = candidates[winningCandidate()].name;
    }

    function getNumber() public pure returns(uint aValue) { aValue = 444; }
}
