'use client';

import React from "react";
import Input, { QuestionType } from "../ui/globals/Input";
import Image from "next/image";
import { useCourseCreate } from "@/Providers/CreateProvider";
import { v4 as uuidv4 } from 'uuid';
import { Question } from "@/Providers/CreateProvider";

const AddQuestions: React.FC = () => {
  const { courseData, setCourseData } = useCourseCreate();

  const handleAddQuestion = () => {
    const newQuestion: Question = {
      id: uuidv4(),
      type: QuestionType.MultiCorrect,
      text: '',
      points: 1, // string to allow flexible typing
      negPoints: 0,
      options: ["", ""],
      correctAnswers: [],
    };

    setCourseData(prev => ({
      ...prev,
      Questions: [...(prev.Questions ?? []), newQuestion],
    }));
  };

const handleQuestionChange = (index: number, field: keyof Question, value: any) => {
  setCourseData(prev => {
    const updated = [...(prev.Questions ?? [])];
    const question = { ...updated[index] };

    if (field === "points" || field === "negPoints") {
      const parsed = parseFloat(value);
      question[field] = isNaN(parsed) ? 0 : parsed; // fallback to 0 or keep previous if needed
    } else {
      question[field] = value;
    }

    updated[index] = question;
    return { ...prev, Questions: updated };
  });
};

  const handleDeleteQuestion = (id: string) => {
    setCourseData(prev => ({
      ...prev,
      Questions: (prev.Questions ?? []).filter(q => q.id !== id),
    }));
  };

  const handleInputChange = (index: number, inputData: any) => {
    const file = inputData?.target?.files?.[0];

    if (file) {
      const previewURL = URL.createObjectURL(file);

      setCourseData(prev => {
        const updated = [...(prev.Questions ?? [])];
        updated[index] = {
          ...updated[index],
          AttachfileBlob: file,
          AttachpreviewURL: previewURL,
          AttachfileType: file.type,
        };
        return { ...prev, Questions: updated };
      });
    } else {
      setCourseData(prev => {
        const updated = [...(prev.Questions ?? [])];
        updated[index] = {
          ...updated[index],
          ...(inputData.options && { options: inputData.options }),
          ...(inputData.correctAnswers && { correctAnswers: inputData.correctAnswers }),
        };
        return { ...prev, Questions: updated };
      });
    }
  };

  const validateQuestion = (q: Question): string | null => {
    if (!q.text?.trim()) return "Question text is required.";
    if (q.points < 1) return "Points must be at least 1.";
    if (q.negPoints   < 0) return "Negative points must be 0 or less.";
    if (!Array.isArray(q.options) || q.options.length < 2) return "At least 2 options are required.";
    if (!Array.isArray(q.correctAnswers) || q.correctAnswers.length === 0) return "At least one correct answer is required.";
    return null;
  };

  return (
    <div className="bg-white p-4">
      <label className="text-xl font-semibold mb-4 mt-2 ml-1">
        Questions <span className="text-red-500">*</span>
      </label>

      <div className="flex flex-col gap-6">
        {(courseData.Questions ?? []).map((q, index) => (
          <div key={q.id} className="p-4 border border-[#b7bbbe] rounded shadow-sm relative">
            <div
              className="absolute top-2 right-2 cursor-pointer text-red-500"
              onClick={() => handleDeleteQuestion(q.id)}
            >
              <Image src="/delete.svg" height={20} width={20} alt="delete" />
            </div>

            <p className="font-semibold mb-2">Question {index + 1}</p>

            <div className="relative flex items-center gap-2 mb-2">
              <input
                type="text"
                placeholder="Enter question text"
                className="w-full px-4 py-2 border border-gray-300 rounded text-sm"
                value={q.text || ''}
                onChange={(e) => handleQuestionChange(index, 'text', e.target.value)}
              />
              <label className="relative cursor-pointer group">
                <Image src="/link.svg" alt="Attach" width={20} height={20} title="Add attachments" />
                <span className="absolute hidden hover:visible bottom-full mb-1 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100 transition">
                  Attachments
                </span>
                <input
                  type="file"
                  accept="image/*,video/*,audio/*"
                  className="hidden"
                  onChange={(e) => handleInputChange(index, { target: e.target })}
                />
              </label>
            </div>

            {q.AttachpreviewURL && (
              <div className="mt-2">
                {q.AttachfileType?.includes('audio') ? (
                  <audio controls src={q.AttachpreviewURL} />
                ) : q.AttachfileType?.includes('video') ? (
                  <video controls width="300" src={q.AttachpreviewURL} />
                ) : q.AttachfileType?.includes('image') ? (
                  <Image
                    src={q.AttachpreviewURL}
                    alt="Preview"
                    width={300}
                    height={200}
                    className="object-cover mt-2"
                  />
                ) : (
                  <p className="text-sm text-gray-500">Preview: {q.AttachfileType}</p>
                )}
              </div>
            )}

            <div className="flex items-center gap-4 my-3">
              <select
                className="px-3 py-1 border border-[#b7bbbe] rounded text-lg font-bold"
                value={q.type}
                onChange={(e) =>
                  handleQuestionChange(index, 'type', e.target.value as QuestionType)
                }
              >
                {Object.values(QuestionType).map((type) =>
                  type !== QuestionType.File && type !== QuestionType.Subjective && (
                    <option key={type} value={type}>
                      {type.replace(/([A-Z])/g, ' $1').trim()}
                    </option>
                  )
                )}
              </select>

              <input
                type="text"
                inputMode="numeric"
                placeholder="Points"
                className="w-24 px-2 py-1 border border-[#b7bbbe] rounded text-sm"
                value={q.points}
                onChange={(e) =>
                  handleQuestionChange(index, 'points', e.target.value)
                }
                title={`Assigned Points: ${q.points}`}
              />

              <input
                type="text"
                inputMode="numeric"
                placeholder="0"
                className="w-28 px-2 py-1 border border-[#b7bbbe] text-red-500 rounded text-sm font-bold"
                value={q.negPoints}
                onChange={(e) =>
                  handleQuestionChange(index, 'negPoints', e.target.value)
                }
                title={`Negative Points: ${q.negPoints}`}
              />
            </div>

            <Input
              type={q.type}
              onChange={(data) => handleInputChange(index, data)}
              options={q.options ?? []}
              correctAnswers={q.correctAnswers ?? []}
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
