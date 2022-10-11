pragma solidity >=0.5.0;

contract Verifier{
    uint public blockCount = 0;

    struct HashMake {
        uint id;
        string content;
    }

    mapping(uint => HashMake) public tasks;
    event TaskCreated(
        uint id,
        string content
    );
    constructor() public{
        createTask("hashhhh1");
    }
    function createTask(string memory _content) public {
        blockCount ++;
        tasks[blockCount] = HashMake(blockCount,_content);
        emit TaskCreated(blockCount, _content);
    }
}