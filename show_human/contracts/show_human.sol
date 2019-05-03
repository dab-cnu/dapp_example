pragma solidity ^0.5.0;

contract show_human {
  address private owner;

  constructor() public {
    owner = msg.sender;
  }

  struct Human {
    string name;
    uint8 age;
  }

  Human[] private humanList;

  event AddedHumanEvent(string name);

  function addHuman(string memory _name, uint8 _age) public {
    humanList.push(Human(_name, _age));
    emit AddedHumanEvent(_name);
  }

  function getHuman(uint8 _id) public view returns (string memory, uint8) {
    return (humanList[_id].name, humanList[_id].age);
  }

  function getHumanCount() public view returns (uint) {
    return humanList.length;
  }
}