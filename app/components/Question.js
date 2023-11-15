// components/Question.js
"use client"
import React from 'react';
import PropTypes from 'prop-types';
// import routeHandler from './questions/route';

const Question = ({ question, category, onAnswer }) => {

  let data = JSON.parse(localStorage.getItem('categoryData')) || [
    { category: "stress", yes: 0, no: 0, irr: 0 },
    { category: "uitdaging", yes: 0, no: 0, irr: 0 },
    { category: "zingeving", yes: 0, no: 0, irr: 0 },
    { category: "waardering", yes: 0, no: 0, irr: 0 },
    { category: "worklife", yes: 0, no: 0, irr: 0 },
    { category: "competenties", yes: 0, no: 0, irr: 0 },
  ];

  const updateScore = (valueToUpdate) => {
    
    const index = data.findIndex(item => item.category === category);

    // If the category is found
    if (index !== -1) {
      // Update the value based on the provided property (yes, no, irr)
      if (valueToUpdate === 'yes') {
        data[index].yes += 1;
      } else if (valueToUpdate === 'no') {
        data[index].no += 1;
      } else if (valueToUpdate === 'irr') {
        data[index].irr += 1;
      }
    } else {
      // Category not found - you may handle this case as needed
      console.log(`Category '${category}' not found.`);
    }

    localStorage.setItem('categoryData', JSON.stringify(data));

    onAnswer();

  }


  return (
    <div className="bg-gray-200 p-4 rounded shadow-md">
      <p className="text-lg font-bold mb-4">{question}</p>
      {/* Add options for 'yes', 'no', and 'I don't know' */}
      <button onClick={() => updateScore("yes")} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
        Ja
      </button>
      <button onClick={() => updateScore("no")} className="bg-red-500 text-white px-4 py-2 rounded mr-2">
        Nee
      </button>
      <button onClick={() => updateScore("irr")} className="bg-gray-500 text-white px-4 py-2 rounded">
        Niet van toepassing
      </button>
    </div>
  );
};

Question.propTypes = {
  question: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  onAnswer: PropTypes.func.isRequired,
};

export default Question;

