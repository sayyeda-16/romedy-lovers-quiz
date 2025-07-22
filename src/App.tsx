/**
 * @fileoverview The main application component for the Romedy Lovers Quiz.
 * This component manages the overall quiz state, including starting/ending the quiz,
 * tracking questions, score, and rendering the appropriate UI sections (setup, active quiz, results).
 */

// Core React hooks for managing component state and lifecycle.
import React, { useState, useEffect } from 'react';
// Imports the raw JSON data containing all the quotes.
import quotesData from './quotes.json';
// Imports the 'Quote' type definition to ensure type safety for quote objects.
import { type Quote } from './types';
// Imports the 'Question' component, responsible for displaying individual questions and handling user answer selection.
import Question from './components/Question';
// Imports the main CSS file for application-wide styling.
import './App.css';

function App() {
  const [quizStarted, setQuizStarted] = useState<boolean>(false);
  const [quizLength, setQuizLength] = useState<number | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [quizQuestions, setQuizQuestions] = useState<Quote[]>([]);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const allQuotes: Quote[] = (quotesData as { quotes: Quote[] }).quotes;
  const handleStartQuiz = (length: number): void => {
    setQuizLength(length);
    setQuizStarted(true);
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizFinished(false); // Ensure quizFinished is false when starting
    generateQuizQuestions(length); // Generate the specific questions for this quiz
  };
  
  const generateQuizQuestions = (length: number): void => {
  const shuffledQuotes = [...allQuotes].sort(() => 0.5 - Math.random());
  // Selects the first 'length' number of quotes from the shuffled array.
  const selectedQuestions = shuffledQuotes.slice(0, length);
    setQuizQuestions(selectedQuestions); // Update state with the selected questions
  };
  
  const handleAnswer = (isCorrect: boolean): void => {
    if (isCorrect) {
      setScore(prevScore => prevScore + 1); // Use functional update for score
    }
    // Note: The `Question` component itself handles the delay before calling `handleNextQuestion`.
  };
  
  const handleNextQuestion = (): void => {
    // Check if there are more questions remaining in the quiz.
    // `quizLength!` uses the non-null assertion operator because we expect quizLength to be a number here.
    if (currentQuestionIndex < quizLength! - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1); // Move to the next question
    } else {
      // If no more questions, the quiz is finished.
      setQuizStarted(false); // Deactivate the quiz in progress view
      setQuizFinished(true); // Activate the quiz finished view
    }
  };

  /**
   * Resets all quiz-related states to return to the initial quiz setup screen.
   * This function is called when the user clicks "Restart Quiz" after finishing.
   */
  const handleRestartQuiz = (): void => {
    setQuizStarted(false); // Deactivate active quiz
    setQuizLength(null); // Reset quiz length selection
    setCurrentQuestionIndex(0); // Reset question index
    setScore(0); // Reset score
    setQuizQuestions([]); // Clear current quiz questions
    setQuizFinished(false); // Ensure quiz is not in finished state to show setup
  };


  // --- JSX Rendering ---
  // Conditional rendering based on the state variables (`quizStarted`, `quizFinished`, `quizLength`).
  return (
    <div className="app-container">
      {/* Main application title */}
      <h1>Test Your Romedy Knowledge!</h1>

      {!quizStarted && !quizFinished && quizLength === null && (
        <div className="quiz-setup">
          <h2>The Ultimate Quiz for Rom-Com Fans!</h2> {/* Engaging title for the homepage */}
          <p className="quiz-description">
            Think you know every heartfelt confession, witty comeback, and grand romantic gesture from your favorite romantic comedy movies and TV shows?
            Prove it! Dive into the world of iconic lines and see if you can identify which film or series these unforgettable quotes originated from.
            Your ultimate Romedy Lovers Quiz awaits!
          </p>


          <h3>Select Quiz Length:</h3>
          {/* Buttons to select the quiz length, each calling handleStartQuiz with a different length */}
          <button onClick={() => handleStartQuiz(5)}>5 Questions</button>
          <button onClick={() => handleStartQuiz(10)}>10 Questions</button>
          <button onClick={() => handleStartQuiz(15)}>15 Questions</button>
          <button onClick={() => handleStartQuiz(25)}>25 Questions</button>
        </div>
      )}

      {quizStarted && quizQuestions.length > 0 && currentQuestionIndex < quizLength! && (
        <div className="quiz-active">
          {/* Displays current question progress and score */}
          <p>
            Question {currentQuestionIndex + 1} of {quizLength}
          </p>
          <p>Current Score: {score}</p>
          {/*
            Renders the Question component, passing down:
            - The current question object
            - The full list of quotes (for generating incorrect options)
            - Callback functions for handling answers and moving to the next question
          */}
          <Question
            question={quizQuestions[currentQuestionIndex]}
            allQuotes={allQuotes}
            onAnswer={handleAnswer}
            onNextQuestion={handleNextQuestion}
          />
        </div>
      )}

      {!quizStarted && quizFinished && quizLength !== null && (
        <div className="quiz-results">
          <h2>Quiz Finished!</h2>
          {/* Displays the final score */}
          <p>Your final score is: {score} out of {quizLength}</p>
          {/* Button to restart the quiz */}
          <button onClick={handleRestartQuiz}>Restart Quiz</button>
        </div>
      )}
    </div>
  );
}

export default App; // Exports the App component for use in main.tsx