
import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
  const [welcomeMsg, setWelcomeMsg] = useState('');

  useEffect(() => {

    fetch(`${process.env.REACT_APP_API_URL}/api/hello`)
      .then((res) => res.json())
      .then((data) => setWelcomeMsg(data.msg))
      .catch((err) => console.error('API Error:', err));
  }, []);
  const [response, setResponse] = useState('');

  const handleInterviewStart = async () => {
    const text = document.querySelector('textarea').value;

    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/interview`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: text })
    });

    const data = await res.json();
    setResponse(data.reply); // Show response
  };

  return (
    <div className="app">
      <header>
        <h1>🧠 AI Interview Coach</h1>
        <p>{welcomeMsg || "Practice. Learn. Crack that Job."}</p>
      </header>

      <main>
        <textarea
          placeholder="Paste your resume, or type your intro..."
          rows={8}
        />
        <button onClick={handleInterviewStart}>Start Interview Simulation</button>
        {response && <div className="response">{response}</div>}

      </main>
    </div>
  );
}

export default App;
