// components/Test.js
"use client"
import React, { useState, useEffect } from 'react';
import Question from './Question';
import { useRouter } from 'next/navigation';

const Test = () => {
    const router = useRouter();
    const [currentQuestion, setCurrentQuestion] = useState(20);
    const [questionsData, setQuestionsData] = useState([]);
    const [answeredQuestions, setAnsweredQuestions] = useState([]);
    const [numberOfquestions, setNumberOfQuestions] = useState(18);
    const [isLoading, setIsLoading] = useState(true);
    const [question, setQuestion] = useState({});
    const [localData, setLocalData] = useState([]);
    const [stepsBack, setStepsBack] = useState(1);

    useEffect(() => {
        if (localStorage.getItem("categoryData")) {
            localStorage.removeItem("categoryData");
        }
        
        const fetchQuestions = async () => {
            const response = await fetch('/api/questions');
            const data = await response.json();
            setQuestionsData(data);
            setIsLoading(false);
        };

        fetchQuestions();

    }, []);


    useEffect(() => {

        if (!isLoading && questionsData.length > 0) {

            // choose first question randomly
            const randomNumber = Math.floor(Math.random() * numberOfquestions);
            // new total of questions
            let newNumber = numberOfquestions;
            newNumber--;
            setNumberOfQuestions(newNumber);

            // remove question from questionsData
            setCurrentQuestion(randomNumber);
            const newData = [...questionsData]; // Create a copy of the array
            newData.splice(currentQuestion, 1); // Remove item at the random index
            setQuestionsData(newData); // Update state with the modified array

            // add question to answered questions
            const newQuestion = questionsData[randomNumber];
            setQuestion(newQuestion);
            setAnsweredQuestions(prevAnsweredQuestions => [...prevAnsweredQuestions, newQuestion]);
        }

    }, [isLoading]);

    const handleAnswer = () => {
        // Handle answer logic and update the current question

        if (stepsBack > 1) {

            handleAnswerAgain();

        } else if (questionsData.length > 1) {
            // choose next random question            
            const randomNumber = Math.floor(Math.random() * numberOfquestions);
            // new total of questions
            let newNumber = numberOfquestions;
            newNumber--;
            setNumberOfQuestions(newNumber);

            // remove question from questionsData
            setCurrentQuestion(randomNumber);
            const newData = [...questionsData]; // Create a copy of the array
            newData.splice(currentQuestion, 1); // Remove item at the random index
            setQuestionsData(newData); // Update state with the modified array
            // add question to answered questions
            const newQuestion = newData[randomNumber];
            setQuestion(newQuestion);
            setAnsweredQuestions(prevAnsweredQuestions => [...prevAnsweredQuestions, newQuestion]);

        } else {
            router.push("/result");            
        }
    };

    const handleAnswerAgain = () => {

        // Get the previous question's answer
        const data = JSON.parse(localStorage.getItem('categoryData'));
        setLocalData(data);        

        const questionId = question.id;
        const category = question.category;
        const previousAnswer = localData[questionId + 5].answer;
        const index = data.findIndex(item => item.category === category);
        // const indexQuestion = data.findIndex(item => item.id === questionId);

        // If the category is found
        if (index !== -1) {
            // Update the value based on the provided property (yes, no, irr)
            if (previousAnswer === 'ja') {
                data[index].yes -= 1;
                // data[indexQuestion].answer = "";
            } else if (previousAnswer === 'nee') {
                data[index].no -= 1;
                // data[indexQuestion].answer = "";
            } else if (previousAnswer === 'nvt') {
                // console.log(data[index].irr);
                data[index].irr -= 1;
                // data[indexQuestion].answer = "";
            }
        } else {
            // Category not found
            console.log(`Category '${category}' not found.`);
        }

        // Save the updated data back to localStorage

        localStorage.setItem('categoryData', JSON.stringify(data));
        setLocalData(data);

        const newQuestion = answeredQuestions[answeredQuestions.length - stepsBack + 1];

        setQuestion(newQuestion);

        setStepsBack(stepsBack - 1);

    }

    const handleBack = () => {
        // Handle going back to the previous question

        // get the localData to track the changes if user provides different answers
        const data = JSON.parse(localStorage.getItem('categoryData'));
        setLocalData(data);        

        setStepsBack(stepsBack + 1);
        // setStepsBack(prevStepsBack => prevStepsBack + 1);

        const newQuestion = answeredQuestions[answeredQuestions.length - stepsBack - 1];

        setQuestion(newQuestion);
    };


    if (currentQuestion === 20) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <Question
                question={question.question}
                category={question.category}
                id={question.id}
                onAnswer={handleAnswer}
                onBack={handleBack}
                setLocalData={setLocalData}
                stepsBack={stepsBack}
                setAnsweredQuestions={setAnsweredQuestions}
                answeredQuestions={answeredQuestions}
            />
        </>
    );
};

export default Test;