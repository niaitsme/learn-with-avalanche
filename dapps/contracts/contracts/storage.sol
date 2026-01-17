// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleStorage {
    address public owner;
    uint256 private storedValue;

    string public message;
    event ValueUpdated(uint256 newValue);
    event OwnerSet(address indexed oldOwner, address indexed newOwner);
    event MessageUpdated(string newMessage);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner"); // validasi: Kalau bukan owner, tolak!
        _;
    }

    constructor() {
        owner = msg.sender;
        emit OwnerSet(address(0), msg.sender);
    }

    // --- UPDATE ---
    // Update Angka (Hanya Owner)
    function setValue(uint256 _value) public onlyOwner {
        storedValue = _value;
        emit ValueUpdated(_value);
    }

    // Update Pesan (Hanya Owner)
    function setMessage(string memory _message) public onlyOwner {
        message = _message;
        emit MessageUpdated(_message);
    }

    // --- (READ) ---
    function getValue() public view returns (uint256) {
        return storedValue;
    }

    function getMessage() public view returns (string memory) {
        return message;
    }
}