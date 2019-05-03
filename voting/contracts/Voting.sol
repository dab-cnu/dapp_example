pragma solidity ^0.5.0;

contract Voting {
  address private owner;
  
  struct Candidate {
    string name;
    uint8 voteCount;
  }

  struct Voter {
    address voterAddress;
    bool right;
  }

  Voter[] private voterList;
  Candidate[] private candidateList;

  event VotedEvent(uint8 _id, address _voter);
  event AddedCandidateEvent(string name);

  constructor() public {
    owner = msg.sender;
  }

  function getOwner() public view returns (address) {
    return owner;
  }

  function addCandidate(string memory name) public {
    candidateList.push(Candidate(name, 0));
    emit AddedCandidateEvent(name);
  }

  function getCandidate(uint8 _id) public view returns (string memory, uint8) {
    return (candidateList[_id].name, candidateList[_id].voteCount);
  }

  function getCandidateListLength() public view returns (uint) {
    return candidateList.length;
  }

  function addVoter(address _voter) public {
    voterList.push(Voter(_voter, true));
  }

  function getVoter(uint8 _id) public view returns (address, bool) {
    return (voterList[_id].voterAddress, voterList[_id].right);
  }
  
  function getVoterCount() public view returns (uint) {
    return voterList.length;
  }

  function vote(uint8 _id) public {
    require(_id >=0 && _id < candidateList.length);
    require(validateVoter(msg.sender));
    candidateList[_id].voteCount++;
    // changeRight(msg.sender);
    emit VotedEvent(_id, msg.sender);
  }

  function validateVoter(address _sender) private view returns (bool) {
    for (uint8 i = 0; i < voterList.length; i++) {
      if (voterList[i].voterAddress == _sender) {
        return voterList[i].right;
      }
    }
    return false;
  }

  function changeRight(address _sender) private {
    for (uint8 i = 0; i < voterList.length; i++) {
      if (voterList[i].voterAddress == _sender) {
        voterList[i].right = false;
      }
    }
  }
}
