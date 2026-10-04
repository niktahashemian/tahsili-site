"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

// ================= سوالات هندسه ۳ - جامع نیم‌سال دوم =================
const QUESTIONS = [
  // ==================== فصل اول: ماتریس و کاربردها ====================
  {
    id: 1,
    text: "ماتریس زیر چند سطر و چند ستون دارد؟\nA = [1 2 3; 4 5 6]",
    options: ["۲ سطر، ۳ ستون", "۳ سطر، ۲ ستون", "۲ سطر، ۲ ستون", "۳ سطر، ۳ ستون"],
    correctIndex: 0,
    answer: "گزینه ۱: ماتریس A دارای ۲ سطر و ۳ ستون است (مرتبه ۲×۳)."
  },
  {
    id: 2,
    text: "اگر A = [2 4; 1 3] باشد، دترمینان آن چند است؟",
    options: ["۲", "۴", "۶", "۸"],
    correctIndex: 0,
    answer: "گزینه ۱: det(A) = (2×3) - (4×1) = 6 - 4 = 2"
  },
  {
    id: 3,
    text: "ماتریسی که همه درایه‌های آن صفر باشد، چه نام دارد؟",
    options: ["ماتریس صفر", "ماتریس همانی", "ماتریس قطری", "ماتریس متقارن"],
    correctIndex: 0,
    answer: "گزینه ۱: ماتریسی که همه درایه‌های آن صفر باشد، ماتریس صفر نامیده می‌شود."
  },
  {
    id: 4,
    text: "معکوس ماتریس A = [1 2; 3 4] کدام است؟",
    options: ["[-2 1; 1.5 -0.5]", "[4 -2; -3 1]", "[-4 2; 3 -1]", "[1 0; 0 1]"],
    correctIndex: 0,
    answer: "گزینه ۱: det = -2، A⁻¹ = (1/det)[4 -2; -3 1] = [-2 1; 1.5 -0.5]"
  },

  // ==================== فصل دوم: دستگاه معادلات خطی ====================
  {
    id: 5,
    text: "دستگاه معادلات 2x + 3y = 8 و 4x + 6y = 16 چه نوع دستگاهی است؟",
    options: ["سازگار و وابسته", "سازگار و مستقل", "ناسازگار", "بدون جواب"],
    correctIndex: 0,
    answer: "گزینه ۱: معادله دوم دو برابر معادله اول است، پس دستگاه سازگار و وابسته است و جواب‌های بی‌شمار دارد."
  },
  {
    id: 6,
    text: "روش کرامر برای حل دستگاه معادلات خطی از چه مفهومی استفاده می‌کند؟",
    options: ["دترمینان ماتریس‌ها", "معکوس ماتریس", "جمع ماتریس‌ها", "ضرب ماتریس‌ها"],
    correctIndex: 0,
    answer: "گزینه ۱: روش کرامر برای حل دستگاه معادلات خطی از دترمینان ماتریس‌ها استفاده می‌کند."
  },
  {
    id: 7,
    text: "دستگاه معادلات x + y = 2 و x - y = 0 چند جواب دارد؟",
    options: ["یک جواب", "دو جواب", "بی‌شمار جواب", "هیچ جواب"],
    correctIndex: 0,
    answer: "گزینه ۱: با حل دستگاه، x=1 و y=1 به دست می‌آید، پس یک جواب دارد."
  },

  // ==================== فصل سوم: بردارها و سامانه‌های مختصاتی ====================
  {
    id: 8,
    text: "ضرب داخلی دو بردار a = (2, 3) و b = (1, 4) چند است؟",
    options: ["۱۰", "۱۲", "۱۴", "۱۶"],
    correctIndex: 2,
    answer: "گزینه ۳: a·b = (2×1) + (3×4) = 2 + 12 = 14"
  },
  {
    id: 9,
    text: "زاویه بین دو بردار a = (1, 0) و b = (0, 1) چند درجه است؟",
    options: ["۰", "۴۵", "۶۰", "۹۰"],
    correctIndex: 3,
    answer: "گزینه ۴: a·b = 0، پس بردارها عمود بر هم هستند و زاویه بین آنها ۹۰ درجه است."
  },
  {
    id: 10,
    text: "در دستگاه مختصات قطبی، فاصله از مبدأ تا نقطه را چه می‌نامند؟",
    options: ["شعاع قطبی", "زاویه قطبی", "طول", "عرض"],
    correctIndex: 0,
    answer: "گزینه ۱: در دستگاه مختصات قطبی، فاصله از مبدأ تا نقطه را شعاع قطبی (r) می‌نامند."
  },
  {
    id: 11,
    text: "ضرب خارجی بردارهای i و j (بردارهای یکه در دستگاه دکارتی) برابر چیست؟",
    options: ["i", "j", "k", "۰"],
    correctIndex: 2,
    answer: "گزینه ۳: i × j = k (بردار یکه در جهت محور z)"
  },

  // ==================== فصل چهارم: مقاطع مخروطی ====================
  {
    id: 12,
    text: "معادله دایره به مرکز (۲, ۳) و شعاع ۴ کدام است؟",
    options: ["(x-2)² + (y-3)² = 16", "(x+2)² + (y+3)² = 16", "(x-2)² + (y-3)² = 4", "(x+2)² + (y+3)² = 4"],
    correctIndex: 0,
    answer: "گزینه ۱: معادله دایره: (x-h)² + (y-k)² = r² که (h,k) مرکز و r شعاع است."
  },
  {
    id: 13,
    text: "در بیضی با معادله x²/25 + y²/9 = 1، طول نصف‌محور بزرگ چند است؟",
    options: ["۳", "۴", "۵", "۹"],
    correctIndex: 2,
    answer: "گزینه ۳: در معادله بیضی، a²=25 پس a=5 (نصف‌محور بزرگ)."
  },
  {
    id: 14,
    text: "سهمی با معادله y² = 8x دارای کانون در کدام نقطه است؟",
    options: ["(۲, ۰)", "(۴, ۰)", "(۰, ۲)", "(۰, ۴)"],
    correctIndex: 0,
    answer: "گزینه ۱: برای سهمی y² = 4px، p=2 و کانون در (p,0) = (2,0) است."
  },
  {
    id: 15,
    text: "خروج از مرکز دایره چند است؟",
    options: ["۰", "۱", "بزرگتر از ۱", "کوچکتر از ۱"],
    correctIndex: 0,
    answer: "گزینه ۱: خروج از مرکز دایره برابر صفر است (چون کانون با مرکز یکی است)."
  },

  // ==================== سوالات ترکیبی ====================
  {
    id: 16,
    text: "اگر A = [1 0; 0 1] باشد، A² کدام است؟",
    options: ["[2 0; 0 2]", "[1 0; 0 1]", "[0 1; 1 0]", "[1 1; 1 1]"],
    correctIndex: 1,
    answer: "گزینه ۲: ماتریس A ماتریس همانی است و توان آن خودش می‌شود."
  },
  {
    id: 17,
    text: "دستگاه معادلات 2x + y = 5 و x + 2y = 4 را حل کنید. مقدار x+y چند است؟",
    options: ["۱", "۲", "۳", "۴"],
    correctIndex: 2,
    answer: "گزینه ۳: با حل دستگاه: x=2 و y=1، پس x+y=3"
  },
  {
    id: 18,
    text: "ضرب داخلی دو بردار عمود بر هم چند است؟",
    options: ["۰", "۱", "۲", "۳"],
    correctIndex: 0,
    answer: "گزینه ۱: ضرب داخلی دو بردار عمود بر هم برابر صفر است."
  },
  {
    id: 19,
    text: "معادله دایره‌ای که مرکز آن در مبدأ و شعاع آن ۳ است، کدام است؟",
    options: ["x² + y² = 9", "x² + y² = 3", "(x-3)² + y² = 9", "x² + (y-3)² = 9"],
    correctIndex: 0,
    answer: "گزینه ۱: معادله دایره به مرکز مبدأ: x² + y² = r² = 9"
  },
  {
    id: 20,
    text: "در بیضی x²/16 + y²/4 = 1، کانون‌ها در کدام نقاط قرار دارند؟",
    options: ["(±√12, 0)", "(0, ±√12)", "(±4, 0)", "(0, ±2)"],
    correctIndex: 0,
    answer: "گزینه ۱: c² = a² - b² = 16 - 4 = 12، پس کانون‌ها در (±√12, 0) هستند."
  },
  {
    id: 21,
    text: "ماتریس A = [2 3; 4 5] و B = [1 0; 0 1] هستند. A - B کدام است؟",
    options: ["[1 3; 4 4]", "[3 3; 4 6]", "[2 3; 4 5]", "[1 0; 0 1]"],
    correctIndex: 0,
    answer: "گزینه ۱: A - B = [2-1 3-0; 4-0 5-1] = [1 3; 4 4]"
  },
  {
    id: 22,
    text: "دستگاه معادلات 3x + 2y = 6 و 6x + 4y = 12 چه نوع دستگاهی است؟",
    options: ["سازگار و وابسته", "سازگار و مستقل", "ناسازگار", "بدون جواب"],
    correctIndex: 0,
    answer: "گزینه ۱: معادله دوم دو برابر معادله اول است، پس دستگاه وابسته است."
  },
  {
    id: 23,
    text: "نقطه (۳, ۴) در مختصات قطبی چگونه نمایش داده می‌شود؟ (r=5)",
    options: ["(۵, ۵۳.۱۳°)", "(۵, ۳۶.۸۷°)", "(۵, ۴۵°)", "(۵, ۶۰°)"],
    correctIndex: 0,
    answer: "گزینه ۱: r = √(9+16) = 5، θ = arctan(4/3) = 53.13°"
  },
  {
    id: 24,
    text: "سهمی با معادله x² = 12y دارای راس در چه نقطه‌ای است؟",
    options: ["(۰, ۰)", "(۳, ۰)", "(۰, ۳)", "(-۳, ۰)"],
    correctIndex: 0,
    answer: "گزینه ۱: راس سهمی x² = 4py در نقطه (0,0) است."
  },
  {
    id: 25,
    text: "اگر A = [a b; c d] باشد، دترمینان آن برابر است با:",
    options: ["ad - bc", "ab - cd", "ac - bd", "a + d - b - c"],
    correctIndex: 0,
    answer: "گزینه ۱: det(A) = ad - bc"
  },
  {
    id: 26,
    text: "ضرب خارجی دو بردار a = (1, 0, 0) و b = (0, 1, 0) برابر است با:",
    options: ["(۰, ۰, ۱)", "(۱, ۱, ۰)", "(۰, ۱, ۱)", "(۱, ۰, ۱)"],
    correctIndex: 0,
    answer: "گزینه ۱: i × j = k = (0, 0, 1)"
  },
  {
    id: 27,
    text: "معادله بیضی با مرکز مبدأ و کانون‌های (±3, 0) و نصف‌محور بزرگ ۵ کدام است؟",
    options: ["x²/25 + y²/16 = 1", "x²/16 + y²/25 = 1", "x²/25 + y²/9 = 1", "x²/9 + y²/25 = 1"],
    correctIndex: 0,
    answer: "گزینه ۱: a=5، c=3، b² = a² - c² = 25 - 9 = 16، پس x²/25 + y²/16 = 1"
  },
  {
    id: 28,
    text: "اگر A = [1 2; 3 4] و B = [5 6; 7 8] باشند، حاصل 2A - 3B کدام است؟",
    options: ["[-13 -14; -15 -16]", "[13 14; 15 16]", "[2 4; 6 8]", "[5 6; 7 8]"],
    correctIndex: 0,
    answer: "گزینه ۱: 2A - 3B = [2-15 4-18; 6-21 8-24] = [-13 -14; -15 -16]"
  },
  {
    id: 29,
    text: "دایره x² + y² = 25 چند نقطه تقاطع با محور x دارد؟",
    options: ["۰", "۱", "۲", "۳"],
    correctIndex: 2,
    answer: "گزینه ۳: با جایگذاری y=0: x² = 25 ⇒ x = ±5، پس دو نقطه تقاطع دارد."
  },
  {
    id: 30,
    text: "اگر A و B دو ماتریس ۲×۲ باشند، کدام یک از موارد زیر همواره برقرار است؟",
    options: ["AB = BA", "det(AB) = det(A)det(B)", "A+B = B+A", "همه موارد"],
    correctIndex: 1,
    answer: "گزینه ۲: دترمینان حاصل‌ضرب دو ماتریس برابر حاصل‌ضرب دترمینان‌های آنهاست. اما AB=BA همیشه برقرار نیست."
  },
];

