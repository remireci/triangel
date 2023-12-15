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
            <div className="flex flex-row px-4 md:px-0 pt-28 md:pt-36 lg:pt-48">
                <div className='w-0 md:w-1/4 lg:w-1/4'></div>
                <div className="flex flex-col justify-between h-60 w-full md:w-1/2 lg:w-1/5 py-8 mt-10 text-center bg-[#daebe8] rounded shadow-md">
                    <div>
                        <p className="text-xl">Test afgerond!</p>
                    </div>
                    <div className="flex flex-col items-center justify-end mt-auto mt-12">
                        <button onClick={handleCompletion} className="bg-[#87bdd8] text-white px-4 py-2 rounded shadow">
                            Ga naar het resultaat
                        </button>
                    </div>
                </div>
                <div className='w-0 md:w-1/4 lg:w-1/2'></div>
            </div>
        );
    }

    return (
        <div className="">
            <Question
                question={questionsData[currentQuestion].question}
                category={questionsData[currentQuestion].category}
                id={questionsData[currentQuestion].id}
                onAnswer={handleAnswer}
            />
        </div>
    );
};

export default Test;
