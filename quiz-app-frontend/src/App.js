import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  //Properties
  const [showFinalResults, setFinalResults] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [nextButtonClicked, setNextButtonClicked] = useState(false); // Track Next button click
  const [selectedOption, setSelectedOption] = useState(null); // Track selected option



  useEffect(() => {
    fetchQuizzes();
  }, []);

  // useEffect(() => {
  //   console.log("Score updated:", score);
  // }, [score]);


  const fetchQuizzes = async () => {
    try {
      const response = await axios.get('http://localhost:8800/mcqs');
      const filteredData = response.data.filter(item => (
        item.Questions !== "Questions from backend" &&
        item.CorrectAnswer !== "orrectAnswer from backend" &&
        item.optionA !== "optionA from backend" &&
        item.optionB !== "optionB from backend" &&
        item.optionC !== "optionC from backend"
      ));

      const data = filteredData.map((item) => {
        const options = [
          { id: 0, text: item.optionA, isCorrect: item.CorrectAnswer === "optionA" },
          { id: 1, text: item.optionB, isCorrect: item.CorrectAnswer === "optionB" },
          { id: 2, text: item.optionC, isCorrect: item.CorrectAnswer === "optionC" },
          { id: 3, text: item.CorrectAnswer, isCorrect: true }, // Always correct
        ];

        // Shuffle options array (excluding the correct answer)
        const shuffledOptions = [...options];
        const correctAnswerIndex = shuffledOptions.findIndex(option => option.isCorrect);
        shuffledOptions.splice(correctAnswerIndex, 1); // Remove the correct answer for shuffling

        for (let i = shuffledOptions.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
        }

        // Insert the correct answer back to a random position
        const insertPosition = Math.floor(Math.random() * (shuffledOptions.length + 1));
        shuffledOptions.splice(insertPosition, 0, options[correctAnswerIndex]);

        return {
          text: item.Questions,
          options: shuffledOptions,
        };
      });

      setQuestions(data);
    } catch (error) {
      console.error('Error fetching quiz data:', error);
    }
  };

  // Function to handle option click
  const optionClicked = (isCorrect) => {
    if (nextButtonClicked) {
      return; // Prevent selecting options after clicking Next
    }

    setSelectedOption(isCorrect);
  };

  const handleNext = () => {
    if (selectedOption !== null) {
      setNextButtonClicked(true);
      if (selectedOption) {
        setScore(score + 1);
      }

      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null); // Reset selected option
        setNextButtonClicked(false); // Reset Next button click
      } else {
        setFinalResults(true);
      }
    }
  };



  //function option clicked
  //Helper Function


  // const optionClicked = (isCorrect) => {
  //   console.log("Option clicked:", isCorrect);
  //   console.log("Before increment: Score =", score);
  //   console.log("questions:", questions);
  //   console.log("CurrentQuestion:", CurrentQuestion);

  //   if (questions.length > 0 && CurrentQuestion >= 0 && CurrentQuestion < questions.length) {
  //     const currentOptions = questions[CurrentQuestion].options;
  //     console.log("Current options:", currentOptions);

  //     // Find the clicked option
  //     const clickedOption = currentOptions.find(option => option.isCorrect === isCorrect);
  //     console.log("Clicked option:", clickedOption);

  //     if (clickedOption) {
  //       console.log("Clicked option text:", clickedOption.text);
  //     } else {
  //       console.log("Clicked option not found.");
  //     }
  //   } else {
  //     console.log("Invalid question or option index");
  //   }

  //   if (isCorrect) {
  //     console.log("Incrementing score");
  //     setScore(score + 1);
  //   }
  //   console.log("After increment: Score =", score);

  //   if (CurrentQuestion + 1 < questions.length) {
  //     setCurrentQuestion(CurrentQuestion + 1);

  //   } else {
  //     setFinalResults(true);
  //   }

  // }
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
          <h2>{score} out of {questions.length} correct -({(score / questions.length) * 100}%)</h2>
        </div>

      ) : (
        /*3. Question Card*/
        <div className='question-card'>
          <h2>Question {currentQuestion + 1} out of {questions.length}</h2>
          <h3 className='question-text'>{questions[currentQuestion].text}</h3>
          <ul>
            {questions[currentQuestion].options.map((option) => {
              const optionClasses = ["option"];
              if (selectedOption !== null) {
                if (selectedOption === option.id) {
                  optionClasses.push("selected-option"); // Add a class for the selected option
                }
                if (nextButtonClicked && option.isCorrect) {
                  optionClasses.push("correct");
                } else if (nextButtonClicked && option.isCorrect === false) {
                  optionClasses.push("incorrect");
                }
              }

              return (
                <li
                  onClick={() => optionClicked(option.isCorrect)}
                  key={option.id}
                  className={optionClasses.join(" ")}
                >
                  {option.text}
                </li>
              );
            })}
          </ul>
          {selectedOption !== null && !nextButtonClicked && (
            <button onClick={handleNext}>Next</button>
          )}
        </div>
      )}
    </div >
  );
};
export default App;

