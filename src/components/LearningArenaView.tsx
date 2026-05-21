import React, { useState } from 'react';
import { GraduationCap, Award, CheckCircle, ArrowRight, BookOpen, AlertCircle, Sparkles } from 'lucide-react';
import { sfx } from '../utils/audio';

interface QuizQuestion {
  id: number;
  question: string;
  imageRepresentationText: string;
  imageIcon: string;
  options: string[];
  correctAnswer: string;
}

interface LearningArenaViewProps {
  onEarnXp: (amount: number, activityName: string) => void;
  onCompleteMission: (missionName: string, stars: number) => void;
  xpValue: number;
}

export default function LearningArenaView({
  onEarnXp,
  onCompleteMission,
  xpValue,
}: LearningArenaViewProps) {
  const [activeCourse, setActiveCourse] = useState<'none' | 'planet_naming' | 'space_trivia'>('none');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [courseComplete, setCourseComplete] = useState(false);

  const planetQuiz: QuizQuestion[] = [
    {
      id: 1,
      question: "Identify this gorgeous blue planet. It has liquid water oceans and is our beloved home!",
      imageRepresentationText: "Home Planet",
      imageIcon: "🌍",
      options: ["Earth", "Mars", "Neptune", "Venus"],
      correctAnswer: "Earth"
    },
    {
      id: 2,
      question: "Which cosmic giant has magnificent, shimmering rings surrounding it?",
      imageRepresentationText: "Rings Lord",
      imageIcon: "🪐",
      options: ["Jupiter", "Uranus", "Saturn", "Mercury"],
      correctAnswer: "Saturn"
    },
    {
      id: 3,
      question: "Nicknamed the 'Red Planet', this world is dusty, cold, and has a volcano named Olympus Mons!",
      imageRepresentationText: "Dusty Red World",
      imageIcon: "🔴",
      options: ["Venus", "Earth", "Mars", "Pluto"],
      correctAnswer: "Mars"
    }
  ];

  const triviaQuiz: QuizQuestion[] = [
    {
      id: 1,
      question: "Which giant body sits at the very center of our solar system, keeping us warm?",
      imageRepresentationText: "Hot Center",
      imageIcon: "☀️",
      options: ["The Moon", "The Sun", "Jupiter", "Sirius"],
      correctAnswer: "The Sun"
    },
    {
      id: 2,
      question: "What is the absolute largest planet orbiting our Sun?",
      imageRepresentationText: "Colossus",
      imageIcon: "🟠",
      options: ["Saturn", "Jupiter", "Neptune", "Earth"],
      correctAnswer: "Jupiter"
    }
  ];

  const getActiveQuiz = () => {
    return activeCourse === 'planet_naming' ? planetQuiz : triviaQuiz;
  };

  const handleStartCourse = (course: 'planet_naming' | 'space_trivia') => {
    sfx.playTap();
    setActiveCourse(course);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setCourseComplete(false);
  };

  const handleAnswerClick = (option: string) => {
    if (isAnswered) return;
    sfx.playTap();
    setSelectedOption(option);
  };

  const handleCheckAnswer = () => {
    if (!selectedOption || isAnswered) return;
    
    const quiz = getActiveQuiz();
    const correct = selectedOption === quiz[currentQuestionIndex].correctAnswer;
    setIsAnswered(true);

    if (correct) {
      sfx.playSuccess();
      setScore(prev => prev + 1);
    } else {
      sfx.playBuzz();
    }
  };

  const handleNext = () => {
    sfx.playTap();
    const quiz = getActiveQuiz();
    if (currentQuestionIndex < quiz.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      // Calculate star rating and complete the quest
      const isPerfect = score + (selectedOption === quiz[currentQuestionIndex].correctAnswer ? 1 : 0) === quiz.length;
      const finalScore = score + (selectedOption === quiz[currentQuestionIndex].correctAnswer ? 1 : 0);
      const earnedStars = finalScore === quiz.length ? 3 : finalScore >= 2 ? 2 : 1;
      
      const xpReward = activeCourse === 'planet_naming' ? 150 : 100;
      const missionTitle = activeCourse === 'planet_naming' ? 'Planet Naming Mastery' : 'Solar System Trivia';
      
      onEarnXp(xpReward, `Completed Course: ${missionTitle}`);
      onCompleteMission(missionTitle, earnedStars);
      sfx.playLevelUp();
      
      setScore(finalScore);
      setCourseComplete(true);
    }
  };

  const handleBackToGrid = () => {
    sfx.playTap();
    setActiveCourse('none');
  };

  return (
    <div className="flex flex-col gap-6" id="learning-arena-root">
      
      {/* Dynamic Course Screen or courses Grid */}
      {activeCourse === 'none' ? (
        <div className="flex flex-col gap-6" id="course-grid-view">
          {/* Header */}
          <div className="flex flex-col gap-1 items-start">
            <span className="bg-emerald-100 text-emerald-800 text-xs font-extrabold px-3 py-1 rounded-full border border-emerald-200 uppercase tracking-widest">
              Cosmic Study Room
            </span>
            <h1 className="text-4xl font-extrabold text-[#4f81b8] tracking-tight mt-1">
              LEARNING ARENA
            </h1>
            <p className="text-slate-600 font-medium text-sm md:text-base mt-0.5">
              Acquire starry knowledge and earn golden Experience Points!
            </p>
          </div>

          {/* Core Classes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="courses-grid">
            
            {/* Planet Naming */}
            <div className="bg-white border-4 border-[#b0cef3] rounded-3xl p-6 flex flex-col justify-between shadow hover:shadow-md transition-all group relative overflow-hidden min-h-[220px]">
              <div className="absolute top-4 right-4 text-4xl group-hover:rotate-12 transition-transform">🪐</div>
              <div className="flex flex-col gap-2 max-w-[80%]">
                <span className="text-xs text-blue-600 font-extrabold uppercase tracking-widest flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5" /> Earth Science
                </span>
                <h3 className="text-2xl font-black text-slate-800">Planet Naming Adventure</h3>
                <p className="text-sm text-slate-500 font-bold leading-relaxed">
                  Identify gorgeous planet bodies, learn where they are in alignment, and master space names.
                </p>
              </div>
              <div className="flex items-center justify-between border-t border-dashed border-slate-100 pt-4 mt-4">
                <span className="text-emerald-600 text-xs font-black uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  +150 XP Reward
                </span>
                <button 
                  onClick={() => handleStartCourse('planet_naming')}
                  className="bg-[#4eb355] hover:bg-[#439c49] text-white font-extrabold px-5 py-2.5 rounded-xl border border-emerald-700 shadow-sm active:translate-y-0.5 transition-transform flex items-center gap-1"
                >
                  Start Quiz <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Space Trivia */}
            <div className="bg-white border-4 border-[#b0cef3] rounded-3xl p-6 flex flex-col justify-between shadow hover:shadow-md transition-all group relative overflow-hidden min-h-[220px]">
              <div className="absolute top-4 right-4 text-4xl group-hover:rotate-12 transition-transform">🚀</div>
              <div className="flex flex-col gap-2 max-w-[80%]">
                <span className="text-xs text-blue-600 font-extrabold uppercase tracking-widest flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5" /> Astrophyiscs
                </span>
                <h3 className="text-2xl font-black text-slate-800">Solar System Trivia</h3>
                <p className="text-sm text-slate-500 font-bold leading-relaxed">
                  Quick trivia testing your smarts on stellar systems, giant sun orbits, and moon phases.
                </p>
              </div>
              <div className="flex items-center justify-between border-t border-dashed border-slate-100 pt-4 mt-4">
                <span className="text-emerald-600 text-xs font-black uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  +100 XP Reward
                </span>
                <button 
                  onClick={() => handleStartCourse('space_trivia')}
                  className="bg-[#4eb355] hover:bg-[#439c49] text-white font-extrabold px-5 py-2.5 rounded-xl border border-emerald-700 shadow-sm active:translate-y-0.5 transition-transform flex items-center gap-1"
                >
                  Start Quiz <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      ) : (
        // Active Quiz Layout
        <div className="bg-[#f0f6fc] border-4 border-[#1e293b] rounded-3xl p-6 shadow-xl flex flex-col gap-6 relative" id="active-quiz-frame">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-300 pb-3">
            <div className="flex items-center gap-2">
              <button 
                onClick={handleBackToGrid}
                className="text-xs font-extrabold text-blue-700 bg-white hover:bg-blue-50 px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm transition-transform"
              >
                ← Exit Board
              </button>
              <h4 className="text-lg font-black text-slate-800">
                {activeCourse === 'planet_naming' ? 'Planet Naming Adventure' : 'Solar System Trivia'}
              </h4>
            </div>
            <span className="text-xs font-black text-slate-500">
              Q: {currentQuestionIndex + 1} / {getActiveQuiz().length}
            </span>
          </div>

          {!courseComplete ? (
            <div className="flex flex-col gap-6 py-2" id="quiz-question-card">
              
              {/* Question visual panel */}
              <div className="bg-white border-2 border-slate-300 rounded-3xl p-6 flex flex-col md:flex-row items-center gap-6 shadow-inner relative justify-center">
                <div className="text-6xl animate-bounce w-20 h-20 bg-slate-50 border-2 border-dashed border-slate-200 rounded-full flex items-center justify-center shadow-inner select-none">
                  {getActiveQuiz()[currentQuestionIndex].imageIcon}
                </div>
                <div className="flex flex-col gap-1 text-center md:text-left max-w-md">
                  <span className="text-xs font-bold text-slate-400 tracking-wide uppercase">
                    {getActiveQuiz()[currentQuestionIndex].imageRepresentationText}
                  </span>
                  <p className="font-extrabold text-[#111827] text-base md:text-lg leading-relaxed">
                    {getActiveQuiz()[currentQuestionIndex].question}
                  </p>
                </div>
              </div>

              {/* Multiple Choice bubble answers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {getActiveQuiz()[currentQuestionIndex].options.map((option, idx) => {
                  const isSelected = selectedOption === option;
                  const isCorrectAnswer = option === getActiveQuiz()[currentQuestionIndex].correctAnswer;
                  
                  let itemStyle = 'border-slate-200 hover:border-blue-400 bg-white active:scale-98';
                  if (isSelected) {
                    itemStyle = 'border-blue-600 bg-blue-50 text-blue-900 font-extrabold outline-dashed outline-1 outline-blue-600 ring-2 ring-blue-200';
                  }
                  if (isAnswered) {
                    if (isCorrectAnswer) {
                      itemStyle = 'border-emerald-600 bg-emerald-50 text-emerald-900 pointer-events-none ring-2 ring-emerald-200 font-black';
                    } else if (isSelected) {
                      itemStyle = 'border-dashed border-red-400 bg-red-50 text-red-900 pointer-events-none ring-2 ring-red-100';
                    } else {
                      itemStyle = 'border-slate-100 bg-slate-50 opacity-40 pointer-events-none';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleAnswerClick(option)}
                      disabled={isAnswered}
                      className={`text-left p-4 rounded-2xl border-3 text-sm font-semibold transition-all shadow-sm flex items-center justify-between cursor-pointer ${itemStyle}`}
                    >
                      <span>{option}</span>
                      {isAnswered && isCorrectAnswer && (
                        <span className="text-emerald-600 text-xs font-bold">✓ Correct!</span>
                      )}
                      {isAnswered && isSelected && !isCorrectAnswer && (
                        <span className="text-red-500 text-xs font-bold">✗ Wrong</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Action Board */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200 mt-2">
                <div>
                  {!isAnswered && selectedOption && (
                    <span className="text-xs text-slate-500 font-bold flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> Tap 'Check Answer' to test!
                    </span>
                  )}
                </div>
                
                {!isAnswered ? (
                  <button
                    disabled={!selectedOption}
                    onClick={handleCheckAnswer}
                    className={`font-black text-sm px-6 py-3 rounded-xl border transition-all ${
                      selectedOption
                        ? 'bg-blue-600 text-white border-blue-800 hover:bg-blue-500 cursor-pointer active:translate-y-0.5'
                        : 'bg-slate-200 text-slate-400 border-slate-300 cursor-not-allowed'
                    }`}
                  >
                    Check Answer
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="bg-[#4eb355] hover:bg-[#439c49] border border-emerald-700 text-white font-black text-sm px-6 py-3 rounded-xl active:translate-y-0.5 transition-transform flex items-center gap-1 cursor-pointer"
                  >
                    Next Question <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>

            </div>
          ) : (
            // Course Complete Screen
            <div className="flex flex-col items-center justify-center p-8 text-center gap-5" id="completion-screen">
              <div className="relative animate-bounce">
                {/* Big cute award star */}
                <svg className="w-24 h-24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M50 5L61.7 32.5L91.7 35.8L69 56L75.5 85.5L50 70.3L24.5 85.5L31 56L8.3 35.8L38.3 32.5L50 5Z" fill="#ffdf7c" stroke="#1e293b" strokeWidth="4"/>
                  {/* Blinking eyes */}
                  <ellipse cx="40" cy="46" rx="2" ry="4" fill="#000" />
                  <ellipse cx="60" cy="46" rx="2" ry="4" fill="#000" />
                  {/* Glowing halo arcs */}
                  <path d="M42 56C45 58.5 48 59 50 59C52 59 55 58.5 58 56" stroke="#000" strokeWidth="3" strokeLinecap="round" />
                </svg>
                <div className="absolute -top-3 -right-3">
                  <Sparkles className="w-8 h-8 text-amber-500 fill-amber-200" />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <h3 className="text-2xl font-black text-slate-800">Splendid Workspace Quest!</h3>
                <p className="text-slate-500 font-bold text-sm max-w-sm mt-1">
                  You scored <span className="text-emerald-600 font-extrabold">{score} out of {getActiveQuiz().length}</span>! You received {activeCourse === 'planet_naming' ? '150' : '100'} XP as a golden trophy reward!
                </p>
              </div>

              {/* Star review bar */}
              <div className="flex gap-2">
                {Array.from({ length: 3 }).map((_, idx) => {
                  const starsGained = score === getActiveQuiz().length ? 3 : score >= 2 ? 2 : 1;
                  return (
                    <svg 
                      key={idx}
                      className={`w-10 h-10 ${idx < starsGained ? 'text-yellow-400' : 'text-slate-200'}`}
                      viewBox="0 0 24 24"
                      fill={idx < starsGained ? 'currentColor' : 'none'}
                      stroke="#1e293b"
                      strokeWidth="2"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  );
                })}
              </div>

              <button
                onClick={handleBackToGrid}
                className="bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm px-8 py-3.5 rounded-2xl border border-blue-800 shadow-sm active:translate-y-0.5 transition-transform mt-2 cursor-pointer"
              >
                Back To Dashboard
              </button>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
