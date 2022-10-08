// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract SimpleStorageNew {
    uint256 public favNumber;

    struct People {
        string name;
        uint256 age;
    }

    People[] public peopleArr;
    mapping(string => uint256) public nameToAge;

    function addPerson(string memory _name, uint256 _age) public {
        peopleArr.push(People(_name, _age));
        nameToAge[_name] = _age;
    }

    function store(uint256 _favNumber) public {
        favNumber = _favNumber;
    }

    function retrieve() public view returns (uint256) {
        return favNumber;
    }
}
