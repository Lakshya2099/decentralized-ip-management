pragma solidity ^0.8.0;

contract Certificate {
    struct CertificateDetails {
        string ipHash;
        address owner;
        uint timestamp;
    }

    mapping(string => CertificateDetails) public certificates;

    event CertificateRegistered(string ipHash, address owner);

    function registerCertificate(string memory _ipHash) public {
        require(certificates[_ipHash].owner == address(0), "Certificate already registered");

        certificates[_ipHash] = CertificateDetails({
            ipHash: _ipHash,
            owner: msg.sender,
            timestamp: block.timestamp
        });

        emit CertificateRegistered(_ipHash, msg.sender);
    }

    function getCertificate(string memory _ipHash) public view returns (string memory, address, uint) {
        CertificateDetails memory cert = certificates[_ipHash];
        return (cert.ipHash, cert.owner, cert.timestamp);
    }
}
