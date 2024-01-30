// components/Test.js
"use client"
import React, { useState, useEffect } from 'react';
import Question from './Question';
import { useRouter } from 'next/navigation';

const Test = () => {
    const router = useRouter();
    const [currentQuestion, setCurrentQuestion] = useState(20);
    const [isTestCompleted, setIsTestCompleted] = useState(false);
    const [questionsData, setQuestionsData] = useState([]);
    const [answeredQuestions, setAnsweredQuestions] = useState([]);
    const [questionsFetched, setQuestionsFetched] = useState(false);
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
            console.log(newQuestion);
            console.log(newData);
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
            console.log(newQuestion);
            console.log(newData);
            setAnsweredQuestions(prevAnsweredQuestions => [...prevAnsweredQuestions, newQuestion]);

        } else {
            router.push("/result");
            // setIsTestCompleted(true);
        }

        // if (isTestCompleted) {
        //     router.push("/result");
        // }
    };

    const handleAnswerAgain = () => {

        // Get the previous question's answer
        const data = JSON.parse(localStorage.getItem('categoryData'));
        setLocalData(data);
        console.log("local data from handleansweragain", data);

        const questionId = question.id;
        const category = question.category;
        const previousAnswer = localData[questionId + 5].answer;

        console.log(previousAnswer);

        console.log("local storage id", questionId);
        console.log("local storage answer", previousAnswer);


        // const categoryIndex = data.findIndex((item) => item.category === category);

        // // If the category is found
        // if (categoryIndex !== -1) {
        //     // Decrease the count of the specified answer
        //     updatedData[categoryIndex][previousAnswer] = Math.max(0, updatedData[categoryIndex][previousAnswer] - 1);
        // } else {
        //     // Handle the case when the category is not found
        //     console.log(`Category '${category}' not found.`);
        // }

        const index = data.findIndex(item => item.category === category);
        const indexQuestion = data.findIndex(item => item.id === questionId);

        console.log(indexQuestion);

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


        // Update the category score based on the previous answer
        // if (previousAnswer === 'yes') {
        //     updatedData[currentQuestion].yes -= 1;
        // } else if (previousAnswer === 'no') {
        //     updatedData[currentQuestion].no -= 1;
        // } else if (previousAnswer === 'irr') {
        //     updatedData[currentQuestion].irr -= 1;
        // }

        // Set the answer for the current question to empty
        // updatedData[currentQuestion + 6].answer = "";

        // Save the updated data back to localStorage
        console.log("the data from ", data);

        localStorage.setItem('categoryData', JSON.stringify(data));
        setLocalData(data);


        console.log(answeredQuestions);
        console.log(answeredQuestions.length - stepsBack + 1);

        const newQuestion = answeredQuestions[answeredQuestions.length - stepsBack + 1];

        setQuestion(newQuestion);

        setStepsBack(stepsBack - 1);


        // Handle other logic for going back
        // ...

        // Update state or navigate to the previous question
        // ...



        // find the right question

    }

    const handleBack = () => {
        // Handle going back to the previous question

        // get the localData to track the changes if user provides different answers
        const data = JSON.parse(localStorage.getItem('categoryData'));
        setLocalData(data);

        console.log("from handleback", localData)

        setStepsBack(stepsBack + 1);
        // setStepsBack(prevStepsBack => prevStepsBack + 1);

        const newQuestion = answeredQuestions[answeredQuestions.length - stepsBack - 1];

        setQuestion(newQuestion);
    };


    if (currentQuestion === 20) {
        return <p>Loading...</p>;
    }

    // if (isTestCompleted) {
    //     return (
    //         <div className='flex flex-row pb-36 lg:mt-48 text-slate-600'>
    //             <div className='w-0 md:w-1/4 lg:w-1/5'></div>
    //             <div className="flex flex-col justify-between h-60 w-full mx-5 md:mx-0 md:w-1/2 lg:w-1/5 py-8 mt-10 text-center bg-[#daebe8] rounded shadow-md">
    //                 <div className="flex flex-col items-center sm:pt-4 mt-auto">
    //                     <p className="text-xl">Test afgerond!</p>
    //                 </div>
    //                 <div className="flex flex-col items-center justify-end mt-auto mt-12">
    //                     <button onClick={handleCompletion} className="bg-[#87bdd8] text-white px-4 py-2 rounded shadow">
    //                         Ga naar het resultaat
    //                     </button>
    //                 </div>
    //             </div>
    //             <div className='w-0 md:w-1/4 lg:w-2/5'></div>
    //         </div>
    //     );
    // }

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