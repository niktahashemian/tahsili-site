"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

// ================= سوالات شیمی ۳ - جامع نیم‌سال اول تجربی قلمچی =================
const QUESTIONS = [
  // ==================== فصل اول: مولکول‌ها در خدمت تندرستی ====================
  {
    id: 1,
    text: "ویتامین C در کدام دسته از ویتامین‌ها قرار می‌گیرد؟",
    options: ["محلول در چربی", "محلول در آب", "محلول در الکل", "محلول در اسید"],
    correctIndex: 1,
    answer: "گزینه ۲: ویتامین C (اسید اسکوربیک) در آب حل می‌شود و جزو ویتامین‌های محلول در آب است."
  },
  {
    id: 2,
    text: "کدام یک از مواد زیر برای درمان کم‌خونی مفید است؟",
    options: ["آهن", "کلسیم", "پتاسیم", "منیزیم"],
    correctIndex: 0,
    answer: "گزینه ۱: آهن برای ساخت هموگلوبین خون ضروری است و کمبود آن باعث کم‌خونی می‌شود."
  },
  {
    id: 3,
    text: "آنتی‌بیوتیک‌ها چه تأثیری بر باکتری‌ها دارند؟",
    options: ["آنها را تغذیه می‌کنند", "آنها را تکثیر می‌کنند", "آنها را از بین می‌برند یا رشدشان را متوقف می‌کنند", "هیچ تأثیری ندارند"],
    correctIndex: 2,
    answer: "گزینه ۳: آنتی‌بیوتیک‌ها باکتری‌ها را از بین می‌برند یا رشد و تکثیر آنها را متوقف می‌کنند."
  },
  {
    id: 4,
    text: "کربوهیدرات‌ها در بدن چه نقشی دارند؟",
    options: ["تأمین انرژی", "ساخت بافت", "تنظیم دما", "انتقال پیام عصبی"],
    correctIndex: 0,
    answer: "گزینه ۱: کربوهیدرات‌ها منبع اصلی تأمین انرژی در بدن هستند."
  },
  {
    id: 5,
    text: "کدام یک از موارد زیر پروتئین نیست؟",
    options: ["گلوتن", "کراتین", "گلیکوژن", "کلاژن"],
    correctIndex: 2,
    answer: "گزینه ۳: گلیکوژن یک پلی‌ساکارید (کربوهیدرات) است و پروتئین محسوب نمی‌شود."
  },

  // ==================== فصل دوم: آسایش و رفاه در سایه شیمی ====================
  {
    id: 6,
    text: "مواد شوینده چگونه عمل می‌کنند؟",
    options: ["با افزایش کشش سطحی", "با کاهش کشش سطحی", "با افزایش pH", "با کاهش دما"],
    correctIndex: 1,
    answer: "گزینه ۲: مواد شوینده با کاهش کشش سطحی آب، باعث نفوذ بهتر آب به الیاف و پاک‌کنندگی بهتر می‌شوند."
  },
  {
    id: 7,
    text: "پلی‌مرهای طبیعی کدامند؟",
    options: ["پلی اتیلن", "سلولز و پروتئین", "نایلون", "پلی استایرن"],
    correctIndex: 1,
    answer: "گزینه ۲: سلولز و پروتئین از پلی‌مرهای طبیعی هستند که در طبیعت یافت می‌شوند."
  },
  {
    id: 8,
    text: "کدام یک از موارد زیر سرامیک محسوب می‌شود؟",
    options: ["شیشه", "فلز", "چینی و سفال", "پلاستیک"],
    correctIndex: 2,
    answer: "گزینه ۳: چینی و سفال از جمله سرامیک‌ها هستند که از مواد معدنی ساخته می‌شوند."
  },
  {
    id: 9,
    text: "نانومواد به موادی گفته می‌شود که ابعاد آنها در چه محدوده‌ای است؟",
    options: ["۱-۱۰۰ نانومتر", "۱-۱۰۰ میکرومتر", "۱-۱۰۰ میلی‌متر", "۱-۱۰۰ متر"],
    correctIndex: 0,
    answer: "گزینه ۱: نانومواد موادی هستند که حداقل یکی از ابعاد آنها بین ۱ تا ۱۰۰ نانومتر باشد."
  },

  // ==================== فصل سوم: شیمی جلوه‌ای از هنر، زیبایی و ماندگاری ====================
  {
    id: 10,
    text: "رنگ‌های طبیعی از چه منابعی به دست می‌آیند؟",
    options: ["مواد نفتی", "گیاهان و جانوران", "فلزات", "پلیمرها"],
    correctIndex: 1,
    answer: "گزینه ۲: رنگ‌های طبیعی از منابع گیاهی (مانند زعفران، حنا) و جانوری به دست می‌آیند."
  },
  {
    id: 11,
    text: "عطرها عمدتاً از چه ترکیباتی تشکیل شده‌اند؟",
    options: ["ترکیبات آلی فرار", "نمک‌های معدنی", "اسیدهای قوی", "بازهای قوی"],
    correctIndex: 0,
    answer: "گزینه ۱: عطرها از ترکیبات آلی فرار تشکیل شده‌اند که به راحتی تبخیر شده و بو ایجاد می‌کنند."
  },
  {
    id: 12,
    text: "شیمی سبز بر چه اصولی تأکید دارد؟",
    options: ["کاهش آلودگی و پسماند", "افزایش مصرف مواد", "استفاده از مواد سمی", "افزایش دما"],
    correctIndex: 0,
    answer: "گزینه ۱: شیمی سبز بر کاهش آلودگی، کاهش پسماند و استفاده از مواد سازگار با محیط زیست تأکید دارد."
  },

  // ==================== فصل چهارم: شیمی در مسیر تولید و فناوری ====================
  {
    id: 13,
    text: "کاتالیزور چه تأثیری بر واکنش شیمیایی دارد؟",
    options: ["سرعت واکنش را افزایش می‌دهد", "سرعت واکنش را کاهش می‌دهد", "محصول واکنش را تغییر می‌دهد", "هیچ تأثیری ندارد"],
    correctIndex: 0,
    answer: "گزینه ۱: کاتالیزور با کاهش انرژی فعال‌سازی، سرعت واکنش را افزایش می‌دهد."
  },
  {
    id: 14,
    text: "سوخت‌های فسیلی از چه موادی تشکیل شده‌اند؟",
    options: ["هیدروکربن‌ها", "اکسیدها", "نمک‌ها", "اسیدها"],
    correctIndex: 0,
    answer: "گزینه ۱: سوخت‌های فسیلی (نفت، گاز، زغال سنگ) عمدتاً از هیدروکربن‌ها تشکیل شده‌اند."
  },
  {
    id: 15,
    text: "کدام یک از فلزات زیر بیشترین هدایت الکتریکی را دارد؟",
    options: ["آهن", "مس", "نقره", "طلا"],
    correctIndex: 2,
    answer: "گزینه ۳: نقره بیشترین هدایت الکتریکی را در بین فلزات دارد."
  },

  // ==================== سوالات ترکیبی شیمی ====================
  {
    id: 16,
    text: "کدام ویتامین در روغن ماهی و کبد یافت می‌شود و محلول در چربی است؟",
    options: ["ویتامین C", "ویتامین D", "ویتامین B12", "ویتامین B6"],
    correctIndex: 1,
    answer: "گزینه ۲: ویتامین D محلول در چربی است و در روغن ماهی و کبد یافت می‌شود."
  },
  {
    id: 17,
    text: "کدام یک از مواد زیر ضدعفونی‌کننده است؟",
    options: ["نمک", "کلر", "شکر", "گلوتن"],
    correctIndex: 1,
    answer: "گزینه ۲: کلر به عنوان ضدعفونی‌کننده در تصفیه آب آشامیدنی استفاده می‌شود."
  },
  {
    id: 18,
    text: "پلی‌مر مصنوعی پرمصرف در صنعت کدام است؟",
    options: ["سلولز", "پلی اتیلن", "پروتئین", "نشاسته"],
    correctIndex: 1,
    answer: "گزینه ۲: پلی اتیلن یکی از پرمصرف‌ترین پلی‌مرهای مصنوعی است که در ساخت پلاستیک‌ها استفاده می‌شود."
  },
  {
    id: 19,
    text: "شیشه از ذوب کدام ماده به دست می‌آید؟",
    options: ["سیلیس (SiO₂)", "کربنات کلسیم", "اکسید آهن", "اکسید مس"],
    correctIndex: 0,
    answer: "گزینه ۱: شیشه از ذوب سیلیس (SiO₂) به همراه مواد دیگر مانند سدیم کربنات و کلسیم کربنات ساخته می‌شود."
  },
  {
    id: 20,
    text: "برای محافظت از آهن در برابر زنگ‌زدگی از چه روشی استفاده می‌شود؟",
    options: ["آبکاری با روی", "آبکاری با نقره", "آبکاری با طلا", "آبکاری با مس"],
    correctIndex: 0,
    answer: "گزینه ۱: آبکاری آهن با روی (گالوانیزه کردن) از زنگ‌زدگی آهن جلوگیری می‌کند."
  },
  {
    id: 21,
    text: "کدام یک از موارد زیر از پلی‌مرهای طبیعی است؟",
    options: ["نایلون", "پلی اتیلن", "پنبه (سلولز)", "پلی استایرن"],
    correctIndex: 2,
    answer: "گزینه ۳: پنبه از سلولز (پلی‌مر طبیعی) تشکیل شده است."
  },
  {
    id: 22,
    text: "در فرآیند شیمی سبز، کدام یک از موارد زیر نامطلوب است؟",
    options: ["استفاده از حلال‌های سبز", "کاهش پسماند", "استفاده از مواد سمی", "کاهش مصرف انرژی"],
    correctIndex: 2,
    answer: "گزینه ۳: شیمی سبز استفاده از مواد سمی را نامطلوب می‌داند و به دنبال جایگزین‌های ایمن‌تر است."
  },
  {
    id: 23,
    text: "کدام فلز در ساخت آلیاژ برنج به کار می‌رود؟",
    options: ["آهن و کربن", "مس و روی", "آلومینیوم و منیزیم", "طلا و نقره"],
    correctIndex: 1,
    answer: "گزینه ۲: برنج آلیاژی از مس و روی است."
  },
  {
    id: 24,
    text: "ویتامین A در کدام یک از موارد زیر بیشتر یافت می‌شود؟",
    options: ["مرکبات", "هویج", "گوشت قرمز", "ماهی"],
    correctIndex: 1,
    answer: "گزینه ۲: هویج حاوی بتاکاروتن است که در بدن به ویتامین A تبدیل می‌شود."
  },
  {
    id: 25,
    text: "کدام یک از موارد زیر یک رنگدانه طبیعی است؟",
    options: ["آلizarin", "کارمین", "فتالوسیانین", "تیتانیوم دی‌اکسید"],
    correctIndex: 1,
    answer: "گزینه ۲: کارمین یک رنگدانه طبیعی قرمز رنگ است که از حشره کوشین به دست می‌آید."
  },
  {
    id: 26,
    text: "در پیل‌های سوختی، انرژی شیمیایی به چه نوع انرژی تبدیل می‌شود؟",
    options: ["انرژی الکتریکی", "انرژی حرارتی", "انرژی مکانیکی", "انرژی نورانی"],
    correctIndex: 0,
    answer: "گزینه ۱: پیل‌های سوختی انرژی شیمیایی سوخت را مستقیماً به انرژی الکتریکی تبدیل می‌کنند."
  },
  {
    id: 27,
    text: "کدام یک از موارد زیر در ساختمان دندان‌ها نقش دارد؟",
    options: ["کلسیم و فسفر", "آهن و روی", "سدیم و پتاسیم", "کلر و منیزیم"],
    correctIndex: 0,
    answer: "گزینه ۱: کلسیم و فسفر اجزای اصلی ساختمان دندان‌ها و استخوان‌ها هستند."
  },
  {
    id: 28,
    text: "مواد مرکب (کامپوزیت‌ها) از ترکیب چه موادی ساخته می‌شوند؟",
    options: ["دو یا چند ماده مختلف", "فقط فلزات", "فقط پلیمرها", "فقط سرامیک‌ها"],
    correctIndex: 0,
    answer: "گزینه ۱: مواد مرکب از ترکیب دو یا چند ماده مختلف با خواص متفاوت ساخته می‌شوند."
  },
  {
    id: 29,
    text: "نقش آنتی‌اکسیدان‌ها در بدن چیست؟",
    options: ["جلوگیری از اکسیداسیون سلول‌ها", "افزایش اکسیداسیون", "تولید انرژی", "ساخت پروتئین"],
    correctIndex: 0,
    answer: "گزینه ۱: آنتی‌اکسیدان‌ها از اکسیداسیون و تخریب سلول‌ها توسط رادیکال‌های آزاد جلوگیری می‌کنند."
  },
  {
    id: 30,
    text: "کدام یک از موارد زیر برای تولید انرژی تجدیدپذیر استفاده می‌شود؟",
    options: ["نفت", "زغال سنگ", "انرژی خورشیدی", "گاز طبیعی"],
    correctIndex: 2,
    answer: "گزینه ۳: انرژی خورشیدی یک منبع انرژی تجدیدپذیر است که پایان‌ناپذیر محسوب می‌شود."
  },
];

