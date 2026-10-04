"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const DinVaZendegi3FinalExam = () => {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  // ================= سوالات دین و زندگی (۳) - جامع نیم‌سال اول =================
  const questions = [
    // ==================== فصل اول: خداشناسی و توحید ====================
    {
      id: 1,
      text: "کدام یک از موارد زیر از راه‌های خداشناسی است؟",
      options: ["برهان نظم", "برهان علّی", "فطرت", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: برهان نظم، برهان علّی و فطرت همه از راه‌های خداشناسی هستند."
    },
    {
      id: 2,
      text: "صفات جمالی خداوند کدامند؟",
      options: ["حیات، علم، قدرت", "عدل، انتقام، جلال", "غضب، قهر، عزت", "هیچ کدام"],
      correctIndex: 0,
      answer: "گزینه ۱: صفات جمالی مانند حیات، علم و قدرت هستند که بیانگر کمال خداوندند."
    },
    {
      id: 3,
      text: "توحید به چه معناست؟",
      options: ["یگانه دانستن خدا", "سه دانستن خدا", "انکار خدا", "هیچ کدام"],
      correctIndex: 0,
      answer: "گزینه ۱: توحید یعنی یگانه دانستن خدا و اعتقاد به یکتایی او."
    },
    {
      id: 4,
      text: "کدام یک از موارد زیر از صفات جلالی خداوند است؟",
      options: ["رحمان", "رحیم", "جبار", "کریم"],
      correctIndex: 2,
      answer: "گزینه ۳: 'جبار' از صفات جلالی خداوند است که بیانگر جبروت و قدرت اوست."
    },
    {
      id: 5,
      text: "برهان نظم بر چه اساسی استوار است؟",
      options: ["وجود نظم در جهان", "وجود شواهد تاریخی", "احساسات انسانی", "هیچ کدام"],
      correctIndex: 0,
      answer: "گزینه ۱: برهان نظم بر اساس وجود نظم و هماهنگی در جهان استوار است."
    },
    {
      id: 6,
      text: "برهان علّی بر چه اساسی استوار است؟",
      options: ["وجود علت برای هر پدیده", "وجود نظم در جهان", "احساسات انسانی", "هیچ کدام"],
      correctIndex: 0,
      answer: "گزینه ۱: برهان علّی بر اساس وجود علت برای هر پدیده استوار است."
    },

    // ==================== فصل دوم: نبوت و امامت ====================
    {
      id: 7,
      text: "ضرورت نبوت به چه دلیل است؟",
      options: ["نیاز بشر به هدایت", "نیاز به قوانین الهی", "تعالی انسان", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: انسان برای هدایت، قوانین الهی و تعالی به نبوت نیاز دارد."
    },
    {
      id: 8,
      text: "عصمت پیامبران به چه معناست؟",
      options: ["خطا نکردن در رسالت", "گناه نکردن", "مصون از اشتباه", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: عصمت یعنی مصونیت از گناه، خطا و اشتباه در رسالت الهی."
    },
    {
      id: 9,
      text: "ویژگی‌های امام در دیدگاه شیعه کدام است؟",
      options: ["عصمت", "علم لدنی", "نصب الهی", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: امام در دیدگاه شیعه باید معصوم، دارای علم لدنی و منصوب از طرف خدا باشد."
    },
    {
      id: 10,
      text: "آیه 'إِنَّمَا وَلِیُّكُمُ اللّٰهُ وَ رَسُولُهُ وَ الَّذِینَ آمَنُوا' در شأن چه کسی نازل شده است؟",
      options: ["امام علی (ع)", "ابوبکر", "عمر", "عثمان"],
      correctIndex: 0,
      answer: "گزینه ۱: این آیه در شأن امام علی (ع) و درباره ولایت ایشان نازل شده است."
    },
    {
      id: 11,
      text: "حدیث غدیر درباره چه موضوعی است؟",
      options: ["ولایت امام علی (ع)", "خدا شناسی", "معاد", "اخلاق"],
      correctIndex: 0,
      answer: "گزینه ۱: حدیث غدیر درباره ولایت و جانشینی امام علی (ع) است."
    },
    {
      id: 12,
      text: "پیامبر اسلام (ص) در چه سالی به پیامبری مبعوث شد؟",
      options: ["۵۷۰ میلادی", "۶۱۰ میلادی", "۶۲۲ میلادی", "۶۳۲ میلادی"],
      correctIndex: 1,
      answer: "گزینه ۲: پیامبر اسلام (ص) در سال ۶۱۰ میلادی به پیامبری مبعوث شدند."
    },

    // ==================== فصل سوم: معاد و آخرت‌شناسی ====================
    {
      id: 13,
      text: "معاد به چه معناست؟",
      options: ["زندگی دوباره", "مرگ", "جهنم", "بهشت"],
      correctIndex: 0,
      answer: "گزینه ۱: معاد به معنای زندگی دوباره و رستاخیز پس از مرگ است."
    },
    {
      id: 14,
      text: "برزخ به چه معناست؟",
      options: ["عالم پس از مرگ تا قیامت", "جهنم", "بهشت", "هیچ کدام"],
      correctIndex: 0,
      answer: "گزینه ۱: برزخ عالم فاصله بین مرگ تا قیامت است که انسان در آن به سر می‌برد."
    },
    {
      id: 15,
      text: "در قیامت چه وقایعی رخ می‌دهد؟",
      options: ["حساب و کتاب", "پاداش و کیفر", "نور و ظلمت", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: در قیامت حساب و کتاب، پاداش و کیفر و نور و ظلمت رخ می‌دهد."
    },
    {
      id: 16,
      text: "بهشت در قرآن چگونه توصیف شده است؟",
      options: ["باغ‌هایی با نهرهای جاری", "میوه‌های فراوان", "نعمت‌های جاودان", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: بهشت در قرآن به باغ‌هایی با نهرهای جاری، میوه‌های فراوان و نعمت‌های جاودان توصیف شده است."
    },
    {
      id: 17,
      text: "جهنم در قرآن چگونه توصیف شده است؟",
      options: ["آتش سوزان", "غذای زقوم", "زنجیر و غل و زنجیر", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: جهنم در قرآن به آتش سوزان، غذای زقوم و زنجیر و غل و زنجیر توصیف شده است."
    },
    {
      id: 18,
      text: "دلیل عقلی معاد چیست؟",
      options: ["عدالت الهی", "حکمت الهی", "وعد و وعید الهی", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: عدالت الهی، حکمت الهی و وعد و وعید الهی از دلایل عقلی معاد هستند."
    },

    // ==================== فصل چهارم: اخلاق و سبک زندگی ====================
    {
      id: 19,
      text: "اخلاق فردی به چه موضوعاتی می‌پردازد؟",
      options: ["خودسازی", "تزکیه نفس", "مبارزه با رذایل", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: اخلاق فردی به خودسازی، تزکیه نفس و مبارزه با رذایل اخلاقی می‌پردازد."
    },
    {
      id: 20,
      text: "عدالت در اسلام چه جایگاهی دارد؟",
      options: ["ارزشی اساسی", "فرعی", "غیر ضروری", "هیچ کدام"],
      correctIndex: 0,
      answer: "گزینه ۱: عدالت در اسلام ارزشی اساسی و زیربنایی دارد و بر همه ابعاد زندگی حاکم است."
    },
    {
      id: 21,
      text: "احسان به چه معناست؟",
      options: ["نیکوکاری", "بدکاری", "بی‌تفاوتی", "هیچ کدام"],
      correctIndex: 0,
      answer: "گزینه ۱: احسان به معنای نیکوکاری و انجام کارهای خیر برای دیگران است."
    },
    {
      id: 22,
      text: "سبک زندگی اسلامی بر چه اصولی استوار است؟",
      options: ["توحید", "عدالت", "اخلاق", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: سبک زندگی اسلامی بر اصول توحید، عدالت و اخلاق استوار است."
    },
    {
      id: 23,
      text: "نقش خانواده در اسلام چیست؟",
      options: ["محیط تربیت", "محیط آرامش", "محیط رشد", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: خانواده در اسلام محیط تربیت، آرامش و رشد اعضای خود است."
    },
    {
      id: 24,
      text: "هدف نهایی اخلاق اسلامی چیست؟",
      options: ["قرب الهی", "خوشبختی دنیوی", "ثروت", "شهرت"],
      correctIndex: 0,
      answer: "گزینه ۱: هدف نهایی اخلاق اسلامی، قرب الهی و رسیدن به کمال انسانی است."
    },

    // ==================== سوالات ترکیبی ====================
    {
      id: 25,
      text: "کدام یک از موارد زیر از اسماء و صفات خداوند است؟",
      options: ["الرحمن", "الرحیم", "الملك", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: الرحمن، الرحیم و الملك همه از اسماء و صفات خداوند هستند."
    },
    {
      id: 26,
      text: "آیه 'لَيْسَ كَمِثْلِهِ شَيْءٌ' بر چه موضوعی دلالت دارد؟",
      options: ["توحید", "تنزیه خداوند", "نفی شباهت خدا به مخلوقات", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: این آیه بر توحید، تنزیه و نفی شباهت خداوند به مخلوقات دلالت دارد."
    },
    {
      id: 27,
      text: "در قرآن، کدام سوره به عنوان 'توحید' شناخته می‌شود؟",
      options: ["سوره حمد", "سوره توحید (اخلاص)", "سوره ناس", "سوره فلق"],
      correctIndex: 1,
      answer: "گزینه ۲: سوره اخلاص (توحید) به عنوان سوره توحید شناخته می‌شود."
    },
    {
      id: 28,
      text: "کدام یک از موارد زیر از ویژگی‌های امامان معصوم است؟",
      options: ["علم غیب", "شفاعت", "ولایت تکوینی", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: امامان معصوم دارای علم غیب، شفاعت و ولایت تکوینی هستند."
    },
    {
      id: 29,
      text: "هدف از آفرینش انسان چیست؟",
      options: ["عبادت", "آزمایش", "رسیدن به کمال", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: هدف از آفرینش انسان عبادت، آزمایش و رسیدن به کمال است."
    },
    {
      id: 30,
      text: "آیه 'أَطِیعُوا اللّٰهَ وَ أَطِیعُوا الرَّسُولَ وَ أُولِي الْأَمْرِ مِنکُمْ' بر چه موضوعی دلالت دارد؟",
      options: ["لزوم اطاعت از خدا", "اطاعت از پیامبر", "اطاعت از اولی الامر", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: این آیه بر لزوم اطاعت از خدا، پیامبر و اولی الامر (امامان) دلالت دارد."
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
        backgroundColor: '#1A237E',
        color: 'white',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '30px',
        textAlign: 'center',
        position: 'relative'
      }}>
        <button 
          onClick={() => router.push('/exam/davazdahom/riyazi/kheili%20sabz/first-half/din-va-zendegi-3-riyazi')}
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
            <h1 style={{ margin: 0, fontSize: '28px' }}>🕌 آزمون جامع دین و زندگی (۳)</h1>
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
              📝 پاسخنامه تشریحی دین و زندگی (۳)
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

export default DinVaZendegi3FinalExam;