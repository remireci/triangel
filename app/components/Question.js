// components/Question.js
"use client"
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import routeHandler from './questions/route';

const Question = ({ question, category, id, onAnswer, onBack, setLocalData, stepsBack, answeredQuestions }) => {
  // const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  let data = JSON.parse(localStorage.getItem('categoryData')) || [
    { category: "stress", yes: 0, no: 0, irr: 0 },
    { category: "uitdaging", yes: 0, no: 0, irr: 0 },
    { category: "zingeving", yes: 0, no: 0, irr: 0 },
    { category: "waardering", yes: 0, no: 0, irr: 0 },
    { category: "work-lifebalans", yes: 0, no: 0, irr: 0 },
    { category: "competenties", yes: 0, no: 0, irr: 0 },
    { id: 1, answer: "" }, { id: 2, answer: "" }, { id: 3, answer: "" }, { id: 4, answer: "" }, { id: 5, answer: "" }, { id: 6, answer: "" },
    { id: 7, answer: "" }, { id: 8, answer: "" }, { id: 9, answer: "" }, { id: 10, answer: "" }, { id: 11, answer: "" }, { id: 12, answer: "" },
    { id: 13, answer: "" }, { id: 14, answer: "" }, { id: 15, answer: "" }, { id: 16, answer: "" }, { id: 17, answer: "" }, { id: 18, answer: "" },
  ];

  useEffect(() => {
    // Update the selected answer when the component mounts
    const indexQuestion = data.findIndex(item => item.id === id);
    if (indexQuestion !== -1) {
      setSelectedAnswer(data[indexQuestion].answer);
    }
  }, []);

  const updateScore = (valueToUpdate) => {
    // setAnsweredQuestions(answeredQuestions + 1);

    const index = data.findIndex(item => item.category === category);
    const indexQuestion = data.findIndex(item => item.id === id);

    // If the category is found
    if (index !== -1) {
      // Update the value based on the provided property (yes, no, irr)
      if (valueToUpdate === 'yes') {
        data[index].yes += 1;
        data[indexQuestion].answer = "ja";
      } else if (valueToUpdate === 'no') {
        data[index].no += 1;
        data[indexQuestion].answer = "nee";
      } else if (valueToUpdate === 'irr') {
        data[index].irr += 1;
        data[indexQuestion].answer = "nvt";
      }
    } else {
      // Category not found
      console.log(`Category '${category}' not found.`);
    }

    setLocalData(data);
    localStorage.setItem('categoryData', JSON.stringify(data));

    onAnswer();
  }

  const blueLineWidth = `${((answeredQuestions.length - stepsBack) / 17) * 100}%`;

  return (
    <div className="flex flex-row mt-6 md:mt-8 lg:mt-48 px-4 md:px-0 lg:pt-12 pb-24 bg-[#cfe0e8]">
      <div className='w-0 md:w-1/5 lg:w-1/4'></div>
      <div className='flex flex-col justify-between w-full md:w-3/5 lg:w-1/2 h-55 mb-0 md:-mb-10 p-4 bg-[#daebe8] rounded shadow'>
        <div
          className=''
          style={{ height: '2px', backgroundColor: '#2f8bc9', width: blueLineWidth }}
        >
        </div>
        <div className='text-center mt-8 mb-6 px-4'>
          <p className="text-xl mb-4">{question}</p>
        </div>
        <div className='flex flex-row justify-center mb-8'>
          <button onClick={() => updateScore("yes")} className="bg-[#87bdd8] hover:bg-blue-800 focus:bg-[#87bdd8] focus-visible:bg-blue-800 text-sm text-white px-4 py-2 rounded mr-2 touch-pan-up">
            Ja
          </button>
          <button onClick={() => updateScore("no")} className="bg-[#87bdd8] hover:bg-blue-800 focus:bg-[#87bdd8] focus-visible:bg-blue-800 text-sm text-white px-4 py-2 rounded mr-2 touch-pan-up">
            Nee
          </button>
          <button onClick={() => updateScore("irr")} className="bg-[#87bdd8] hover:bg-blue-800 focus:bg-[#87bdd8] focus-visible:bg-blue-800 text-sm text-white px-4 py-2 rounded touch-pan-up">
            Niet van toepassing
          </button>
        </div>
        <div className='group w-1/4'>
          <div className='flex justify-start'>
            {(answeredQuestions.length - stepsBack) > 0 && (
              <button
                onClick={onBack}
                className="text-sm text-gray-600 relative">
                <span className='text-xs text-slate-400 pb-2 mr-2'>vorige</span>
              </button>
            )}
          </div>
        </div>
      </div>
      <div className='w-0 md:w-1/5 lg:w-1/4 '></div>
    </div>
  );
};

Question.propTypes = {
  question: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  onAnswer: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default Question;

