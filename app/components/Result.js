// components/Result.js
"use client"

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';


const Result = () => {
    // Add logic to calculate and display the result based on user's answers
    const router = useRouter();
    const [categoryData, setCategoryData] = useState([]);
    // const [result, setResult] = useState(''); // Manage result state
    const [email, setEmail] = useState('');


    useEffect(() => {
        const storedCategoryData = JSON.parse(localStorage.getItem('categoryData'));

        if (!storedCategoryData) {
            router.push("/test");
        } else {
            const updatedCategoryData = storedCategoryData.map(item => {
                let result;
                if (item.category === "stress") {
                    result = item.no - item.yes;
                } else {
                    result = item.yes - item.no;
                };

                return { ...item, result };
            });

            setCategoryData(updatedCategoryData);

        }
    }, []);

    const getCircleColor = (result) => {

        if (result === -3) {
            return 'red';
        } else if (result === -2) {
            return 'orange';
        } else if (result === -1) {
            return 'yellow';
        } else if (result >= 0 && result <= 3) {
            return 'green';
        }
        return ''; // Default color or handle other cases
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Regular expression for email validation
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;



        if (!emailRegex.test(email)) {
            // Invalid email format
            toast.error('Please provide a valid email address');
            return;
        }


        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ categoryData, email }),
            });

            if (response.ok) {
                console.log('Email sent successfully');

                router.push("/confirmation");
            } else {
                console.error('Error sending email');
                // Handle error
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle error
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="h-auto mt-8">
                <div className="flex flex-col items-center mt-auto">
                    <p className="text-2xl font-bold mb-12">Your Career Advice Result</p>
                    {categoryData && categoryData.length > 0 ? (
                        <div>
                            {categoryData.map((category, index) => (
                                <div key={index} className="result-category flex items-center">
                                    <span style={{ width: '24px', height: '24px', borderRadius: '50%', display: 'inline-block', marginRight: '8px', backgroundColor: getCircleColor(category.result) }}></span>
                                    <p>{category.category}: {category.result}</p>
                                </div>
                            ))}
                        </div>

                    ) : (
                        <p>No data available</p>
                    )}
                </div>
                <div className="flex flex-col items-center mt-8">
                    <div className="mt-6 mb-6">
                        <p>Vul hieronder je mail adres in.</p>
                        <p>Een van onze job coaches zal je contacteren.</p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        {/* Your form inputs for result and email */}
                        {/* <input type="text" value={result} onChange={(e) => setResult(e.target.value)} /> */}
                        <input
                            type="email"
                            placeholder="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />

                        <button
                            className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 ml-4"
                            data-te-ripple-init
                            type="submit"
                        >
                            Send Email
                        </button>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default Result;

