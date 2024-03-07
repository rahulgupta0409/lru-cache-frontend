import React, { useState } from 'react';
import './App.css';

function App() {
  const [getKey, setGetKey] = useState('');
  const [setKey, setSetKey] = useState('');
  const [setValue, setSetValue] = useState('');
  const [getResponse, setGetResponse] = useState('');

  const handleGet = async () => {
    try {
      const response = await fetch(`http://localhost:8080/getValue?key=${getKey}`);
      const data = await response.json();
      console.log(data);
      setGetResponse(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSet = async () => {
    try {
      await fetch(`http://localhost:8080/setValue`, {
        method: 'POST',
        // headers: {
        //   'Content-Type': 'application/json',
        // },
        body: JSON.stringify({
          key: setKey,
          value: setValue,
        }),
      });
      // Clear input fields after successful set
      setSetKey('');
      setSetValue('');
    } catch (error) {
      console.error('Error setting data:', error);
    }
  };

  return (
    <>
    <div className="app">
      <h1 className='app-name'>LRU CACHE</h1>

      <div className='get-value'>
        <h2 className="get-value-label">Get Value from Cache</h2>
        <input
          type="text"
          placeholder="Enter key"
          className="input-field"
          value={getKey}
          onChange={(e) => setGetKey(e.target.value)}
        />
        <button className="get-button" onClick={handleGet} disabled={getKey === ''}>GET</button>
        {getResponse ? <div className='result'>
            <span className='result-label'>Value:</span>
            <span className="result-value">{getResponse}</span>
          </div> 
          : getResponse === null && <div className='result-error'>Value not found</div>
          }
      </div>

      <div className="get-value">
        <h2 className="get-value-label">Set Value to Cache</h2>
        <input
          type="text"
          placeholder="Enter key"
          className="input-field"
          value={setKey}
          onChange={(e) => setSetKey(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter value"
          className="input-field"
          value={setValue}
          onChange={(e) => setSetValue(e.target.value)}
        />
        <button onClick={handleSet} className="set-button">SET</button>
      </div>
    </div>
    </>
  );
}

export default App;