const HendesehRiyaziFinalExam = () => {
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
        backgroundColor: '#6A1B9A',
        color: 'white',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '30px',
        textAlign: 'center',
        position: 'relative'
      }}>
        <button
          onClick={() => router.push('/exam/davazdahom/riyazi/sanjesh/second-half/hendeseh-3-riyazi')}
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
            <h1 style={{ margin: 0, fontSize: '28px' }}>📐 آزمون جامع هندسه ۳</h1>
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
                backgroundColor: '#6A1B9A',
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
              <span style={{ whiteSpace: 'pre-wrap' }}>{q.text}</span>
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
                      border: isSelected ? '3px solid #6A1B9A' : '1px solid #dee2e6',
                      borderRadius: '10px',
                      backgroundColor: isSelected ? '#f3e5f5' : '#fff',
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
                      backgroundColor: isSelected ? '#6A1B9A' : '#fff',
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
                  backgroundColor: canCalculate ? '#6A1B9A' : '#6c757d',
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
              <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#6A1B9A' }}>
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
            borderTop: '4px solid #6A1B9A',
            paddingTop: '40px',
            backgroundColor: '#ffffff',
            padding: '40px',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
            width: '100%'
          }}>
            <h2 style={{
              textAlign: 'center',
              borderBottom: '3px solid #6A1B9A',
              paddingBottom: '20px',
              marginBottom: '40px',
              fontSize: '26px',
              color: '#6A1B9A'
            }}>
              📝 پاسخنامه تشریحی هندسه ۳
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
                      color: '#6A1B9A',
                      backgroundColor: '#f3e5f5',
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
                    <span style={{ fontWeight: 'bold', color: '#6A1B9A' }}>📖 توضیح:</span>
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

export default HendesehRiyaziFinalExam;