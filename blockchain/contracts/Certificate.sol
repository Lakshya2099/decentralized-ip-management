// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Certificate {
    struct Cert {
        string ipHash;
        address owner;
        uint256 timestamp;
    }

    mapping(string => Cert) public certificates;

    event CertificateRegistered(string ipHash, address owner, uint256 timestamp);

    function registerCertificate(string memory ipHash) public {
        require(bytes(certificates[ipHash].ipHash).length == 0, "Certificate already exists.");

        certificates[ipHash] = Cert(ipHash, msg.sender, block.timestamp);

        emit CertificateRegistered(ipHash, msg.sender, block.timestamp);
    }

    function getCertificate(string memory ipHash) public view returns (string memory, address, uint256) {
        require(bytes(certificates[ipHash].ipHash).length != 0, "Certificate does not exist.");

        Cert memory cert = certificates[ipHash];

        return (cert.ipHash, cert.owner, cert.timestamp);
    }
}
