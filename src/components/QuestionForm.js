import React, { useState } from 'react';
import axios from 'axios';

function QuestionForm({ onNewQuestion }) {
  const initialFormData = {
    prompt: '',
    answer1: '',
    answer2: '',
    answer3: '',
    answer4: '',
    correctIndex: 0,
  };

  const [formData, setFormData] = useState(initialFormData);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    
    const questionData = {
      prompt: formData.prompt,
      answers: [formData.answer1, formData.answer2, formData.answer3, formData.answer4],
      correctIndex: parseInt(formData.correctIndex, 10),
    };

    
    axios
      .post('http://localhost:4000/questions', questionData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        
        setFormData(initialFormData);
        onNewQuestion(response.data);
      })
      .catch((error) => {
        console.error('Error creating a new question:', error);
      });
  }

  return (
    <section>
      <h1>New Question</h1>
      <form onSubmit={handleSubmit}>
        <button type="submit">Add Question</button>
      </form>
    </section>
  );
}

export default QuestionForm;

