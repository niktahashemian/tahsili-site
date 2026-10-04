"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

// ================= سوالات ریاضی ۳ - جامع نیم‌سال اول تجربی قلمچی =================
const QUESTIONS = [
  // ==================== فصل اول: تابع و نمودار ====================
  {
    id: 1,
    text: "دامنه تابع f(x) = √(x-2) کدام است؟",
    options: ["x ≥ 2", "x > 2", "x ≤ 2", "x < 2"],
    correctIndex: 0,
    answer: "گزینه ۱: عبارت زیر رادیکال باید نامنفی باشد: x-2 ≥ 0 ⇒ x ≥ 2"
  },
  {
    id: 2,
    text: "کدام یک از توابع زیر یک‌به‌یک است؟",
    options: ["f(x) = x²", "f(x) = 2x + 1", "f(x) = |x|", "f(x) = x⁴"],
    correctIndex: 1,
    answer: "گزینه ۲: تابع f(x) = 2x + 1 یک‌به‌یک است زیرا اگر f(a)=f(b) آنگاه 2a+1=2b+1 ⇒ a=b"
  },
  {
    id: 3,
    text: "تابع معکوس f(x) = 2x - 3 کدام است؟",
    options: ["f⁻¹(x) = (x+3)/2", "f⁻¹(x) = (x-3)/2", "f⁻¹(x) = 2x + 3", "f⁻¹(x) = -2x + 3"],
    correctIndex: 0,
    answer: "گزینه ۱: y = 2x - 3 ⇒ 2x = y + 3 ⇒ x = (y+3)/2 ⇒ f⁻¹(x) = (x+3)/2"
  },
  {
    id: 4,
    text: "مقدار تابع جزءصحیح [3.7] برابر است با:",
    options: ["۳", "۳.۷", "۴", "۰.۷"],
    correctIndex: 0,
    answer: "گزینه ۱: تابع جزءصحیح بزرگترین عدد صحیح کوچکتر یا مساوی عدد را برمی‌گرداند: [3.7] = 3"
  },
  {
    id: 5,
    text: "برد تابع f(x) = |x| + 1 کدام است؟",
    options: ["[1, ∞)", "(1, ∞)", "[0, ∞)", "(-∞, ∞)"],
    correctIndex: 0,
    answer: "گزینه ۱: |x| ≥ 0 ⇒ |x| + 1 ≥ 1 ⇒ برد [1, ∞)"
  },

  // ==================== فصل دوم: حد و پیوستگی ====================
  {
    id: 6,
    text: "حد عبارت lim(x→2) (x² - 4)/(x - 2) چند است؟",
    options: ["۰", "۲", "۴", "۶"],
    correctIndex: 2,
    answer: "گزینه ۳: (x²-4)/(x-2) = (x-2)(x+2)/(x-2) = x+2 ⇒ lim(x→2) (x+2) = 4"
  },
  {
    id: 7,
    text: "حد یک‌طرفه lim(x→1⁻) (x-1) چند است؟",
    options: ["۰", "۰⁺", "۰⁻", "۱"],
    correctIndex: 2,
    answer: "گزینه ۳: وقتی x از چپ به ۱ نزدیک می‌شود، x-1 به ۰ از سمت منفی نزدیک می‌شود ⇒ ۰⁻"
  },
  {
    id: 8,
    text: "تابع f(x) = 1/x در کدام نقاط ناپیوسته است؟",
    options: ["x = 0", "x = 1", "x = -1", "همه نقاط"],
    correctIndex: 0,
    answer: "گزینه ۱: تابع 1/x در x=0 تعریف نشده است، پس در آن نقطه ناپیوسته است."
  },
  {
    id: 9,
    text: "مجانب قائم تابع f(x) = 1/(x-3) کدام است؟",
    options: ["x = 3", "x = -3", "y = 0", "y = 3"],
    correctIndex: 0,
    answer: "گزینه ۱: مجانب قائم در نقطه‌ای است که مخرج صفر می‌شود: x-3 = 0 ⇒ x = 3"
  },
  {
    id: 10,
    text: "lim(x→∞) (1/x) چند است؟",
    options: ["۰", "۱", "∞", "−∞"],
    correctIndex: 0,
    answer: "گزینه ۱: با بزرگ شدن x، کسر 1/x به صفر نزدیک می‌شود: lim(x→∞) 1/x = 0"
  },

  // ==================== فصل سوم: مشتق ====================
  {
    id: 11,
    text: "مشتق f(x) = x³ در x=2 چند است؟",
    options: ["۶", "۸", "۱۲", "۲۴"],
    correctIndex: 2,
    answer: "گزینه ۳: f'(x) = 3x² ⇒ f'(2) = 3×4 = 12"
  },
  {
    id: 12,
    text: "مشتق f(x) = sin x کدام است؟",
    options: ["cos x", "-cos x", "sin x", "-sin x"],
    correctIndex: 0,
    answer: "گزینه ۱: مشتق sin x برابر cos x است."
  },
  {
    id: 13,
    text: "مشتق f(x) = eˣ کدام است؟",
    options: ["eˣ", "xeˣ", "eˣ²", "0"],
    correctIndex: 0,
    answer: "گزینه ۱: مشتق تابع eˣ برابر خودش است."
  },
  {
    id: 14,
    text: "مشتق f(x) = ln x کدام است؟",
    options: ["1/x", "x", "eˣ", "1/x²"],
    correctIndex: 0,
    answer: "گزینه ۱: مشتق ln x برابر 1/x است."
  },
  {
    id: 15,
    text: "مشتق f(x) = (2x+1)² با استفاده از قاعده زنجیره‌ای چیست؟",
    options: ["4(2x+1)", "2(2x+1)", "8x+4", "4x+2"],
    correctIndex: 0,
    answer: "گزینه ۱: f'(x) = 2(2x+1)×2 = 4(2x+1)"
  },

  // ==================== فصل چهارم: کاربرد مشتق ====================
  {
    id: 16,
    text: "نقطه بحرانی تابع f(x) = x² - 4x + 3 کدام است؟",
    options: ["x = 2", "x = -2", "x = 1", "x = 3"],
    correctIndex: 0,
    answer: "گزینه ۱: f'(x) = 2x - 4 = 0 ⇒ x = 2"
  },
  {
    id: 17,
    text: "نقطه ماکزیمم نسبی f(x) = -x² + 4x - 3 کدام است؟",
    options: ["x = 2", "x = -2", "x = 1", "x = 3"],
    correctIndex: 0,
    answer: "گزینه ۱: f'(x) = -2x + 4 = 0 ⇒ x = 2، f''(x) = -2 < 0 پس ماکزیمم است."
  },
  {
    id: 18,
    text: "معادله خط مماس بر منحنی f(x) = x² در نقطه (۱, ۱) کدام است؟",
    options: ["y = 2x - 1", "y = x", "y = 2x + 1", "y = x + 1"],
    correctIndex: 0,
    answer: "گزینه ۱: f'(x) = 2x ⇒ f'(1) = 2، معادله خط: y-1 = 2(x-1) ⇒ y = 2x - 1"
  },
  {
    id: 19,
    text: "نرخ تغییرات f(x) = x² در x=3 چند است؟",
    options: ["۳", "۶", "۹", "۱۲"],
    correctIndex: 1,
    answer: "گزینه ۲: f'(x) = 2x ⇒ f'(3) = 6"
  },
  {
    id: 20,
    text: "تابع f(x) = x³ در کدام بازه صعودی است؟",
    options: ["(-∞, 0)", "(0, ∞)", "(-∞, ∞)", "هیچکدام"],
    correctIndex: 2,
    answer: "گزینه ۳: f'(x) = 3x² ≥ 0 برای همه x، پس تابع در کل دامنه صعودی است."

  // ==================== سوالات ترکیبی ====================
  },
  {
    id: 21,
    text: "lim(x→0) (sin x)/x چند است؟",
    options: ["۰", "۱", "∞", "ناموجود"],
    correctIndex: 1,
    answer: "گزینه ۲: lim(x→0) (sin x)/x = 1 (حد معروف مثلثاتی)"
  },
  {
    id: 22,
    text: "مشتق f(x) = x² sin x کدام است؟",
    options: ["2x sin x + x² cos x", "2x sin x - x² cos x", "2x cos x", "x² cos x"],
    correctIndex: 0,
    answer: "گزینه ۱: با استفاده از قاعده ضرب: f'(x) = 2x sin x + x² cos x"
  },
  {
    id: 23,
    text: "حد lim(x→∞) (1 + 1/x)ˣ چند است؟",
    options: ["۱", "e", "∞", "۰"],
    correctIndex: 1,
    answer: "گزینه ۲: lim(x→∞) (1 + 1/x)ˣ = e"
  },
  {
    id: 24,
    text: "دامنه f(x) = 1/(x² - 4) کدام است؟",
    options: ["x ≠ ±2", "x ≠ 2", "x ≠ -2", "همه اعداد"],
    correctIndex: 0,
    answer: "گزینه ۱: مخرج باید غیرصفر باشد: x² - 4 ≠ 0 ⇒ x ≠ ±2"
  },
  {
    id: 25,
    text: "مشتق f(x) = tan x کدام است؟",
    options: ["sec² x", "csc² x", "cot² x", "-sec² x"],
    correctIndex: 0,
    answer: "گزینه ۱: مشتق tan x برابر sec² x است."
  },
  {
    id: 26,
    text: "نقطه عطف f(x) = x³ - 3x کدام است؟",
    options: ["x = 0", "x = 1", "x = -1", "x = 3"],
    correctIndex: 0,
    answer: "گزینه ۱: f''(x) = 6x = 0 ⇒ x = 0 (نقطه عطف)"
  },
  {
    id: 27,
    text: "lim(x→2) (x² - 4)/(x² - 3x + 2) چند است؟",
    options: ["۰", "۲", "۴", "۶"],
    correctIndex: 1,
    answer: "گزینه ۲: (x²-4)/(x²-3x+2) = (x-2)(x+2)/(x-2)(x-1) = (x+2)/(x-1) ⇒ lim(x→2) 4/1 = 4"
  },
  {
    id: 28,
    text: "مشتق f(x) = e^(2x) کدام است؟",
    options: ["2e^(2x)", "e^(2x)", "2xe^(2x)", "e^(2x)/2"],
    correctIndex: 0,
    answer: "گزینه ۱: با استفاده از قاعده زنجیره‌ای: f'(x) = e^(2x) × 2 = 2e^(2x)"
  },
  {
    id: 29,
    text: "تابع f(x) = x² - 2x + 1 در کدام نقطه مینیمم دارد؟",
    options: ["x = 1", "x = -1", "x = 0", "x = 2"],
    correctIndex: 0,
    answer: "گزینه ۱: f'(x) = 2x - 2 = 0 ⇒ x = 1، f''(x) = 2 > 0 پس مینیمم است."
  },
  {
    id: 30,
    text: "lim(x→0) (cos x - 1)/x² چند است؟",
    options: ["۰", "−1/2", "1/2", "۱"],
    correctIndex: 1,
    answer: "گزینه ۲: lim(x→0) (cos x - 1)/x² = -1/2"
  },
];

