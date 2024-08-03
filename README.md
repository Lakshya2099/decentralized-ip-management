# Decentralized IP Management

## Overview

Decentralized IP Management is a blockchain-based application aimed at securely managing intellectual property rights and documents. By leveraging the power of blockchain, this system ensures the immutability and security of IP records.

## Features

- **Secure Document Management:** Store and manage IP documents securely on the blockchain.
- **Decentralized System:** Eliminate the need for a centralized authority.
- **Transparent and Immutable Records:** Ensure that IP records are tamper-proof and easily verifiable.
- **User-Friendly Interface:** Easy-to-use interface for managing IP documents.

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express
- **Blockchain:** Solidity, Web3.js
- **Database:** MongoDB

## Folder Structure

- `backend/` - Contains server-side code.
- `blockchain/` - Contains smart contract code.
- `frontend/` - Contains client-side code.
- `uploads/` - Directory for storing uploaded documents.

## Getting Started

### Prerequisites

- Node.js
- npm
- MetaMask extension
- Ganache CLI

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Lakshya2099/decentralized-ip-management.git
    ```
2. Navigate to the project directory:
    ```bash
    cd decentralized-ip-management
    ```
3. Install dependencies:
    ```bash
    npm install
    ```

### Running the Application

1. Start Ganache CLI to simulate a blockchain network:
    ```bash
    ganache-cli
    ```
2. Start the backend server:
    ```bash
    cd backend
    node server.js
    ```
3. Start the frontend:
    ```bash
    cd frontend
    npm start
    ```
4. Deploy smart contracts:
    ```bash
    cd blockchain
    truffle migrate
    ```

## Usage

1. Open MetaMask and connect to your local blockchain network.
2. Access the application through your web browser.
3. Register and log in to manage your IP documents.

## Future Scope

- **Integration with IP Offices:** Integrate the system with official IP offices for automatic updates and validation.
- **Enhanced Security Features:** Implement multi-factor authentication and advanced encryption techniques.
- **Scalability:** Improve the scalability of the application to handle a larger number of users and transactions.
- **Mobile Application:** Develop a mobile version of the application for easier access on-the-go.

## References

- [Blockchain Technology Overview](https://www.ibm.com/blockchain/what-is-blockchain)
- [Solidity Documentation](https://docs.soliditylang.org/)
- [Web3.js Documentation](https://web3js.readthedocs.io/)
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [Express.js Documentation](https://expressjs.com/)
- [Ganache CLI](https://www.trufflesuite.com/ganache)
