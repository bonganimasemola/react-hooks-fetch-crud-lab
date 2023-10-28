import React, { useState } from 'react';
import QuestionForm from './QuestionForm';
import QuestionList from './QuestionList';

function App() {
  const [questions, setQuestions] = useState([]);

  function handleNewQuestion(newQuestion) {
    setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
  }

  return (
    <div>
      <h1>Quiz App</h1>
      <QuestionForm onNewQuestion={handleNewQuestion} />
      <QuestionList questions={questions} />
    </div>
  );
}

export default App;
