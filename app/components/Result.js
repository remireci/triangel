// components/Result.js
"use client"
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';

const Result = ({ encryptedAddress }) => {    // Add logic to calculate and display the result based on user's answers
    const router = useRouter();
    const [categoryData, setCategoryData] = useState([]);
    const [answersData, setAnswersData] = useState([]);
    const [expandedCategories, setExpandedCategories] = useState([]);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [phone, setPhone] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');

    useEffect(() => {
        const storedCategoryData = JSON.parse(localStorage.getItem('categoryData'));

        if (!storedCategoryData) {
            router.push("/test");
        } else {
            let accumulatedResult = 0;
            const updatedCategoryData = storedCategoryData.map(item => {
                let result;
                if (item.category === "stress") {
                    if (item.irr === 3 || item.no === 3) {
                        result = 5;
                    } else {
                        result = item.no - item.yes;
                    }
                } else {
                    if (item.irr === 3 || item.yes === 3) {
                        result = 5;
                    } else {
                        result = item.yes - item.no;
                    }
                };

                accumulatedResult += result;

                return { ...item, result, accumulatedResult };
            });
            setCategoryData(updatedCategoryData);
        }

    }, []);

    useEffect(() => {
        const fetchAnswers = async () => {
            try {
                const response = await fetch('/api/answers');
                const data = await response.json();
                setAnswersData(data);
            } catch (error) {
                console.error('Error fetching answers:', error);
            }
        };

        fetchAnswers();

    }, []);

    useEffect(() => {
        // Initialize the expanded state for each category initially as false
        if (categoryData.length > 0) {
            setExpandedCategories(Array(categoryData.length).fill(false));
        }
    }, [categoryData]);


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

    // const getAnswer = (result, category) => {
    //     if (answersData.length === 0) {
    //         return 'Answers loading...';
    //     }

    //     if (result <= -1) {
    //         const answer = answersData.find((item) => item.category === category);

    //         const italicizeFirstWord = (text) => {
    //             const colonIndex = text.indexOf(':');
    //             if (colonIndex !== -1) {
    //                 const firstPart = text.substring(0, colonIndex);
    //                 const restPart = text.substring(colonIndex);
    //                 return (
    //                     <>
    //                         <span><i>{firstPart}</i></span>
    //                         {restPart}
    //                     </>
    //                 );
    //             }
    //             return text;
    //         };


    // return (
    //     <>
    //         <div>
    //             <strong>{category}</strong>
    //         </div>
    //         <div>
    //             <span>{answer.answer_0}</span>
    //         </div>
    //         <details>
    //             <summary className="text-slate-400" onClick={toggleExpand}>
    //                 {toggleSummaryText()}
    //             </summary>
    //             <div><span>{italicizeFirstWord(answer.answer_1)}</span></div>
    //             <div className="mt-2"><span>{italicizeFirstWord(answer.answer_2)}</span></div>
    //             <div className="mt-2"><span>{italicizeFirstWord(answer.answer_3)}</span></div>
    //             <div className="mt-2"><span>{italicizeFirstWord(answer.answer_4)}</span></div>
    //             {/* Add more spans for additional answers */}
    //         </details>
    //     </>
    // );
    // }
    // Return 'result' or handle other cases here
    // };

    // Function to toggle the expanded state for a specific category at a given index
    const toggleExpand = (index) => {
        const updatedExpandedCategories = [...expandedCategories];
        updatedExpandedCategories[index] = !expandedCategories[index];
        setExpandedCategories(updatedExpandedCategories);
    };

    // Function to get the text for the summary based on the expanded state for a specific category
    const toggleSummaryText = (index) => {
        return expandedCategories[index] ? 'Toon minder' : 'Toon meer';
    };


    const italicizeFirstWord = (text) => {

        const colonIndex = text.indexOf(':');
        if (colonIndex !== -1) {
            const firstPart = text.substring(0, colonIndex);
            const restPart = text.substring(colonIndex);
            return (
                <>
                    <span><i>{firstPart}</i></span>
                    {restPart}
                </>
            );
        }
        return text;
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        // Regular expression for email validation
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;

        // Check if required fields are provided
        if (!name || !firstName || !phone || !postalCode) {
            toast.error('Vul alle verplichte velden in!');
            return;
        }

        // Check if the provided email is valid
        if (email && !emailRegex.test(email)) {
            toast.error('Je e-mailadres is niet geldig!');
            return;
        }

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ categoryData, email, name, firstName, phone, postalCode }),
            });

            if (response.ok) {
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

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="flex flex-row px-4 sm:px-0 md:px-0 pb-28 sm:pt-14 md:pt-28 lg:pt-64 text-slate-600">
            <div className='w-0 md:w-1/5 lg:w-1/5'></div>
            <div className='flex flex-col justify-between w-full md:w-3/5 lg:w-2/5 h-86 mx-4 -mb-10 mt-10 px-6 sm:px-2 py-6 text-base sm:text-sm bg-[#daebe8] rounded shadow'>
                <div
                    id="print-content"
                    className="flex flex-col items-center sm:pt-4 mt-auto"
                >
                    <p className="text-2xl font-bold mb-12">Het resultaat van je test</p>
                    {categoryData && categoryData.length > 0 && categoryData[5].accumulatedResult === 30 ? (
                        <div className="flex flex-col items-center px-2 lg:px-16">
                            <>
                                {answersData.map((answer, index) => {
                                    if (answer.id === 7) {
                                        return (
                                            <div key={index} className="result-category">
                                                <div>
                                                    <strong>Titel????</strong>
                                                    {/* <strong>{category.category}</strong> */}
                                                </div>
                                                <span>{answer.answer_0}</span>
                                                <details className="mt-2">
                                                    <summary className="text-slate-400" onClick={() => toggleExpand()}>
                                                        {toggleSummaryText()}
                                                    </summary>
                                                    <div><span>{italicizeFirstWord(answer.answer_1)}</span></div>
                                                    <div className="mt-2"><span>{italicizeFirstWord(answer.answer_2)}</span></div>
                                                    <div className="mt-2"><span>{italicizeFirstWord(answer.answer_3)}</span></div>
                                                    <div className="mt-2"><span>{italicizeFirstWord(answer.answer_4)}</span></div>
                                                    <div className="mt-2"><span>{italicizeFirstWord(answer.answer_5)}</span></div>
                                                    {/* Add more spans for additional answers */}
                                                </details>
                                            </div>
                                        );
                                    }
                                    return null;
                                })}
                            </>
                        </div>
                    ) : (<div></div>)}
                    {categoryData && categoryData.length > 0 ? (
                        <div className="flex flex-col items-center px-2 lg:px-16">
                            {categoryData.slice(0, 6).map((category, index) => (
                                <div key={index} className="result-category">
                                    {category.result <= -1 ? (
                                        <>
                                            {answersData.map((answer, ansIndex) => {
                                                if (answer.category === category.category) {
                                                    return (
                                                        <div key={ansIndex}>
                                                            <div className="mt-6 ">
                                                                <strong>{category.category}</strong>
                                                            </div>
                                                            <span>{answer.answer_0}</span>
                                                            <details className="mt-2">
                                                                <summary className="text-slate-400 cursor-pointer" onClick={() => toggleExpand(index)}>
                                                                    {toggleSummaryText(index)}
                                                                </summary>
                                                                <div><span>{italicizeFirstWord(answer.answer_1)}</span></div>
                                                                <div className="mt-2"><span>{italicizeFirstWord(answer.answer_2)}</span></div>
                                                                <div className="mt-2"><span>{italicizeFirstWord(answer.answer_3)}</span></div>
                                                                <div className="mt-2"><span>{italicizeFirstWord(answer.answer_4)}</span></div>
                                                                <div className="mt-2"><span>{italicizeFirstWord(answer.answer_5)}</span></div>
                                                                {/* Add more spans for additional answers */}
                                                            </details>
                                                        </div>
                                                    );
                                                }
                                                return null;
                                            })}
                                        </>
                                    ) : (
                                        // Render a different structure for category.result greater than -1
                                        <div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No data available</p>
                    )}

                </div>
                <div className='flex justify-end mr-8 mt-10'>
                    <button
                        onClick={handlePrint}
                        className="bg-[#87bdd8] hover:bg-blue-800 text-sm text-white px-4 py-2 rounded cursor-pointer"
                    >
                        Print resultaat
                    </button>
                </div>
                <div className="flex flex-col items-center w-full ">
                    <div className="flex flex-col mt-8 md:px-8">
                        <div className="mt-6 mb-12 sm:px-4 sm:mx-4 md:mx-0 px-16 py-2 border-2 border-[#2f8bc9] bg-slate-200 rounded-md">
                            <p>Wil je na het lezen van dit persoonlijk advies meer informatie over loopbaanbegeleiding,
                                vul dan je gegevens in en we nemen contact met je op voor een gratis en vrijblijvend
                                kennismakingsgesprek met een loopbaancoach bij jou in de buurt.</p>
                        </div>
                    </div>
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col sm:w-3/4 md:w-3/5 lg:w-1/2"
                    >
                        {/* Your form inputs for result and email */}
                        {/* <input type="text" value={result} onChange={(e) => setResult(e.target.value)} /> */}

                        <div className="flex flex-row">
                            <input
                                type="firstName"
                                placeholder="Voornaam *"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="h-8 bg-slate-100 px-2 rounded my-2 w-full focus:outline-none focus:ring-2 focus:border-blue-500"
                                required
                            />
                        </div>


                        <input
                            type="Name"
                            placeholder="Familienaam *"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="h-8 bg-slate-100 px-2 rounded my-2 w-full focus:outline-none focus:ring-2 focus:border-blue-500"
                            required
                        />
                        <input
                            type="Phone"
                            placeholder="Telefoonnummer *"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="h-8 bg-slate-100 px-2 rounded my-2 w-full focus:outline-none focus:ring-2 focus:border-blue-500"
                            required
                        />
                        <input
                            type="Postal Code"
                            placeholder="Postcode *"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                            className="h-8 bg-slate-100 px-2 rounded my-2 w-full focus:outline-none focus:ring-2 focus:border-blue-500"
                            required
                        />
                        <input
                            type="City"
                            placeholder="Gemeente *"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="h-8 bg-slate-100 px-2 rounded my-2 w-full focus:outline-none focus:ring-2 focus:border-blue-500"
                            required
                        />
                        <input
                            type="email"
                            placeholder="e-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="h-8 bg-slate-100 px-2 rounded mt-2 w-full focus:outline-none focus:ring-2 focus:border-blue-500"
                        />
                        <p className='text-sm text-slate-400 italic mx-5 text-left -ml-0'>* Verplichte velden</p>

                        <button
                            className="bg-[#87bdd8] w-20 text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded text-sm px-2 py-1 text-center me-2 mb-2 ml-4 my-8"
                            data-te-ripple-init
                            type="submit"
                        >
                            Verzend
                        </button>

                    </form>
                </div>

            </div>
            <div className='w-0 md:w-1/5 lg:w-2/5'></div>
        </div >
    );
};

export default Result;

