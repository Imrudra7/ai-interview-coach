
import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
  const [welcomeMsg, setWelcomeMsg] = useState('');
  const [userText, setUserText] = useState('');
  const [thinkingText, setThinkingText] = useState('');
  let controller = new AbortController();


  useEffect(() => {

    fetch(`${process.env.REACT_APP_API_URL}/api/hello`)
      .then((res) => res.json())
      .then((data) => setWelcomeMsg(data.msg))
      .catch((err) => console.error('API Error:', err));
  }, []);
  const [response, setResponse] = useState('');


  const handleLiveInterview = async () => {
    setResponse('');
    controller = new AbortController();

    const prompt = `
    You are an AI interview coach. Based on the following resume or user input, ask 3 clear and concise interview questions.
    Avoid any internal thoughts or <think> tags.

    User Input:
    ${userText}
  `;

    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/stream-interview`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
      signal: controller.signal,
    });

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    let skipping = false;

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      setUserText('');
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop(); // incomplete

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || !trimmed.startsWith('data:')) continue;

        try {
          const jsonStr = trimmed.replace(/^data:\s*/, '');
          const parsed = JSON.parse(jsonStr);
          let word = parsed.response;

          // 🔁 Handle <think> block
          if (!skipping && word.includes('<think>')) {
            skipping = true;
            setThinkingText(word.split('<think>')[1] || '');
            continue;
          }

          if (skipping) {
            if (word.includes('</think>')) {
              skipping = false;
              setThinkingText('');
              word = word.split('</think>')[1] || '';
            } else {
              setThinkingText(prev => prev + ' ' + word);
              continue;
            }
          }

          // ⌨️ Simulated typing
          for (let char of word) {
            await new Promise((res) => setTimeout(res, 0));
            setResponse((prev) => prev + char);
          }

          if (parsed.done) console.log('Stream done');
        } catch (err) {
          console.error('Parse error:', trimmed, err);
        }
      }
    }

  };





  return (
    <div className="app">
      <header>
        <h1>🧠 AI Interview Coach</h1>
        <p>{welcomeMsg || "Practice. Learn. Crack that Job."}</p>
      </header>

      <main>
        {thinkingText && (
          <div className="thinking-loader">
            🤖 Thinking: <span>{thinkingText}</span>
          </div>
        )}

        <div className="chat-container">
          <div className="bubble user">{userText}</div>
          <div className="bubble bot typing">{response}</div>
        </div>

        <div className="input-section">
          <textarea
            placeholder="Paste your resume..."
            rows={2}
            value={userText}
            onChange={(e) => setUserText(e.target.value)}
          />
          <div className="button-group">
            <button onClick={handleLiveInterview}>Start Live Interview</button>
            <button onClick={() => controller.abort()}>Cancel</button>
          </div>
        </div>
      </main>


    </div>
  );
}

export default App;
