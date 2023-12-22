// components/Result.js
"use client"
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';

const Result = ({ encryptedAddress }) => {    // Add logic to calculate and display the result based on user's answers
    const router = useRouter();
    const [categoryData, setCategoryData] = useState([]);
    const [email, setEmail] = useState('');

    useEffect(() => {
        const storedCategoryData = JSON.parse(localStorage.getItem('categoryData'));        

        if (!storedCategoryData) {
            router.push("/test");
        } else {

            const updatedCategoryData = storedCategoryData.map(item => {
                let result;
                if (item.category === "stress") {
                    if (item.irr === 3) {
                        result = 5;
                    } else {
                        result = item.no - item.yes;
                    }
                } else {
                    if (item.irr === 3) {
                        result = 5;
                    } else {
                        result = item.yes - item.no;
                    }
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
        } else if (result === 5) {
            return 'black';
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
                toast.error('Please provide a valid email address');
                router.push("/confirmation");
            } else {
                console.error('Error sending email');
                // Handle error
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle error
        }

        try {
            // The add-ip route will also add the emailaddress
            const response = await fetch(`/api/add-ip?ip=${encryptedAddress}&mail=${email}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                console.log('Email added to the database');
                toast.success('Email added successfully');
                router.push("/confirmation");
            } else {
                console.error('Error adding email to the database');
                // Handle error
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle error
        }
    };

    return (
        <div className="flex flex-row px-4 md:px-0 pb-28 pt-28 md:pt-36 lg:pt-36">
            <div className='w-0 md:w-1/4 lg:w-1/4'></div>
            <div className="w-full md:w-1/2 lg:w-1/4 px-4 lg:px-0 py-4 h-1/2 bg-[#daebe8] rounded shadow-md">
                <div className="flex flex-col items-center mt-auto">
                    <p className="text-2xl font-bold mb-12">Het resultaat van je test:</p>
                    {categoryData && categoryData.length > 0 ? (
                        <div>
                            {categoryData.slice(0, 6).map((category, index) => (
                                <div key={index} className="result-category flex items-center my-2">
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
                        <p>Vul hieronder je mailadres in.</p>
                        <p>Een jobcoach zal je contacteren.</p>
                    </div>
                    <div>
                        <form 
                        onSubmit={handleSubmit}
                        className="flex flex-col md:flex-row justify-center"
                        >
                            {/* Your form inputs for result and email */}
                            {/* <input type="text" value={result} onChange={(e) => setResult(e.target.value)} /> */}
                            <input
                                type="email"
                                placeholder="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="px-2 rounded"
                            />

                            <button
                                className="bg-[#87bdd8] text-sm text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded text-sm px-2 py-1 text-center me-2 mb-2 ml-4 mt-4 md:mt-0"
                                data-te-ripple-init
                                type="submit"
                            >
                                Send Email
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <div className='w-0 md:w-1/4 lg:w-1/2'></div>
        </div>
    );
};

export default Result;

