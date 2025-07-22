// src/components/Question.tsx

/**
 * @fileoverview This component is responsible for displaying a single quiz question
 * (a quote) and its corresponding answer options. It handles user interaction
 * for selecting an answer, provides visual feedback, and notifies the parent
 * component (`App.tsx`) about the answer outcome and when to move to the next question.
 */

// Core React hooks for managing component-specific state and side effects.
import React, { useState, useEffect } from 'react';

// Imports the 'Quote' type definition from the shared types file.
// 'type' keyword is used for type-only imports for potential bundler optimizations.
import { type Quote } from '../types';

/**
 * Interface defining the props (properties) that the `Question` component expects from its parent.
 *
 * @property {Quote} question - The specific quote object (current question) to be displayed.
 * @property {Quote[]} allQuotes - An array of all available quotes in the quiz. This is used
 * to intelligently generate incorrect answer options to ensure variety.
 * @property {(isCorrect: boolean) => void} onAnswer - A callback function passed from the parent.
 * It's called when the user selects an answer, indicating whether the answer was correct.
 * This allows the parent (App) to update the score.
 * @property {() => void} onNextQuestion - A callback function passed from the parent.
 * It's called after a short delay once an answer has been selected,
 * prompting the parent to advance to the next question or the results screen.
 */
interface QuestionProps {
  question: Quote;
  allQuotes: Quote[];
  onAnswer: (isCorrect: boolean) => void;
  onNextQuestion: () => void;
}

/**
 * The `Question` functional component.
 * It displays a quote and generates multiple-choice answers,
 * managing the UI feedback for user selections.
 *
 * @param {QuestionProps} props - The properties passed to the component.
 * @returns {JSX.Element} The rendered question display with answer options.
 */
