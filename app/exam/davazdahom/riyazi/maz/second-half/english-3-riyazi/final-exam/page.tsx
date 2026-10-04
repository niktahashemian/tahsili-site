"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

// ================= English 3 Questions - Comprehensive Final Exam =================
const QUESTIONS = [
  // ==================== Chapter 1: Vocabulary and Grammar ====================
  {
    id: 1,
    text: "Choose the correct form of the verb: 'She _____ to school every day.'",
    options: ["go", "goes", "going", "went"],
    correctIndex: 1,
    answer: "Option 2: 'goes' is correct because it is third person singular in present simple tense."
  },
  {
    id: 2,
    text: "What is the synonym of 'happy'?",
    options: ["Sad", "Angry", "Joyful", "Tired"],
    correctIndex: 2,
    answer: "Option 3: 'Joyful' is a synonym for 'happy'."
  },
  {
    id: 3,
    text: "Choose the correct conditional sentence: 'If I _____ rich, I would travel the world.'",
    options: ["am", "was", "were", "have been"],
    correctIndex: 2,
    answer: "Option 3: 'were' is used in second conditional for all subjects."
  },
  {
    id: 4,
    text: "What is the antonym of 'expensive'?",
    options: ["Costly", "Cheap", "Pricey", "Valuable"],
    correctIndex: 1,
    answer: "Option 2: 'Cheap' is the antonym of 'expensive'."
  },
  {
    id: 5,
    text: "Choose the correct tense: 'I _____ already finished my homework.'",
    options: ["have", "has", "am", "was"],
    correctIndex: 0,
    answer: "Option 1: 'have' is used with 'I' in present perfect tense."
  },

  // ==================== Chapter 2: Reading Comprehension ====================
  {
    id: 6,
    text: "What is the main idea of a paragraph?",
    options: ["The final sentence", "The central point", "The first word", "The title only"],
    correctIndex: 1,
    answer: "Option 2: The main idea is the central point or the most important idea of a paragraph."
  },
  {
    id: 7,
    text: "Reading between the lines to understand implied meaning is called:",
    options: ["Skimming", "Scanning", "Inference", "Summarizing"],
    correctIndex: 2,
    answer: "Option 3: Inference is reading between the lines to understand implied meaning."
  },
  {
    id: 8,
    text: "When you quickly read a text to get the general idea, you are:",
    options: ["Skimming", "Scanning", "Intensive reading", "Detailed reading"],
    correctIndex: 0,
    answer: "Option 1: Skimming means reading quickly to get the general idea of a text."
  },
  {
    id: 9,
    text: "What does 'paraphrasing' mean?",
    options: ["Copying directly", "Restating in your own words", "Summarizing only", "Deleting information"],
    correctIndex: 1,
    answer: "Option 2: Paraphrasing means restating someone else's ideas in your own words."
  },
  {
    id: 10,
    text: "Which word is a synonym for 'begin'?",
    options: ["End", "Finish", "Start", "Stop"],
    correctIndex: 2,
    answer: "Option 3: 'Start' is a synonym for 'begin'."
  },

  // ==================== Chapter 3: Writing and Composition ====================
  {
    id: 11,
    text: "What is a topic sentence?",
    options: ["The first sentence of a paragraph", "The main idea of a paragraph", "A supporting detail", "The conclusion"],
    correctIndex: 1,
    answer: "Option 2: A topic sentence states the main idea of a paragraph."
  },
  {
    id: 12,
    text: "A good paragraph should have:",
    options: ["Only one sentence", "Topic sentence, supporting details, concluding sentence", "Only supporting details", "Only a conclusion"],
    correctIndex: 1,
    answer: "Option 2: A well-written paragraph has a topic sentence, supporting details, and a concluding sentence."
  },
  {
    id: 13,
    text: "What is the purpose of a conclusion in an essay?",
    options: ["To introduce new ideas", "To summarize the main points", "To confuse the reader", "To start a new topic"],
    correctIndex: 1,
    answer: "Option 2: The conclusion summarizes the main points and restates the thesis in an essay."
  },
  {
    id: 14,
    text: "Which punctuation mark is used at the end of a question?",
    options: ["Period (.)", "Comma (,)", "Question mark (?)", "Exclamation point (!)"],
    correctIndex: 2,
    answer: "Option 3: A question mark (?) is used at the end of a question."
  },
  {
    id: 15,
    text: "Formal writing is usually characterized by:",
    options: ["Slang and contractions", "Complex sentences and sophisticated vocabulary", "Texting abbreviations", "Informal tone"],
    correctIndex: 1,
    answer: "Option 2: Formal writing uses complex sentences, sophisticated vocabulary, and avoids slang."

  // ==================== Chapter 4: Listening and Speaking ====================
  },
  {
    id: 16,
    text: "What is the purpose of note-taking while listening?",
    options: ["To write everything down", "To record important information", "To distract yourself", "To skip details"],
    correctIndex: 1,
    answer: "Option 2: The purpose of note-taking is to record important information for later review."
  },
  {
    id: 17,
    text: "Which syllable is usually stressed in English words?",
    options: ["Always the first syllable", "Always the last syllable", "It varies", "None of the above"],
    correctIndex: 2,
    answer: "Option 3: Syllable stress varies in English words and depends on the word."
  },
  {
    id: 18,
    text: "What does intonation indicate in spoken English?",
    options: ["Grammar mistakes", "Meaning, emotion, and attitude", "The spelling of words", "None of the above"],
    correctIndex: 1,
    answer: "Option 2: Intonation shows meaning, emotion, and attitude of the speaker."
  },
  {
    id: 19,
    text: "Which phrase is used to politely express disagreement?",
    options: ["You're wrong", "I don't agree with you", "That's not true", "You're mistaken"],
    correctIndex: 1,
    answer: "Option 2: 'I don't agree with you' is a polite way to express disagreement."
  },
  {
    id: 20,
    text: "What is the focus of active listening?",
    options: ["Only hearing words", "Understanding and responding", "Ignoring the speaker", "Thinking about something else"],
    correctIndex: 1,
    answer: "Option 2: Active listening involves understanding the message and providing appropriate responses."

  // ==================== Combined Questions ====================
  },
  {
    id: 21,
    text: "Choose the correct sentence: 'I have been studying English _____ three years.'",
    options: ["for", "since", "during", "while"],
    correctIndex: 0,
    answer: "Option 1: 'for' is used with a period of time."
  },
  {
    id: 22,
    text: "What is the synonym of 'famous'?",
    options: ["Unknown", "Celebrated", "Ordinary", "Common"],
    correctIndex: 1,
    answer: "Option 2: 'Celebrated' is a synonym for 'famous'."
  },
  {
    id: 23,
    text: "Which type of conditional is used for impossible situations?",
    options: ["Zero Conditional", "First Conditional", "Second Conditional", "Third Conditional"],
    correctIndex: 3,
    answer: "Option 4: Third Conditional is used for impossible situations in the past."
  },
  {
    id: 24,
    text: "In reading comprehension, scanning is:",
    options: ["Reading for general understanding", "Looking for specific information", "Reading every word carefully", "Reading between the lines"],
    correctIndex: 1,
    answer: "Option 2: Scanning means looking for specific information in a text."
  },
  {
    id: 25,
    text: "A well-written thesis statement should be:",
    options: ["Vague and general", "Clear and specific", "Very long", "Only in the conclusion"],
    correctIndex: 1,
    answer: "Option 2: A good thesis statement should be clear and specific."
  },
  {
    id: 26,
    text: "Which word has a different stress pattern?",
    options: ["PHOto", "COMputer", "INterest", "HEAdache"],
    correctIndex: 1,
    answer: "Option 2: 'COMputer' has stress on the second syllable, while the others have stress on the first."
  },
  {
    id: 27,
    text: "Choose the correct word: 'The teacher gave us some _____ advice.'",
    options: ["useful", "usefully", "usefulness", "use"],
    correctIndex: 0,
    answer: "Option 1: 'useful' is an adjective modifying the noun 'advice'."
  },
  {
    id: 28,
    text: "What is the antonym of 'polite'?",
    options: ["Kind", "Rude", "Gentle", "Friendly"],
    correctIndex: 1,
    answer: "Option 2: 'Rude' is the antonym of 'polite'."
  },
  {
    id: 29,
    text: "In a paragraph, supporting details are used to:",
    options: ["Confuse the reader", "Develop and support the main idea", "Introduce a new topic", "End the paragraph"],
    correctIndex: 1,
    answer: "Option 2: Supporting details develop and support the main idea of the paragraph."
  },
  {
    id: 30,
    text: "Which phrase shows you are paying attention in a conversation?",
    options: ["I see", "I don't care", "Not interested", "Never mind"],
    correctIndex: 0,
    answer: "Option 1: 'I see' shows you are listening and understanding the speaker."
  },
];

