"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';

const ZaminShenasiFinalExam = () => {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  // ================= سوالات زمین‌شناسی - جامع =================
  const questions = useMemo(() => [
    // ==================== فصل اول: زمین شناسی و ساختمان آن ====================
    {
      id: 1,
      text: "زمین از چند لایه اصلی تشکیل شده است؟",
      options: ["۲", "۳", "۴", "۵"],
      correctIndex: 1,
      answer: "گزینه ۲: زمین از ۳ لایه اصلی پوسته، گوشته و هسته تشکیل شده است."
    },
    {
      id: 2,
      text: "کدام یک از موارد زیر در پوسته زمین یافت می‌شود؟",
      options: ["هسته داخلی", "گوشته", "سنگ‌ها و کانی‌ها", "هسته خارجی"],
      correctIndex: 2,
      answer: "گزینه ۳: سنگ‌ها و کانی‌ها در پوسته زمین یافت می‌شوند."
    },
    {
      id: 3,
      text: "کانی چیست؟",
      options: ["یک ماده آلی", "یک ماده معدنی جامد با ترکیب شیمیایی مشخص", "یک نوع سنگ", "یک ماده مایع"],
      correctIndex: 1,
      answer: "گزینه ۲: کانی یک ماده معدنی جامد با ترکیب شیمیایی مشخص و ساختار بلوری است."
    },
    {
      id: 4,
      text: "کدام یک از موارد زیر یک سنگ آذرین است؟",
      options: ["سنگ آهک", "سنگ مرمر", "بازالت", "ماسه سنگ"],
      correctIndex: 2,
      answer: "گزینه ۳: بازالت یک سنگ آذرین است که از سرد شدن گدازه‌های آتشفشانی تشکیل می‌شود."
    },
    {
      id: 5,
      text: "فرسایش چیست؟",
      options: ["رسوب‌گذاری مواد", "خرد شدن و حمل مواد توسط عوامل طبیعی", "تشکیل سنگ‌های جدید", "ذوب شدن سنگ‌ها"],
      correctIndex: 1,
      answer: "گزینه ۲: فرسایش فرآیند خرد شدن و حمل مواد توسط عوامل طبیعی مانند آب، باد و یخ است."
    },
    {
      id: 6,
      text: "گسل چیست؟",
      options: ["شکستگی در پوسته زمین که دو بلوک در دو طرف آن حرکت می‌کنند", "چین‌خوردگی لایه‌های زمین", "یک نوع کانی", "یک نوع سنگ"],
      correctIndex: 0,
      answer: "گزینه ۱: گسل شکستگی در پوسته زمین است که دو بلوک سنگی در دو طرف آن حرکت می‌کنند."
    },

    // ==================== فصل دوم: آب و هوا ====================
    {
      id: 7,
      text: "منبع اصلی آب‌های سطحی چیست؟",
      options: ["آب‌های زیرزمینی", "بارندگی", "ذوب یخچال‌ها", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: آب‌های سطحی از بارندگی، ذوب یخچال‌ها و آب‌های زیرزمینی تأمین می‌شوند."
    },
    {
      id: 8,
      text: "چرخه آب شامل چه مراحلی است؟",
      options: ["تبخیر، تعرق، بارش و رواناب", "تبخیر و بارش", "تعرق و رواناب", "یخبندان و ذوب"],
      correctIndex: 0,
      answer: "گزینه ۱: چرخه آب شامل تبخیر، تعرق، بارش و رواناب است."
    },
    {
      id: 9,
      text: "منابع آب ایران عمدتاً از کجا تأمین می‌شود؟",
      options: ["بارندگی", "آب‌های زیرزمینی", "دریاچه‌ها", "رودخانه‌ها"],
      correctIndex: 1,
      answer: "گزینه ۲: منابع آب ایران عمدتاً از آب‌های زیرزمینی تأمین می‌شود."
    },
    {
      id: 10,
      text: "آلودگی آب به چه عواملی ایجاد می‌شود؟",
      options: ["فاضلاب‌های صنعتی", "کودهای شیمیایی", "فاضلاب‌های خانگی", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: آلودگی آب توسط فاضلاب‌های صنعتی، کودهای شیمیایی و فاضلاب‌های خانگی ایجاد می‌شود."
    },
    {
      id: 11,
      text: "سفره‌های آب زیرزمینی در کدام لایه تشکیل می‌شوند؟",
      options: ["سنگ‌های نفوذپذیر", "سنگ‌های نفوذناپذیر", "گوشته", "هسته"],
      correctIndex: 0,
      answer: "گزینه ۱: سفره‌های آب زیرزمینی در سنگ‌های نفوذپذیر مانند ماسه‌سنگ و آهک تشکیل می‌شوند."
    },
    {
      id: 12,
      text: "عوامل مؤثر بر اقلیم کدامند؟",
      options: ["عرض جغرافیایی", "ارتفاع", "فاصله از دریا", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: عوامل مؤثر بر اقلیم شامل عرض جغرافیایی، ارتفاع، فاصله از دریا و جریان‌های دریایی است."
    },

    // ==================== فصل سوم: زمین و زمان ====================
    {
      id: 13,
      text: "زمین‌شناسی تاریخی به چه موضوعی می‌پردازد؟",
      options: ["تاریخچه زمین و تغییرات آن", "ساختمان زمین", "کانی‌ها", "آب‌های زیرزمینی"],
      correctIndex: 0,
      answer: "گزینه ۱: زمین‌شناسی تاریخی به تاریخچه زمین و تغییرات آن در طول زمان می‌پردازد."
    },
    {
      id: 14,
      text: "فسیل چیست؟",
      options: ["بقایای موجودات زنده در سنگ‌ها", "یک نوع کانی", "یک سنگ قیمتی", "یک ماده آلی"],
      correctIndex: 0,
      answer: "گزینه ۱: فسیل بقایای موجودات زنده است که در سنگ‌ها حفظ شده است."
    },
    {
      id: 15,
      text: "زلزله چگونه ایجاد می‌شود؟",
      options: ["حرکت صفحات زمین", "فوران آتشفشان", "فرسایش", "رسوب‌گذاری"],
      correctIndex: 0,
      answer: "گزینه ۱: زلزله بر اثر حرکت صفحات زمین و آزاد شدن انرژی در گسل‌ها ایجاد می‌شود."
    },
    {
      id: 16,
      text: "آتشفشان چیست؟",
      options: ["شکاف در پوسته زمین که گدازه خارج می‌شود", "یک نوع سنگ", "یک نوع کانی", "یک فرآیند فرسایش"],
      correctIndex: 0,
      answer: "گزینه ۱: آتشفشان شکافی در پوسته زمین است که گدازه، خاکستر و گاز از آن خارج می‌شود."
    },
    {
      id: 17,
      text: "دوران‌های زمین‌شناسی به ترتیب کدامند؟",
      options: ["پرکامبرین، پالئوزوئیک، مزوزوئیک، سنوزوئیک", "سنوزوئیک، مزوزوئیک، پالئوزوئیک، پرکامبرین", "مزوزوئیک، پالئوزوئیک، سنوزوئیک", "پرکامبرین، مزوزوئیک، پالئوزوئیک"],
      correctIndex: 0,
      answer: "گزینه ۱: دوران‌های زمین‌شناسی به ترتیب: پرکامبرین، پالئوزوئیک، مزوزوئیک، سنوزوئیک هستند."
    },
    {
      id: 18,
      text: "تغییرات پوسته زمین شامل چه مواردی است؟",
      options: ["چین‌خوردگی", "گسل‌خوردگی", "زلزله", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: تغییرات پوسته زمین شامل چین‌خوردگی، گسل‌خوردگی و زلزله است."
    },

    // ==================== فصل چهارم: منابع طبیعی ====================
    {
      id: 19,
      text: "منابع معدنی به چند دسته تقسیم می‌شوند؟",
      options: ["فلزی و غیرفلزی", "آلی و معدنی", "جامد و مایع", "سطحی و زیرزمینی"],
      correctIndex: 0,
      answer: "گزینه ۱: منابع معدنی به دو دسته فلزی (آهن، مس، طلا) و غیرفلزی (سنگ‌های ساختمانی) تقسیم می‌شوند."
    },
    {
      id: 20,
      text: "کدام یک از موارد زیر یک منبع انرژی تجدیدپذیر است؟",
      options: ["نفت", "گاز طبیعی", "انرژی خورشیدی", "زغال سنگ"],
      correctIndex: 2,
      answer: "گزینه ۳: انرژی خورشیدی یک منبع انرژی تجدیدپذیر است."
    },
    {
      id: 21,
      text: "توسعه پایدار به چه معناست؟",
      options: ["استفاده بی‌رویه از منابع", "تأمین نیازهای فعلی بدون به خطر انداختن آینده", "توقف رشد اقتصادی", "استفاده از منابع فسیلی"],
      correctIndex: 1,
      answer: "گزینه ۲: توسعه پایدار تأمین نیازهای فعلی بدون به خطر انداختن توانایی نسل‌های آینده است."
    },
    {
      id: 22,
      text: "مدیریت منابع طبیعی چه اهمیتی دارد؟",
      options: ["حفاظت از محیط زیست", "تأمین منابع برای آینده", "پایداری اقتصادی", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: مدیریت منابع طبیعی برای حفاظت از محیط زیست، تأمین منابع آینده و پایداری اقتصادی اهمیت دارد."
    },
    {
      id: 23,
      text: "کدام یک از موارد زیر یک منبع انرژی فسیلی است؟",
      options: ["نفت", "باد", "خورشید", "آب"],
      correctIndex: 0,
      answer: "گزینه ۱: نفت یک منبع انرژی فسیلی است."
    },
    {
      id: 24,
      text: "صنایع معدنی چه تأثیری بر محیط زیست دارند؟",
      options: ["آلودگی هوا", "آلودگی آب", "تخریب زمین", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: صنایع معدنی باعث آلودگی هوا، آلودگی آب و تخریب زمین می‌شوند."
    },

    // ==================== سوالات ترکیبی ====================
    {
      id: 25,
      text: "کدام یک از موارد زیر در گوشته زمین یافت می‌شود؟",
      options: ["سنگ‌های مذاب", "کانی‌های سطحی", "آب‌های زیرزمینی", "فسیل‌ها"],
      correctIndex: 0,
      answer: "گزینه ۱: سنگ‌های مذاب در گوشته زمین وجود دارند."
    },
    {
      id: 26,
      text: "بحران آب در ایران به چه دلیل ایجاد شده است؟",
      options: ["کمبود بارندگی", "مصرف بی‌رویه", "تغییر اقلیم", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: بحران آب در ایران به دلیل کمبود بارندگی، مصرف بی‌رویه و تغییر اقلیم ایجاد شده است."
    },
    {
      id: 27,
      text: "کدام یک از موارد زیر یک سنگ رسوبی است؟",
      options: ["گرانیت", "بازالت", "سنگ آهک", "مرمر"],
      correctIndex: 2,
      answer: "گزینه ۳: سنگ آهک یک سنگ رسوبی است که از رسوب مواد آلی و معدنی تشکیل می‌شود."
    },
    {
      id: 28,
      text: "چه عواملی در تشکیل خاک نقش دارند؟",
      options: ["سنگ مادر", "آب و هوا", "موجودات زنده", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: تشکیل خاک تحت تأثیر سنگ مادر، آب و هوا، موجودات زنده و زمان است."
    },
    {
      id: 29,
      text: "کدام یک از موارد زیر یک کانی است؟",
      options: ["سنگ گرانیت", "کوارتز", "سنگ مرمر", "ماسه سنگ"],
      correctIndex: 1,
      answer: "گزینه ۲: کوارتز یک کانی با فرمول شیمیایی SiO₂ است."
    },
    {
      id: 30,
      text: "انسان چه تأثیری بر زمین‌شناسی دارد؟",
      options: ["تغییر شکل زمین", "آلودگی منابع", "تغییر اقلیم", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: انسان با تغییر شکل زمین، آلودگی منابع و تغییر اقلیم بر زمین‌شناسی تأثیر می‌گذارد."
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

  // ========== صفحه‌بندی ==========
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
        backgroundColor: '#2E7D32',
        color: 'white',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '30px',
        textAlign: 'center',
        position: 'relative'
      }}>
        <button 
          onClick={() => router.push('/exam/davazdahom/tajrobi/ghalamchi/first-half/zamin-shenasi')}
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
            <h1 style={{ margin: 0, fontSize: '28px' }}>🌍 آزمون جامع زمین‌شناسی</h1>
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
                  backgroundColor: '#2E7D32',
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
                        border: isSelected ? '3px solid #2E7D32' : '1px solid #dee2e6',
                        borderRadius: '10px',
                        backgroundColor: isSelected ? '#e8f5e9' : '#fff',
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
                        backgroundColor: isSelected ? '#2E7D32' : '#fff',
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
                backgroundColor: currentPage === 0 ? '#e9ecef' : '#2E7D32',
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
                backgroundColor: currentPage === totalPages - 1 ? '#e9ecef' : '#2E7D32',
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
                  backgroundColor: canCalculate ? '#2E7D32' : '#6c757d',
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
              <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#2E7D32' }}>
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
            borderTop: '4px solid #2E7D32',
            paddingTop: '40px',
            backgroundColor: '#ffffff',
            padding: '40px',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
            width: '100%'
          }}>
            <h2 style={{ 
              textAlign: 'center', 
              borderBottom: '3px solid #2E7D32', 
              paddingBottom: '20px', 
              marginBottom: '40px',
              fontSize: '26px',
              color: '#2E7D32'
            }}>
              📝 پاسخنامه تشریحی زمین‌شناسی
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
                      color: '#2E7D32',
                      backgroundColor: '#e8f5e9',
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
                    <span style={{ fontWeight: 'bold', color: '#2E7D32' }}>📖 توضیح:</span> 
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

export default ZaminShenasiFinalExam;
