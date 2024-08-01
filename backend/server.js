const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Web3 = require('web3'); // Correct import of Web3
const contract = require('@truffle/contract');
const CertificateArtifact = require('../blockchain/build/contracts/Certificate.json');

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Use body-parser middleware to parse JSON requests
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define the Certificate schema and model
const CertificateSchema = new mongoose.Schema({
  ipHash: String,
  owner: String,
  timestamp: Date,
});

const Certificate = mongoose.model('Certificate', CertificateSchema);

// Initialize Web3
const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545')); // Ensure this matches your Ganache instance

// Set up the smart contract
const CertificateContract = contract(CertificateArtifact);
CertificateContract.setProvider(web3.currentProvider);

app.post('/register', async (req, res) => {
  const { ipHash, owner } = req.body;

  try {
    const accounts = await web3.eth.getAccounts();
    const certInstance = await CertificateContract.deployed();

    // Interact with the smart contract to register the certificate
    await certInstance.registerCertificate(ipHash, { from: accounts[0] });

    // Save the certificate details in MongoDB
    const newCert = new Certificate({
      ipHash,
      owner,
      timestamp: new Date(),
    });

    await newCert.save();

    res.send('Certificate registered successfully.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error registering certificate.');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
