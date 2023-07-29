import React, { useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';

function App() {
  //Properties
  const [showFinalResults, setFinalResults] = useState(false);
  const [score, setScore] = useState(0);
  const [CurrentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState([]);


  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await axios.get('http://localhost:8800/mcqs');
      const data = response.data.map((item) => ({
        text: item.Questions,
        options: [
          { id: 0, text: item.optionA, isCorrect: item.CorrectAnswer === "optionA" },
          { id: 1, text: item.optionB, isCorrect: item.CorrectAnswer === "optionB" },
          { id: 2, text: item.optionC, isCorrect: item.CorrectAnswer === "optionC" },
          { id: 3, text: item.CorrectAnswer, isCorrect: item.CorrectAnswer === "Correct Answer" },
        ],
      }));
      setQuestions(data);
    } catch (error) {
      console.error('Error fetching quiz data:', error);
    }
  };
  
  
  
  
  
  
  // const questions = [
  //   {
  //     text: "What is the capital of America?",
  //     options: [
  //       { id: 0, text: "New York City", isCorrect: false },
  //       { id: 1, text: "Boston", isCorrect: false },
  //       { id: 2, text: "Santa Fe", isCorrect: false },
  //       { id: 3, text: "Washington DC", isCorrect: true },
  //     ],
  //   },
  //   {
  //     text: "What year was the Constitution of America written?",
  //     options: [
  //       { id: 0, text: "1787", isCorrect: true },
  //       { id: 1, text: "1776", isCorrect: false },
  //       { id: 2, text: "1774", isCorrect: false },
  //       { id: 3, text: "1826", isCorrect: false },
  //     ],
  //   },
  //   {
  //     text: "Who was the second president of the US?",
  //     options: [
  //       { id: 0, text: "John Adams", isCorrect: true },
  //       { id: 1, text: "Paul Revere", isCorrect: false },
  //       { id: 2, text: "Thomas Jefferson", isCorrect: false },
  //       { id: 3, text: "Benjamin Franklin", isCorrect: false },
  //     ],
  //   },
  //   {
  //     text: "What is the largest state in the US?",
  //     options: [
  //       { id: 0, text: "California", isCorrect: false },
  //       { id: 1, text: "Alaska", isCorrect: true },
  //       { id: 2, text: "Texas", isCorrect: false },
  //       { id: 3, text: "Montana", isCorrect: false },
  //     ],
  //   },
  //   {
  //     text: "Which of the following countries DO NOT border the US?",
  //     options: [
  //       { id: 0, text: "Canada", isCorrect: false },
  //       { id: 1, text: "Russia", isCorrect: true },
  //       { id: 2, text: "Cuba", isCorrect: true },
  //       { id: 3, text: "Mexico", isCorrect: false },
  //     ],
  //   },
  // ];

  //function option clicked
  //Helper Function
  const optionClicked = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    if (CurrentQuestion + 1 < questions.length){
      setCurrentQuestion(CurrentQuestion + 1);

    }else{
      setFinalResults(true);
    }
    
  }
  // Check if the questions data has been fetched and is available
  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      {/*1. Header*/}
      <h1>Multiple Choice Quiz</h1>
      {/*2. Current Score*/}
      <h2>Current Score: {score}</h2>

      {showFinalResults ? (
        /*4. Final Results*/ 
        <div className='final-results'>
          <h1>Final Results</h1>
          <h2>{score} out of {questions.length} correct -({(score/questions.length) * 100}%)</h2>
        </div>

      ): (
        /*3. Question Card*/ 
        <div className='question-card'>
          <h2>Question {CurrentQuestion + 1 } out of {questions.length}</h2>
          <h3 className='question-text'>{questions[CurrentQuestion].text}</h3>
          <ul>
            {questions[CurrentQuestion].options.map((option) => {
              return (
                <li onClick={() => optionClicked(option.isCorrect)} key={option.id}>{option.text}</li>
              );
            })}
          </ul>
        </div> 
          


      )}    
    </div >
  );
}

export default App;
