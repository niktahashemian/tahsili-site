"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const English2FinalExam = () => {
  const router = useRouter();

  // ================= Comprehensive English (2) Exam Questions =================
  const questions = [
    // ==================== Vocabulary - Personality Traits (8 questions) ====================
    {
      id: 1,
      text: "What is the opposite of 'generous'?",
      options: ["Kind", "Stingy", "Friendly", "Polite"],
      correctIndex: 1,
      answer: "The opposite of 'generous' is 'stingy'."
    },
    {
      id: 2,
      text: "Which word describes someone who is always happy?",
      options: ["Sad", "Cheerful", "Angry", "Tired"],
      correctIndex: 1,
      answer: "'Cheerful' describes someone who is always happy."
    },
    {
      id: 3,
      text: "What does 'reliable' mean?",
      options: ["Trustworthy", "Lazy", "Selfish", "Rude"],
      correctIndex: 0,
      answer: "'Reliable' means trustworthy and dependable."
    },
    {
      id: 4,
      text: "Which word is a synonym for 'intelligent'?",
      options: ["Stupid", "Smart", "Lazy", "Rude"],
      correctIndex: 1,
      answer: "'Smart' is a synonym for 'intelligent'."
    },
    {
      id: 5,
      text: "What is the meaning of 'outgoing'?",
      options: ["Shy", "Social and friendly", "Lazy", "Rude"],
      correctIndex: 1,
      answer: "'Outgoing' means social and friendly."
    },
    {
      id: 6,
      text: "Which word describes someone who works hard?",
      options: ["Lazy", "Hardworking", "Careless", "Rude"],
      correctIndex: 1,
      answer: "'Hardworking' describes someone who works hard."
    },
    {
      id: 7,
      text: "What does 'polite' mean?",
      options: ["Rude", "Well-mannered", "Lazy", "Angry"],
      correctIndex: 1,
      answer: "'Polite' means well-mannered and showing good manners."
    },
    {
      id: 8,
      text: "Which word means 'not honest'?",
      options: ["Honest", "Dishonest", "Kind", "Friendly"],
      correctIndex: 1,
      answer: "'Dishonest' means not honest."
    },

    // ==================== Grammar: Relative Clauses (8 questions) ====================
    {
      id: 9,
      text: "Which of the following is a relative pronoun?",
      options: ["And", "But", "Who", "Or"],
      correctIndex: 2,
      answer: "'Who' is a relative pronoun."
    },
    {
      id: 10,
      text: "Choose the correct sentence:",
      options: [
        "The man who is standing there is my brother.",
        "The man which is standing there is my brother.",
        "The man what is standing there is my brother.",
        "The man whom is standing there is my brother."
      ],
      correctIndex: 0,
      answer: "'The man who is standing there is my brother.' is the correct sentence."
    },
    {
      id: 11,
      text: "What does 'which' refer to in a sentence?",
      options: ["People", "Animals", "Things", "All of the above"],
      correctIndex: 2,
      answer: "'Which' refers to things."
    },
    {
      id: 12,
      text: "Choose the correct relative clause:",
      options: [
        "The book who I read was interesting.",
        "The book which I read was interesting.",
        "The book whom I read was interesting.",
        "The book what I read was interesting."
      ],
      correctIndex: 1,
      answer: "'The book which I read was interesting.' is the correct sentence."
    },
    {
      id: 13,
      text: "What does 'whose' indicate?",
      options: ["Possession", "Place", "Time", "Reason"],
      correctIndex: 0,
      answer: "'Whose' indicates possession."
    },
    {
      id: 14,
      text: "Which of the following sentences is correct?",
      options: [
        "The woman whose car is red is my aunt.",
        "The woman which car is red is my aunt.",
        "The woman who car is red is my aunt.",
        "The woman what car is red is my aunt."
      ],
      correctIndex: 0,
      answer: "'The woman whose car is red is my aunt.' is the correct sentence."
    },
    {
      id: 15,
      text: "What is a defining relative clause?",
      options: [
        "Adds extra information",
        "Essential to identify the noun",
        "Always set off by commas",
        "None of the above"
      ],
      correctIndex: 1,
      answer: "A defining relative clause is essential to identify the noun."
    },
    {
      id: 16,
      text: "Which word is NOT a relative pronoun?",
      options: ["Who", "Which", "That", "And"],
      correctIndex: 3,
      answer: "'And' is NOT a relative pronoun."
    },

    // ==================== Reading: Understanding Others (8 questions) ====================
    {
      id: 17,
      text: "What is the main idea of the passage about 'understanding people'?",
      options: [
        "People are all the same",
        "Understanding others is important",
        "People don't like each other",
        "Communication is not important"
      ],
      correctIndex: 1,
      answer: "The main idea is that understanding others is important."
    },
    {
      id: 18,
      text: "Why is empathy important?",
      options: [
        "To ignore others",
        "To understand others' feelings",
        "To be selfish",
        "To make others sad"
      ],
      correctIndex: 1,
      answer: "Empathy is important to understand others' feelings."
    },
    {
      id: 19,
      text: "What is the meaning of 'tolerance'?",
      options: [
        "Not accepting differences",
        "Accepting differences",
        "Being angry",
        "Being rude"
      ],
      correctIndex: 1,
      answer: "'Tolerance' means accepting differences."
    },
    {
      id: 20,
      text: "What should you do to understand others better?",
      options: [
        "Talk only about yourself",
        "Listen actively",
        "Ignore them",
        "Judge them"
      ],
      correctIndex: 1,
      answer: "You should listen actively to understand others better."
    },

    // ==================== Vocabulary: Health and Medicine (7 questions) ====================
    {
      id: 21,
      text: "What does 'symptom' mean?",
      options: [
        "A cure for a disease",
        "A sign of a disease",
        "A type of medicine",
        "A hospital"
      ],
      correctIndex: 1,
      answer: "A symptom is a sign of a disease."
    },
    {
      id: 22,
      text: "What is the meaning of 'prescription'?",
      options: [
        "A type of exercise",
        "A doctor's written order for medicine",
        "A healthy food",
        "A hospital room"
      ],
      correctIndex: 1,
      answer: "A prescription is a doctor's written order for medicine."
    },
    {
      id: 23,
      text: "Which word means 'to make someone healthy again'?",
      options: ["Prevent", "Heal", "Spread", "Suffer"],
      correctIndex: 1,
      answer: "'Heal' means to make someone healthy again."
    },
    {
      id: 24,
      text: "What is a 'patient'?",
      options: [
        "A doctor",
        "A person receiving medical treatment",
        "A nurse",
        "A hospital"
      ],
      correctIndex: 1,
      answer: "A patient is a person receiving medical treatment."
    },
    {
      id: 25,
      text: "What does 'disease' mean?",
      options: [
        "A healthy condition",
        "An illness",
        "A medicine",
        "A exercise"
      ],
      correctIndex: 1,
      answer: "A disease is an illness."
    },
    {
      id: 26,
      text: "Which word means 'to stop something from happening'?",
      options: ["Cure", "Prevent", "Treat", "Spread"],
      correctIndex: 1,
      answer: "'Prevent' means to stop something from happening."
    },
    {
      id: 27,
      text: "What is a 'surgery'?",
      options: [
        "A type of medicine",
        "A medical operation",
        "A hospital room",
        "A disease"
      ],
      correctIndex: 1,
      answer: "A surgery is a medical operation."
    },

    // ==================== Grammar: Passive Voice (7 questions) ====================
    {
      id: 28,
      text: "Change to passive: 'The doctor treats the patient.'",
      options: [
        "The patient is treated by the doctor.",
        "The patient was treated by the doctor.",
        "The patient will be treated by the doctor.",
        "The patient has been treated by the doctor."
      ],
      correctIndex: 0,
      answer: "The patient is treated by the doctor."
    },
    {
      id: 29,
      text: "What is the passive form of 'The teacher teaches the class.'?",
      options: [
        "The class is taught by the teacher.",
        "The class was taught by the teacher.",
        "The class will be taught by the teacher.",
        "The class has been taught by the teacher."
      ],
      correctIndex: 0,
      answer: "The class is taught by the teacher."
    },
    {
      id: 30,
      text: "How is the passive voice formed?",
      options: [
        "Be + past participle",
        "Have + past participle",
        "Be + present participle",
        "Do + infinitive"
      ],
      correctIndex: 0,
      answer: "The passive voice is formed with 'be + past participle'."
    },
    {
      id: 31,
      text: "What is the passive form of 'She will write a letter.'?",
      options: [
        "A letter is written by her.",
        "A letter was written by her.",
        "A letter will be written by her.",
        "A letter has been written by her."
      ],
      correctIndex: 2,
      answer: "A letter will be written by her."
    },
    {
      id: 32,
      text: "What is the passive form of 'They built this house in 1990.'?",
      options: [
        "This house is built in 1990.",
        "This house was built in 1990.",
        "This house will be built in 1990.",
        "This house has been built in 1990."
      ],
      correctIndex: 1,
      answer: "This house was built in 1990."
    },

    // ==================== Vocabulary: Technology Terms (6 questions) ====================
    {
      id: 33,
      text: "What does 'software' mean?",
      options: [
        "Physical computer parts",
        "Programs and data",
        "A type of computer",
        "A network"
      ],
      correctIndex: 1,
      answer: "Software means programs and data."
    },
    {
      id: 34,
      text: "What is 'hardware'?",
      options: [
        "Computer programs",
        "Physical computer components",
        "A type of software",
        "A website"
      ],
      correctIndex: 1,
      answer: "Hardware is physical computer components."
    },
    {
      id: 35,
      text: "What does 'download' mean?",
      options: [
        "To send data",
        "To receive data",
        "To delete data",
        "To store data"
      ],
      correctIndex: 1,
      answer: "'Download' means to receive data."
    },
    {
      id: 36,
      text: "What is 'the internet'?",
      options: [
        "A type of computer",
        "A global network of computers",
        "A software program",
        "A type of hardware"
      ],
      correctIndex: 1,
      answer: "The internet is a global network of computers."
    },
    {
      id: 37,
      text: "What is a 'website'?",
      options: [
        "A computer program",
        "A collection of web pages",
        "A type of hardware",
        "A network"
      ],
      correctIndex: 1,
      answer: "A website is a collection of web pages."
    },
    {
      id: 38,
      text: "What does 'email' stand for?",
      options: [
        "Electronic mail",
        "Easy mail",
        "Efficient mail",
        "Emergency mail"
      ],
      correctIndex: 0,
      answer: "Email stands for Electronic mail."
    },

    // ==================== Grammar: Conditional Sentences (6 questions) ====================
    {
      id: 39,
      text: "What is the structure of the first conditional?",
      options: [
        "If + present, will + infinitive",
        "If + past, would + infinitive",
        "If + present, would + infinitive",
        "If + past, will + infinitive"
      ],
      correctIndex: 0,
      answer: "The first conditional is: If + present, will + infinitive."
    },
    {
      id: 40,
      text: "Which sentence is an example of the first conditional?",
      options: [
        "If I study, I will pass the exam.",
        "If I studied, I would pass the exam.",
        "If I had studied, I would have passed the exam.",
        "If I study, I pass the exam."
      ],
      correctIndex: 0,
      answer: "'If I study, I will pass the exam.' is an example of the first conditional."
    },
    {
      id: 41,
      text: "What is the structure of the second conditional?",
      options: [
        "If + present, will + infinitive",
        "If + past, would + infinitive",
        "If + present, would + infinitive",
        "If + past perfect, would have + past participle"
      ],
      correctIndex: 1,
      answer: "The second conditional is: If + past, would + infinitive."
    },
    {
      id: 42,
      text: "Which sentence is an example of the second conditional?",
      options: [
        "If I study, I will pass the exam.",
        "If I studied, I would pass the exam.",
        "If I had studied, I would have passed the exam.",
        "If I study, I pass the exam."
      ],
      correctIndex: 1,
      answer: "'If I studied, I would pass the exam.' is an example of the second conditional."
    },
    {
      id: 43,
      text: "What does 'unless' mean?",
      options: ["If", "If not", "Because", "Although"],
      correctIndex: 1,
      answer: "'Unless' means if not."
    },
    {
      id: 44,
      text: "Which sentence uses 'unless' correctly?",
      options: [
        "Unless you study, you will fail.",
        "Unless you study, you won't fail.",
        "Unless you studied, you will fail.",
        "Unless you study, you would fail."
      ],
      correctIndex: 0,
      answer: "'Unless you study, you will fail.' is the correct sentence."
    },

    // ==================== Vocabulary: Environment (6 questions) ====================
    {
      id: 45,
      text: "What is 'pollution'?",
      options: [
        "Clean air",
        "Harmful substances in the environment",
        "Natural resources",
        "Protected areas"
      ],
      correctIndex: 1,
      answer: "Pollution is harmful substances in the environment."
    },
    {
      id: 46,
      text: "What does 'recycle' mean?",
      options: [
        "Throw away",
        "Use again",
        "Destroy",
        "Create"
      ],
      correctIndex: 1,
      answer: "Recycle means to use again."
    },
    {
      id: 47,
      text: "What is 'climate change'?",
      options: [
        "Seasonal weather changes",
        "Long-term changes in temperature and weather patterns",
        "Daily temperature changes",
        "None of the above"
      ],
      correctIndex: 1,
      answer: "Climate change is long-term changes in temperature and weather patterns."
    },
    {
      id: 48,
      text: "What is 'sustainability'?",
      options: [
        "Using resources quickly",
        "Meeting current needs without harming future generations",
        "Destroying resources",
        "None of the above"
      ],
      correctIndex: 1,
      answer: "Sustainability means meeting current needs without harming future generations."
    },
    {
      id: 49,
      text: "What does 'conservation' mean?",
      options: [
        "Using resources wastefully",
        "Protection of natural resources",
        "Destroying habitats",
        "Polluting the environment"
      ],
      correctIndex: 1,
      answer: "Conservation is the protection of natural resources."
    },
    {
      id: 50,
      text: "Which word means 'able to be maintained'?",
      options: ["Sustainable", "Wasteful", "Harmful", "Destructive"],
      correctIndex: 0,
      answer: "'Sustainable' means able to be maintained."
    }
  ];

  // State ها
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: number}>({});
  const [showAnswers, setShowAnswers] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);
  
  const [timeLeft, setTimeLeft] = useState(60 * 60); // 60 minutes to seconds
  const [isTimeUp, setIsTimeUp] = useState(false);

  useEffect(() => {
    if (isTimeUp || hasCalculated) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsTimeUp(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimeUp, hasCalculated]);

  const handleOptionClick = (questionId: number, optionIndex: number) => {
    if (isTimeUp) return;

    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: optionIndex
    });
    if (hasCalculated) {
      setHasCalculated(false);
      setScore(null);
    }
  };

  const calculateScore = () => {
    let correctCount = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });
    const percentage = (correctCount / questions.length) * 100;
    setScore(percentage);
    setHasCalculated(true);
    setIsTimeUp(true); 
  };

  useEffect(() => {
    if (isTimeUp && !hasCalculated) {
      calculateScore();
    }
  }, [isTimeUp]);

  const isAllAnswered = questions.every(q => selectedAnswers[q.id] !== undefined);
  const canCalculate = isAllAnswered && !hasCalculated && !isTimeUp;

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
          onClick={() => router.push('/exam/yazdahom/riyazi/gozine2/second-half/english-2')}
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
          ← Back to Lessons
        </button>
        
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '28px' }}>🏆 Comprehensive Exam - English (2)</h1>
            <p style={{ marginTop: '10px', fontSize: '16px', opacity: 0.9 }}>{questions.length} questions covering all topics</p>
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
            gap: '10px',
            border: isTimeUp ? '2px solid #ffcccc' : '1px solid rgba(255,255,255,0.3)'
          }}>
            <span>⏱️</span>
            <span>{isTimeUp ? 'Time is up!' : formatTime(timeLeft)}</span>
          </div>
        </div>
        {!isTimeUp && <p style={{ fontSize: '14px', opacity: 0.7, marginTop: '5px' }}>Time remaining</p>}
      </div>

      <div style={{ width: '100%' }}>
        {questions.map((q, index) => (
          <div key={q.id} style={{
            marginBottom: '25px',
            backgroundColor: '#ffffff',
            padding: '20px 25px',
            borderRadius: '0px',
            borderBottom: '2px solid #e9ecef',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
            width: '100%'
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
                marginTop: '2px',
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
                const disabled = isTimeUp; 
                
                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionClick(q.id, idx)}
                    disabled={disabled}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '12px 18px',
                      border: isSelected ? '3px solid #1565C0' : '1px solid #dee2e6',
                      borderRadius: '10px',
                      backgroundColor: isSelected ? '#e3f2fd' : '#fff',
                      cursor: disabled ? 'not-allowed' : 'pointer',
                      fontSize: '15px',
                      textAlign: 'right',
                      transition: 'all 0.2s',
                      width: '100%',
                      opacity: disabled && !isSelected ? 0.6 : 1
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

        {(isAllAnswered || hasCalculated || isTimeUp) && (
          <div style={{
            marginTop: '30px', 
            marginBottom: '30px', 
            padding: '20px', 
            backgroundColor: '#ffffff', 
            borderRadius: '12px', 
            border: '1px solid #dee2e6',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
              
              <div>
                {!hasCalculated ? (
                  <button
                    onClick={calculateScore}
                    disabled={!canCalculate}
                    style={{
                      padding: '12px 30px',
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
                    {!isAllAnswered && !isTimeUp ? 'Please answer all questions' : 'Calculate Score'}
                  </button>
                ) : (
                  <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#1565C0' }}>
                    ✅ Your Score: <span style={{ color: getScoreColor(score!), fontSize: '22px' }}>{Math.round(score!)}%</span>
                    {isTimeUp && hasCalculated && <span style={{ fontSize: '14px', color: '#dc3545', marginRight: '15px' }}>(Time is up!)</span>}
                  </div>
                )}
              </div>

              {hasCalculated && (
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <div style={{
                    width: '100%',
                    height: '15px',
                    backgroundColor: '#e9ecef',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    marginTop: '5px'
                  }}>
                    <div style={{
                      width: `${score}%`,
                      height: '100%',
                      backgroundColor: getScoreColor(score!),
                      transition: 'width 0.5s ease-in-out'
                    }} />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '60px' }}>
          <button
            onClick={() => setShowAnswers(!showAnswers)}
            style={{
              padding: '18px 50px',
              fontSize: '20px',
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
            {showAnswers ? "❌ Close Answers" : "📄 View Answer Key"}
          </button>
        </div>

        {showAnswers && (
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
              📝 Answer Key - Comprehensive Exam
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
                  <div style={{ fontSize: '18px', lineHeight: '2' }}>
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
                    <span style={{ fontWeight: 'bold', color: '#28a745' }}>✅ Correct Answer:</span> <span style={{ fontSize: '16px' }}>{q.options[q.correctIndex]}</span>
                    <br />
                    {userAnswer !== undefined && (
                      <span>
                        <span style={{ fontWeight: 'bold', color: isCorrect ? '#28a745' : '#dc3545' }}>
                          {isCorrect ? '✔️ Your answer is correct' : '❌ Your answer is incorrect'}
                        </span>
                        <span style={{ fontSize: '16px', color: '#666', marginRight: '10px' }}>
                          (You selected option {String.fromCharCode(65 + userAnswer)})
                        </span>
                        <br />
                      </span>
                    )}
                    <span style={{ fontWeight: 'bold', color: '#1565C0' }}>📖 Explanation:</span> 
                    <br />
                    <span style={{ fontSize: '16px', lineHeight: '1.8' }}>{q.answer}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default English2FinalExam;