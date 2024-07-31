import React, { useState } from 'react';
import './MultipleChoiceQuestion.css';

interface MultipleChoiceQuestionProps {
  question: string;
  options: string[];
  onAnswer: (answer: string) => void;
  id: string;
}

const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({ question, options, onAnswer, id }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value);
    onAnswer(e.target.value);
  };

  return (
    <div className="question-box">
      <h2>{question}</h2>
      <div className="options">
        {options.map((option, index) => (
          <div key={index} className="option">
            <input
              type="radio"
              id={`${id}-option-${index}`}
              name={id}
              value={option}
              checked={selectedOption === option}
              onChange={handleOptionChange}
            />
            <label htmlFor={`${id}-option-${index}`}>{option}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultipleChoiceQuestion;
