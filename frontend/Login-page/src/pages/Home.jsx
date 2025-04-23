import React, { useState } from 'react';
import './Quiz.css';
import { data } from './Quiz'; 
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [index, setIndex] = useState(0); 
    const [selectedAnswer, setSelectedAnswer] = useState(null); 
    const [isAnswered, setIsAnswered] = useState(false); 
    const [score, setScore] = useState(0); 
    const [isQuizCompleted, setIsQuizCompleted] = useState(false); 
    const navigate=useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      };

    const question = data[index]; 

    const Answer = (ans) => {
        if (!isAnswered) {
            setSelectedAnswer(ans); 
            setIsAnswered(true); 

            
            if (ans == question.ans) {
                setScore(score + 1);
                console.log(score)
            }
        }
        
    };

    const nextQuestion = () => {
        if (index < data.length - 1) {
            setIndex(index + 1); 
            setSelectedAnswer(null); 
            setIsAnswered(false); 
        } else {
           
            setIsQuizCompleted(true);
        }
    };

    return (
        <>
        <header>
        <button className="logout" onClick={handleLogout}>Logout</button>
        </header>
        <div className="container">
            <h1>Quiz App</h1>
            
            <hr />
            {!isQuizCompleted ? (
                <>
                
                    <h2>{index + 1}. {question.Question}</h2>
                    <ol>
                        <li
                            className={selectedAnswer === 1 ? (question.ans == 1 ? 'correct' : 'wrong') : ''}
                            onClick={() => Answer(1)}
                        >
                            {question.option1}
                        </li>
                        <li
                            className={selectedAnswer === 2 ? (question.ans == 2 ? 'correct' : 'wrong') : ''}
                            onClick={() => Answer(2)}
                        >
                            {question.option2}
                        </li>
                        <li
                            className={selectedAnswer === 3 ? (question.ans == 3 ? 'correct' : 'wrong') : ''}
                            onClick={() => Answer(3)}
                        >
                            {question.option3}
                        </li>
                        <li
                            className={selectedAnswer === 4 ? (question.ans == 4 ? 'correct' : 'wrong') : ''}
                            onClick={() => Answer(4)}
                        >
                            {question.option4}
                        </li>
                    </ol>
                    {isAnswered && (
                        <div className="explanation">
                            {selectedAnswer === question.ans ? 'Explanation' : 'Expalnation'}
                            <p>{question.explanation}</p>
                        </div>
                    )}
                    <button onClick={nextQuestion} disabled={!isAnswered}>
                        {index < data.length - 1 ? 'Next' : 'Finish'}
                    </button>
                    <div className="index">{index + 1} of {data.length}</div>
                </>
            ) : (
                <div className="quiz-end">
                    <h2>Quiz Completed!</h2>
                    <p>Your score: {score} / {data.length}</p>
                </div>
            )}
        </div>
        
        </>
    );
};

export default Home;
