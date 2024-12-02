import React, { useState } from 'react';
import CryptoJS from "crypto-js";

function App() {
  const [file, setFile] = useState(null);
  const [key, setKey] = useState('');
  const [encryptedData, setEncryptedData] = useState(null);
  const [decryptedData, setDecryptedData] = useState(null);
  const [error, setError] = useState('');

  const handleFileInput = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  const handleKeyInput = (event) => {
    setKey(event.target.value);
  };

  const encryptFile = () => {
    if (!key) {
      setError('Key is required');
      return;
    }

    if (!file) {
      setError('No file selected');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const fileContent = reader.result;
      const encrypted = CryptoJS.AES.encrypt(fileContent, key).toString();
      setEncryptedData(encrypted);
    };
    reader.readAsText(file);
  };

  const decryptFile = () => {
    if (!key) {
      setError('Key is required');
      return;
    }

    if (!encryptedData) {
      setError('No encrypted data');
      return;
    }

    const decrypted = CryptoJS.AES.decrypt(encryptedData, key).toString(CryptoJS.enc.Utf8);
    setDecryptedData(decrypted);
  };

  return (

  );
}

export default App;
