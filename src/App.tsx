import React, { useState } from 'react';
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

function normalizeText(text: string): string {
  return text.toLowerCase().trim().replace(/[\s'\-&]/g, "");
}
function isAnswerCorrect(answerText: string, answer: string): boolean {
  return normalizeText(answerText) === normalizeText(answer);
}

function Quiz() {
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

  const interactiveMap = (
    <iframe
      title="googleMap"
      width="350"
      height="350"
      style={{ border: 0 }}
      src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDS40cPM6UITBJsQwRHIFYgJK2V01ay8Bo&q=${encodeURIComponent("country of " + countries[countryIndex])}`}
    >
    </iframe>
  );

  return <div>
    {interactiveMap}
    <br />
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
        value="idk"
      />
    </form>
  </div>;
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Quiz />
      </header>
    </div>
  );
}

export default App;
