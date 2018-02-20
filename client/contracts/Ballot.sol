pragma solidity ^0.4.17;

import "./Ownable.sol";

contract Ballot is Ownable {

    struct Candidate {
        bytes32 name;
        bytes32 party;
        uint voteCount;
    }

    struct Voter {
        bytes32 name;
        bytes32 pin;
        bytes32 ssn;
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

  function createVoter(address _address, bytes32 _name, bytes32 _ssn, bytes32 _pin) onlyOwner public returns(bytes32, bytes32, bytes32) {
      
    //   Voter memory voter = Voter({
    //     name: _name,
    //     pin: _pin,
    //     ssn: _ssn,
    //     voted: false,
    //     vote: 0,
    //     weight: 1
    //   });

      voters[_address].name = _name;
      voters[_address].pin = _pin;
      voters[_address].ssn = _ssn;
      voters[_address].voted = false;
      voters[_address].vote = 0;
      voters[_address].weight = 1;

      return (voters[_address].name,  voters[_address].ssn, voters[_address].pin);
  }

  function getNumCandidates() public view returns(uint) {
      uint length = candidates.length;
      return length;
  }

  function getCandidate(uint index) public view returns(bytes32, bytes32) {
      return (candidates[index].name, candidates[index].party);
  }

  function giveRightToVote(address voter) onlyOwner public {
      require(!voters[voter].voted && (voters[voter].weight == 0));
      voters[voter].weight = 1;
  }

  function vote(uint candidate) public {
      Voter storage sender = voters[msg.sender];
      require(!sender.voted);
      sender.voted = true;
      sender.vote = candidate;

      candidates[candidate].voteCount += sender.weight;
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