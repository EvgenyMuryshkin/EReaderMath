import React, { useMemo, useState } from 'react';
import logo from './logo.svg';
import './App.scss';
import { INumericalQuestion, QuestionsGenerator } from './QuestionsGenerator';


function App() {
  const [ generator ] = useState(new QuestionsGenerator());
  const [ question, setQuestion ] = useState<INumericalQuestion>(generator.numericalQuestion());
  const [ solution, setSolution ] = useState<string>("");
  const [ review, setReview ] = useState<string>("Waiting");

  function backspace() {
    solution.length && setSolution(solution.substring(0, solution.length - 1))
  }

  function clear() {
    setSolution("");
  }

  function next() {
    setQuestion(generator.numericalQuestion());
    setSolution("");
    setReview("Waiting")
  }

  function check() {
    const input = parseInt(solution);
    if (input == question.solution) {
      setReview("Correct :)");
    }
    else {
      setReview("Incorrect :(")
    }
  }

  function cell(symbol: string = "", onClick: (() => void) | (null) = null) {
    return <td onClick={() => onClick?.()}>{symbol}</td>
  
  }

  function numberCell(symbol: string) {
    return cell(symbol, () => setSolution(solution + symbol));
  }


  return (
    <div className="App">
      <div>
        <table className='problem-table'>
          <tr>
            <td className='label'>Problem</td>
            <td>{question.problem}</td>
            <td><button onClick={next}>Next</button></td>
          </tr>
          <tr>
            <td className='label'>Solution</td>
            <td><input type="number" readOnly value={solution} onChange={e => setSolution(e.target.value)}></input></td>
            <td><button onClick={check}>Check</button></td>
          </tr>
          <tr>
            <td className='label'>Review</td>
            <td>{review}</td>
            <td></td>
          </tr>
        </table>
      </div>
      <div>
        <table className='keypad-table'>
          <tr>
            {numberCell("1")}
            {numberCell("2")}
            {numberCell("3")}
            {cell("C", () => setSolution(""))}
          </tr>
          <tr>
            {numberCell("4")}
            {numberCell("5")}
            {numberCell("6")}
            {cell("<", backspace)}
          </tr>
          <tr>
            {numberCell("7")}
            {numberCell("8")}
            {numberCell("9")}
            {numberCell("-")}
          </tr>
          <tr>
            {cell()}
            {numberCell("0")}
            {cell()}
            {numberCell(".")}
          </tr>
        </table>
      </div>
    </div>
  );
}

export default App;
