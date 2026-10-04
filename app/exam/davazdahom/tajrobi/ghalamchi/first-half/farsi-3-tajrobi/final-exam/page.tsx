"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

// ================= سوالات فارسی ۳ - جامع نیم‌سال اول تجربی قلمچی =================
const QUESTIONS = [
  // ==================== فصل اول: ادبیات تعلیمی ====================
  {
    id: 1,
    text: "در بیت 'به آن شاخه که بردی نوبری، درخت کهن را نیاید بری' چه آرایه‌ای وجود دارد؟",
    options: ["تشبیه", "استعاره", "کنایه", "مجاز"],
    correctIndex: 1,
    answer: "گزینه ۲: در این بیت، شاخه برای نسل جوان و درخت کهن برای بزرگان استعاره شده است."
  },
  {
    id: 2,
    text: "سبک عراقی چه ویژگی‌هایی دارد؟",
    options: ["زبان ساده و روان", "آرایه‌های بدیعی فراوان", "توجه به طبیعت", "نثر مرسل"],
    correctIndex: 1,
    answer: "گزینه ۲: سبک عراقی با آرایه‌های بدیعی فراوان، زبان فنی و مضامین عرفانی شناخته می‌شود."
  },
  {
    id: 3,
    text: "نثر مرسل چه ویژگی دارد؟",
    options: ["زبان ساده و روان", "آرایه‌های ادبی فراوان", "سجع و ترصیع", "زبان فنی"],
    correctIndex: 0,
    answer: "گزینه ۱: نثر مرسل به نثری گفته می‌شود که ساده و روان است و از آرایه‌های ادبی پیچیده پرهیز می‌کند."
  },
  {
    id: 4,
    text: "در عبارت 'چشم فلک' چه نوع آرایه‌ای به کار رفته است؟",
    options: ["تشبیه", "مجاز", "کنایه", "تشخیص"],
    correctIndex: 3,
    answer: "گزینه ۴: 'چشم فلک' تشخیص است زیرا به فلک (آسمان) صفت چشم (ویژگی انسان) داده شده است."
  },
  {
    id: 5,
    text: "کدام یک از موارد زیر از ویژگی‌های سبک خراسانی است؟",
    options: ["زبان ساده و حماسی", "آرایه‌های پیچیده", "مضامین عرفانی", "توجه به رنگ‌ها"],
    correctIndex: 0,
    answer: "گزینه ۱: سبک خراسانی با زبان ساده، حماسی و روان شناخته می‌شود."

  // ==================== فصل دوم: ادبیات غنایی و عرفانی ====================
  },
  {
    id: 6,
    text: "قالب شعری غزل در ادبیات فارسی چه ویژگی‌هایی دارد؟",
    options: ["دارای بیت‌های متعدد با قافیه واحد", "موضوع عاشقانه و عرفانی", "با وزن خاص", "همه موارد"],
    correctIndex: 3,
    answer: "گزینه ۴: غزل دارای بیت‌های متعدد با قافیه واحد، موضوع عاشقانه و عرفانی و وزن خاص است."
  },
  {
    id: 7,
    text: "مثنوی معنوی اثر کدام شاعر است؟",
    options: ["حافظ", "سعدی", "مولوی", "فردوسی"],
    correctIndex: 2,
    answer: "گزینه ۳: مثنوی معنوی اثر مولانا جلال‌الدین محمد بلخی (مولوی) است."
  },
  {
    id: 8,
    text: "در بیت 'من آن مرغ سخن‌دانم که در قفس ننشینم' چه آرایه‌ای وجود دارد؟",
    options: ["تشبیه", "استعاره", "کنایه", "مجاز"],
    correctIndex: 1,
    answer: "گزینه ۲: شاعر خود را به مرغ سخن‌دان استعاره کرده است."
  },
  {
    id: 9,
    text: "سعدی در کدام یک از آثار خود به مسائل اخلاقی و تربیتی پرداخته است؟",
    options: ["بوستان", "گلستان", "دیوان غزلیات", "جمله موارد"],
    correctIndex: 0,
    answer: "گزینه ۱: بوستان سعدی کتابی تعلیمی-اخلاقی است که به مسائل تربیتی و اخلاقی می‌پردازد."
  },
  {
    id: 10,
    text: "مفهوم 'فنا' در عرفان اسلامی به چه معناست؟",
    options: ["مرگ جسمانی", "نابودی نفس", "دور شدن از خدا", "انکار خدا"],
    correctIndex: 1,
    answer: "گزینه ۲: فنا در عرفان به معنی نابودی صفات نفسانی و بقا به صفات الهی است."

  // ==================== فصل سوم: ادبیات حماسی و داستانی ====================
  },
  {
    id: 11,
    text: "شاهنامه فردوسی در چند بخش اصلی تدوین شده است؟",
    options: ["سه بخش: اساطیری، پهلوانی و تاریخی", "دو بخش: اساطیری و تاریخی", "چهار بخش", "یک بخش"],
    correctIndex: 0,
    answer: "گزینه ۱: شاهنامه شامل سه بخش اساطیری، پهلوانی و تاریخی است."
  },
  {
    id: 12,
    text: "داستان 'سیاوش' در شاهنامه به کدام بخش تعلق دارد؟",
    options: ["بخش اساطیری", "بخش پهلوانی", "بخش تاریخی", "هیچکدام"],
    correctIndex: 1,
    answer: "گزینه ۲: داستان سیاوش در بخش پهلوانی شاهنامه قرار دارد."
  },
  {
    id: 13,
    text: "ادبیات پایداری به چه موضوعاتی می‌پردازد؟",
    options: ["جنگ و دفاع از وطن", "عشق و احساسات", "طبیعت", "آموزه‌های اخلاقی"],
    correctIndex: 0,
    answer: "گزینه ۱: ادبیات پایداری به موضوعات جنگ، دفاع از وطن، ایثار و مقاومت می‌پردازد."
  },
  {
    id: 14,
    text: "کدام یک از موارد زیر از عناصر اصلی نمایشنامه است؟",
    options: ["شخصیت", "گفت‌وگو", "صحنه", "همه موارد"],
    correctIndex: 3,
    answer: "گزینه ۴: شخصیت، گفت‌وگو و صحنه از عناصر اصلی نمایشنامه هستند."
  },
  {
    id: 15,
    text: "در بیت 'جهان جای پیکار و مردی و نام است، به از مردمی نیست آزاده کام است' چه پیامی وجود دارد؟",
    options: ["توصیه به جنگاوری", "توصیه به مردمداری", "توصیه به ثروت‌اندوزی", "توصیه به عزلت"],
    correctIndex: 1,
    answer: "گزینه ۲: فردوسی در این بیت به اهمیت مردمداری و نیکنامی تأکید کرده است."

  // ==================== فصل چهارم: نقد و تحلیل ادبی ====================
  },
  {
    id: 16,
    text: "نقد فرمالیستی بر چه جنبه‌هایی از اثر ادبی تأکید دارد؟",
    options: ["محتوا و پیام", "شکل و ساختار", "زندگی نویسنده", "تأثیر بر جامعه"],
    correctIndex: 1,
    answer: "گزینه ۲: نقد فرمالیستی بر شکل، ساختار، زبان و تکنیک‌های ادبی اثر تأکید دارد."
  },
  {
    id: 17,
    text: "در تحلیل شعر، کدام یک از موارد زیر به 'موسیقی بیرونی' مربوط می‌شود؟",
    options: ["وزن و عروض", "قافیه", "آرایه‌های لفظی", "تکرار"],
    correctIndex: 0,
    answer: "گزینه ۱: موسیقی بیرونی شعر مربوط به وزن و عروض است."
  },
  {
    id: 18,
    text: "کدام یک از موارد زیر در تحلیل نثر مورد بررسی قرار می‌گیرد؟",
    options: ["سبک نویسنده", "ساختار جملات", "زبان و واژگان", "همه موارد"],
    correctIndex: 3,
    answer: "گزینه ۴: در تحلیل نثر، سبک، ساختار، زبان و واژگان مورد بررسی قرار می‌گیرد."
  },
  {
    id: 19,
    text: "مکتب ساختارگرایی در نقد ادبی بر چه چیزی تأکید دارد؟",
    options: ["زندگی نویسنده", "ساختارهای زیرین متن", "تأثیر بر جامعه", "احساسات نویسنده"],
    correctIndex: 1,
    answer: "گزینه ۲: ساختارگرایی بر ساختارهای زیرین و روابط درون متنی تأکید دارد."
  },
  {
    id: 20,
    text: "در بیت 'نی نامه‌ای که از لب تو بر دوام بود، نه شعری از سر ذوقت که با قیام بود' چه آرایه‌ای وجود دارد؟",
    options: ["تشبیه", "تضاد", "مراعات نظیر", "حسن تعلیل"],
    correctIndex: 1,
    answer: "گزینه ۲: تضاد بین 'دوام' و 'قیام' در این بیت به کار رفته است."

  // ==================== سوالات ترکیبی ====================
  },
  {
    id: 21,
    text: "کدام یک از گزینه‌ها در مورد سبک هندی درست است؟",
    options: ["زبان ساده و روان", "مضامین پیچیده و دور از ذهن", "توصیف طبیعت", "نثر مرسل"],
    correctIndex: 1,
    answer: "گزینه ۲: سبک هندی با مضامین پیچیده، دور از ذهن و زبان فنی شناخته می‌شود."
  },
  {
    id: 22,
    text: "در بیت 'به نام خداوند جان و خرد، کزین برتر اندیشه بر نگذرد' چه آرایه‌ای وجود دارد؟",
    options: ["تشبیه", "کنایه", "مجاز", "استعاره"],
    correctIndex: 1,
    answer: "گزینه ۲: 'برتر اندیشه بر نگذرد' کنایه از اینکه کسی نمی‌تواند خدا را درک کند."
  },
  {
    id: 23,
    text: "کدام یک از نویسندگان زیر از داستان‌نویسان معاصر ایران است؟",
    options: ["فردوسی", "سعدی", "هوشنگ مرادی کرمانی", "مولوی"],
    correctIndex: 2,
    answer: "گزینه ۳: هوشنگ مرادی کرمانی از داستان‌نویسان معاصر ایران است."
  },
  {
    id: 24,
    text: "در شعر 'سپیده‌دم که دامن برکشد ز دامن شب، من از تو دورم و درمانده‌ام در این غربت' چه احساسی بیان شده است؟",
    options: ["عشق و وصال", "دوری و غربت", "شادی و نشاط", "خشم و کینه"],
    correctIndex: 1,
    answer: "گزینه ۲: شاعر احساس دوری، غربت و تنهایی را بیان کرده است."
  },
  {
    id: 25,
    text: "کدام یک از موارد زیر از ویژگی‌های سبک عراقی نیست؟",
    options: ["زبان فنی", "آرایه‌های بدیعی", "نثر ساده", "مضامین عرفانی"],
    correctIndex: 2,
    answer: "گزینه ۳: نثر ساده از ویژگی‌های سبک خراسانی است، نه عراقی."
  },
  {
    id: 26,
    text: "در بیت 'نه هر که چهره برافروخت، دلبری داند، نه هر که آینه سازد، سکندری داند' چه آرایه‌ای وجود دارد؟",
    options: ["تلمیح", "تشبیه", "استعاره", "مجاز"],
    correctIndex: 0,
    answer: "گزینه ۱: اشاره به داستان اسکندر و آینه‌سازی در این بیت تلمیح است."
  },
  {
    id: 27,
    text: "مفهوم 'وحدت وجود' در عرفان اسلامی به چه معناست؟",
    options: ["یکی بودن خداوند", "وجود واحد در عالم", "همه چیز خداوند است", "جهان مخلوق خداست"],
    correctIndex: 2,
    answer: "گزینه ۳: وحدت وجود به این معناست که در عالم فقط خداوند وجود حقیقی دارد و همه چیز تجلی اوست."
  },
  {
    id: 28,
    text: "کدام یک از آثار زیر از سعدی است؟",
    options: ["بوستان", "گلستان", "قصاید", "همه موارد"],
    correctIndex: 3,
    answer: "گزینه ۴: بوستان، گلستان و قصاید همگی از آثار سعدی هستند."
  },
  {
    id: 29,
    text: "در بیت 'اگر خواهی که همچون شمع باشی، جگرسوز و زبان‌افروز باشی' چه پیامی وجود دارد؟",
    options: ["توصیه به خودخواهی", "توصیه به ایثار و فداکاری", "توصیه به ثروت‌اندوزی", "توصیه به عزلت"],
    correctIndex: 1,
    answer: "گزینه ۲: شاعر با تشبیه خود به شمع، به ایثار، فداکاری و روشن‌کنندگی اشاره دارد."
  },
  {
    id: 30,
    text: "در نقد ساختارگرا، کدام یک از موارد زیر اهمیت بیشتری دارد؟",
    options: ["زندگی نویسنده", "تأثیر تاریخی", "روابط درون‌متنی", "احساسات خواننده"],
    correctIndex: 2,
    answer: "گزینه ۳: در نقد ساختارگرا، روابط درون‌متنی و ساختارهای زیرین متن اهمیت دارد."
  },
];

