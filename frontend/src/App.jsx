import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [uploadResult, setUploadResult] = useState('');
  const [verifyResult, setVerifyResult] = useState('');

  const handleUpload = async (event) => {
    event.preventDefault();
    
    const formData = new FormData(event.target);

    try {
      const response = await axios.post('http://localhost:5000/api/certificate/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setUploadResult(`Document uploaded successfully. Hash: ${response.data.fileHash}`);

      const registerResponse = await axios.post('http://localhost:5000/api/certificate/register', {
        ipHash: response.data.fileHash,
        owner: formData.get('owner')
      });

      setUploadResult(prev => prev + '\nCertificate registered successfully.');
    } catch (error) {
      console.error('Error:', error);
      setUploadResult(error.response?.data || 'Error uploading document.');
    }
  };

  const handleVerify = async (event) => {
    event.preventDefault();
    
    const hash = event.target.hash.value;

    try {
      const response = await axios.post('http://localhost:5000/api/certificate/verify', { hash });
      
      const result = response.data;
      setVerifyResult(`Document verified successfully.\nIP Hash: ${result.ipHash}\nOwner: ${result.owner}\nTimestamp: ${result.timestamp}`);
    } catch (error) {
      console.error('Error:', error);
      setVerifyResult(`Error verifying document: ${error.response?.data || error.message}`);
    }
  };

  return (
    <div className="container mx-auto max-w-2xl p-6 font-sans">
      <h1 className="text-2xl font-bold mb-4">Upload Document</h1>
      <form onSubmit={handleUpload} className="mb-6" encType="multipart/form-data">
        <input type="file" name="document" required className="block w-full mb-4 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none" />
        <input type="text" name="owner" placeholder="Owner Address" required className="block w-full mb-4 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500" />
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none">Upload Document</button>
      </form>
      <div className="result mb-6 whitespace-pre-line">{uploadResult}</div>

      <h1 className="text-2xl font-bold mb-4">Verify Document</h1>
      <form onSubmit={handleVerify} className="mb-6">
        <input type="text" name="hash" placeholder="Document Hash" required className="block w-full mb-4 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500" />
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none">Verify Document</button>
      </form>
      <div className="result whitespace-pre-line">{verifyResult}</div>
    </div>
  );
}

export default App;
