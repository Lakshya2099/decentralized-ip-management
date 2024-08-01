const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { Web3 } = require('web3');
const { Contract } = require('web3-eth-contract');
const CertificateArtifact = require('../blockchain/build/contracts/Certificate.json');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const CertificateSchema = new mongoose.Schema({
  ipHash: String,
  owner: String,
  timestamp: Date,
});

const Certificate = mongoose.model('Certificate', CertificateSchema);

const web3 = new Web3('http://localhost:8545');

let CertificateContract;

(async () => {
  const networkId = await web3.eth.getChainId();
  CertificateContract = new Contract(
    CertificateArtifact.abi,
    CertificateArtifact.networks[networkId].address
  );
})();

app.post('/register', async (req, res) => {
  const { ipHash, owner } = req.body;

  try {
    const accounts = await web3.eth.getAccounts();
    await CertificateContract.methods.registerCertificate(ipHash).send({ from: accounts[0] });

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