"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';

const Fizik3RiyaziFinalExam = () => {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  // ================= سوالات فیزیک ۳ - جامع نیم‌سال دوم =================
  const questions = useMemo(() => [
    // ==================== فصل اول: حرکت شناسی ====================
    {
      id: 1,
      text: "اگر جسمی با سرعت ثابت ۱۰ متر بر ثانیه حرکت کند، در ۵ ثانیه چند متر مسافت طی می‌کند؟",
      options: ["۵۰", "۴۰", "۳۰", "۲۰"],
      correctIndex: 0,
      answer: "گزینه ۱: مسافت = سرعت × زمان = ۱۰ × ۵ = ۵۰ متر"
    },
    {
      id: 2,
      text: "شتاب متوسط در حرکت با شتاب ثابت چه رابطه‌ای دارد؟",
      options: ["a = Δv/Δt", "a = v/t", "a = Δx/Δt", "a = v²/r"],
      correctIndex: 0,
      answer: "گزینه ۱: شتاب متوسط برابر با تغییرات سرعت تقسیم بر تغییرات زمان است."
    },
    {
      id: 3,
      text: "در سقوط آزاد، شتاب جسم برابر با چه مقدار است؟ (g = ۹.۸ m/s²)",
      options: ["۹.۸ m/s²", "۴.۹ m/s²", "۱۹.۶ m/s²", "۰ m/s²"],
      correctIndex: 0,
      answer: "گزینه ۱: شتاب سقوط آزاد برابر با g = ۹.۸ m/s² است."
    },
    {
      id: 4,
      text: "حرکت دایره‌ای یکنواخت چه ویژگی دارد؟",
      options: ["سرعت ثابت و شتاب صفر", "سرعت ثابت و شتاب مرکزگرا", "سرعت متغیر و شتاب ثابت", "سرعت صفر و شتاب ثابت"],
      correctIndex: 1,
      answer: "گزینه ۲: در حرکت دایره‌ای یکنواخت، سرعت ثابت است و شتاب به سمت مرکز دارد."
    },
    {
      id: 5,
      text: "فرمول سرعت زاویه‌ای در حرکت دایره‌ای چیست؟",
      options: ["ω = v/r", "ω = r/v", "ω = v×r", "ω = r²/v"],
      correctIndex: 0,
      answer: "گزینه ۱: سرعت زاویه‌ای برابر با سرعت خطی تقسیم بر شعاع است."
    },
    {
      id: 6,
      text: "در حرکت پرتابی، چه کمیتی ثابت است؟",
      options: ["سرعت افقی", "سرعت عمودی", "شتاب افقی", "شتاب عمودی"],
      correctIndex: 0,
      answer: "گزینه ۱: در حرکت پرتابی، سرعت افقی ثابت است و شتاب افقی صفر است."
    },

    // ==================== فصل دوم: دینامیک ====================
    {
      id: 7,
      text: "قانون دوم نیوتن چه رابطه‌ای را بیان می‌کند؟",
      options: ["F = ma", "F = mv", "F = m/a", "F = a/m"],
      correctIndex: 0,
      answer: "گزینه ۱: قانون دوم نیوتن: نیروی وارد بر جسم برابر با جرم ضرب در شتاب است."
    },
    {
      id: 8,
      text: "نیروی اصطکاک ایستایی چه ویژگی دارد؟",
      options: ["همیشه ثابت است", "تا حدی می‌تواند تغییر کند", "همیشه صفر است", "همیشه برابر با نیروی عمودی است"],
      correctIndex: 1,
      answer: "گزینه ۲: نیروی اصطکاک ایستایی می‌تواند تا حد بیشینه خود تغییر کند."
    },
    {
      id: 9,
      text: "ضریب اصطکاک جنبشی به چه عواملی بستگی دارد؟",
      options: ["به جنس سطوح", "به سرعت جسم", "به وزن جسم", "به سطح تماس"],
      correctIndex: 0,
      answer: "گزینه ۱: ضریب اصطکاک جنبشی به جنس سطوح در تماس بستگی دارد."
    },
    {
      id: 10,
      text: "نیروی مقاومت سیال با چه عاملی متناسب است؟",
      options: ["سرعت", "شتاب", "جرم", "چگالی"],
      correctIndex: 0,
      answer: "گزینه ۱: نیروی مقاومت سیال معمولاً با سرعت یا مجذور سرعت متناسب است."
    },
    {
      id: 11,
      text: "در دستگاه‌های غیرلخت، نیروی مجازی به چه نیرویی گفته می‌شود؟",
      options: ["نیروی گریز از مرکز", "نیروی وزن", "نیروی اصطکاک", "نیروی عمودی"],
      correctIndex: 0,
      answer: "گزینه ۱: نیروی گریز از مرکز یک نیروی مجازی در دستگاه‌های غیرلخت است."
    },
    {
      id: 12,
      text: "نیروی عکس‌العمل در قانون سوم نیوتن به چه جسمی وارد می‌شود؟",
      options: ["جسم دیگر", "همان جسم", "زمین", "هیچکدام"],
      correctIndex: 0,
      answer: "گزینه ۱: نیروی عکس‌العمل به جسم دیگری وارد می‌شود."

    },

    // ==================== فصل سوم: کار و انرژی ====================
    {
      id: 13,
      text: "فرمول کار در فیزیک چیست؟",
      options: ["W = Fd cosθ", "W = Fd sinθ", "W = F/d", "W = mgh"],
      correctIndex: 0,
      answer: "گزینه ۱: کار برابر با نیرو ضرب در جابجایی ضرب در کسینوس زاویه بین آنها است."
    },
    {
      id: 14,
      text: "انرژی جنبشی یک جسم با جرم m و سرعت v برابر است با:",
      options: ["½mv²", "mv²", "½mv", "mgh"],
      correctIndex: 0,
      answer: "گزینه ۱: انرژی جنبشی = ½ × جرم × مجذور سرعت"
    },
    {
      id: 15,
      text: "انرژی پتانسیل گرانشی با چه فرمولی محاسبه می‌شود؟",
      options: ["mgh", "½kx²", "½mv²", "mg"],
      correctIndex: 0,
      answer: "گزینه ۱: انرژی پتانسیل گرانشی = جرم × شتاب گرانش × ارتفاع"
    },
    {
      id: 16,
      text: "قانون پایستگی انرژی مکانیکی چه می‌گوید؟",
      options: ["انرژی کل ثابت است", "انرژی جنبشی ثابت است", "انرژی پتانسیل ثابت است", "کار کل ثابت است"],
      correctIndex: 0,
      answer: "گزینه ۱: در سیستم‌های پایستار، مجموع انرژی جنبشی و پتانسیل ثابت است."
    },
    {
      id: 17,
      text: "توان در فیزیک به چه معناست؟",
      options: ["کار انجام شده در واحد زمان", "نیرو در واحد زمان", "انرژی در واحد زمان", "جابجایی در واحد زمان"],
      correctIndex: 0,
      answer: "گزینه ۱: توان برابر با کار انجام شده تقسیم بر زمان است."
    },
    {
      id: 18,
      text: "راندمان یک ماشین چیست؟",
      options: ["کار مفید / کار مصرفی", "کار مصرفی / کار مفید", "انرژی ورودی / انرژی خروجی", "توان مصرفی / توان مفید"],
      correctIndex: 0,
      answer: "گزینه ۱: راندمان = کار مفید تقسیم بر کار مصرفی"

    },

    // ==================== فصل چهارم: تکانه و برخورد ====================
    {
      id: 19,
      text: "تکانه خطی یک جسم با جرم m و سرعت v برابر است با:",
      options: ["mv", "½mv²", "mgh", "FΔt"],
      correctIndex: 0,
      answer: "گزینه ۱: تکانه خطی = جرم × سرعت"
    },
    {
      id: 20,
      text: "ضربه در فیزیک به چه معناست؟",
      options: ["FΔt", "mv", "½mv²", "mgh"],
      correctIndex: 0,
      answer: "گزینه ۱: ضربه = نیرو × زمان"
    },
    {
      id: 21,
      text: "قانون پایستگی تکانه در چه شرایطی برقرار است؟",
      options: ["نیروی خارجی صفر باشد", "نیروی خارجی ثابت باشد", "نیروی داخلی صفر باشد", "همیشه برقرار است"],
      correctIndex: 0,
      answer: "گزینه ۱: در صورت صفر بودن نیروی خارجی، تکانه کل سیستم پایسته است."
    },
    {
      id: 22,
      text: "در برخورد کشسان چه کمیتی پایسته است؟",
      options: ["انرژی جنبشی", "انرژی پتانسیل", "نیرو", "شتاب"],
      correctIndex: 0,
      answer: "گزینه ۱: در برخورد کشسان، انرژی جنبشی و تکانه پایسته هستند."
    },
    {
      id: 23,
      text: "مرکز جرم یک سیستم چه ویژگی دارد؟",
      options: ["نقطه‌ای که سیستم حول آن حرکت می‌کند", "نقطه‌ای که جرم در آن متمرکز است", "نقطه‌ای که نیروهای خارجی به آن وارد می‌شوند", "نقطه‌ای که انرژی در آن متمرکز است"],
      correctIndex: 0,
      answer: "گزینه ۱: مرکز جرم نقطه‌ای است که سیستم حول آن حرکت می‌کند."
    },
    {
      id: 24,
      text: "در برخورد ناکشسان چه اتفاقی می‌افتد؟",
      options: ["انرژی جنبشی پایسته نیست", "انرژی جنبشی پایسته است", "تکانه پایسته نیست", "جسم‌ها از هم جدا می‌شوند"],
      correctIndex: 0,
      answer: "گزینه ۱: در برخورد ناکشسان، انرژی جنبشی پایسته نیست و بخشی از آن به صورت گرما تلف می‌شود."
    },

    // ==================== سوالات ترکیبی ====================
    {
      id: 25,
      text: "اگر جسمی از ارتفاع ۲۰ متری سقوط کند، سرعت آن هنگام برخورد با زمین چقدر است؟ (g=۱۰ m/s²)",
      options: ["۲۰ m/s", "۱۰ m/s", "۴۰ m/s", "۳۰ m/s"],
      correctIndex: 0,
      answer: "گزینه ۱: v = √(۲gh) = √(۲×۱۰×۲۰) = √۴۰۰ = ۲۰ m/s"
    },
    {
      id: 26,
      text: "نیروی گرانشی بین دو جسم با جرم m1 و m2 و فاصله r برابر است با:",
      options: ["Gm1m2/r²", "Gm1m2/r", "Gm1m2/r³", "Gm1m2"],
      correctIndex: 0,
      answer: "گزینه ۱: نیروی گرانشی = G × m1 × m2 / r²"
    },
    {
      id: 27,
      text: "شتاب مرکزگرا در حرکت دایره‌ای برابر است با:",
      options: ["v²/r", "v/r", "v²r", "vr"],
      correctIndex: 0,
      answer: "گزینه ۱: شتاب مرکزگرا = سرعت خطی مجذور تقسیم بر شعاع"
    },
    {
      id: 28,
      text: "کار نیروی وزن در حرکت افقی چقدر است؟",
      options: ["صفر", "mgh", "mgd", "½mv²"],
      correctIndex: 0,
      answer: "گزینه ۱: کار نیروی وزن در حرکت افقی صفر است چون زاویه بین نیرو و جابجایی ۹۰ درجه است."
    },
    {
      id: 29,
      text: "در حرکت پرتابی، برد یک پرتابه به چه عواملی بستگی دارد؟",
      options: ["سرعت اولیه و زاویه پرتاب", "فقط سرعت اولیه", "فقط زاویه پرتاب", "جرم پرتابه"],
      correctIndex: 0,
      answer: "گزینه ۱: برد پرتابه به سرعت اولیه و زاویه پرتاب بستگی دارد."
    },
    {
      id: 30,
      text: "قانون گرانش جهانی نیوتن برای چه اجسامی کاربرد دارد؟",
      options: ["همه اجسام با جرم", "فقط سیاره‌ها", "فقط ستاره‌ها", "فقط اجسام روی زمین"],
      correctIndex: 0,
      answer: "گزینه ۱: قانون گرانش جهانی برای همه اجسام با جرم کاربرد دارد."
    },
  ], []);

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
  }, [questions, selectedAnswers]);

  // ========== تابع انتخاب گزینه ==========
  const handleOptionClick = useCallback((questionId: number, optionIndex: number) => {
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
  }, [isTimeUp, isScoreCalculated]);

  // ========== تابع ریست ==========
  const handleReset = useCallback(() => {
    setIsScoreCalculated(false);
    setScore(null);
    isCalculatedRef.current = false;
    isTimeUpRef.current = false;
    setIsTimeUp(false);
    setTimeLeft(60 * 60);
    setSelectedAnswers({});
    setShowAnswers(false);
  }, []);

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

  // ========== نمایش سوالات با صفحه‌بندی ==========
  const [currentPage, setCurrentPage] = useState(0);
  const questionsPerPage = 10;

  const currentQuestions = useMemo(() => {
    const start = currentPage * questionsPerPage;
    const end = start + questionsPerPage;
    return questions.slice(start, end);
  }, [questions, currentPage]);

  const totalPages = Math.ceil(questions.length / questionsPerPage);

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
        backgroundColor: '#FF6F00',
        color: 'white',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '30px',
        textAlign: 'center',
        position: 'relative'
      }}>
        <button 
          onClick={() => router.push('/exam/davazdahom/riyazi/ghalamchi/first-half/fizik-3-riyazi')}
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
          ← بازگشت به فصل‌ها
        </button>
        
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '28px' }}>⚡ آزمون جامع فیزیک ۳</h1>
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
        {currentQuestions.map((q, index) => {
          const actualIndex = currentPage * questionsPerPage + index;
          return (
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
                  backgroundColor: '#FF6F00',
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
                  {actualIndex + 1}
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
                        border: isSelected ? '3px solid #FF6F00' : '1px solid #dee2e6',
                        borderRadius: '10px',
                        backgroundColor: isSelected ? '#fff3e0' : '#fff',
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
                        backgroundColor: isSelected ? '#FF6F00' : '#fff',
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
          );
        })}

        {/* صفحه‌بندی */}
        {!isTimeUp && !isScoreCalculated && questions.length > questionsPerPage && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '15px',
            margin: '20px 0',
            padding: '15px',
            backgroundColor: '#fff',
            borderRadius: '8px',
            border: '1px solid #dee2e6'
          }}>
            <button
              onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
              disabled={currentPage === 0}
              style={{
                padding: '8px 20px',
                backgroundColor: currentPage === 0 ? '#e9ecef' : '#FF6F00',
                color: currentPage === 0 ? '#6c757d' : '#fff',
                border: 'none',
                borderRadius: '6px',
                cursor: currentPage === 0 ? 'not-allowed' : 'pointer',
                fontSize: '14px',
                fontWeight: 'bold'
              }}
            >
              ← قبلی
            </button>
            
            <span style={{ fontSize: '16px', fontWeight: 'bold' }}>
              صفحه {currentPage + 1} از {totalPages}
            </span>
            
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
              disabled={currentPage === totalPages - 1}
              style={{
                padding: '8px 20px',
                backgroundColor: currentPage === totalPages - 1 ? '#e9ecef' : '#FF6F00',
                color: currentPage === totalPages - 1 ? '#6c757d' : '#fff',
                border: 'none',
                borderRadius: '6px',
                cursor: currentPage === totalPages - 1 ? 'not-allowed' : 'pointer',
                fontSize: '14px',
                fontWeight: 'bold'
              }}
            >
              بعدی →
            </button>
          </div>
        )}

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
                  backgroundColor: canCalculate ? '#FF6F00' : '#6c757d',
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
              {isTimeUp && !isScoreCalculated && (
                <p style={{ marginTop: '10px', color: '#dc3545', fontSize: '14px', fontWeight: 'bold' }}>
                  ⏰ زمان تمام شد! نتایج در حال محاسبه...
                </p>
              )}
            </div>
          ) : (
            <div>
              <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#FF6F00' }}>
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
                onClick={handleReset}
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
                🔄 شروع مجدد آزمون
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
            borderTop: '4px solid #FF6F00',
            paddingTop: '40px',
            backgroundColor: '#ffffff',
            padding: '40px',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
            width: '100%'
          }}>
            <h2 style={{ 
              textAlign: 'center', 
              borderBottom: '3px solid #FF6F00', 
              paddingBottom: '20px', 
              marginBottom: '40px',
              fontSize: '26px',
              color: '#FF6F00'
            }}>
              📝 پاسخنامه تشریحی فیزیک ۳
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
                      color: '#FF6F00',
                      backgroundColor: '#fff3e0',
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
                    <span style={{ fontWeight: 'bold', color: '#FF6F00' }}>📖 توضیح:</span> 
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

export default Fizik3RiyaziFinalExam;