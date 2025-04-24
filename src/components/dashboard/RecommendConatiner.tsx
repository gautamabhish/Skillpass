"use client";
import React, {useState, useEffect} from 'react'
import RecommendCard from '@/components/ui/dashboard/RecommendedCard';

interface recommendedProps {
    image: string,
    tag: string,
    color: string,
    title: string,
    description: string,
    time: number,
}

const recommendedData: recommendedProps[] = [
    {
        image: "https://plus.unsplash.com/premium_photo-1664297950425-99a968926a74?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8RGF0YSUyMFNjaWVuY2V8ZW58MHx8MHx8fDA%3D",
        tag: "Popular",
        color: "bg-blue-500",
        title: "Data Science Fundamentals",
        description: "Learn the basics of data analysis and visualization",
        time: 8,
    },
    {
        image: "https://plus.unsplash.com/premium_photo-1682124651258-410b25fa9dc0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8TWFjaGluZSUyMExlYXJuaW5nfGVufDB8fDB8fHww",
        tag: "New",
        color: "bg-green-600",
        title: "Machine Learning Basics",
        description: "Introduction to AI and machine learning concepts",
        time: 12,
    },
    {
        image: "https://images.unsplash.com/photo-1667984390553-7f439e6ae401?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Q2xvdWQlMjBDb21wdXRpbmd8ZW58MHx8MHx8fDA%3D",
        tag: "",
        color: "",
        title: "Cloud Computing",
        description: "Master cloud platforms and deployement",
        time: 10,
    },
]

function RecommendedContainer() {
    const [loaded, setLoaded] = useState(false)
    const [data, setData] = useState<recommendedProps[]>([]);

    useEffect(() =>{
        setTimeout(() =>{
            setLoaded(true)
            setData(recommendedData)
        }, 0)
    }, [])
    return (
        <section className='certificates flex flex-col gap-4 mt-4 px-6 py-2 md:px-20 md:py-4'>
            <h1 className='text-2xl font-bold'>Recommended for You</h1>
            <div className='container w-full flex flex-col md:flex-row items-center gap-6 mt-4'>
                {loaded ? (
                    data.map((card, idx) => (
                        <RecommendCard
                        key={idx}
                        image={card.image}
                        tag={card.tag}
                        color={card.color}
                        title={card.title}
                        description={card.description}
                        time={card.time}
                        />
                    ))
                ) : (
                    Array.from({ length: 3 }).map((_, i) => (
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

export default RecommendedContainer