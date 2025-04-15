'use client';
import React, { useState } from "react";
import Input, { QuestionType } from "./ui/Input"; // Adjust path as needed
import Image from "next/image";
interface Question {
  id: number;
  type: QuestionType;
  text: string;
  points: number;
  options?: string[];
  correctAnswers?: number[];
}

const AddQuestions: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([
    { id: 1, type: QuestionType.MultiCorrect, text: '', points: 0, options: ["", ""], correctAnswers: [] }
  ]);

  const handleAddQuestion = () => {
    const newId = questions.length + 1;
    setQuestions([
      ...questions,
      {
        id: newId,
        type: QuestionType.MultiCorrect,
        text: '',
        points: 0,
        options: ["", ""],
        correctAnswers: [],
      },
    ]);
  };

  const handleDeleteQuestion = (id: number) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const handleQuestionChange = (index: number, field: string, value: any) => {
    const updated = [...questions];
    (updated[index] as any)[field] = value;
    setQuestions(updated);
  };

  const handleInputChange = (index: number, inputData: any) => {
    const updated = [...questions];
    updated[index].options = inputData.options;
    updated[index].correctAnswers = inputData.correctAnswers;
    setQuestions(updated);
  };

  return (
    <div className="bg-white p-4">
    <h2 className="text-xl font-semibold mb-4 mt-2 ml-1" >Questions</h2>
    <div className="flex flex-col gap-6 ">
     

      {questions.map((q, index) => (
        <div key={q.id} className="p-4 border border-[#b7bbbe] rounded shadow-sm relative">
          <div className="absolute top-2 right-2 cursor-pointer text-red-500" onClick={() => handleDeleteQuestion(q.id)}>
            <Image src="delete.svg" height={20} width={20} alt="delete"></Image>
          </div>

          <p className="font-semibold mb-2">Question {index + 1}</p>

          <input
            type="text"
            placeholder="Enter question text"
            className="w-full px-4 py-2 border border-gray-300 rounded mb-3 text-sm"
            value={q.text}
            onChange={(e) => handleQuestionChange(index, 'text', e.target.value)}
          />

          <div className="flex items-center gap-4 mb-3">
            <select
              className="px-3 py-1   border border-[#b7bbbe] rounded text-lg font-bold"
              value={q.type}
              onChange={(e) =>
                handleQuestionChange(index, 'type', e.target.value as QuestionType)
              }
            >
              {Object.values(QuestionType).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <input
              type="number"
              placeholder="Points"
              className="w-24 px-2 py-1 border border-[#b7bbbe] rounded text-sm"
              value={q.points}
              onChange={(e) => handleQuestionChange(index, 'points', parseInt(e.target.value))}
            />
          </div>

          <Input
            type={q.type}
            onChange={(data) => handleInputChange(index, data)}
            value={q.text}
          />
        </div>
      ))}

      <button
        onClick={handleAddQuestion}
        className="self-center mt-4 px-6 py-2 border border-dashed border-gray-400 rounded hover:bg-gray-100 transition text-gray-700 mb-4"
      >
        + Add Question
      </button>
    </div>
    </div>
  );
};

export default AddQuestions;
