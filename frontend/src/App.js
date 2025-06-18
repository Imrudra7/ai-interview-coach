
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
        <button>Start Interview Simulation</button>
      </main>
    </div>
  );
}

export default App;
