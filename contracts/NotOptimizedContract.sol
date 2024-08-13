// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

contract NotOptimizedContract {

  // struct User {
  //   uint id;
  //   string name;
  //   uint balance;
  // }

  mapping(uint => uint) public _userId;
  mapping(uint => string) public _userName;
  mapping(uint => uint) public _userBalance;


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
    _userId[nextId] = nextId;
    _userName[nextId] = _name;
    _userBalance[nextId] = 0;
    nextId++;
  }

  function deposit(uint _id, uint amount) public {
    _userBalance[_id] = _userBalance[_id] + amount;
  }

  function getUser(uint _id) external view returns(uint, string memory, uint) {
    return (_userId[_id], _userName[_id], _userBalance[_id]);
  }
}