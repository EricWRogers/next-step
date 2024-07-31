import React, { useState } from 'react';
import './TrueFalseQuestion.css';

interface ShortAnswerQuestionProps {
    question: string;
    onAnswer: (answer: string) => void;
    id: string;
    charWidth?: number;
}

const ShortAnswerQuestion: React.FC<ShortAnswerQuestionProps> = ({ question, onAnswer, id, charWidth }) => {
    const [answer, setAnswer] = useState<string>('');

    const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.target.value);
        onAnswer(e.target.value);
    };

    const getInputWidth = () => {
        if (charWidth) {
            return `${charWidth * 10}px`; // Adjust the multiplier based on desired width
        }
        return '100%';
    };

    return (
        <div className="true-false-question-box">
            <h2>{question}</h2>
            <div className="true-false-options">
                <input
                    type="text"
                    id={id}
                    value={answer}
                    onChange={handleAnswerChange}
                    className="short-answer-input"
                    style={{ width: getInputWidth() }}
                />
            </div>
        </div>
    );
};

export default ShortAnswerQuestion;
