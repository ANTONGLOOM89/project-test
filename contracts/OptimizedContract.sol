// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

contract OptimizedContract {

  struct User {
    uint id;
    string name;
    uint balance;
  }

  mapping(uint => User) public _users;
  // Счетчик для генерации уникальных идентификаторов пользователей
  uint public nextId;
  string private _description;

  function getDescription() public view returns (string memory) {
      return _description;
  }

  constructor(string memory description) {
    _description = description;
  }

  function createUser(string memory _name) public {
    _users[nextId] = User(nextId, _name, 0);
    nextId++;
  }

  function deposit(uint _id, uint amount) public {
    _users[_id].balance += amount;
  }

  function getUser(uint _id) external view returns(User memory) {
    return _users[_id];
  }
}