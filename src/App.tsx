import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

const { countries, capitals } = require("./data.json");

function checkAnswerText(answerText: string, answer: string): boolean {
  return answerText.toLowerCase().trim() === answer.toLowerCase().trim();
}

function TestComponent() {
  const [countryIndex, setCountryIndex] = useState(0);
  const [answerText, setAnswerText] = useState("");
  useEffect(() => {
    console.log("using effect");
  }, [countryIndex]);
  return <div>
    Previous Country: {countryIndex > 0 && countries[countryIndex - 1]}
    <br />
    Previous Capital: {countryIndex > 0 && capitals[countryIndex - 1]}
    <br />
    <br />
    Country: {countries[countryIndex]}
    <br />
    <input
      type="text"
      onChange={e => {
        const newAnswer = e.target.value;
        if (checkAnswerText(newAnswer, capitals[countryIndex])) {
          setAnswerText("");
          setCountryIndex(countryIndex + 1);
          return;
        }

        setAnswerText(e.target.value);
      }}
      value={answerText}
    />
    <button
      onClick={() => setCountryIndex(countryIndex + 1)}
    >Next</button>
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
