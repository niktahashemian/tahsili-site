"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

// ================= سوالات دین و زندگی ۳ - جامع نیم‌سال اول قلمچی =================
const QUESTIONS = [
  // ==================== فصل اول: انسان و ایمان ====================
  {
    id: 1,
    text: "انسان از نظر قرآن کریم چه جایگاهی در هستی دارد؟",
    options: ["اشرف مخلوقات", "مخلوقی بی‌ارزش", "همانند حیوانات", "مخلوقی شرور"],
    correctIndex: 0,
    answer: "گزینه ۱: قرآن کریم انسان را اشرف مخلوقات معرفی می‌کند و او را خلیفه الهی بر زمین قرار داده است."
  },
  {
    id: 2,
    text: "ایمان از نظر دین اسلام به چه معناست؟",
    options: ["تصدیق قلبی", "اقرار زبانی", "عمل به احکام", "همه موارد"],
    correctIndex: 3,
    answer: "گزینه ۴: ایمان عبارت است از تصدیق قلبی، اقرار زبانی و عمل به ارکان دین."
  },
  {
    id: 3,
    text: "کدام یک از موارد زیر از اصول دین محسوب می‌شود؟",
    options: ["نماز", "توحید", "روزه", "حج"],
    correctIndex: 1,
    answer: "گزینه ۲: اصول دین پنج اصل هستند: توحید، نبوت، معاد، عدل و امامت."
  },
  {
    id: 4,
    text: "آثار و برکات ایمان در زندگی انسان کدام است؟",
    options: ["آرامش قلب", "امید به آینده", "هدفمندی در زندگی", "همه موارد"],
    correctIndex: 3,
    answer: "گزینه ۴: ایمان باعث آرامش قلب، امید به آینده، هدفمندی و معنادار شدن زندگی می‌شود."
  },
  {
    id: 5,
    text: "کرامت انسانی در اسلام بر چه اساسی استوار است؟",
    options: ["داشتن ثروت", "ایمان و تقوا", "نسب و تبار", "جایگاه اجتماعی"],
    correctIndex: 1,
    answer: "گزینه ۲: در اسلام کرامت انسان بر اساس ایمان، تقوا و عمل صالح استوار است."

  // ==================== فصل دوم: خداشناسی و جهان‌شناسی ====================
  },
  {
    id: 6,
    text: "خداشناسی فطری به چه معناست؟",
    options: ["شناخت خدا از طریق استدلال", "شناخت ذاتی و درونی خدا", "شناخت خدا از طریق مطالعه طبیعت", "شناخت خدا از طریق پیامبران"],
    correctIndex: 1,
    answer: "گزینه ۲: خداشناسی فطری یعنی انسان به طور ذاتی و درونی خدا را می‌شناسد و این شناخت در فطرت او نهادینه شده است."
  },
  {
    id: 7,
    text: "کدام آیه قرآن به نظم و هدفمندی جهان اشاره دارد؟",
    options: ["سوره کهف آیه ۱", "سوره ملک آیه ۳", "سوره حمد آیه ۱", "سوره توحید آیه ۱"],
    correctIndex: 1,
    answer: "گزینه ۲: سوره ملک آیه ۳: 'الَّذِي خَلَقَ سَبْعَ سَمَاوَاتٍ طِبَاقًا' یعنی خداوند آسمان‌ها را به صورت منظم و هماهنگ آفریده است."
  },
  {
    id: 8,
    text: "صفات ثبوتی خداوند کدامند؟",
    options: ["علم و قدرت و حیات", "علم و قدرت و جهل", "قدرت و ضعف", "حیات و مرگ"],
    correctIndex: 0,
    answer: "گزینه ۱: صفات ثبوتی خداوند صفاتی مانند علم، قدرت، حیات، اراده و ... هستند که وجود دارند."
  },
  {
    id: 9,
    text: "رابطه انسان با خدا در قرآن چگونه بیان شده است؟",
    options: ["خدا نزدیک به انسان است", "خدا از انسان دور است", "خدا به انسان توجه ندارد", "خدا انسان را نمی‌بیند"],
    correctIndex: 0,
    answer: "گزینه ۱: در قرآن آمده است: 'وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ' (بقره/۱۸۶) یعنی خدا به انسان نزدیک است."
  },
  {
    id: 10,
    text: "دعا در اسلام چه جایگاهی دارد؟",
    options: ["عبارت از خواسته‌های دنیوی", "حقیقت عبادت و ارتباط با خدا", "فقط در زمان سختی", "مهم نیست"],
    correctIndex: 1,
    answer: "گزینه ۲: دعا حقیقت عبادت و راه ارتباط با خداوند است که در سختی‌ها و آسانی‌ها باید انجام شود."

  // ==================== فصل سوم: راهنماشناسی و امامت ====================
  },
  {
    id: 11,
    text: "چرا بشر نیاز به پیامبران و امامان دارد؟",
    options: ["برای هدایت و راهنمایی", "برای جمع‌آوری مالیات", "برای حکومت بر مردم", "برای جنگ با دشمنان"],
    correctIndex: 0,
    answer: "گزینه ۱: بشر برای هدایت، راهنمایی و رسیدن به کمال نیاز به پیامبران و امامان دارد."
  },
  {
    id: 12,
    text: "عصمت در پیامبران به چه معناست؟",
    options: ["معصوم از گناه و خطا", "بسیار قدرتمند", "بسیار ثروتمند", "دارای علم بسیار"],
    correctIndex: 0,
    answer: "گزینه ۱: عصمت یعنی پیامبران و امامان از هر گونه گناه و خطا در ابلاغ رسالت مصون هستند."
  },
  {
    id: 13,
    text: "معجزه جاویدان پیامبر اسلام (ص) چیست؟",
    options: ["قرآن کریم", "شکافتن ماه", "اسراء و معراج", "ابوبکر"],
    correctIndex: 0,
    answer: "گزینه ۱: قرآن کریم معجزه جاویدان پیامبر اکرم(ص) است که تا روز قیامت باقی خواهد ماند."
  },
  {
    id: 14,
    text: "امامت در نگاه شیعه به چه معناست؟",
    options: ["خلافت و رهبری جامعه", "فقط یک لقب افتخاری", "نقش سیاسی فقط", "همان خلیفه اول"],
    correctIndex: 0,
    answer: "گزینه ۱: امامت یعنی رهبری و هدایت جامعه اسلامی که از طرف خداوند تعیین می‌شود."
  },
  {
    id: 15,
    text: "کدام یک از ویژگی‌های امامان معصوم است؟",
    options: ["عصمت و علم لدنی", "فقر و گرسنگی", "بیماری و ناتوانی", "جهل و نادانی"],
    correctIndex: 0,
    answer: "گزینه ۱: امامان معصوم دارای عصمت و علم لدنی (علم الهی) هستند که از طریق پیامبر به آنان رسیده است."

  // ==================== فصل چهارم: معاد و زندگی پس از مرگ ====================
  },
  {
    id: 16,
    text: "معاد در اسلام به چه معناست؟",
    options: ["زندگی مجدد پس از مرگ", "زندگی در همین دنیا", "فراموشی و نابودی", "تغییر شکل"],
    correctIndex: 0,
    answer: "گزینه ۱: معاد یعنی انسان پس از مرگ دوباره زنده می‌شود و به زندگی جاویدان در آخرت وارد می‌شود."
  },
  {
    id: 17,
    text: "دلایل عقلی بر معاد کدام است؟",
    options: ["عدالت الهی", "حکمت خداوند", "هدفمندی آفرینش", "همه موارد"],
    correctIndex: 3,
    answer: "گزینه ۴: عدالت الهی، حکمت خداوند و هدفمندی آفرینش از دلایل عقلی بر معاد هستند."
  },
  {
    id: 18,
    text: "مرحله برزخ در زندگی پس از مرگ به چه معناست؟",
    options: ["زندگی در دنیا", "حالت بین مرگ و قیامت", "زندگی در بهشت", "زندگی در جهنم"],
    correctIndex: 1,
    answer: "گزینه ۲: برزخ حالت یا عالمی است که انسان پس از مرگ تا روز قیامت در آن به سر می‌برد."
  },
  {
    id: 19,
    text: "بهشت در قرآن چگونه توصیف شده است؟",
    options: ["باغ‌های زیبا", "نهرهای جاری", "انواع نعمت‌ها", "همه موارد"],
    correctIndex: 3,
    answer: "گزینه ۴: بهشت در قرآن به عنوان باغ‌های زیبا، نهرهای جاری، نعمت‌های فراوان و زندگی جاویدان توصیف شده است."
  },
  {
    id: 20,
    text: "کیفر گناهان در جهنم چگونه است؟",
    options: ["آتش سوزان", "عذاب روحی", "سوزش و عذاب", "همه موارد"],
    correctIndex: 3,
    answer: "گزینه ۴: جهنم شامل آتش سوزان، عذاب روحی، سوزش و انواع عذاب‌ها است که نتیجه گناهان است."

  // ==================== سوالات ترکیبی ====================
  },
  {
    id: 21,
    text: "کدام یک از موارد زیر از فروع دین است؟",
    options: ["نماز و روزه", "توحید و نبوت", "معاد و عدل", "امامت"],
    correctIndex: 0,
    answer: "گزینه ۱: فروع دین عبارتند از نماز، روزه، خمس، زکات، حج، جهاد، امر به معروف و نهی از منکر."
  },
  {
    id: 22,
    text: "آیه 'لَقَدْ خَلَقْنَا الْإِنْسَانَ فِي أَحْسَنِ تَقْوِيمٍ' به کدام موضوع اشاره دارد؟",
    options: ["کرامت انسان", "ضعف انسان", "فناپذیری انسان", "برابری انسان"],
    correctIndex: 0,
    answer: "گزینه ۱: این آیه (سوره تین، آیه ۴) به کرامت و بهترین آفرینش انسان اشاره دارد."
  },
  {
    id: 23,
    text: "عدل الهی در روز قیامت چگونه نمود پیدا می‌کند؟",
    options: ["پاداش نیکوکاران و کیفر بدکاران", "بخشش همه گناهان", "عذاب همگان", "هیچکدام"],
    correctIndex: 0,
    answer: "گزینه ۱: عدل الهی در قیامت به معنای پاداش نیکوکاران و کیفر بدکاران بر اساس اعمالشان است."
  },
  {
    id: 24,
    text: "کدام سوره قرآن به صفات خداوند اختصاص دارد؟",
    options: ["سوره حمد", "سوره توحید", "سوره قدر", "سوره ناس"],
    correctIndex: 1,
    answer: "گزینه ۲: سوره توحید (اخلاص) به صفات خداوند می‌پردازد: 'قُلْ هُوَ اللَّهُ أَحَدٌ'"
  },
  {
    id: 25,
    text: "در روز قیامت، کتاب اعمال انسان چگونه ارائه می‌شود؟",
    options: ["به دست راست (نیکوکاران) و دست چپ (بدکاران)", "به صورت شفاهی", "به صورت پنهانی", "هیچکدام"],
    correctIndex: 0,
    answer: "گزینه ۱: در قرآن آمده که نیکوکاران نامه اعمالشان را به دست راست و بدکاران به دست چپ دریافت می‌کنند."
  },
  {
    id: 26,
    text: "آیه 'إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ' به کدام موضوع اشاره دارد؟",
    options: ["معاد و بازگشت به سوی خدا", "خلقت انسان", "پرهیز از گناه", "صبر و شکیبایی"],
    correctIndex: 0,
    answer: "گزینه ۱: این آیه (بقره/۱۵۶) به معاد و بازگشت انسان به سوی خداوند اشاره دارد."
  },
  {
    id: 27,
    text: "کدام یک از موارد زیر از اهداف آفرینش انسان است؟",
    options: ["عبادت و بندگی خدا", "ثروت‌اندوزی", "قدرت‌طلبی", "شهرت"],
    correctIndex: 0,
    answer: "گزینه ۱: قرآن می‌فرماید: 'وَمَا خَلَقْتُ الْجِنَّ وَالْإِنْسَ إِلَّا لِيَعْبُدُونِ' (ذاریات/۵۶)"
  },
  {
    id: 28,
    text: "صفات سلبی خداوند چیست؟",
    options: ["صفاتی که خداوند از آنها مبری است", "صفات مثبت خداوند", "صفات مشترک با انسان", "صفات قابل درک"],
    correctIndex: 0,
    answer: "گزینه ۱: صفات سلبی یعنی خداوند از صفات ناقص مانند جهل، ناتوانی، مرگ و... مبری است."
  },
  {
    id: 29,
    text: "پیامبر اسلام (ص) در چه سنی به پیامبری مبعوث شد؟",
    options: ["۴۰ سالگی", "۳۰ سالگی", "۵۰ سالگی", "۶۰ سالگی"],
    correctIndex: 0,
    answer: "گزینه ۱: پیامبر اکرم (ص) در ۴۰ سالگی به پیامبری مبعوث شدند."
  },
  {
    id: 30,
    text: "کدام یک از موارد زیر از برکات ایمان در جامعه است؟",
    options: ["عدالت اجتماعی", "ایمنی و آرامش", "همبستگی و وحدت", "همه موارد"],
    correctIndex: 3,
    answer: "گزینه ۴: ایمان باعث ایجاد عدالت اجتماعی، امنیت، آرامش، همبستگی و وحدت در جامعه می‌شود."
  },
];

const DinvaZendegiRiyaziFinalExam = () => {
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
          onClick={() => router.push('/exam/davazdahom/riyazi/maz/second-half/din-va-zendegi-3-riyazi')}
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
            <h1 style={{ margin: 0, fontSize: '28px' }}>🕌 آزمون جامع دین و زندگی ۳</h1>
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
              📝 پاسخنامه تشریحی دین و زندگی ۳
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

export default DinvaZendegiRiyaziFinalExam;