import React, { useState } from 'react';
import './TrueFalseQuestion.css';

interface EssayQuestionProps {
    question: string;
    onAnswer: (answer: string) => void;
    id: string;
    charWidth?: number;
    charHeight?: number;
}

const EssayQuestion: React.FC<EssayQuestionProps> = ({ question, onAnswer, id, charWidth, charHeight }) => {
    const [answer, setAnswer] = useState<string>('');

    const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setAnswer(e.target.value);
        onAnswer(e.target.value);
    };

    const getInputWidth = () => {
        if (charWidth) {
            return `${charWidth * 10}px`; // Adjust the multiplier based on desired width
        }
        return '100%';
    };

    const getInputHeight = () => {
        if (charHeight) {
            return `${charHeight * 20}px`; // Adjust the multiplier based on desired height
        }
        return '150px';
    };

    return (
        <div className="true-false-question-box">
            <h2>{question}</h2>
            <div className="true-false-options">
                <textarea
                    id={id}
                    value={answer}
                    onChange={handleAnswerChange}
                    className="essay-answer-input"
                    style={{ width: getInputWidth(), height: getInputHeight() }}
                />
            </div>
        </div>
    );
};

export default EssayQuestion;
