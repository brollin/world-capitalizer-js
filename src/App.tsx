import React, { useState } from 'react';
import logo from './World-Map.svg';
import './App.css';

const { countries, capitals } = require("./data.json");

/**
 * Shuffles multiple arrays in place in the same way.
 */
function shuffleArrays(a: any[], b: any[]) {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
      [b[i], b[j]] = [b[j], b[i]];
  }
  return [a, b];
}

shuffleArrays(countries, capitals);

function isAnswerCorrect(answerText: string, answer: string): boolean {
  return answerText.toLowerCase().trim() === answer.toLowerCase().trim();
}

function TestComponent() {
  const [correctCount, setCorrectCount] = useState(0);
  const [countryIndex, setCountryIndex] = useState(0);
  const [answerText, setAnswerText] = useState("");

  function handleAnswerChange(newAnswer: string) {
    if (isAnswerCorrect(newAnswer, capitals[countryIndex])) {
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
    Previous:
    <br />
    {countryIndex > 0 && countries[countryIndex - 1]} - {countryIndex > 0 && capitals[countryIndex - 1]}
    <br />
    <br />
    What is the capital of <span style={{ color: "lightgreen" }}>{countries[countryIndex]}</span>?
    <br />
    <form
      onSubmit={(e) => {
        setCountryIndex(countryIndex + 1);
        e.preventDefault();
      }}
    >
      <input
        autoFocus
        type="text"
        onChange={e => {
          handleAnswerChange(e.target.value);
        }}
        value={answerText}
      />
      <input type="submit"
        value="Idk"
      />
    </form>
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