const ShimiTajrobiFinalExam = () => {
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
        backgroundColor: '#00897B',
        color: 'white',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '30px',
        textAlign: 'center',
        position: 'relative'
      }}>
        <button
          onClick={() => router.push('/exam/davazdahom/tajrobi/ghalamchi/second-half/shimi-3-tajrobi')}
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
            <h1 style={{ margin: 0, fontSize: '28px' }}>🧪 آزمون جامع شیمی ۳</h1>
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
                backgroundColor: '#00897B',
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
                      border: isSelected ? '3px solid #00897B' : '1px solid #dee2e6',
                      borderRadius: '10px',
                      backgroundColor: isSelected ? '#e0f2f1' : '#fff',
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
                      backgroundColor: isSelected ? '#00897B' : '#fff',
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
                  backgroundColor: canCalculate ? '#00897B' : '#6c757d',
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
              <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#00897B' }}>
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
            borderTop: '4px solid #00897B',
            paddingTop: '40px',
            backgroundColor: '#ffffff',
            padding: '40px',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
            width: '100%'
          }}>
            <h2 style={{
              textAlign: 'center',
              borderBottom: '3px solid #00897B',
              paddingBottom: '20px',
              marginBottom: '40px',
              fontSize: '26px',
              color: '#00897B'
            }}>
              📝 پاسخنامه تشریحی شیمی ۳
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
                      color: '#00897B',
                      backgroundColor: '#e0f2f1',
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
                    <span style={{ fontWeight: 'bold', color: '#00897B' }}>📖 توضیح:</span>
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

export default ShimiTajrobiFinalExam;