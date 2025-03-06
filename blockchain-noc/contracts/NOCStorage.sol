// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract NOCStorage {
    struct NOC {
        string applicationId;
        string ownerName;
        string businessName;
        string email;
        string contact;
        string nocUrl;
        uint256 issuedOn;
    }

    mapping(string => NOC) public nocs;

    event NOCIssued(string indexed applicationId, string ownerName, string businessName, string nocUrl, uint256 issuedOn);

    function storeNOC(
        string memory _applicationId,
        string memory _ownerName,
        string memory _businessName,
        string memory _email,
        string memory _contact,
        string memory _nocUrl,
        uint256 _issuedOn
    ) public {
        require(bytes(nocs[_applicationId].applicationId).length == 0, "NOC already exists!");

        nocs[_applicationId] = NOC(_applicationId, _ownerName, _businessName, _email, _contact, _nocUrl, _issuedOn);

        emit NOCIssued(_applicationId, _ownerName, _businessName, _nocUrl, _issuedOn);
    }

    function getNOC(string memory _applicationId) public view returns (NOC memory) {
        require(bytes(nocs[_applicationId].applicationId).length > 0, "NOC not found!");
        return nocs[_applicationId];
    }
}

keccak256(new struct(NOC))