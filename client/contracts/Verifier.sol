// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Verifier {
  uint public blockCount=0;
  struct Hashmake{
    uint id;
    string content;    
  }
  mapping(uint => Hashmake) public tasks;
  event TaskCreated(
    uint id,
    string content
  );
  constructor() public {
    createTask("newhash");
  }
  function
}
