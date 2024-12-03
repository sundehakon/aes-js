import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import { Button, TextField, Container, Typography, Box, Snackbar } from '@mui/material';

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
      try {
        const encrypted = CryptoJS.AES.encrypt(fileContent, key).toString();
        console.log('Encrypted data:', encrypted);
        setEncryptedData(encrypted);
        setDecryptedData(null);  
        downloadEncryptedFile(encrypted);
      } catch (err) {
        setError('Error during encryption');
        console.error(err);
      }
    };
    reader.readAsText(file);
  };

  const decryptFile = () => {
    if (!key) {
      setError('Key is required for decryption');
      return;
    }

    if (!encryptedData) {
      setError('No encrypted data available.');
      return;
    }

    try {
      console.log('Encrypted data for decryption:', encryptedData);
      const bytes = CryptoJS.AES.decrypt(encryptedData, key); 
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);   
      if (!decrypted) {
        setError('Decryption failed. Invalid key or corrupted data.');
        return;
      }
      setDecryptedData(decrypted);
    } catch (err) {
      setError('Error during decryption.');
      console.error(err);
    }
  };

  const handleEncryptedDataInput = (event) => {
    setEncryptedData(event.target.value); 
  };

  const downloadEncryptedFile = (encryptedData) => {
    const blob = new Blob([encryptedData], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'encrypted_file.txt';
    link.click();
  };
  
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 2 }}>
        <Typography variant="h4">AES Encryption/Decryption</Typography>
        <Box sx={{ my: 2 }}>
          <TextField
            fullWidth
            label="Encryption Key"
            variant="outlined"
            value={key}
            onChange={handleKeyInput}
            type="password"
            sx={{ mb: 2 }}
          />
          
          <Typography variant="h6" sx={{ my: 2 }}>Encrypt a file:</Typography>
          <input
            type="file"
            onChange={handleFileInput}
            accept=".txt"
            style={{ marginBottom: "20px" }}
          />
          <Box sx={{ my: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={encryptFile}
              sx={{ mr: 2 }}
            >
              Encrypt File
            </Button>
          </Box>

          <Typography variant="h6" sx={{ my: 2 }}>Decrypt:</Typography>
          <TextField
            fullWidth
            label="Paste Encrypted Data"
            variant="outlined"
            value={encryptedData || ''}
            onChange={handleEncryptedDataInput}
            sx={{ mb: 2 }}
          />
          
          <Box sx={{ my: 2 }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={decryptFile}
              disabled={!key || !encryptedData}  
            >
              Decrypt File
            </Button>
          </Box>
        </Box>
        
        {error && (
          <Snackbar
            open={true}
            message={error}
            autoHideDuration={3000}
            onClose={() => setError("")}
          />
        )}

        {decryptedData && (
          <Box sx={{ my: 2 }}>
            <Typography variant="h6">Decrypted Data:</Typography>
            <Typography variant="body1" sx={{ wordBreak: "break-word" }}>
              {decryptedData}
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default App;
