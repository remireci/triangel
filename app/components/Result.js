// components/Result.js
"use client"
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import Image from 'next/image';
import { useReactToPrint } from 'react-to-print';
import { toast } from 'react-toastify';

const Result = ({ encryptedAddress }) => {    // Add logic to calculate and display the result based on user's answers
    const router = useRouter();
    const [categoryData, setCategoryData] = useState([]);
    const [answersData, setAnswersData] = useState([]);
    const [expandedCategories, setExpandedCategories] = useState([]);
    const contentToPrint = useRef(null);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [phone, setPhone] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [isPrivacyChecked, setIsPrivacyChecked] = useState(false);

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
                    } else if (item.irr === 2 || item.no === 2) {
                        result = 4;
                    } else {
                        result = item.no - item.yes;
                    }
                } else {
                    if (item.irr === 3 || item.yes === 3) {
                        result = 5;
                    } else if (item.irr === 2 || item.yes === 2) {
                        result = 4;
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

        // check if user agrees with privacy policy
        if (!isPrivacyChecked) {
            toast.error('Je moet nog instemmem met het privacy beleid');
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


    // const handlePrint = () => {
    //     window.print();
    // };

    const handlePrint = useReactToPrint({
        documentTitle: "Print This Document",
        onBeforePrint: () => console.log("before printing..."),
        onAfterPrint: () => console.log("after printing..."),
        removeAfterPrint: true,
    });


    // Listen for beforeunload event
    window.addEventListener('beforeunload', () => {
        // Remove the data from localStorage
        localStorage.removeItem('categoryData');
    });


    return (
        <div className="flex flex-col lg-custom:flex-row items-center lg-custom:items-stretch px-2 md:px-0 pb-28 lg:pt-48 text-slate-600">
            <div className='w-0 md:1/4 lg:w-1/6'></div>
            <div className='flex flex-col justify-between w-full md:w-3/5 lg:w-1/3 h-86 mx-4 mt-4 lg-custom:mt-10 lg-custom:-mb-10 px-1 md:px-2 lg-custom:px-6 py-6 text-base sm:text-sm bg-[#daebe8] rounded shadow'>
                <div
                    className="flex flex-col items-center justify-center sm:pt-4"
                    ref={contentToPrint}
                >
                    <p className="text-2xl text-center font-bold mb-12">Gepersonaliseerd resultaat van uw loopbaantest</p>

                    {categoryData && categoryData.length > 0 && categoryData[5].accumulatedResult >= 24 ? (
                        <div className="flex flex-col items-center px-2 md-custom:px-12 lg:px-12">
                            <>
                                {answersData.map((answer, index) => {
                                    if (answer.id === 7) {
                                        return (
                                            <div key={index} className="result-category">
                                                <span>{answer.answer_0}</span>
                                                <details open={expandedCategories[index]} className="print-visible mt-2">
                                                    <summary className="text-slate-400 cursor-pointer" onClick={() => toggleExpand()}>
                                                        {toggleSummaryText()}
                                                    </summary>
                                                    <div><span>{italicizeFirstWord(answer.answer_1)}</span></div>
                                                    <div className="mt-2"><span>{italicizeFirstWord(answer.answer_2)}</span></div>
                                                    <div className="mt-2"><span>{italicizeFirstWord(answer.answer_3)}</span></div>
                                                    <div className="mt-2"><span>{italicizeFirstWord(answer.answer_4)}</span></div>
                                                    <div className="mt-2"><span>{italicizeFirstWord(answer.answer_5)}</span></div>
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
                        <div className="flex flex-col items-center px-2 md-custom:px-12 lg:px-12">
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
                                                            </details>
                                                        </div>
                                                    );
                                                }
                                                return null;
                                            })}
                                        </>
                                    ) : (
                                        <div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No data available</p>
                    )}
                    <p className="text-lg mt-40 print-visible hidden">Triangel Loopbaancentrum</p>
                    <p className="text-lg print-visible hidden">info@triangelloopbaancentrum</p>
                    <p className="text-lg mb-12 print-visible hidden">03 500 03 10</p>
                </div>
                <div className='flex justify-start mr-8 mt-10'>
                    <button
                        onClick={() => {
                            handlePrint(null, () => contentToPrint.current);
                        }}
                        className="bg-[#87bdd8] w-max text-slate-200 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded text-sm px-2 py-1 text-center ml-4"
                    >
                        print
                    </button>

                </div>
            </div>
            <div className='flex flex-col justify-between w-full md:w-3/5 lg:w-1/3 h-86 mx-4 mt-4 lg-custom:mt-10 lg-custom:-mb-10 px-1 md:px-2 lg-custom:px-6 py-6 text-base sm:text-sm bg-[#daebe8] rounded shadow'>
                <div className="flex flex-col items-center w-full ">
                    <div className="flex flex-col mt-8 md:px-8">
                        <div className="mb-12 sm:px-4 sm:mx-4 md:mx-0 px-16 py-2 border-2 border-[#2f8bc9] bg-slate-200 rounded-md">
                            <p>Wil je na het lezen van dit persoonlijk advies meer informatie over loopbaanbegeleiding,
                                vul dan je gegevens in en we nemen contact met je op voor een gratis en vrijblijvend
                                kennismakingsgesprek met een loopbaancoach bij jou in de buurt.</p>
                        </div>
                    </div>
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col sm:w-3/4 md:w-3/5 lg:w-1/2"
                    >
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
                        <div className="flex items-center mt-4">
                            <input
                                type="checkbox"
                                id="privacyPolicy"
                                checked={isPrivacyChecked}
                                onChange={(e) => setIsPrivacyChecked(e.target.checked)}
                                className="mr-2"
                                required
                            />
                            <label htmlFor="privacyPolicy">
                                <p className="text-xs hover:text-gray-400">Ik ga akkoord met het{" "}
                                     <Link href="/privacy" target="_blank">
                                         Privacybeleid
                                    </Link>
                                </p>
                            </label>
                        </div>

                        <div className='flex justify-start mt-6 mb-16'>
                            <button
                                className="bg-[#2f8bc9] w-20 text-slate-200 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded text-sm px-2 py-1 text-center me-2 mb-2"
                                data-te-ripple-init
                                type="submit"
                            >
                                verzend
                            </button>
                        </div>

                    </form>
                </div>
                {/* <div className="mt-8 md:px-8"> */}
                <div className="flex flex-row justify-between w-full text-left text-slate-200 mt-12 lg-custom:mt-4 lg-custom:px-6">
                    <div className="flex flex-row w-28 justify-center bg-[#2f8bc9] hover:bg-blue-800 md:px-2 py-1 rounded-md cursor-pointer">
                        <p>
                            <a
                                href="https://www.triangelloopbaancentrum.be"
                                target="_blank"
                                rel="noopener noreferrer"
                                className='sm:text-sm'
                            >
                                meer info
                            </a>
                        </p>
                    </div>
                    <div className="flex flex-row w-28 md:w-32 justify-center bg-[#2f8bc9] hover:bg-blue-800 md:px-2 py-1 rounded-md cursor-pointer">
                        <p>
                            <a
                                href="mailto:info@triangelloopbaancentrum.be"
                                className='sm:text-sm hover:text-gray-400'
                            >
                                mail
                            </a>

                        </p>
                    </div>
                    <div className="flex flex-row w-28 md:w-32 justify-center bg-[#2f8bc9] md:px-2 py-1 rounded-md">
                        <Image
                            src="/images/phone_white.png"
                            alt="icon"
                            width={12}
                            height={12}
                            className="mr-2 mb-1"
                        />
                        <p className="text-lg sm:text-sm text-white tracking-normal">03 500 03 10</p>
                    </div>
                </div>
                {/* </div> */}
            </div>
            <div className='w-0 md:1/4 lg:w-1/6'></div>
        </div >
    );
};

export default Result;

