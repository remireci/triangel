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
    <div className="flex flex-row bg-[#cfe0e8] min-h-screen px-4 md:px-0 pt-28 md:pt-36 lg:pt-48">
      <div className='w-0 md:w-1/4 lg:w-1/4'></div>
      <div className='w-full md:w-1/2 lg:w-1/4 h-60 px-4 flex flex-col justify-between bg-[#daebe8] rounded shadow-md'>
        {/* <div className=''> */}
          <div className='text-center mt-8 px-4'>
            <p className="text-xl mb-4">{question}</p>
          </div>
          <div className='flex flex-row justify-center mb-8'>
            <button onClick={() => updateScore("yes")} className="bg-[#87bdd8] hover:bg-blue-800 text-sm text-white px-4 py-2 rounded mr-2">
              Ja
            </button>
            <button onClick={() => updateScore("no")} className="bg-[#87bdd8] hover:bg-blue-800 text-sm text-white px-4 py-2 rounded mr-2">
              Nee
            </button>
            <button onClick={() => updateScore("irr")} className="bg-[#87bdd8] hover:bg-blue-800 text-sm text-white px-4 py-2 rounded">
              Niet van toepassing
            </button>
          </div>
        {/* </div> */}
      </div>
      <div className='w-0 md:w-1/4 lg:w-1/2'></div>
    </div>
  );
};

Question.propTypes = {
  question: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  onAnswer: PropTypes.func.isRequired,
};

export default Question;

