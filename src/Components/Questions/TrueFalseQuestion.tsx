import React, { useState } from 'react';
import './MultipleChoiceQuestion.css';

interface TrueFalseQuestionProps {
    question: string;
    onAnswer: (answer: string) => void;
    id: string;
}

const TrueFalseQuestion: React.FC<TrueFalseQuestionProps> = ({ question, onAnswer, id }) => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(e.target.value);
        onAnswer(e.target.value);
    };

    return (
        <div className="question-box">
            <h2>{question}</h2>
            <div className="options">
                <div key={1} className="option">
                    <input
                        type="radio"
                        id={id}
                        name="multiple-choice"
                        value="true"
                        checked={selectedOption === "true"}
                        onChange={handleOptionChange}
                    />
                    <label htmlFor={id}>True</label>
                </div>
                <div key={0} className="option">
                    <input
                        type="radio"
                        id={id}
                        name="multiple-choice"
                        value="false"
                        checked={selectedOption === "false"}
                        onChange={handleOptionChange}
                    />
                    <label htmlFor={id}>False</label>
                </div>
            </div>
        </div>
    );
};

export default TrueFalseQuestion;
