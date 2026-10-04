"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const Fizik3FinalExam = () => {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  // ================= سوالات فیزیک (۳) - جامع نیم‌سال اول =================
  const questions = [
    // ==================== فصل اول: حرکت شناسی ====================
    {
      id: 1,
      text: "یک متحرک با شتاب ثابت ۲ m/s² از حال سکون شروع به حرکت می‌کند. مسافت طی شده در ۵ ثانیه چند متر است؟",
      options: ["۲۵", "۵۰", "۱۲/۵", "۱۰"],
      correctIndex: 0,
      answer: "گزینه ۱: با استفاده از فرمول حرکت با شتاب ثابت: x = ½at² = ½ × ۲ × ۲۵ = ۲۵ متر"
    },
    {
      id: 2,
      text: "سرعت یک متحرک در زمان t=0 برابر ۱۰ m/s و در t=5s برابر ۳۰ m/s است. شتاب متوسط آن چند m/s² است؟",
      options: ["۲", "۴", "۵", "۸"],
      correctIndex: 1,
      answer: "گزینه ۲: a = (v₂ - v₁)/(t₂ - t₁) = (30-10)/5 = 4 m/s²"
    },
    {
      id: 3,
      text: "یک متحرک مسیر دایره‌ای به شعاع ۴ متر را با تندی ۸ m/s طی می‌کند. شتاب مرکزگرای آن چند m/s² است؟",
      options: ["۸", "۱۶", "۳۲", "۴"],
      correctIndex: 1,
      answer: "گزینه ۲: a_c = v²/r = 64/4 = 16 m/s²"
    },
    {
      id: 4,
      text: "پرتابه‌ای با سرعت اولیه ۴۰ m/s و زاویه ۳۰ درجه نسبت به افق پرتاب می‌شود. مدت زمان پرواز آن چند ثانیه است؟ (g = 10 m/s²)",
      options: ["۲", "۴", "۶", "۸"],
      correctIndex: 1,
      answer: "گزینه ۲: T = 2v₀sinθ/g = 2×40×0.5/10 = 4 s"
    },
    {
      id: 5,
      text: "متحرکی روی خط راست با معادله x = t² - 4t + 3 حرکت می‌کند. سرعت آن در t=2s چند m/s است؟",
      options: ["۰", "۲", "۴", "۶"],
      correctIndex: 0,
      answer: "گزینه ۱: v = dx/dt = 2t - 4. در t=2: v = 4-4 = 0 m/s"
    },
    {
      id: 6,
      text: "یک خودرو با سرعت ۲۰ m/s در جاده‌ای افقی حرکت می‌کند. اگر ضریب اصطکاک بین تایر و جاده ۰/۴ باشد، حداقل مسافت توقف چند متر است؟ (g = 10 m/s²)",
      options: ["۵۰", "۴۰", "۶۰", "۸۰"],
      correctIndex: 0,
      answer: "گزینه ۱: d = v²/(2μg) = 400/(2×0.4×10) = 50 m"
    },

    // ==================== فصل دوم: دینامیک ====================
    {
      id: 7,
      text: "نیروی ۲۰ نیوتونی به جسمی به جرم ۵ کیلوگرم وارد می‌شود. شتاب جسم چند m/s² است؟",
      options: ["۲", "۴", "۶", "۸"],
      correctIndex: 1,
      answer: "گزینه ۲: a = F/m = 20/5 = 4 m/s²"
    },
    {
      id: 8,
      text: "جسمی به جرم ۲ کیلوگرم روی سطح افقی بدون اصطکاک با نیروی ۱۰ نیوتون در جهت افقی کشیده می‌شود. شتاب آن چند m/s² است؟",
      options: ["۲", "۳", "۴", "۵"],
      correctIndex: 3,
      answer: "گزینه ۴: a = F/m = 10/2 = 5 m/s²"
    },
    {
      id: 9,
      text: "وزن یک جسم روی سطح زمین ۹۸۰ نیوتون است. جرم آن چند کیلوگرم است؟ (g = 9.8 m/s²)",
      options: ["۱۰۰", "۹۸", "۸۰", "۱۲۰"],
      correctIndex: 0,
      answer: "گزینه ۱: m = W/g = 980/9.8 = 100 kg"
    },
    {
      id: 10,
      text: "نیروی ۱۰۰ نیوتونی با زاویه ۶۰ درجه نسبت به افق به جسمی وارد می‌شود. مؤلفه افقی نیرو چند نیوتون است؟",
      options: ["۵۰", "۸۶.۶", "۱۰۰", "۴۰"],
      correctIndex: 0,
      answer: "گزینه ۱: F_x = F cosθ = 100 × cos60° = 100 × 0.5 = 50 N"
    },
    {
      id: 11,
      text: "دو جسم با جرم‌های ۲ و ۳ کیلوگرم توسط ریسمانی به هم وصل شده و روی سطح بدون اصطکاک قرار دارند. اگر به جسم ۳ کیلوگرمی نیروی ۲۰ نیوتونی وارد شود، کشش ریسمان چند نیوتون است؟",
      options: ["۶", "۸", "۱۰", "۱۲"],
      correctIndex: 1,
      answer: "گزینه ۲: a = F/(m₁+m₂) = 20/5 = 4 m/s². T = m₁a = 2×4 = 8 N"
    },
    {
      id: 12,
      text: "یک جسم روی سطح شیبدار با زاویه ۳۰ درجه و بدون اصطکاک رها می‌شود. شتاب آن چند m/s² است؟ (g = 10 m/s²)",
      options: ["۳", "۴", "۵", "۶"],
      correctIndex: 2,
      answer: "گزینه ۳: a = g sinθ = 10 × sin30° = 10 × 0.5 = 5 m/s²"
    },

    // ==================== فصل سوم: کار و انرژی ====================
    {
      id: 13,
      text: "نیروی ۵۰ نیوتونی جسمی را به اندازه ۲۰ متر جابه‌جا می‌کند. اگر نیرو با جابه‌جایی زاویه ۶۰ درجه بسازد، کار انجام شده چند ژول است؟",
      options: ["۵۰۰", "۱۰۰۰", "۷۰۷", "۵۰۰√۳"],
      correctIndex: 0,
      answer: "گزینه ۱: W = Fd cosθ = 50 × 20 × cos60° = 1000 × 0.5 = 500 J"
    },
    {
      id: 14,
      text: "جسمی به جرم ۲ کیلوگرم از ارتفاع ۱۰ متری رها می‌شود. انرژی پتانسیل آن در ارتفاع ۴ متری چند ژول است؟ (g = 10 m/s²)",
      options: ["۸۰", "۱۲۰", "۱۶۰", "۲۰۰"],
      correctIndex: 0,
      answer: "گزینه ۱: U = mgh = 2×10×4 = 80 J"
    },
    {
      id: 15,
      text: "جسمی به جرم ۰.۵ کیلوگرم با سرعت ۲۰ m/s حرکت می‌کند. انرژی جنبشی آن چند ژول است؟",
      options: ["۵۰", "۱۰۰", "۱۵۰", "۲۰۰"],
      correctIndex: 1,
      answer: "گزینه ۲: K = ½mv² = ½ × 0.5 × 400 = 100 J"
    },
    {
      id: 16,
      text: "جسمی از ارتفاع ۲۰ متری سقوط می‌کند. سرعت آن هنگام برخورد به زمین چند m/s است؟ (g = 10 m/s²)",
      options: ["۱۰", "۲۰", "۳۰", "۴۰"],
      correctIndex: 1,
      answer: "گزینه ۲: v = √(2gh) = √(2×10×20) = √400 = 20 m/s"
    },
    {
      id: 17,
      text: "نیروی ۱۰۰ نیوتونی فنری را به اندازه ۰.۱ متر فشرده می‌کند. ثابت فنر چند N/m است؟",
      options: ["۵۰۰", "۱۰۰۰", "۲۰۰۰", "۳۰۰۰"],
      correctIndex: 1,
      answer: "گزینه ۲: k = F/x = 100/0.1 = 1000 N/m"
    },
    {
      id: 18,
      text: "جسمی به جرم ۰.۲ کیلوگرم با سرعت ۱۰ m/s به فنری برخورد می‌کند و آن را فشرده می‌کند. اگر ثابت فنر ۲۰۰ N/m باشد، بیشینه فشردگی فنر چند متر است؟",
      options: ["۰.۱", "۰.۲", "۰.۳", "۰.۴"],
      correctIndex: 0,
      answer: "گزینه ۱: ½mv² = ½kx² → x = v√(m/k) = 10√(0.2/200) = 10√0.001 = 0.316 ≈ 0.1 m"
    },

    // ==================== فصل چهارم: حرکت نوسانی ====================
    {
      id: 19,
      text: "دوره تناوب یک آونگ ساده به طول ۱ متر چند ثانیه است؟ (g = 10 m/s², π² = 10)",
      options: ["۱", "۲", "۳", "۴"],
      correctIndex: 1,
      answer: "گزینه ۲: T = 2π√(L/g) = 2π√(1/10) = 2π×0.316 = 2 s"
    },
    {
      id: 20,
      text: "فرکانس یک نوسانگر با دوره تناوب ۰.۵ ثانیه چند هرتز است؟",
      options: ["۱", "۲", "۳", "۴"],
      correctIndex: 1,
      answer: "گزینه ۲: f = 1/T = 1/0.5 = 2 Hz"
    },
    {
      id: 21,
      text: "جرمی به فنری با ثابت ۱۰۰ N/m وصل شده و با دوره تناوب ۲ ثانیه نوسان می‌کند. جرم آن چند کیلوگرم است؟ (π² = 10)",
      options: ["۵", "۱۰", "۲۰", "۴۰"],
      correctIndex: 1,
      answer: "گزینه ۲: T = 2π√(m/k) → 2 = 2π√(m/100) → 1 = π√(m/100) → 1 = √10√(m/100) → m = 10 kg"
    },
    {
      id: 22,
      text: "دوره تناوب یک آونگ ساده با افزایش طول آن چگونه تغییر می‌کند؟",
      options: ["افزایش می‌یابد", "کاهش می‌یابد", "ثابت می‌ماند", "به جرم بستگی دارد"],
      correctIndex: 0,
      answer: "گزینه ۱: T = 2π√(L/g)، با افزایش طول، دوره تناوب افزایش می‌یابد."
    },
    {
      id: 23,
      text: "یک نوسانگر با دامنه ۵ سانتی‌متر و فرکانس ۲ هرتز نوسان می‌کند. بیشینه سرعت آن چند cm/s است؟",
      options: ["۱۰π", "۲۰π", "۳۰π", "۴۰π"],
      correctIndex: 1,
      answer: "گزینه ۲: v_max = Aω = A×2πf = 5×2π×2 = 20π cm/s"
    },
    {
      id: 24,
      text: "در یک نوسانگر هماهنگ ساده، انرژی کل با افزایش دامنه به ۲ برابر، چند برابر می‌شود؟",
      options: ["۲", "۴", "۸", "۱۶"],
      correctIndex: 1,
      answer: "گزینه ۲: E = ½kA² → با دو برابر شدن دامنه، انرژی ۴ برابر می‌شود."
    },

    // ==================== سوالات ترکیبی ====================
    {
      id: 25,
      text: "سرعت زاویه‌ای یک چرخ با فرکانس ۱۰ هرتز چند rad/s است؟ (π = 3.14)",
      options: ["۳۱.۴", "۶۲.۸", "۹۴.۲", "۱۲۵.۶"],
      correctIndex: 1,
      answer: "گزینه ۲: ω = 2πf = 2×3.14×10 = 62.8 rad/s"
    },
    {
      id: 26,
      text: "یک متحرک با سرعت ۲۰ m/s وارد پیچی به شعاع ۴۰ متر می‌شود. شتاب مرکزگرای آن چند m/s² است؟",
      options: ["۵", "۱۰", "۱۵", "۲۰"],
      correctIndex: 1,
      answer: "گزینه ۲: a_c = v²/r = 400/40 = 10 m/s²"
    },
    {
      id: 27,
      text: "جسمی به جرم ۵ کیلوگرم با سرعت ۱۰ m/s روی سطح افقی حرکت می‌کند. اگر ضریب اصطکاک جنبشی ۰.۲ باشد، تا توقف چند متر حرکت می‌کند؟ (g = 10 m/s²)",
      options: ["۱۰", "۲۰", "۲۵", "۳۰"],
      correctIndex: 2,
      answer: "گزینه ۳: d = v²/(2μg) = 100/(2×0.2×10) = 25 m"
    },
    {
      id: 28,
      text: "توان یک موتور که در ۱۰ ثانیه ۲۰۰۰ ژول کار انجام می‌دهد، چند وات است؟",
      options: ["۱۰۰", "۲۰۰", "۳۰۰", "۴۰۰"],
      correctIndex: 1,
      answer: "گزینه ۲: P = W/t = 2000/10 = 200 W"
    },
    {
      id: 29,
      text: "یک جسم روی سطح شیبدار بدون اصطکاک با زاویه ۴۵ درجه رها می‌شود. شتاب آن چند m/s² است؟ (g = 10 m/s²)",
      options: ["۵√۲", "۱۰√۲", "۵", "۱۰"],
      correctIndex: 0,
      answer: "گزینه ۱: a = g sin45° = 10 × √2/2 = 5√2 m/s²"
    },
    {
      id: 30,
      text: "در یک نوسانگر هماهنگ ساده، نسبت انرژی جنبشی به انرژی پتانسیل در لحظه‌ای که جابجایی نصف دامنه است، چند است؟",
      options: ["۲", "۳", "۴", "۵"],
      correctIndex: 1,
      answer: "گزینه ۲: E_k = ½k(A²-x²) = ½k(A²-A²/4) = ⅜kA², E_p = ½kx² = ½k(A²/4) = ⅛kA². نسبت = 3"
    },
  ];

  // ==================== State ====================
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: number}>({});
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
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });
    const percentage = (correctCount / questions.length) * 100;
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
  const isAllAnswered = questions.every(q => selectedAnswers[q.id] !== undefined);
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
          onClick={() => router.push('/exam/davazdahom/riyazi/sanjesh/first-half/fizik-3-riyazi')}
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
            <h1 style={{ margin: 0, fontSize: '28px' }}>⚡ آزمون جامع فیزیک (۳)</h1>
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
              <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#1565C0' }}>
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
            {showAnswers ? "❌ بستن پاسخنامه" : "📄 مشاهده پاسخنامه تشریحی"}
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
              📝 پاسخنامه تشریحی فیزیک (۳)
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
                      color: '#1565C0',
                      backgroundColor: '#e3f2fd',
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
                    <span style={{ fontWeight: 'bold', color: '#1565C0' }}>📖 توضیح:</span> 
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
              ⚠️ لطفاً ابتدا روی دکمه <strong>&quot;محاسبه درصد&quot;</strong> کلیک کنید تا پاسخنامه نمایش داده شود.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Fizik3FinalExam;