const RiyaziTajrobiFinalExam = () => {
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
        backgroundColor: '#1A237E',
        color: 'white',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '30px',
        textAlign: 'center',
        position: 'relative'
      }}>
        <button
          onClick={() => router.push('/exam/davazdahom/tajrobi/ghalamchi/second-half/riyazi-3-tajrobi')}
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
            <h1 style={{ margin: 0, fontSize: '28px' }}>📊 آزمون جامع ریاضی ۳</h1>
            <p style={{ marginTop: '10px', fontSize: '16px', opacity: 0.9 }}>
              {QUESTIONS.length} سوال - پاسخ داده شده: {answeredCount}/{QUESTIONS.length}
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
                backgroundColor: '#1A237E',
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
                      border: isSelected ? '3px solid #1A237E' : '1px solid #dee2e6',
                      borderRadius: '10px',
                      backgroundColor: isSelected ? '#e8eaf6' : '#fff',
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
                      backgroundColor: isSelected ? '#1A237E' : '#fff',
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
                  backgroundColor: canCalculate ? '#1A237E' : '#6c757d',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '50px',
                  cursor: canCalculate ? 'pointer' : 'not-allowed',
                  fontWeight: 'bold',
                  opacity: canCalculate ? 1 : 0.6
                }}
              >
                {!isAllAnswered && !isTimeUp ? `✅ ${answeredCount}/${QUESTIONS.length} پاسخ داده شده - ادامه دهید` : '📊 محاسبه درصد'}
              </button>
              {!isAllAnswered && !isTimeUp && (
                <p style={{ marginTop: '10px', color: '#666', fontSize: '14px' }}>
                  {QUESTIONS.length - answeredCount} سوال دیگر باقی مانده است
                </p>
              )}
            </div>
          ) : (
            <div>
              <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#1A237E' }}>
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
            borderTop: '4px solid #1A237E',
            paddingTop: '40px',
            backgroundColor: '#ffffff',
            padding: '40px',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
            width: '100%'
          }}>
            <h2 style={{
              textAlign: 'center',
              borderBottom: '3px solid #1A237E',
              paddingBottom: '20px',
              marginBottom: '40px',
              fontSize: '26px',
              color: '#1A237E'
            }}>
              📝 پاسخنامه تشریحی ریاضی ۳
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
                      color: '#1A237E',
                      backgroundColor: '#e8eaf6',
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
                    <span style={{ fontWeight: 'bold', color: '#1A237E' }}>📖 توضیح:</span>
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

export default RiyaziTajrobiFinalExam;