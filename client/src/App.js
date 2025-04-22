import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('/')
      .then(response => {
        setMessage(response.data);
      })
      .catch(error => {
        console.log('Error fetching data:', error);
      });
  }, []);
  return (
    <div className="App">
      <h1>{message}</h1>
    </div>
  );
}

export default App;
