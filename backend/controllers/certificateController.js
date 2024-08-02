const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const Certificate = require('../models/Certificate');
const web3 = require('../web3');
const contract = require('@truffle/contract');
const CertificateArtifact = require('../../blockchain/build/contracts/Certificate.json');

const CertificateContract = contract(CertificateArtifact);
CertificateContract.setProvider(web3.currentProvider);

exports.register = async (req, res) => {
  const { ipHash, owner } = req.body;

  try {
    const accounts = await web3.eth.getAccounts();
    const certInstance = await CertificateContract.deployed();

    await certInstance.registerCertificate(ipHash, { from: accounts[0] });

    const newCert = new Certificate({
      ipHash,
      owner,
      timestamp: new Date(),
    });

    await newCert.save();

    res.send('Certificate registered successfully.');
  } catch (error) {
    console.error('Error in /register route:', error);
    res.status(500).send('Error registering certificate.');
  }
};

exports.upload = async (req, res) => {
  const { file } = req;
  if (!file) return res.status(400).send('No file uploaded.');

  try {
    const filePath = file.path;
    const fileHash = crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
    console.log('File uploaded and hashed successfully:', fileHash);

    res.json({ fileHash });
  } catch (error) {
    console.error('Error in /upload route:', error);
    res.status(500).send('Error uploading document.');
  }
};

exports.verify = async (req, res) => {
  const { hash } = req.body;

  try {
    const certInstance = await CertificateContract.deployed();
    const cert = await certInstance.getCertificate(hash);

    if (cert[0] === '') {
      res.status(404).send('Certificate not found.');
    } else {
      res.json({
        ipHash: cert[0],
        owner: cert[1],
        timestamp: new Date(cert[2] * 1000),
      });
    }
  } catch (error) {
    console.error('Error in /verify route:', error);
    res.status(500).send('Error verifying document.');
  }
};
