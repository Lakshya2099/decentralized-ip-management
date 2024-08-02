const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Web3 = require('web3');
const contract = require('@truffle/contract');
const multer = require('multer');
const crypto = require('crypto');
const fs = require('fs');
const CertificateArtifact = require('../blockchain/build/contracts/Certificate.json');
const cors = require('cors');

// Load environment variables from .env file
dotenv.config();



const app = express();
const port = process.env.PORT || 5000;

// Middleware for cross-origin access
app.use(cors({
  origin:'http://localhost:5173',
  credentials:true,
  
}))

// Middleware for parsing JSON and handling file uploads
app.use(bodyParser.json());
app.use(multer({ dest: 'uploads/' }).single('document'));

// Serve static files from the 'frontend/public' directory
app.use(express.static(path.join(__dirname, '../frontend/public')));

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
const web3 = new Web3(process.env.GANACHE_URI || 'http://localhost:8545');

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
    console.error('Error in /register route:', error);
    res.status(500).send('Error registering certificate.');
  }
});

app.post('/upload', async (req, res) => {
  const { file } = req;
  if (!file) return res.status(400).send('No file uploaded.');

  try {
    const filePath = path.join(__dirname, 'uploads', file.originalname);
    fs.renameSync(file.path, filePath);

    const fileHash = crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
    console.log("Success");

    res.json({ fileHash });
  } catch (error) {
    console.error('Error in /upload route:', error);
    res.status(500).send('Error uploading document.');
  }
});

app.post('/verify', async (req, res) => {
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
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
