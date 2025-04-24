import React from 'react';

const Works = () => {
  const data = [
    {
      index: 1,
      title: 'Choose a Course',
      info: "Select from various online courses you've completed",
    },
    {
      index: 2,
      title: 'Take the Quiz',
      info: 'Complete the quiz to test your knowledge',
    },
    {
      index: 3,
      title: 'Get Certified',
      info: 'Receive certification for your achievement',
    },
  ];

  return (
    <div className="p-8 bg-white">
      <h2 className="text-2xl font-bold mb-6 text-center">How EduTrust Works</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center bg-white p-6 rounded-lg ">
            <div className="flex items-center justify-center text-2xl font-bold text-white bg-blue-600 h-12 w-12 rounded-full mb-2">{item.index}</div>
            <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
            <p className="text-gray-600 text-center">{item.info}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Works;
