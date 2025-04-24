import React from 'react';
import { FaCode, FaPaintBrush, FaChartLine } from 'react-icons/fa'; // example icons

const Categories = () => {
  const data = [
    {
      icon: <FaCode className="text-3xl text-blue-500" />,
      title: 'Programming',
      info: 'Test your coding skills with quizzes from top online courses.',
    },
    {
      icon: <FaPaintBrush className="text-3xl text-pink-500" />,
      title: 'Design',
      info: 'Verify your design knowledge from various platforms.',
    },
    {
      icon: <FaChartLine className="text-3xl text-green-500" />,
      title: 'Business',
      info: 'Prove your business acumen with certified quizzes.',
    },
  ];

  return (
  

 
    <div className="p-8 bg-[#f5f5f5]">
      <h2 className="text-2xl font-bold mb-6 text-center">Popular Quiz Categories</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex flex-col justify-around py-8 max-w-lg min-h-48 bg-white rounded-xl  hover:shadow-lg transition pl-4"
          >
            {item.icon}
            <h3 className="text-xl font-semibold mt-3 mb-1">{item.title}</h3>
            <p className="text-gray-600 ">{item.info}</p>
          </div>
        ))}
      </div>
      </div>
 
  );
};

export default Categories;
