import React, { useState, useEffect } from 'react';
import axios from 'axios';

function QuestionList({ questions, onUpdateCorrectAnswer }) {
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>
            <div>
              <strong>Prompt: </strong>{question.prompt}
            </div>
            <div>
              <strong>Answers: </strong>
              <ul>
                {question.answers.map((answer, index) => (
                  <li key={index}>{answer}</li>
                ))}
              </ul>
            </div>
            <div>
              <strong>Correct Answer: </strong>
              <select
                value={question.correctIndex}
                onChange={(event) =>
                  onUpdateCorrectAnswer(question.id, event.target.value)
                }
              >
                {question.answers.map((_, index) => (
                  <option key={index} value={index}>
                    {index + 1}
                  </option>
                ))}
              </select>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function App() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // Fetch questions from the server when the component loads
    axios.get('http://localhost:4000/questions')
      .then((response) => {
        setQuestions(response.data);
      })
      .catch((error) => {
        console.error('Error fetching questions:', error);
      });
  }, []);

  const handleUpdateCorrectAnswer = (questionId, correctIndex) => {
    // Send an HTTP PATCH request to update the correct answer
    axios.patch(`http://localhost:4000/questions/${questionId}`, {
      correctIndex: parseInt(correctIndex, 10),
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(() => {
      // Update the state with the correct answer change
      setQuestions((prevQuestions) =>
        prevQuestions.map((question) => {
          if (question.id === questionId) {
            return { ...question, correctIndex: parseInt(correctIndex, 10) };
          }
          return question;
        })
      );
    })
    .catch((error) => {
      console.error('Error updating correct answer:', error);
    });
  };

  return (
    <div>
      <h1>Quiz App</h1>
      <QuestionList questions={questions} onUpdateCorrectAnswer={handleUpdateCorrectAnswer} />
    </div>
  );
}

export default App;

