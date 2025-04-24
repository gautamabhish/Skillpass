"use client";
import React from 'react'
import { useState, useEffect } from 'react';
import CertificateCard from '../ui/dashboard/CertficateCard';


interface CertificatesProps {
    image: string,
    title: string,
    completed: string,
}

const certificiteData: CertificatesProps[] = [
    {
        image: "/jsmastery.png",
        title: "JavaScript Mastery",
        completed: "Completed Apr 2025",
    },
    {
        image: "/pythonBasics.png",
        title: "Python Basics",
        completed: "Completed Mar 2025",
    },
]

function CertificatesContainer() {
    const [loaded, setLoaded] = useState(false);
    const [data, setData] = useState<CertificatesProps[]>([]);

    useEffect(() => {
        setTimeout(() => {
            setLoaded(true);
            setData(certificiteData);
        }, 2000)
    }, [])

    return (
        <section className='certificates flex flex-col gap-4 mt-4 px-6 py-2 md:px-20 md:py-4'>
            <h1 className='text-2xl font-bold'>Your Certificates</h1>
            <div className='container w-full flex flex-col md:flex-row items-center gap-4 mt-4'>
                {loaded ? (
                    data.map((card, idx) => (
                        <CertificateCard
                            key={idx}
                            image={card.image} 
                            title={card.title}
                            completed={card.completed}
                        />
                    ))
                ) : (
                    Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="bg-white shadow-md rounded-xl p-4 flex flex-col gap-4 min-w-[50%]">
                            <div className="flex justify-between items-center">
                                <p className="text-sm text-gray-600 font-bold bg-gray-200 w-24 h-4 animate-pulse rounded"></p>
                                <span className="bg-gray-200 w-20 h-4 animate-pulse rounded"></span>
                            </div>
                            <div className="bg-[#f5f5f5] w-full h-2 rounded-md">
                                <div className={`bg-gray-300 h-2 rounded animate-pulse`} style={{ width: `70%` }}></div>
                            </div>
                            <div className="flex justify-between items-center">
                                <h2 className="text-sm font-bold text-gray-900 bg-gray-200 w-24 h-4 animate-pulse rounded"></h2>
                                <span className="bg-gray-200 w-16 h-4 animate-pulse rounded"></span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </section>

    )
}

export default CertificatesContainer