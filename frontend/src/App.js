import React from 'react';
import './App.css';

function App() {
  return (
    <div className="app">
      <header>
        <h1>🧠 AI Interview Coach</h1>
        <p>Practice. Learn. Crack that Job.</p>
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