const FarsiTajrobiFinalExam = () => {
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
        backgroundColor: '#8D6E63',
        color: 'white',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '30px',
        textAlign: 'center',
        position: 'relative'
      }}>
        <button
          onClick={() => router.push('/exam/davazdahom/tajrobi/ghalamchi/first-half/farsi-3-tajrobi')}
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
            <h1 style={{ margin: 0, fontSize: '28px' }}>📖 آزمون جامع فارسی ۳</h1>
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
                backgroundColor: '#8D6E63',
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
                      border: isSelected ? '3px solid #8D6E63' : '1px solid #dee2e6',
                      borderRadius: '10px',
                      backgroundColor: isSelected ? '#efebe9' : '#fff',
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
                      backgroundColor: isSelected ? '#8D6E63' : '#fff',
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
                  backgroundColor: canCalculate ? '#8D6E63' : '#6c757d',
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
              <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#8D6E63' }}>
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
            borderTop: '4px solid #8D6E63',
            paddingTop: '40px',
            backgroundColor: '#ffffff',
            padding: '40px',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
            width: '100%'
          }}>
            <h2 style={{
              textAlign: 'center',
              borderBottom: '3px solid #8D6E63',
              paddingBottom: '20px',
              marginBottom: '40px',
              fontSize: '26px',
              color: '#8D6E63'
            }}>
              📝 پاسخنامه تشریحی فارسی ۳
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
                      color: '#8D6E63',
                      backgroundColor: '#efebe9',
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
                    <span style={{ fontWeight: 'bold', color: '#8D6E63' }}>📖 توضیح:</span>
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

export default FarsiTajrobiFinalExam;