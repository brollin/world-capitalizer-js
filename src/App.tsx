import React, { useState } from 'react';
import logo from './World-Map.svg';
import './App.css';

const { countries, capitals } = require("./data.json");

function checkAnswerText(answerText: string, answer: string): boolean {
  return answerText.toLowerCase().trim() === answer.toLowerCase().trim();
}

function TestComponent() {
  const [correctCount, setCorrectCount] = useState(0);
  const [countryIndex, setCountryIndex] = useState(0);
  const [answerText, setAnswerText] = useState("");

  function handleAnswerChange(newAnswer: string) {
    if (checkAnswerText(newAnswer, capitals[countryIndex])) {
      setAnswerText("");
      setCountryIndex(countryIndex + 1);
      setCorrectCount(correctCount + 1);
      return;
    }

    setAnswerText(newAnswer);
  }

  return <div>
    <div style={{ color: "cyan" }}>
      Correct: {correctCount} / {countryIndex}
    </div>
    <br />
    Previous Country: {countryIndex > 0 && countries[countryIndex - 1]}
    <br />
    Previous Capital: {countryIndex > 0 && capitals[countryIndex - 1]}
    <br />
    <br />
    What is the capital of <span style={{color: "lightgreen" }}>{countries[countryIndex]}</span>?
    <br />
    <input
      autoFocus
      type="text"
      onChange={e => {
        handleAnswerChange(e.target.value);
      }}
      value={answerText}
    />
    <button
      onClick={() => setCountryIndex(countryIndex + 1)}
    >I don't know :(</button>
  </div>;
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <TestComponent />
      </header>
    </div>
  );
}

export default App;
