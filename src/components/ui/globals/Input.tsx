'use client';
import React, { useState, useRef } from "react";
import Image from "next/image";

export enum QuestionType {
  SingleCorrect = "Single Correct",
  MultiCorrect = "Multiple Correct",
  Subjective = "Subjective",
  File = "File",
}

interface InputProps {
  type: QuestionType;
  label?: string;
  value?: string;
  onChange: (e: any) => void;
  placeholder?: string;
  className?: string;
  error?: string;
  helperText?: string;
  options?: string[];
  correctAnswers?: number[];
  Uniquename?: string;
}

const MAX_WORDS = 150;
const limitChars = (text: string, maxChars: number) =>
  text.slice(0, maxChars);

// Helper: count chars
const countChars = (text: string) => text.length;

const isFileType = (type?: QuestionType) => type === QuestionType.File;
const isOptionType = (type?: QuestionType) =>
  type === QuestionType.SingleCorrect || type === QuestionType.MultiCorrect;

const Input: React.FC<InputProps> = ({
  type = QuestionType.Subjective,
  label,
  value,
  onChange,
  placeholder,
  className = "",
  error,
  helperText,
  Uniquename,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [options, setOptions] = useState<string[]>([""]);
  const [correctAnswers, setCorrectAnswers] = useState<number[]>([]);

  const handleOptionChange = (index: number, val: string) => {
    const limitedVal = limitChars(val, MAX_WORDS);
    const newOptions = [...options];
    newOptions[index] = limitedVal;
    setOptions(newOptions);
    onChange({ options: newOptions, correctAnswers });
  };

  const handleAddOption = () => {
    setOptions([...options, ""]);
  };

  const handleRemoveOption = (index: number) => {
    const newOptions = options.filter((_, i) => i !== index);
    const newCorrectAnswers = correctAnswers
      .filter((i) => i !== index)
      .map((i) => (i > index ? i - 1 : i));

    setOptions(newOptions);
    setCorrectAnswers(newCorrectAnswers);
    onChange({ options: newOptions, correctAnswers: newCorrectAnswers });
  };

  const handleMarkCorrect = (index: number) => {
    const updated = type === QuestionType.SingleCorrect
      ? [index]
      : correctAnswers.includes(index)
        ? correctAnswers.filter(i => i !== index)
        : [...correctAnswers, index];

    setCorrectAnswers(updated);
    onChange({ options, correctAnswers: updated });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const syntheticEvent = {
        target: { files: [file] },
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent);
      setFileName(file.name);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFileName(e.target.files[0].name);
      onChange(e);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && <label className="font-medium text-gray-700 text-lg">{label}</label>}

      {isFileType(type) ? (
        <>
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={triggerFileSelect}
            className={`w-full h-28 border-2 border-dashed rounded-md flex flex-col justify-center items-center cursor-pointer
            ${error ? "border-red-400" : "border-gray-300 hover:border-[#3277ee] transition-all duration-200"}
            bg-gray-50`}
          >
            <p className="text-gray-600 text-sm">
              {fileName || "Drag & drop a file here or click to browse"}
            </p>
          </div>
          <input
            type="file"
            accept="image/*,video/*,audio/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </>
      ) : isOptionType(type) ? (
        <div className="flex flex-col gap-2">
          {options.map((opt, index) => (
            <div key={index} className="flex items-center gap-2">
              {type === QuestionType.SingleCorrect ? (
                <input
                  type="radio"
                  name={Uniquename || `default-${index}`}
                  checked={correctAnswers[0] === index}
                  onChange={() => handleMarkCorrect(index)}
                />
              ) : (
                <input
                  type="checkbox"
                  checked={correctAnswers.includes(index)}
                  onChange={() => handleMarkCorrect(index)}
                />
              )}
              <input
                type="text"
                value={opt}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
                placeholder={`Option ${index + 1}`}
              />
              <span className="text-xs text-gray-500">
                {MAX_WORDS - countChars(opt)} words left
              </span>
              {options.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveOption(index)}
                  className="text-red-500 hover:text-red-700"
                  title="Remove option"
                >
                  <Image src="/delete.svg" alt="delete" width={20} height={20} />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddOption}
            className="self-start mt-2 px-3 py-1 text-sm rounded hover:bg-blue-200 text-blue-600"
          >
            + Add Option
          </button>
        </div>
      ) : (
        <>
          <input
            type="text"
            value={limitChars(value || "", MAX_WORDS)}
            onChange={(e) => {
              const limited = limitChars(e.target.value, MAX_WORDS);
              onChange({ target: { value: limited } });
            }}
            placeholder={placeholder}
            className={`w-full px-4 py-2 border rounded outline-none text-sm
            ${error ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-[#3277ee]"}
            focus:ring-2 transition duration-200`}
          />
          <span className="text-xs text-gray-500">
            {MAX_WORDS - countChars(value || "")} words left
          </span>
        </>
      )}

      {helperText && !error && <span className="text-xs text-gray-500">{helperText}</span>}
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};

export default Input;
