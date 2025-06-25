'use client';
import { useState, useEffect, useCallback } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import { useAppSelector } from '@/store/hooks';
import { useFetchQuizPaid } from '@/hooks/useFetchQuizPaid';
import TimerDisplay from '@/components/ui/globals/Timer';
import axios from 'axios';
import { useRouter } from 'next/navigation';

type Question = {
  id: number;
  text: string;
  options: string[];
  type: 'Single Correct' | 'Multi Correct';
  points: number;
  negPoints: number;
  attachFileURL?: string;
  attachFileType?: string;
};

// Updated type to handle both single and multiple selections
type Answers = Record<number, number | number[]>; // questionIndex → selectedOptionIndex or array of indices
type MarkedForReview = number[];            // array of question indices
type AnsweredAndMarked = number[];          // array of question indices

export default function JEEStyleQuizInterface({ id }: { id: string }) {
  const { data, isLoading } = useFetchQuizPaid(id);
  console.log('Quiz data:', data);
  const userName = useAppSelector((s) => s.user.name);
  const userId = useAppSelector((s) => s.user.id);
  const router = useRouter();
  
  // Extract quiz data when available
  const questions: Question[] = data?.questions || [];
  const totalQuestions = questions.length;
  const quizTitle = data?.title || 'Quiz';
  const timeLimitInMinutes = data?.timeLimit || 60;
  const quizStartedAtMs = data?.staredAt || Date.now();

  // Local UI state
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState<Answers>({});
  const [markedForReview, setMarkedForReview] = useState<MarkedForReview>([]);
  const [answeredAndMarked, setAnsweredAndMarked] = useState<AnsweredAndMarked>([]);
  const [hasTimeExpired, setHasTimeExpired] = useState(false);

  // When timer expires, auto‐submit
  const handleTimeUp = useCallback(() => {
    setHasTimeExpired(true);
    handleSubmit(); // Attempt submission when time is up
  }, []);

  // Updated answer selection to handle both single and multi-correct
  const handleAnswer = (optionIndex: number) => {
    const currentQuestionData = questions[currentQuestion - 1];
    
    if (currentQuestionData.type === 'Single Correct') {
      // Single correct - replace the answer
      setAnswers((prev) => ({ ...prev, [currentQuestion]: optionIndex }));
    } else {
      // Multi correct - toggle the option
      setAnswers((prev) => {
        const currentAnswer = prev[currentQuestion];
        let newAnswer: number[];
        
        if (Array.isArray(currentAnswer)) {
          // Already has multiple selections
          if (currentAnswer.includes(optionIndex)) {
            // Remove the option
            newAnswer = currentAnswer.filter(idx => idx !== optionIndex);
          } else {
            // Add the option
            newAnswer = [...currentAnswer, optionIndex].sort();
          }
        } else if (currentAnswer === optionIndex) {
          // Single selection that matches - remove it
          newAnswer = [];
        } else if (currentAnswer !== undefined) {
          // Single selection that doesn't match - add both
          newAnswer = [currentAnswer, optionIndex].sort();
        } else {
          // No previous selection
          newAnswer = [optionIndex];
        }
        
        return { ...prev, [currentQuestion]: newAnswer };
      });
    }
    
    // If previously marked for review, move to answeredAndMarked
    if (markedForReview.includes(currentQuestion)) {
      setMarkedForReview((prev) => prev.filter((q) => q !== currentQuestion));
      setAnsweredAndMarked((prev) => [...prev, currentQuestion]);
    }
  };

  // Helper function to check if an option is selected
  const isOptionSelected = (optionIndex: number): boolean => {
    const answer = answers[currentQuestion];
    if (Array.isArray(answer)) {
      return answer.includes(optionIndex);
    }
    return answer === optionIndex;
  };

  // Helper function to render media attachment
  const renderMediaAttachment = (question: Question) => {
    if (!question.attachFileURL) return null;

    const fileType = question.attachFileType?.toLowerCase() || '';
    
    if (fileType.includes('image')) {
      return (
        <Image
          src={question.attachFileURL}
          alt="Question attachment"
          width={400}
          height={300}
          className="rounded shadow-md"
        />
      );
    } else if (fileType.includes('video')) {
      return (
        <video
          controls
          className="rounded shadow-md max-w-full"
          style={{ maxHeight: '400px' }}
        >
          <source src={question.attachFileURL} type={fileType} />
          Your browser does not support the video .
        </video>
      );
    } else if (fileType.includes('audio')) {
      return (
        <div className="bg-gray-50 p-4 rounded shadow-md">
          <div className="flex items-center gap-3 mb-2">
            <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM15.657 6.343a1 1 0 011.414 0A9.972 9.972 0 0119 12a9.972 9.972 0 01-1.929 5.657 1 1 0 11-1.414-1.414A7.972 7.972 0 0017 12a7.972 7.972 0 00-1.343-4.243 1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 12a5.983 5.983 0 01-.757 2.829 1 1 0 11-1.415-1.414A3.983 3.983 0 0013 12a3.983 3.983 0 00-.172-1.171 1 1 0 010-1.415z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium text-gray-700">Audio Attachment</span>
          </div>
          <audio
            controls
            className="w-full"
            preload="metadata"
          >
            <source src={question.attachFileURL} type={fileType} />
            Your browser does not support the audio element.
          </audio>
        </div>
      );
    } else {
      // Fallback for other file types
      return (
        <div className="bg-gray-50 p-4 rounded shadow-md">
          <div className="flex items-center gap-3">
            <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
            </svg>
            <a
              href={question.attachFileURL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-800 transition-colors"
            >
              View Attachment ({fileType || 'Unknown format'})
            </a>
          </div>
        </div>
      );
    }
  };

  // Navigation between questions
  const handleNavigation = (questionNum: number) => {
    if (questionNum >= currentQuestion) {
      setCurrentQuestion(questionNum);
    }
  };

  const handleSaveAndNext = () => {
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleMarkForReview = (andNext: boolean = false) => {
    if (
      !markedForReview.includes(currentQuestion) &&
      !answeredAndMarked.includes(currentQuestion)
    ) {
      if (answers[currentQuestion] !== undefined) {
        setAnsweredAndMarked((prev) => [...prev, currentQuestion]);
      } else {
        setMarkedForReview((prev) => [...prev, currentQuestion]);
      }
    }
    if (andNext && currentQuestion < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleClearResponse = () => {
    setAnswers((prev) => {
      const copy = { ...prev };
      delete copy[currentQuestion];
      return copy;
    });
    setMarkedForReview((prev) => prev.filter((q) => q !== currentQuestion));
    setAnsweredAndMarked((prev) => prev.filter((q) => q !== currentQuestion));
  };

  // Determine button coloring
  const getQuestionStatus = (
    questionNum: number
  ): 'answeredAndMarked' | 'answered' | 'notVisited' | 'markedForReview' | 'current' => {
    if (answeredAndMarked.includes(questionNum)) return 'answeredAndMarked';
    if (answers[questionNum] !== undefined) return 'answered';
    if (markedForReview.includes(questionNum)) return 'markedForReview';
    return questionNum === currentQuestion ? 'current' : 'notVisited';
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'answered':
        return 'bg-green-500';
      case 'notVisited':
        return 'bg-gray-200 text-gray-500';
      case 'markedForReview':
        return 'bg-purple-500';
      case 'answeredAndMarked':
        return 'bg-purple-500 border-4 border-green-400';
      case 'current':
        return 'bg-blue-500';
      default:
        return 'bg-gray-200';
    }
  };

  const handleSubmit = async () => {
    try {
      // Build the "answers" array to handle both single and multi-correct
      const formattedAnswers = Object.entries(answers).map(
        ([qNumString, selectedOptions]) => {
          const questionIndex = Number(qNumString) - 1; // convert "1" → 0
          const question = questions[questionIndex];
          
          // Ensure selectedOptions is always an array
          let optionsArray: number[];
          if (Array.isArray(selectedOptions)) {
            optionsArray = selectedOptions;
          } else {
            optionsArray = [selectedOptions];
          }
          
          return {
            questionId: question.id,
            selectedOptions: optionsArray,
          };
        }
      );

      // Build the payload
      const payload = {
        userId: userId!,
        quizId: id,
        answers: formattedAnswers,
        startedAt: quizStartedAtMs,
        finishedAt: new Date().toISOString(),
      };

      // Send it
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/quiz/submit`,
        payload,
        { withCredentials: true }
      );
      const {userAttempt, quizTitle, peerStats, topAttempts, certificateIssued, certificateId} = res.data;

      // Store and redirect
      localStorage.setItem("submissionData", JSON.stringify({
        userAttempt,
        quizTitle,
        peerStats,
        topAttempts,
        certificateIssued,
        certificateId
      }));
      router.push(`/submit/${userAttempt.id}`);

    } catch (err: any) {
      console.error('Submit error', err.response?.data || err.message);
      alert('There was an error submitting your answers.');
    }
  };

  // Disable interactions if time expired
  useEffect(() => {
    if (hasTimeExpired) {
      alert('Time is up! Your answers are being submitted automatically.');
    }
  }, [hasTimeExpired]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse text-gray-400">Loading quiz...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-white gap-8">
      {/* Header */}
      <div className="flex justify-between items-center border-b-2 border-gray-200 py-2 px-4">
        <div className="flex items-center">
          <div className="font-bold text-blue-800 text-2xl flex items-center gap-2">
            <Image src="/Certifi.svg" height={32} width={32} alt="CERTI" />
            {quizTitle}
          </div>
        </div>

        <div className="flex items-center border border-gray-300 rounded p-2 gap-4">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-gray-600">
              <path
                fill="currentColor"
                d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"
              />
            </svg>
          </div>
          <div className="text-xs">
            <div>
              Name: <span className="text-orange-500">{userName}</span>
            </div>
            <div>
              Title: <span className="text-orange-500">{quizTitle}</span>
            </div>
            <TimerDisplay
              startedAt={quizStartedAtMs}
              timeLimit={timeLimitInMinutes}
              onComplete={handleTimeUp}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex pt-8">
        {/* Question Area */}
        <div className="w-2/3 p-6 border-r-2 border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold">
              Question {currentQuestion}: 
              <span className="ml-2 text-sm text-blue-600">
                ({questions[currentQuestion - 1]?.type})
              </span>
            </h2>
            <button className="text-blue-500" disabled={hasTimeExpired}>
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
              </svg>
            </button>
          </div>

          <div className="bg-gray-100 p-4 mb-6 rounded">
            {questions[currentQuestion - 1] && (
              <div>
                {/* Media Attachment */}

                {/* Question Text */}
                <p className="mb-4 text-gray-800 font-bold">
                  {questions[currentQuestion - 1].text}
                </p>

                {questions[currentQuestion - 1].attachFileURL && (
                  <div className="mb-4">
                    {renderMediaAttachment(questions[currentQuestion - 1])}
                  </div>
                )}

                {/* Points / Negative Points */}
                <p className="text-sm mb-2 text-gray-600">
                  <span className="text-green-600">
                    +{questions[currentQuestion - 1].points}
                  </span>{' '}
                  /{' '}
                  <span className="text-red-600">
                    -{questions[currentQuestion - 1].negPoints}
                  </span>
                </p>

                {/* Question Type Hint */}
                {questions[currentQuestion - 1].type === 'Multi Correct' && (
                  <p className="text-sm mb-4 text-blue-600 font-medium">
                    Note: You can select multiple options for this question.
                  </p>
                )}

                {/* Options */}
                <div className="space-y-4 mt-6">
                  {questions[currentQuestion - 1].options.map(
                    (option, index) => (
                      <div key={index} className="flex items-center">
                        <div className="mr-2 text-gray-700 font-semibold">
                          ({index + 1})
                        </div>
                        <input
                          type={questions[currentQuestion - 1].type === 'Single Correct' ? 'radio' : 'checkbox'}
                          id={`option-${index}`}
                          name={questions[currentQuestion - 1].type === 'Single Correct' 
                            ? `question-${questions[currentQuestion - 1].id}` 
                            : undefined}
                          className="mr-2"
                          checked={isOptionSelected(index)}
                          disabled={hasTimeExpired}
                          onChange={() => handleAnswer(index)}
                        />
                        <label
                          htmlFor={`option-${index}`}
                          className="text-gray-700 cursor-pointer"
                        >
                          {option}
                        </label>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <button
              onClick={handleSaveAndNext}
              className="bg-green-500 text-white px-4 py-2 text-xs font-semibold"
              disabled={hasTimeExpired || currentQuestion === totalQuestions}
            >
              SAVE & NEXT
            </button>
            <button
              onClick={() => handleMarkForReview(true)}
              className="bg-orange-500 text-white px-4 py-2 text-xs font-semibold"
              disabled={hasTimeExpired}
            >
              SAVE & MARK FOR REVIEW
            </button>
            <button
              onClick={handleClearResponse}
              className="bg-gray-300 text-gray-800 px-4 py-2 text-xs font-semibold"
              disabled={hasTimeExpired}
            >
              CLEAR RESPONSE
            </button>
            <button
              onClick={() => handleMarkForReview(false)}
              className="bg-blue-500 text-white px-4 py-2 text-xs font-semibold"
              disabled={hasTimeExpired}
            >
              MARK FOR REVIEW & NEXT
            </button>
          </div>

          {/* Bottom Navigation */}
          <div className="flex justify-between items-center mt-12">
            <button
              className="bg-gray-300 text-gray-500 px-4 py-2 text-xs font-semibold cursor-not-allowed"
              disabled
            >
              {'<< BACK'}
            </button>

            <button
              className="bg-gray-200 text-gray-700 px-4 py-2 text-xs font-semibold"
              disabled={
                hasTimeExpired || currentQuestion === totalQuestions
              }
              onClick={() =>
                currentQuestion < totalQuestions &&
                setCurrentQuestion(currentQuestion + 1)
              }
            >
              {'NEXT >>'}
            </button>

            <button
              onClick={handleSubmit}
              className="bg-green-500 text-white px-8 py-2 text-sm font-semibold"
              disabled={hasTimeExpired}
            >
              SUBMIT
            </button>
          </div>
        </div>

        {/* Answer Key Panel */}
        <div className="w-1/3 p-4">
          {/* Status Legend */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-gray-200 text-gray-700 flex items-center justify-center text-xs mr-2">
                BB
              </div>
              <span className="text-xs">Not Visited</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 bg-green-500 text-white flex items-center justify-center text-xs mr-2">
                BB
              </div>
              <span className="text-xs">Answered</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 bg-purple-500 text-white flex items-center justify-center text-xs mr-2">
                BB
              </div>
              <span className="text-xs">Marked</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 bg-blue-500 text-white flex items-center justify-center text-xs mr-2">
                BB
              </div>
              <span className="text-xs">Current</span>
            </div>
          </div>

          {/* Question Navigation Buttons */}
          <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-2">
            {Array.from({ length: totalQuestions }, (_, idx) => {
              const questionNum = idx + 1;
              const isDisabled = questionNum < currentQuestion;

              return (
                <button
                  key={idx}
                  onClick={() => !isDisabled && handleNavigation(questionNum)}
                  disabled={isDisabled || hasTimeExpired}
                  className={clsx(
                    'w-10 h-10 rounded-md text-white',
                    getStatusColor(getQuestionStatus(questionNum)),
                    {
                      'cursor-not-allowed opacity-50': isDisabled,
                      'cursor-pointer': !isDisabled,
                    }
                  )}
                >
                  {questionNum}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}