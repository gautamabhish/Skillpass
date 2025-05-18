'use client';
import { useState } from 'react';
import clsx from 'clsx';
import { Inter } from 'next/font/google';
import Image from 'next/image';
const inter = Inter({ subsets: ['latin'] });

// Define types for Question and Answers
type Question = {
  id: number;
  text: string;
  options: string[];
};

type Answers = Record<number, number>;  // Map of question number to selected option index
type MarkedForReview = number[];        // Array of question numbers marked for review
type AnsweredAndMarked = number[];      // Array of question numbers that are both answered and marked

export default function JEEStyleQuizInterface() {
  const [currentQuestion, setCurrentQuestion] = useState<number>(1);
  const [answers, setAnswers] = useState<Answers>({});
  const [markedForReview, setMarkedForReview] = useState<MarkedForReview>([]);
  const [answeredAndMarked, setAnsweredAndMarked] = useState<AnsweredAndMarked>([]);
  
  const totalQuestions = 64;
  
  // Define questions with their structure
  const questions: Question[] = [
    {
      id: 1,
      text: 'What is the primary purpose of a constructor in object-oriented programming?',
      options: [
        'To initialize object properties',
        'To destroy objects when they are no longer needed',
        'To create new classes',
        'To implement inheritance'
      ]
    }
    // Additional questions would be defined here
  ];
  
  const handleAnswer = (optionIndex: number) => {
    setAnswers((prevAnswers) => ({ ...prevAnswers, [currentQuestion]: optionIndex }));
    if (markedForReview.includes(currentQuestion)) {
      setMarkedForReview(markedForReview.filter(q => q !== currentQuestion));
      setAnsweredAndMarked([...answeredAndMarked, currentQuestion]);
    }
  };
  
  const handleNavigation = (questionNum: number) => {
    setCurrentQuestion(questionNum);
  };
  
  const handleSaveAndNext = () => {
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };
  
  const handleMarkForReview = (andNext: boolean = false) => {
    if (!markedForReview.includes(currentQuestion) && !answeredAndMarked.includes(currentQuestion)) {
      if (answers[currentQuestion] !== undefined) {
        setAnsweredAndMarked([...answeredAndMarked, currentQuestion]);
      } else {
        setMarkedForReview([...markedForReview, currentQuestion]);
      }
    }
    
    if (andNext && currentQuestion < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };
  
  const handleClearResponse = () => {
    const newAnswers = { ...answers };
    delete newAnswers[currentQuestion];
    setAnswers(newAnswers);
    setMarkedForReview(markedForReview.filter(q => q !== currentQuestion));
    setAnsweredAndMarked(answeredAndMarked.filter(q => q !== currentQuestion));
  };
  
  const getQuestionStatus = (questionNum: number): 'answeredAndMarked' | 'answered' | 'notAnswered' | 'notVisited' | 'markedForReview' | 'current' => {
    if (answeredAndMarked.includes(questionNum)) return 'answeredAndMarked';
    if (answers[questionNum] !== undefined) return 'answered';
    if (markedForReview.includes(questionNum)) return 'markedForReview';
    return currentQuestion === questionNum ? 'current' : 'notVisited';
  };
  
  const getStatusColor = (status: string): string => {
    switch(status) {
      case 'answered': return 'bg-green-500';
      case 'notAnswered': return 'bg-red-500';
      case 'notVisited': return 'bg-gray-200 text-gray-500';
      case 'markedForReview': return 'bg-purple-500';
      case 'answeredAndMarked': return 'bg-purple-500 border-4 border-green-400';
      case 'current': return 'bg-blue-500';
      default: return 'bg-gray-200';
    }
  };
  
  return (
    <div className="flex flex-col bg-white gap-8">
      {/* Header */}
      <div className="flex justify-between items-center border-b-2 border-gray-200 py-2 px-4">
        <div className="flex items-center">
        
          <div>
            <div className={clsx("font-bold text-blue-800 text-2xl")}>
                <Image src={"Certifi.svg"} height={200} width={200} alt='CERTI' ></Image>
            </div>
            {/* <div className="bg-green-500 text-white text-xs px-2 py-1">Excellence in Assessment</div> */}
          </div>
        </div>
        
        <div className="flex items-center border border-gray-300 rounded p-2">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-2">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-gray-600">
              <path fill="currentColor" d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
            </svg>
          </div>
          <div className="text-xs">
            <div> Name: <span className="text-orange-500">{'{Your Name}'}</span></div>
            <div>Title: <span className="text-orange-500">{'{Test Practice}'}</span></div>
            <div>Remaining Time: <span className="bg-blue-100 text-blue-800 px-1">02:59:30</span></div>
          </div>
        </div>
      </div>
      
    
      {/* Main Content */}
      <div className="flex pt-8">
        {/* Question Area */}
        <div className="w-2/3 p-6 border-r-2 border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold">Question {currentQuestion}:</h2>
            <button className="text-blue-500">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
              </svg>
            </button>
          </div>
          
          <div className="bg-gray-100 p-4 mb-6">
            {currentQuestion === 1 && (
              <div>
                <p className="mb-4">{questions[0].text}</p>
                
                <div className="space-y-4 mt-6">
                  {questions[0].options.map((option, index) => (
                    <div key={index} className="flex items-center">
                      <div className="mr-2 text-gray-700 font-semibold">({index + 1})</div>
                      <input
                        type="radio"
                        id={`option-${index}`}
                        name="question-option"
                        className="mr-2"
                        checked={answers[currentQuestion] === index}
                        onChange={() => handleAnswer(index)}
                      />
                      <label htmlFor={`option-${index}`} className="text-gray-700">
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Action Buttons */}
          <div className="flex space-x-2">
            <button 
              onClick={handleSaveAndNext}
              className="bg-green-500 text-white px-4 py-2 text-xs font-semibold"
            >
              SAVE & NEXT
            </button>
            <button 
              onClick={() => handleMarkForReview(true)}
              className="bg-orange-500 text-white px-4 py-2 text-xs font-semibold"
            >
              SAVE & MARK FOR REVIEW
            </button>
            <button 
              onClick={handleClearResponse}
              className="bg-gray-300 text-gray-800 px-4 py-2 text-xs font-semibold"
            >
              CLEAR RESPONSE
            </button>
            <button 
              onClick={() => handleMarkForReview(false)}
              className="bg-blue-500 text-white px-4 py-2 text-xs font-semibold"
            >
              MARK FOR REVIEW & NEXT
            </button>
          </div>
          
          {/* Bottom Navigation */}
          <div className="flex justify-between items-center mt-12">
            <button 
              className="bg-gray-200 text-gray-700 px-4 py-2 text-xs font-semibold"
              disabled={currentQuestion === 1}
              onClick={() => currentQuestion > 1 && setCurrentQuestion(currentQuestion - 1)}
            >
              {"<< BACK"}
            </button>
            <button 
              className="bg-gray-200 text-gray-700 px-4 py-2 text-xs font-semibold"
              disabled={currentQuestion === totalQuestions}
              onClick={() => currentQuestion < totalQuestions && setCurrentQuestion(currentQuestion + 1)}
            >
              {"NEXT >>"}
            </button>
            <button className="bg-green-500 text-white px-8 py-2 text-sm font-semibold">
              SUBMIT
            </button>
          </div>
        </div>
        
        {/* Answer Key Panel */}
        <div className="w-1/3 p-4">
          {/* Status Legend */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-gray-200 text-gray-700 flex items-center justify-center text-xs mr-2">BB</div>
              <span className="text-xs">Not Visited</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 bg-green-500 text-white flex items-center justify-center text-xs mr-2">BB</div>
              <span className="text-xs">Answered</span>
            </div>
            {/* More Legend Items */}
          </div>
          
          {/* Question Navigation */}
          <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-2">
            {Array.from({ length: totalQuestions }, (_, index) => (
              <button
                key={index}
                onClick={() => handleNavigation(index + 1)}
                className={clsx(
                  'w-10 h-10  rounded-md ',
                  getStatusColor(getQuestionStatus(index + 1))
                )}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