const EnglishRiyaziFinalExam = () => {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  // ==================== State ====================
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showAnswers, setShowAnswers] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [isScoreCalculated, setIsScoreCalculated] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60 * 60);
  const [isTimeUp, setIsTimeUp] = useState(false);

  // ========== تابع محاسبه درصد ==========
  const calculateScore = useCallback(() => {
    if (isCalculatedRef.current) return;
    isCalculatedRef.current = true;

    let correctCount = 0;
    QUESTIONS.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });
    const percentage = (correctCount / QUESTIONS.length) * 100;
    setScore(percentage);
    setIsScoreCalculated(true);
  }, [selectedAnswers]);

  // ========== تابع انتخاب گزینه ==========
  const handleOptionClick = (questionId: number, optionIndex: number) => {
    if (isTimeUp || isScoreCalculated) return;

    setSelectedAnswers(prev => {
      const newAnswers = { ...prev, [questionId]: optionIndex };
      return newAnswers;
    });

    if (isScoreCalculated) {
      setIsScoreCalculated(false);
      setScore(null);
      isCalculatedRef.current = false;
    }
  };

  // ========== تایمر ==========
  useEffect(() => {
    if (isTimeUp || isScoreCalculated) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsTimeUp(true);
          isTimeUpRef.current = true;
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isTimeUp, isScoreCalculated]);

  // ========== زمان تمام شد ==========
  useEffect(() => {
    if (isTimeUp && !isScoreCalculated && !isTimeUpRef.current) {
      isTimeUpRef.current = true;
      const timeoutId = setTimeout(() => {
        calculateScore();
      }, 300);
      return () => clearTimeout(timeoutId);
    }
  }, [isTimeUp, isScoreCalculated, calculateScore]);

  // ========== بررسی پاسخ‌دهی ==========
  const isAllAnswered = QUESTIONS.every(q => selectedAnswers[q.id] !== undefined);
  const canCalculate = isAllAnswered && !isScoreCalculated && !isTimeUp;
  const answeredCount = Object.keys(selectedAnswers).length;

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#28a745';
    if (score >= 50) return '#ffc107';
    return '#dc3545';
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{
      fontFamily: 'Tahoma, Arial, sans-serif',
      width: '100vw',
      minHeight: '100vh',
      padding: '15px 10px',
      backgroundColor: '#f8f9fa',
      direction: 'rtl',
      textAlign: 'right',
      boxSizing: 'border-box',
      overflowX: 'hidden'
    }}>
      {/* هدر */}
      <div style={{
        backgroundColor: '#1565C0',
        color: 'white',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '30px',
        textAlign: 'center',
        position: 'relative'
      }}>
        <button
          onClick={() => router.push('/exam/davazdahom/riyazi/maz/second-half/english-3-riyazi')}
          style={{
            position: 'absolute',
            left: '20px',
            top: '20px',
            padding: '8px 16px',
            backgroundColor: 'rgba(255,255,255,0.2)',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          ← بازگشت به لیست دروس
        </button>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '28px' }}>📚 Final Exam - English 3</h1>
            <p style={{ marginTop: '10px', fontSize: '16px', opacity: 0.9 }}>
              {QUESTIONS.length} Questions - Answered: {answeredCount}/{QUESTIONS.length}
            </p>
          </div>

          <div style={{
            backgroundColor: isTimeUp ? '#dc3545' : 'rgba(255,255,255,0.15)',
            padding: '10px 25px',
            borderRadius: '50px',
            fontSize: '24px',
            fontWeight: 'bold',
            fontFamily: 'monospace',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <span>⏱️</span>
            <span>{isTimeUp ? '⏰ Time is up!' : formatTime(timeLeft)}</span>
          </div>
        </div>
      </div>

      {/* سوالات */}
      <div style={{ width: '100%' }}>
        {QUESTIONS.map((q, index) => (
          <div key={q.id} style={{
            marginBottom: '25px',
            backgroundColor: '#ffffff',
            padding: '20px 25px',
            borderRadius: '8px',
            border: '1px solid #e9ecef',
            boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
          }}>
            <div style={{
              fontSize: '17px',
              lineHeight: '1.9',
              marginBottom: '20px',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'flex-start'
            }}>
              <span style={{
                display: 'inline-block',
                backgroundColor: '#1565C0',
                color: 'white',
                width: '30px',
                height: '30px',
                textAlign: 'center',
                lineHeight: '30px',
                borderRadius: '50%',
                fontSize: '14px',
                marginLeft: '15px',
                flexShrink: 0
              }}>
                {index + 1}
              </span>
              <span>{q.text}</span>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px 30px',
              marginRight: '20px'
            }}>
              {q.options.map((opt, idx) => {
                const isSelected = selectedAnswers[q.id] === idx;
                const isDisabled = isTimeUp || isScoreCalculated;

                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionClick(q.id, idx)}
                    disabled={isDisabled}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '12px 18px',
                      border: isSelected ? '3px solid #1565C0' : '1px solid #dee2e6',
                      borderRadius: '10px',
                      backgroundColor: isSelected ? '#e3f2fd' : '#fff',
                      cursor: isDisabled ? 'not-allowed' : 'pointer',
                      fontSize: '15px',
                      textAlign: 'right',
                      transition: 'all 0.2s',
                      width: '100%',
                      opacity: isDisabled && !isSelected ? 0.6 : 1
                    }}
                  >
                    <span style={{
                      display: 'inline-block',
                      width: '28px',
                      height: '28px',
                      border: '1px solid #000',
                      borderRadius: '50%',
                      textAlign: 'center',
                      lineHeight: '28px',
                      fontSize: '14px',
                      marginLeft: '15px',
                      backgroundColor: isSelected ? '#1565C0' : '#fff',
                      color: isSelected ? '#fff' : '#000'
                    }}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* دکمه محاسبه */}
        <div style={{
          marginTop: '30px',
          marginBottom: '30px',
          padding: '20px',
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #dee2e6',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          textAlign: 'center'
        }}>
          {!isScoreCalculated ? (
            <div>
              <button
                onClick={() => {
                  if (canCalculate) {
                    calculateScore();
                  }
                }}
                disabled={!canCalculate}
                style={{
                  padding: '15px 40px',
                  fontSize: '18px',
                  backgroundColor: canCalculate ? '#1565C0' : '#6c757d',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '50px',
                  cursor: canCalculate ? 'pointer' : 'not-allowed',
                  fontWeight: 'bold',
                  opacity: canCalculate ? 1 : 0.6
                }}
              >
                {!isAllAnswered && !isTimeUp ? `✅ ${answeredCount}/${QUESTIONS.length} answered - Continue` : '📊 Calculate Score'}
              </button>
              {!isAllAnswered && !isTimeUp && (
                <p style={{ marginTop: '10px', color: '#666', fontSize: '14px' }}>
                  {QUESTIONS.length - answeredCount} questions remaining
                </p>
              )}
            </div>
          ) : (
            <div>
              <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#1565C0' }}>
                ✅ Your Score: <span style={{ color: getScoreColor(score!), fontSize: '28px' }}>{Math.round(score!)}%</span>
                {isTimeUp && <span style={{ fontSize: '14px', color: '#dc3545', marginRight: '15px' }}>(Time is up!)</span>}
              </div>
              <div style={{
                width: '80%',
                maxWidth: '400px',
                height: '20px',
                backgroundColor: '#e9ecef',
                borderRadius: '10px',
                overflow: 'hidden',
                margin: '15px auto'
              }}>
                <div style={{
                  width: `${score}%`,
                  height: '100%',
                  backgroundColor: getScoreColor(score!),
                  transition: 'width 0.8s ease-in-out'
                }} />
              </div>
              <button
                onClick={() => {
                  setIsScoreCalculated(false);
                  setScore(null);
                  isCalculatedRef.current = false;
                  isTimeUpRef.current = false;
                }}
                style={{
                  padding: '10px 25px',
                  fontSize: '14px',
                  backgroundColor: '#ff9800',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '50px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  marginTop: '10px'
                }}
              >
                🔄 Change Answers
              </button>
            </div>
          )}
        </div>

        {/* دکمه پاسخنامه */}
        <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '60px' }}>
          <button
            onClick={() => setShowAnswers(!showAnswers)}
            style={{
              padding: '15px 40px',
              fontSize: '18px',
              backgroundColor: showAnswers ? '#dc3545' : '#28a745',
              color: '#fff',
              border: 'none',
              borderRadius: '50px',
              cursor: 'pointer',
              fontWeight: 'bold',
              boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
              transition: 'all 0.2s'
            }}
          >
            {showAnswers ? "❌ Close Answer Key" : "📄 View Answer Key"}
          </button>
        </div>

        {/* پاسخنامه */}
        {showAnswers && isScoreCalculated && (
          <div style={{
            marginTop: '30px',
            borderTop: '4px solid #1565C0',
            paddingTop: '40px',
            backgroundColor: '#ffffff',
            padding: '40px',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
            width: '100%'
          }}>
            <h2 style={{
              textAlign: 'center',
              borderBottom: '3px solid #1565C0',
              paddingBottom: '20px',
              marginBottom: '40px',
              fontSize: '26px',
              color: '#1565C0'
            }}>
              📝 Answer Key - English 3
            </h2>
            {QUESTIONS.map((q, index) => {
              const userAnswer = selectedAnswers[q.id];
              const isCorrect = userAnswer === q.correctIndex;
              return (
                <div key={q.id} style={{
                  marginBottom: '35px',
                  borderBottom: '1px dashed #ced4da',
                  paddingBottom: '25px'
                }}>
                  <div style={{ fontSize: '16px', lineHeight: '2' }}>
                    <span style={{
                      fontWeight: 'bold',
                      color: '#1565C0',
                      backgroundColor: '#e3f2fd',
                      padding: '5px 15px',
                      borderRadius: '20px',
                      display: 'inline-block',
                      marginBottom: '10px'
                    }}>
                      Question {index + 1}
                    </span>
                    <br />
                    <span style={{ fontWeight: 'bold', color: '#28a745' }}>✅ Correct Answer:</span>
                    <span style={{ fontSize: '15px' }}>{q.options[q.correctIndex]}</span>
                    <br />
                    {userAnswer !== undefined && (
                      <span>
                        <span style={{ fontWeight: 'bold', color: isCorrect ? '#28a745' : '#dc3545' }}>
                          {isCorrect ? '✔️ Correct' : '❌ Incorrect'}
                        </span>
                        <span style={{ fontSize: '14px', color: '#666', marginRight: '10px' }}>
                          (Your choice: {String.fromCharCode(65 + userAnswer)})
                        </span>
                        <br />
                      </span>
                    )}
                    <span style={{ fontWeight: 'bold', color: '#1565C0' }}>📖 Explanation:</span>
                    <br />
                    <span style={{ fontSize: '15px', lineHeight: '1.8', color: '#333' }}>{q.answer}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {showAnswers && !isScoreCalculated && (
          <div style={{
            textAlign: 'center',
            padding: '30px',
            backgroundColor: '#fff3cd',
            borderRadius: '12px',
            border: '1px solid #ffc107'
          }}>
            <p style={{ fontSize: '18px', color: '#856404' }}>
              ⚠️ Please click <strong>&quot;Calculate Score&quot;</strong> first to view the answer key.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnglishRiyaziFinalExam;