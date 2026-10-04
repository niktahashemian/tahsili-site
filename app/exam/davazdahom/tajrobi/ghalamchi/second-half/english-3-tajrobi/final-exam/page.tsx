"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const English3FinalExam = () => {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  // ================= سوالات درس انگلیسی ۳ =================
  const questions = [
    // ==================== سوالات ۱ تا ۵ (Vocabulary) ====================
    {
      id: 1,
      text: "What is the meaning of 'abandon'?",
      options: ["to leave", "to stay", "to help", "to find"],
      correctIndex: 0,
      answer: "'Abandon' means to leave something or someone permanently."
    },
    {
      id: 2,
      text: "What is the synonym of 'brave'?",
      options: ["cowardly", "fearless", "afraid", "weak"],
      correctIndex: 1,
      answer: "'Brave' means fearless and courageous."
    },
    {
      id: 3,
      text: "What is the opposite of 'difficult'?",
      options: ["hard", "easy", "complex", "tough"],
      correctIndex: 1,
      answer: "The opposite of 'difficult' is 'easy'."
    },
    {
      id: 4,
      text: "What does 'generous' mean?",
      options: ["selfish", "mean", "giving freely", "greedy"],
      correctIndex: 2,
      answer: "'Generous' means giving freely and unselfishly."
    },
    {
      id: 5,
      text: "What is the meaning of 'ancient'?",
      options: ["new", "old", "modern", "recent"],
      correctIndex: 1,
      answer: "'Ancient' means very old or from a long time ago."
    },
    // ==================== سوالات ۶ تا ۱۰ (Grammar) ====================
    {
      id: 6,
      text: "Which sentence is correct?",
      options: [
        "He go to school every day.",
        "He goes to school every day.",
        "He going to school every day.",
        "He gone to school every day."
      ],
      correctIndex: 1,
      answer: "In present simple tense, we add 's' or 'es' for third person singular (he/she/it)."
    },
    {
      id: 7,
      text: "What is the past tense of 'write'?",
      options: ["writed", "wrote", "written", "writing"],
      correctIndex: 1,
      answer: "The past tense of 'write' is 'wrote'."
    },
    {
      id: 8,
      text: "Which word is a preposition?",
      options: ["beautiful", "quickly", "under", "running"],
      correctIndex: 2,
      answer: "'Under' is a preposition showing position."
    },
    {
      id: 9,
      text: "What is the correct plural of 'child'?",
      options: ["childs", "children", "childes", "childrens"],
      correctIndex: 1,
      answer: "The correct plural of 'child' is 'children'."
    },
    {
      id: 10,
      text: "Which sentence is in the future tense?",
      options: [
        "I am eating.",
        "I ate.",
        "I will eat.",
        "I eat."
      ],
      correctIndex: 2,
      answer: "'I will eat' is in the future tense."
    },
    // ==================== سوالات ۱۱ تا ۱۵ (Reading Comprehension) ====================
    {
      id: 11,
      text: "What is the main idea of the text?",
      options: [
        "Environmental protection",
        "Economic growth",
        "Technological advancement",
        "Social development"
      ],
      correctIndex: 0,
      answer: "The text emphasizes the importance of environmental protection."
    },
    {
      id: 12,
      text: "What does the writer suggest?",
      options: [
        "We should ignore environmental issues.",
        "We should protect our environment.",
        "We should focus only on economy.",
        "We should use more plastic."
      ],
      correctIndex: 1,
      answer: "The writer suggests that we should protect our environment."
    },
    {
      id: 13,
      text: "Which of the following is mentioned in the text?",
      options: [
        "Air pollution",
        "Water pollution",
        "Global warming",
        "All of the above"
      ],
      correctIndex: 3,
      answer: "All of the above are mentioned in the text."
    },
    {
      id: 14,
      text: "What is the writer's opinion?",
      options: [
        "Optimistic",
        "Pessimistic",
        "Neutral",
        "Indifferent"
      ],
      correctIndex: 0,
      answer: "The writer has an optimistic view about the future."
    },
    {
      id: 15,
      text: "What is the purpose of the text?",
      options: [
        "To inform",
        "To persuade",
        "To entertain",
        "To describe"
      ],
      correctIndex: 1,
      answer: "The purpose of the text is to persuade readers to protect the environment."
    },
    // ==================== سوالات ۱۶ تا ۲۰ (Vocabulary) ====================
    {
      id: 16,
      text: "What does 'desperate' mean?",
      options: ["hopeful", "hopeless", "happy", "calm"],
      correctIndex: 1,
      answer: "'Desperate' means feeling hopeless and needing help badly."
    },
    {
      id: 17,
      text: "What is the synonym of 'quick'?",
      options: ["slow", "fast", "lazy", "quiet"],
      correctIndex: 1,
      answer: "'Quick' means fast."
    },
    {
      id: 18,
      text: "What is the opposite of 'sad'?",
      options: ["angry", "happy", "tired", "bored"],
      correctIndex: 1,
      answer: "The opposite of 'sad' is 'happy'."
    },
    {
      id: 19,
      text: "What does 'courage' mean?",
      options: ["fear", "bravery", "cowardice", "weakness"],
      correctIndex: 1,
      answer: "'Courage' means bravery and fearlessness."
    },
    {
      id: 20,
      text: "What is the meaning of 'mysterious'?",
      options: ["clear", "obvious", "strange", "known"],
      correctIndex: 2,
      answer: "'Mysterious' means strange and not easily understood."
    },
    // ==================== سوالات ۲۱ تا ۲۵ (Grammar) ====================
    {
      id: 21,
      text: "Which sentence is grammatically correct?",
      options: [
        "I have never been to London.",
        "I never have been to London.",
        "I have been never to London.",
        "I been have never to London."
      ],
      correctIndex: 0,
      answer: "The correct word order is 'have never been'."
    },
    {
      id: 22,
      text: "What is the present perfect of 'eat'?",
      options: ["ate", "eaten", "eating", "eats"],
      correctIndex: 1,
      answer: "The present perfect of 'eat' is 'eaten'."
    },
    {
      id: 23,
      text: "Which word is an adverb?",
      options: ["beautiful", "quickly", "music", "school"],
      correctIndex: 1,
      answer: "'Quickly' is an adverb describing how something is done."
    },
    {
      id: 24,
      text: "What is the correct comparative of 'good'?",
      options: ["gooder", "better", "best", "more good"],
      correctIndex: 1,
      answer: "The comparative of 'good' is 'better'."
    },
    {
      id: 25,
      text: "Which sentence is passive?",
      options: [
        "The cat ate the fish.",
        "The fish was eaten by the cat.",
        "The cat eats the fish.",
        "The cat is eating the fish."
      ],
      correctIndex: 1,
      answer: "In passive voice, the subject receives the action."
    },
    // ==================== سوالات ۲۶ تا ۳۰ (Cloze Test) ====================
    {
      id: 26,
      text: "Choose the best option to complete the sentence: 'I _____ to school every day.'",
      options: ["go", "goes", "going", "gone"],
      correctIndex: 0,
      answer: "With 'I' we use the base form 'go' in present simple."
    },
    {
      id: 27,
      text: "Complete: 'She _____ a new car yesterday.'",
      options: ["buy", "buys", "bought", "buying"],
      correctIndex: 2,
      answer: "Past simple of 'buy' is 'bought'."
    },
    {
      id: 28,
      text: "Complete: 'I have _____ been to Paris.'",
      options: ["never", "ever", "yet", "already"],
      correctIndex: 0,
      answer: "'Never' is used for negative experiences."
    },
    {
      id: 29,
      text: "Complete: 'They _____ watching TV now.'",
      options: ["am", "is", "are", "be"],
      correctIndex: 2,
      answer: "With 'They' we use 'are' for present continuous."
    },
    {
      id: 30,
      text: "Complete: 'I will _____ you tomorrow.'",
      options: ["call", "calls", "called", "calling"],
      correctIndex: 0,
      answer: "After 'will' we use the base form of the verb."
    },
    // ==================== سوالات ۳۱ تا ۳۵ (Reading) ====================
    {
      id: 31,
      text: "What is the best title for the text?",
      options: [
        "The Importance of Education",
        "The Importance of Money",
        "The Importance of Work",
        "The Importance of Art"
      ],
      correctIndex: 0,
      answer: "The text focuses on the importance of education."
    },
    {
      id: 32,
      text: "What is the main argument of the text?",
      options: [
        "Education is unnecessary.",
        "Education is the key to success.",
        "Education is too expensive.",
        "Education is not important."
      ],
      correctIndex: 1,
      answer: "The text argues that education is the key to success."
    },
    {
      id: 33,
      text: "What evidence does the writer provide?",
      options: [
        "Personal experience",
        "Statistical data",
        "Expert opinions",
        "Historical events"
      ],
      correctIndex: 2,
      answer: "The writer provides expert opinions as evidence."
    },
    {
      id: 34,
      text: "What is the writer's tone?",
      options: [
        "Sarcastic",
        "Serious",
        "Humorous",
        "Angry"
      ],
      correctIndex: 1,
      answer: "The writer uses a serious tone throughout the text."
    },
    {
      id: 35,
      text: "What is the conclusion of the text?",
      options: [
        "Education is a waste of time.",
        "Education is essential for everyone.",
        "Only rich people need education.",
        "Education is not necessary."
      ],
      correctIndex: 1,
      answer: "The text concludes that education is essential for everyone."
    },
    // ==================== سوالات ۳۶ تا ۴۰ (Vocabulary & Grammar) ====================
    {
      id: 36,
      text: "What does 'accomplish' mean?",
      options: ["to fail", "to achieve", "to start", "to stop"],
      correctIndex: 1,
      answer: "'Accomplish' means to achieve or complete successfully."
    },
    {
      id: 37,
      text: "What is the synonym of 'famous'?",
      options: ["unknown", "well-known", "ordinary", "common"],
      correctIndex: 1,
      answer: "'Famous' means well-known."
    },
    {
      id: 38,
      text: "What is the opposite of 'patient'?",
      options: ["tolerant", "impatient", "calm", "forgiving"],
      correctIndex: 1,
      answer: "The opposite of 'patient' is 'impatient'."
    },
    {
      id: 39,
      text: "What does 'responsibility' mean?",
      options: ["duty", "freedom", "laziness", "carelessness"],
      correctIndex: 0,
      answer: "'Responsibility' means a duty or obligation."
    },
    {
      id: 40,
      text: "Which sentence is correct?",
      options: [
        "She don't like apples.",
        "She doesn't like apples.",
        "She doesn't likes apples.",
        "She don't likes apples."
      ],
      correctIndex: 1,
      answer: "For third person singular, we use 'doesn't' + base form."
    },
  ];

  // ==================== State ====================
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: number}>({});
  const [showAnswers, setShowAnswers] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [timeLeft, setTimeLeft] = useState(90 * 60);
  const [isTimeUp, setIsTimeUp] = useState(false);

  // ========== تابع محاسبه درصد ==========
  const calculateScore = useCallback(() => {
    if (isCalculatedRef.current) return;
    isCalculatedRef.current = true;

    let correctCount = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });
    const percentage = (correctCount / questions.length) * 100;
    setScore(percentage);
    setHasCalculated(true);
  }, [selectedAnswers, questions]);

  // ========== تابع انتخاب گزینه ==========
  const handleOptionClick = (questionId: number, optionIndex: number) => {
    if (isTimeUp || hasCalculated) return;

    setSelectedAnswers(prev => {
      const newAnswers = { ...prev, [questionId]: optionIndex };
      return newAnswers;
    });

    if (hasCalculated) {
      setHasCalculated(false);
      setScore(null);
      isCalculatedRef.current = false;
    }
  };

  // ========== تایمر ==========
  useEffect(() => {
    if (isTimeUp || hasCalculated) {
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
  }, [isTimeUp, hasCalculated]);

  // ========== زمان تمام شد ==========
  // ✅ اصلاح شده با استفاده از setTimeout و useRef
  useEffect(() => {
    if (isTimeUp && !hasCalculated && !isTimeUpRef.current) {
      isTimeUpRef.current = true;
      const timeoutId = setTimeout(() => {
        if (!isCalculatedRef.current) {
          calculateScore();
          isCalculatedRef.current = true;
        }
      }, 300);
      return () => clearTimeout(timeoutId);
    }
  }, [isTimeUp, hasCalculated, calculateScore]);

  // ========== بررسی پاسخ‌دهی ==========
  const isAllAnswered = questions.every(q => selectedAnswers[q.id] !== undefined);
  const canCalculate = isAllAnswered && !hasCalculated && !isTimeUp;
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
        backgroundColor: '#d32f2f',
        color: 'white',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '30px',
        textAlign: 'center',
        position: 'relative'
      }}>
        <button 
          onClick={() => router.push('/exam/davazdahom/tajrobi/ghalamchi/second-half/english-3-tajrobi')}
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
          ← بازگشت
        </button>
        
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '28px' }}>📚 آزمون جامع انگلیسی (۳)</h1>
            <p style={{ marginTop: '10px', fontSize: '16px', opacity: 0.9 }}>
              {questions.length} سوال - پاسخ داده شده: {answeredCount}/{questions.length}
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
            <span>{isTimeUp ? '⏰ تمام شد!' : formatTime(timeLeft)}</span>
          </div>
        </div>
      </div>

      {/* سوالات */}
      <div style={{ width: '100%' }}>
        {questions.map((q, index) => (
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
                backgroundColor: '#d32f2f',
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
                const isDisabled = isTimeUp || hasCalculated;
                
                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionClick(q.id, idx)}
                    disabled={isDisabled}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '12px 18px',
                      border: isSelected ? '3px solid #d32f2f' : '1px solid #dee2e6',
                      borderRadius: '10px',
                      backgroundColor: isSelected ? '#fce4ec' : '#fff',
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
                      backgroundColor: isSelected ? '#d32f2f' : '#fff',
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
          
          {!hasCalculated ? (
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
                  backgroundColor: canCalculate ? '#d32f2f' : '#6c757d',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '50px',
                  cursor: canCalculate ? 'pointer' : 'not-allowed',
                  fontWeight: 'bold',
                  opacity: canCalculate ? 1 : 0.6
                }}
              >
                {!isAllAnswered && !isTimeUp ? `✅ ${answeredCount}/${questions.length} پاسخ داده شده - ادامه دهید` : '📊 محاسبه درصد'}
              </button>
              {!isAllAnswered && !isTimeUp && (
                <p style={{ marginTop: '10px', color: '#666', fontSize: '14px' }}>
                  {questions.length - answeredCount} سوال دیگر باقی مانده است
                </p>
              )}
            </div>
          ) : (
            <div>
              <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#d32f2f' }}>
                ✅ درصد شما: <span style={{ color: getScoreColor(score!), fontSize: '28px' }}>{Math.round(score!)}%</span>
                {isTimeUp && <span style={{ fontSize: '14px', color: '#dc3545', marginRight: '15px' }}>(زمان پایان یافت)</span>}
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
                  setHasCalculated(false);
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
                🔄 تغییر پاسخ‌ها
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
              backgroundColor: showAnswers ? '#dc3545' : '#d32f2f',
              color: '#fff',
              border: 'none',
              borderRadius: '50px',
              cursor: 'pointer',
              fontWeight: 'bold',
              boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
              transition: 'all 0.2s'
            }}
          >
            {showAnswers ? "❌ بستن پاسخنامه" : "📄 مشاهده پاسخنامه تشریحی"}
          </button>
        </div>

        {/* پاسخنامه */}
        {showAnswers && hasCalculated && (
          <div style={{
            marginTop: '30px',
            borderTop: '4px solid #d32f2f',
            paddingTop: '40px',
            backgroundColor: '#ffffff',
            padding: '40px',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
            width: '100%'
          }}>
            <h2 style={{ 
              textAlign: 'center', 
              borderBottom: '3px solid #d32f2f', 
              paddingBottom: '20px', 
              marginBottom: '40px',
              fontSize: '26px',
              color: '#d32f2f'
            }}>
              📝 پاسخنامه تشریحی انگلیسی (۳)
            </h2>
            
            {questions.map((q, index) => {
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
                      color: '#d32f2f',
                      backgroundColor: '#fce4ec',
                      padding: '5px 15px',
                      borderRadius: '20px',
                      display: 'inline-block',
                      marginBottom: '10px'
                    }}>
                      سوال {index + 1}
                    </span>
                    <br />
                    <span style={{ fontWeight: 'bold', color: '#28a745' }}>✅ پاسخ صحیح:</span> 
                    <span style={{ fontSize: '15px' }}>{q.options[q.correctIndex]}</span>
                    <br />
                    {userAnswer !== undefined && (
                      <span>
                        <span style={{ fontWeight: 'bold', color: isCorrect ? '#28a745' : '#dc3545' }}>
                          {isCorrect ? '✔️ صحیح' : '❌ نادرست'}
                        </span>
                        <span style={{ fontSize: '14px', color: '#666', marginRight: '10px' }}>
                          (انتخاب شما: {String.fromCharCode(65 + userAnswer)})
                        </span>
                        <br />
                      </span>
                    )}
                    <span style={{ fontWeight: 'bold', color: '#d32f2f' }}>📖 توضیح:</span> 
                    <br />
                    <span style={{ fontSize: '15px', lineHeight: '1.8', color: '#333' }}>{q.answer}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {showAnswers && !hasCalculated && (
          <div style={{
            textAlign: 'center',
            padding: '30px',
            backgroundColor: '#fff3cd',
            borderRadius: '12px',
            border: '1px solid #ffc107'
          }}>
            <p style={{ fontSize: '18px', color: '#856404' }}>
              ⚠️ لطفاً ابتدا روی دکمه <strong>&quot;محاسبه درصد&quot;</strong> کلیک کنید تا پاسخنامه نمایش داده شود.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default English3FinalExam;