const Question: React.FC<QuestionProps> = ({ question, allQuotes, onAnswer, onNextQuestion }) => {
  // --- State Variables ---
  // useState hooks manage the internal, interactive state of this component.

  /**
   * @state {string[]} options - An array of strings representing the answer choices displayed as buttons.
   * This includes the correct answer and randomly generated incorrect answers.
   */
  const [options, setOptions] = useState<string[]>([]);

  /**
   * @state {string | null} selectedAnswer - Stores the text of the answer option that the user has clicked.
   * It's `null` initially and after a new question loads.
   */
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  /**
   * @state {boolean | null} isAnswerCorrect - Indicates whether the `selectedAnswer` was correct.
   * - `true`: The selected answer was correct.
   * - `false`: The selected answer was incorrect.
   * - `null`: No answer has been selected yet for the current question.
   * Used to apply visual feedback (e.g., green/red styling) to the buttons.
   */
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);

  /**
   * @constant {string} correctAnswerText - The correct answer string for the current question.
   * Now directly derived from the `movie` property of the `question` prop.
   */
  const correctAnswerText = question.movie;

  // --- Effects ---

  /**
   * useEffect hook to run side effects when dependencies change.
   * This effect generates new answer options and resets selection/feedback
   * whenever a new `question` is provided or the `allQuotes` list potentially changes.
   */
  useEffect(() => {
    generateOptions();       // Generate new options for the current question
    setSelectedAnswer(null);  // Reset the user's selected answer
    setIsAnswerCorrect(null); // Reset the visual feedback for correctness
  }, [question, allQuotes]); // Dependencies: Effect re-runs if 'question' or 'allQuotes' changes.

  // --- Logic Functions ---

  /**
   * Generates a set of four answer options: one correct movie title and three incorrect movie titles.
   * Incorrect options are chosen randomly from other movies in `allQuotes`, ensuring they are unique
   * and different from the correct answer.
   * The final options array is then shuffled to randomize their display order.
   */
  const generateOptions = (): void => {
    const incorrectMovies: string[] = [];
    // Filter out the correct answer's movie to get potential incorrect options.
    // Also, filter for unique movie titles to avoid redundant incorrect options if they exist in the JSON.
    const uniqueIncorrectMovies = Array.from(
        new Set(allQuotes.map(q => q.movie)) // Get all unique movie titles
    ).filter(movieTitle => movieTitle !== correctAnswerText); // Filter out the correct one

    // Shuffle the unique potential incorrect movies to pick random ones.
    const shuffledIncorrects = [...uniqueIncorrectMovies].sort(() => 0.5 - Math.random());

    // Select up to 3 unique incorrect movie titles.
    for (let i = 0; i < 3 && i < shuffledIncorrects.length; i++) {
        // Since `shuffledIncorrects` already contains unique movie titles, we can just push.
        incorrectMovies.push(shuffledIncorrects[i]);
    }

    // Combine the correct answer with the selected incorrect answers.
    let allOptions = [correctAnswerText, ...incorrectMovies];

    // Robustness check: Ensure there are exactly 4 options.
    // If not enough unique incorrect movies were found (e.g., in a very small dataset),
    // this loop tries to add more, though it's less critical now with a larger, consistent dataset.
    // We'll rely on `uniqueIncorrectMovies` to give us enough distinct options.
    while (allOptions.length < 4 && uniqueIncorrectMovies.length > 0) {
        const randomMovie = uniqueIncorrectMovies[Math.floor(Math.random() * uniqueIncorrectMovies.length)];
        if (!allOptions.includes(randomMovie)) {
            allOptions.push(randomMovie);
        }
    }

    // Shuffle the complete set of options one last time to randomize their button positions.
    setOptions(allOptions.sort(() => 0.5 - Math.random()));
  };

  /**
   * Handles a user's click on an answer option button.
   * It records the selected answer, determines correctness, provides feedback,
   * notifies the parent, and then automatically advances to the next question.
   * @param {string} option - The text content of the button that was clicked (the selected answer).
   */
  const handleOptionClick = (option: string): void => {
    // Prevent further actions if an answer has already been selected for the current question.
    if (selectedAnswer !== null) return;

    setSelectedAnswer(option); // Store the user's selection
    const correct = option === correctAnswerText; // Check if the selected option is correct
    setIsAnswerCorrect(correct); // Set state for visual feedback
    onAnswer(correct); // Notify parent (`App.tsx`) about correctness for score update

    // Set a timeout to automatically move to the next question after 1.5 seconds.
    // This delay allows the user to see the visual correct/incorrect feedback.
    setTimeout(() => {
      onNextQuestion(); // Call the parent's function to advance the quiz
    }, 1500); // 1.5 seconds = 1500 milliseconds
  };

  /**
   * Determines the CSS class name for an answer option button based on user selection
   * and correctness, providing visual feedback.
   * @param {string} option - The text content of the answer option button.
   * @returns {string} The CSS class name to apply ('correct', 'incorrect', or empty string).
   */
  const getButtonClassName = (option: string): string => {
    // If no answer has been selected yet, no special class is needed.
    if (selectedAnswer === null) return '';

    // If this option is the correct answer, always highlight it green.
    if (option === correctAnswerText) {
      return 'correct';
    }
    // If this option was selected by the user AND it was incorrect, highlight it red.
    else if (option === selectedAnswer && !isAnswerCorrect) {
      return 'incorrect';
    }
    // For other options that were not selected or were incorrect but not chosen, no special class.
    return '';
  };

  // --- JSX Rendering ---

  return (
    <div className="question-container">
      {/* Displays the main quote text, enclosed in quotation marks for visual presentation */}
      <p className="quote-text">"{question.quote}"</p>

      <div className="options-container">
        {/*
          Maps over the 'options' array to create a button for each answer choice.
          'key={index}' is used as a unique identifier for each button in the list,
          which is important for React's reconciliation process.
        */}
        {options.map((option, index) => (
          <button
            key={index} // Unique key for list rendering (though a stable ID for options would be better if available)
            onClick={() => handleOptionClick(option)} // Attaches click handler
            className={getButtonClassName(option)} // Applies dynamic CSS class for feedback
            disabled={selectedAnswer !== null} // Disables buttons once an answer has been chosen
          >
            {option} {/* The answer text (movie title) */}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question; // Exports the Question component for use in other files (e.g., App.tsx)