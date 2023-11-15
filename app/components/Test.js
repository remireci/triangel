// components/Test.js
"use client"
import React, { useState, useEffect } from 'react';
import Question from './Question';
import { useRouter } from 'next/navigation';

const Test = () => {
    const router = useRouter();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [isTestCompleted, setIsTestCompleted] = useState(false);
    const [questionsData, setQuestionsData] = useState([]);
    const [questionsFetched, setQuestionsFetched] = useState(false);
    const [numberOfquestions, setNumberOfQuestions] = useState(18);

    useEffect(() => {
        if (localStorage.getItem("categoryData")) {
            localStorage.removeItem("categoryData");
        }
        const fetchQuestions = async () => {
            const response = await fetch('/api/questions');
            const data = await response.json();
            setQuestionsData(data);
        };
        fetchQuestions();
        if (questionsData.length > 0) {
            setQuestionsFetched(true);
        }
    }, []);

    useEffect(() => {

        // choose first question randomly
        const randomNumber = Math.floor(Math.random() * numberOfquestions);
        // new total of questions
        let newNumber = numberOfquestions;
        newNumber--;
        setNumberOfQuestions(newNumber);

        setCurrentQuestion(randomNumber);
        const newData = [...questionsData]; // Create a copy of the array
        newData.splice(currentQuestion, 1); // Remove item at the random index

        setQuestionsData(newData); // Update state with the modified array

    }, [questionsFetched]);

    const handleAnswer = () => {
        // Handle answer logic and update the current question

        if (questionsData.length > 1) {
            // choose next random question            
            const randomNumber = Math.floor(Math.random() * numberOfquestions);
            // new total of questions
            let newNumber = numberOfquestions;
            newNumber--;
            setNumberOfQuestions(newNumber);

            setCurrentQuestion(randomNumber);
            const newData = [...questionsData]; // Create a copy of the array
            newData.splice(currentQuestion, 1); // Remove item at the random index            

            setQuestionsData(newData); // Update state with the modified array


        } else {
            setIsTestCompleted(true);
        }
    };

    const handleCompletion = () => {
        router.push("/result");
    }

    if (questionsData.length === 0) {
        return <p>Loading...</p>;
    }

    if (isTestCompleted) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
              <div className="mt-10">
                <p className="text-xl font-bold">Test Completed!</p>
              </div>
              <div className="flex flex-col items-center justify-end mt-auto mb-24">
                <button onClick={handleCompletion} className="bg-orange-400 text-white px-4 py-2 rounded shadow mt-8">
                  Go to Result
                </button>
              </div>
            </div>
          );
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <Question
                question={questionsData[currentQuestion].question}
                category={questionsData[currentQuestion].category}
                onAnswer={handleAnswer}                
            />
        </div>
    );
};

export default Test;
