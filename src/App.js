import React, { useState } from 'react';

function App() {
  const [file, setFile] = useState(null);

  const handleFileInput = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
    }
  };
  
  return (

  );
}

export default App;
