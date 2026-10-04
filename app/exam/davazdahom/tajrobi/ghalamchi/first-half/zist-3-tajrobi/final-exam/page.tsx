"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

// ================= سوالات زیست شناسی ۳ - جامع نیم‌سال اول تجربی قلمچی =================
const QUESTIONS = [
  // ==================== فصل اول: مولکول‌های اطلاعاتی ====================
  {
    id: 1,
    text: "نوکلئوتیدها از چه بخش‌هایی تشکیل شده‌اند؟",
    options: ["قند، فسفات، باز نیتروژنی", "قند، اسید آمینه، باز نیتروژنی", "فسفات، اسید آمینه، باز نیتروژنی", "قند، فسفات، پروتئین"],
    correctIndex: 0,
    answer: "گزینه ۱: هر نوکلئوتید از سه بخش: قند (دئوکسی ریبوز یا ریبوز)، گروه فسفات و باز نیتروژنی تشکیل شده است."
  },
  {
    id: 2,
    text: "کدام یک از بازهای نیتروژنی در DNA وجود دارد اما در RNA وجود ندارد؟",
    options: ["آدنین", "گوانین", "سایتوزین", "تیمین"],
    correctIndex: 3,
    answer: "گزینه ۴: تیمین در DNA وجود دارد و در RNA به جای آن اوراسیل قرار دارد."
  },
  {
    id: 3,
    text: "قواعد چارگاف در DNA چه می‌گوید؟",
    options: ["A=T و G=C", "A=G و T=C", "A=C و T=G", "A+T=G+C"],
    correctIndex: 0,
    answer: "گزینه ۱: طبق قواعد چارگاف، تعداد آدنین برابر تیمین و تعداد گوانین برابر سایتوزین است."
  },
  {
    id: 4,
    text: "همانندسازی DNA به چه صورت انجام می‌شود؟",
    options: ["نیمه‌حفاظتی", "حفاظتی", "مقاومتی", "تصادفی"],
    correctIndex: 0,
    answer: "گزینه ۱: همانندسازی DNA به صورت نیمه‌حفاظتی انجام می‌شود."
  },
  {
    id: 5,
    text: "کدام آنزیم در همانندسازی DNA نقش اصلی را دارد؟",
    options: ["DNA پلیمراز", "RNA پلیمراز", "لیگاز", "هلیکاز"],
    correctIndex: 0,
    answer: "گزینه ۱: DNA پلیمراز آنزیم اصلی در همانندسازی DNA است که نوکلئوتیدها را به رشته جدید اضافه می‌کند."
  },

  // ==================== فصل دوم: از ژن تا پروتئین ====================
  {
    id: 6,
    text: "فرآیند رونویسی (Transcription) در کدام قسمت سلول انجام می‌شود؟",
    options: ["هسته", "ریبوزوم", "سیتوپلاسم", "میتوکندری"],
    correctIndex: 0,
    answer: "گزینه ۱: رونویسی در هسته سلول انجام می‌شود."
  },
  {
    id: 7,
    text: "mRNA چه نقشی در ترجمه دارد؟",
    options: ["حامل اطلاعات ژنتیکی", "ساخت پروتئین", "حامل اسیدهای آمینه", "تشکیل ریبوزوم"],
    correctIndex: 0,
    answer: "گزینه ۱: mRNA اطلاعات ژنتیکی را از هسته به سیتوپلاسم و ریبوزوم منتقل می‌کند."
  },
  {
    id: 8,
    text: "کدون شروع در ترجمه کدام است؟",
    options: ["AUG", "UAA", "UAG", "UGA"],
    correctIndex: 0,
    answer: "گزینه ۱: کدون AUG کدون شروع است و اسید آمینه متیونین را کد می‌کند."
  },
  {
    id: 9,
    text: "اپرون لاک در باکتری‌ها چه نقشی دارد؟",
    options: ["تنظیم بیان ژن‌های مربوط به متابولیسم لاکتوز", "تنظیم بیان ژن‌های مربوط به متابولیسم گلوکز", "تنظیم بیان ژن‌های مربوط به سنتز پروتئین", "تنظیم بیان ژن‌های مربوط به تکثیر DNA"],
    correctIndex: 0,
    answer: "گزینه ۱: اپرون لاک ژن‌های مربوط به متابولیسم لاکتوز را در باکتری‌ها تنظیم می‌کند."
  },
  {
    id: 10,
    text: "جهش frame-shift چه تأثیری دارد؟",
    options: ["تغییر در چارچوب خواندن کدون‌ها", "تغییر یک اسید آمینه", "تغییر در بیان ژن", "هیچ تأثیری ندارد"],
    correctIndex: 0,
    answer: "گزینه ۱: جهش frame-shift باعث تغییر در چارچوب خواندن کدون‌ها می‌شود."

  // ==================== فصل سوم: زیست‌فناوری ====================
  },
  {
    id: 11,
    text: "آنزیم‌های برشی در مهندسی ژنتیک چه نقشی دارند؟",
    options: ["برش DNA در جایگاه‌های خاص", "اتصال قطعات DNA", "تکثیر DNA", "سنتز DNA"],
    correctIndex: 0,
    answer: "گزینه ۱: آنزیم‌های برشی (Restriction enzymes) DNA را در جایگاه‌های خاص برش می‌دهند."
  },
  {
    id: 12,
    text: "وکتور در مهندسی ژنتیک چیست؟",
    options: ["حامل برای انتقال ژن", "آنزیم برش دهنده", "ژن هدف", "سلول میزبان"],
    correctIndex: 0,
    answer: "گزینه ۱: وکتور حاملی است که ژن مورد نظر را به سلول میزبان منتقل می‌کند."
  },
  {
    id: 13,
    text: "PCR در چه مرحله‌ای انجام می‌شود؟",
    options: ["دناتوراسیون", "اتصال پرایمر", "بسط و گسترش", "همه مراحل"],
    correctIndex: 3,
    answer: "گزینه ۴: PCR شامل سه مرحله دناتوراسیون، اتصال پرایمر و بسط است."
  },
  {
    id: 14,
    text: "کدام یک از موارد زیر کاربرد زیست‌فناوری در پزشکی است؟",
    options: ["تولید انسولین", "تولید سوخت زیستی", "تولید پلاستیک‌های زیستی", "تصفیه فاضلاب"],
    correctIndex: 0,
    answer: "گزینه ۱: تولید انسولین انسانی با استفاده از باکتری‌های تراریخته یکی از کاربردهای زیست‌فناوری در پزشکی است."
  },

  // ==================== فصل چهارم: ایمنی و بیماری‌ها ====================
  {
    id: 15,
    text: "ایمنی ذاتی چه ویژگی‌هایی دارد؟",
    options: ["غیراختصاصی و مادرزادی", "اختصاصی و اکتسابی", "غیراختصاصی و اکتسابی", "اختصاصی و مادرزادی"],
    correctIndex: 0,
    answer: "گزینه ۱: ایمنی ذاتی غیراختصاصی و مادرزادی است."
  },
  {
    id: 16,
    text: "آنتی‌بادی‌ها توسط کدام سلول‌ها تولید می‌شوند؟",
    options: ["لنفوسیت‌های B", "لنفوسیت‌های T", "ماکروفاژها", "نوتروفیل‌ها"],
    correctIndex: 0,
    answer: "گزینه ۱: آنتی‌بادی‌ها توسط لنفوسیت‌های B تولید می‌شوند."
  },
  {
    id: 17,
    text: "واکسن چه نوع ایمنی ایجاد می‌کند؟",
    options: ["ایمنی فعال مصنوعی", "ایمنی غیرفعال مصنوعی", "ایمنی فعال طبیعی", "ایمنی غیرفعال طبیعی"],
    correctIndex: 0,
    answer: "گزینه ۱: واکسن ایمنی فعال مصنوعی ایجاد می‌کند."
  },
  {
    id: 18,
    text: "کدام یک از موارد زیر بیماری ویروسی است؟",
    options: ["سرخک", "سالمونلا", "سل", "وبا"],
    correctIndex: 0,
    answer: "گزینه ۱: سرخک یک بیماری ویروسی است."

  // ==================== سوالات ترکیبی ====================
  },
  {
    id: 19,
    text: "در فرآیند رونویسی، کدام آنزیم نقش اصلی را دارد؟",
    options: ["RNA پلیمراز", "DNA پلیمراز", "هلیکاز", "لیگاز"],
    correctIndex: 0,
    answer: "گزینه ۱: RNA پلیمراز آنزیم اصلی در رونویسی است."
  },
  {
    id: 20,
    text: "کدام یک از موارد زیر در DNA وجود ندارد؟",
    options: ["آدنین", "تیمین", "اوراسیل", "گوانین"],
    correctIndex: 2,
    answer: "گزینه ۳: اوراسیل در DNA وجود ندارد و در RNA به جای تیمین قرار می‌گیرد."
  },
  {
    id: 21,
    text: "بازهای نیتروژنی پورین کدامند؟",
    options: ["آدنین و گوانین", "آدنین و تیمین", "گوانین و سایتوزین", "تیمین و اوراسیل"],
    correctIndex: 0,
    answer: "گزینه ۱: پورین‌ها شامل آدنین و گوانین هستند."
  },
  {
    id: 22,
    text: "کدام یک از موارد زیر از سلول‌های ایمنی است؟",
    options: ["ماکروفاژ", "نورون", "گلبول قرمز", "سلول پوستی"],
    correctIndex: 0,
    answer: "گزینه ۱: ماکروفاژ یکی از سلول‌های ایمنی است."
  },
  {
    id: 23,
    text: "در ترجمه، tRNA چه نقشی دارد؟",
    options: ["حمل اسید آمینه", "ساخت mRNA", "تکثیر DNA", "تنظیم بیان ژن"],
    correctIndex: 0,
    answer: "گزینه ۱: tRNA اسید آمینه را به ریبوزوم حمل می‌کند."
  },
  {
    id: 24,
    text: "کدام یک از موارد زیر از کاربردهای PCR است؟",
    options: ["تشخیص بیماری‌های ژنتیکی", "تولید پروتئین", "ساخت واکسن", "تکثیر سلول"],
    correctIndex: 0,
    answer: "گزینه ۱: PCR برای تشخیص بیماری‌های ژنتیکی و عفونی استفاده می‌شود."
  },
  {
    id: 25,
    text: "کدام یک از موارد زیر در مهندسی ژنتیک استفاده می‌شود؟",
    options: ["پلاسمید", "ریبوزوم", "میتوکندری", "کلروپلاست"],
    correctIndex: 0,
    answer: "گزینه ۱: پلاسمید به عنوان وکتور در مهندسی ژنتیک استفاده می‌شود."
  },
  {
    id: 26,
    text: "کدون‌های خاتمه در ترجمه کدامند؟",
    options: ["UAA, UAG, UGA", "AUG, UAA, UAG", "UGA, UAG, AUG", "UAA, AUG, UAG"],
    correctIndex: 0,
    answer: "گزینه ۱: کدون‌های خاتمه شامل UAA, UAG, UGA هستند."
  },
  {
    id: 27,
    text: "بیماری سل توسط کدام عامل ایجاد می‌شود؟",
    options: ["باکتری", "ویروس", "قارچ", "انگل"],
    correctIndex: 0,
    answer: "گزینه ۱: سل یک بیماری باکتریایی است که توسط مایکوباکتریوم توبرکلوزیس ایجاد می‌شود."
  },
  {
    id: 28,
    text: "کدام یک از موارد زیر از تفاوت‌های DNA و RNA است؟",
    options: ["قند موجود", "تعداد رشته‌ها", "بازهای نیتروژنی", "همه موارد"],
    correctIndex: 3,
    answer: "گزینه ۴: DNA و RNA در قند (دئوکسی ریبوز vs ریبوز)، تعداد رشته‌ها (دو رشته vs تک رشته) و بازهای نیتروژنی متفاوت هستند."
  },
  {
    id: 29,
    text: "آنتی‌بیوتیک‌ها بر روی کدام یک از موارد زیر تأثیر دارند؟",
    options: ["باکتری‌ها", "ویروس‌ها", "قارچ‌ها", "همه موارد"],
    correctIndex: 0,
    answer: "گزینه ۱: آنتی‌بیوتیک‌ها بر روی باکتری‌ها تأثیر دارند."
  },
  {
    id: 30,
    text: "کدام یک از موارد زیر از موجودات تراریخته است؟",
    options: ["برنج طلایی", "گندم معمولی", "جو دوسر", "ذرت بومی"],
    correctIndex: 0,
    answer: "گزینه ۱: برنج طلایی یک موجود تراریخته است که برای تولید ویتامین A طراحی شده است."
  },
];

const ZistShenasiTajrobiFinalExam = () => {
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
          onClick={() => router.push('/exam/davazdahom/tajrobi/ghalamchi/first-half/zist-3-tajrobi')}
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
            <h1 style={{ margin: 0, fontSize: '28px' }}>🧬 آزمون جامع زیست شناسی ۳</h1>
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
              📝 پاسخنامه تشریحی زیست شناسی ۳
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

export default ZistShenasiTajrobiFinalExam;