"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const Farsi3FinalExam = () => {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  // ================= سوالات فارسی (۳) - جامع نیم‌سال اول =================
  const questions = [
    // ==================== فصل اول: ادبیات کلاسیک ====================
    {
      id: 1,
      text: "سبک خراسانی مربوط به چه دوره‌ای است؟",
      options: ["قرن سوم تا پنجم", "قرن ششم تا هشتم", "قرن نهم تا یازدهم", "قرن دوازدهم به بعد"],
      correctIndex: 0,
      answer: "گزینه ۱: سبک خراسانی مربوط به قرن سوم تا پنجم هجری و دوره سامانیان و غزنویان است."
    },
    {
      id: 2,
      text: "کدام یک از شاعران زیر از شاعران سبک عراقی است؟",
      options: ["فردوسی", "سعدی", "نظامی", "گزینه ۲ و ۳"],
      correctIndex: 3,
      answer: "گزینه ۴: سعدی و نظامی هر دو از شاعران برجسته سبک عراقی هستند."
    },
    {
      id: 3,
      text: "ویژگی اصلی سبک هندی چیست؟",
      options: ["زبان ساده", "مضمون‌پردازی پیچیده", "حماسه سرایی", "عرفان"],
      correctIndex: 1,
      answer: "گزینه ۲: سبک هندی به مضمون‌پردازی پیچیده و باریک‌اندیشی معروف است."
    },
    {
      id: 4,
      text: "شاهنامه فردوسی در کدام سبک سروده شده است؟",
      options: ["سبک خراسانی", "سبک عراقی", "سبک هندی", "سبک بازگشت"],
      correctIndex: 0,
      answer: "گزینه ۱: شاهنامه فردوسی به سبک خراسانی سروده شده است."
    },
    {
      id: 5,
      text: "در سبک عراقی، چه موضوعی اهمیت زیادی دارد؟",
      options: ["حماسه", "عرفان و تصوف", "تاریخ", "طبیعت"],
      correctIndex: 1,
      answer: "گزینه ۲: در سبک عراقی، عرفان و تصوف اهمیت زیادی دارد."
    },
    {
      id: 6,
      text: "یکی از ویژگی‌های سبک هندی کدام است؟",
      options: ["مضامین عرفانی", "مضامین حماسی", "مضامین تاریخی", "مضامین اجتماعی"],
      correctIndex: 0,
      answer: "گزینه ۱: سبک هندی دارای مضامین عرفانی و فلسفی عمیقی است."
    },

    // ==================== فصل دوم: ادبیات معاصر ====================
    {
      id: 7,
      text: "پدر شعر نو فارسی کیست؟",
      options: ["نیما یوشیج", "احمد شاملو", "مهدی اخوان ثالث", "سهراب سپهری"],
      correctIndex: 0,
      answer: "گزینه ۱: نیما یوشیج را پدر شعر نو فارسی می‌دانند."
    },
    {
      id: 8,
      text: "شعر سپید توسط چه کسی بنیان‌گذاری شد؟",
      options: ["نیما یوشیج", "احمد شاملو", "فروغ فرخزاد", "مهدی اخوان ثالث"],
      correctIndex: 1,
      answer: "گزینه ۲: احمد شاملو بنیان‌گذار شعر سپید در فارسی است."
    },
    {
      id: 9,
      text: "معروف‌ترین اثر صادق هدایت کدام است؟",
      options: ["بوف کور", "سگ ولگرد", "زنده به گور", "سه قطره خون"],
      correctIndex: 0,
      answer: "گزینه ۱: بوف کور معروف‌ترین اثر صادق هدایت است."
    },
    {
      id: 10,
      text: "جلال آل‌احمد به کدام سبک نوشته است؟",
      options: ["داستان تاریخی", "داستان اجتماعی", "داستان عاشقانه", "داستان علمی"],
      correctIndex: 1,
      answer: "گزینه ۲: جلال آل‌احمد بیشتر به داستان‌های اجتماعی پرداخته است."
    },
    {
      id: 11,
      text: "کدام یک از شاعران زیر از شاعران موج نو است؟",
      options: ["نیما یوشیج", "فروغ فرخزاد", "احمد شاملو", "اخوان ثالث"],
      correctIndex: 1,
      answer: "گزینه ۲: فروغ فرخزاد از شاعران برجسته موج نو است."
    },
    {
      id: 12,
      text: "نقد ادبی معاصر در ایران با کدام جریان شروع شد؟",
      options: ["تجددخواهی", "مشروطه‌خواهی", "انقلاب اسلامی", "نهضت ترجمه"],
      correctIndex: 0,
      answer: "گزینه ۱: نقد ادبی معاصر با جریان تجددخواهی شروع شد."
    },

    // ==================== فصل سوم: عروض و قافیه ====================
    {
      id: 13,
      text: "وزن شعر فارسی بر اساس چیست؟",
      options: ["تعداد هجاها", "تعداد کلمات", "تعداد حروف", "تعداد مصراع‌ها"],
      correctIndex: 0,
      answer: "گزینه ۱: وزن شعر فارسی بر اساس تعداد و ترتیب هجاهاست."
    },
    {
      id: 14,
      text: "قافیه در شعر فارسی چه نقشی دارد؟",
      options: ["ایجاد موسیقی", "انتقال معنی", "توصیف طبیعت", "بیان عواطف"],
      correctIndex: 0,
      answer: "گزینه ۱: قافیه باعث ایجاد موسیقی در شعر می‌شود."
    },
    {
      id: 15,
      text: "تقطیع در عروض به چه معناست؟",
      options: ["شناسایی وزن شعر", "تقسیم مصراع به کلمات", "شمارش حروف", "تعیین قافیه"],
      correctIndex: 0,
      answer: "گزینه ۱: تقطیع به معنای شناسایی وزن شعر و اندازه‌گیری هجاهاست."
    },
    {
      id: 16,
      text: "بحور عروضی در شعر فارسی چند نوع اصلی دارد؟",
      options: ["۱۰ بحر", "۱۲ بحر", "۱۶ بحر", "۸ بحر"],
      correctIndex: 0,
      answer: "گزینه ۱: بحور عروضی شامل ۱۰ بحر اصلی است."
    },
    {
      id: 17,
      text: "ردیف چیست؟",
      options: ["کلمه یا کلماتی که بعد از قافیه تکرار می‌شوند", "همان قافیه است", "تکرار کلمه در مصراع", "وزن شعر"],
      correctIndex: 0,
      answer: "گزینه ۱: ردیف کلمه یا کلماتی است که بعد از قافیه تکرار می‌شوند."
    },
    {
      id: 18,
      text: "اختیارات شاعری در عروض چیست؟",
      options: ["تغییرات مجاز در وزن شعر", "تغییر قافیه", "تغییر موضوع", "تغییر سبک"],
      correctIndex: 0,
      answer: "گزینه ۱: اختیارات شاعری به تغییرات مجاز در وزن شعر گفته می‌شود."
    },

    // ==================== فصل چهارم: آرایه‌های ادبی ====================
    {
      id: 19,
      text: "تشبیه در ادبیات چیست؟",
      options: ["ادعای همانندی دو چیز", "مقایسه دو چیز", "ادعای یکی بودن دو چیز", "نفی شباهت"],
      correctIndex: 0,
      answer: "گزینه ۱: تشبیه ادعای همانندی دو چیز است که با کلماتی مانند 'مانند' بیان می‌شود."
    },
    {
      id: 20,
      text: "استعاره چه تفاوتی با تشبیه دارد؟",
      options: ["در استعاره، ادات تشبیه حذف می‌شود", "در استعاره، مشبه به حذف می‌شود", "در استعاره، مشبه حذف می‌شود", "هیچ تفاوتی ندارند"],
      correctIndex: 2,
      answer: "گزینه ۳: در استعاره، مشبه (چیز اصلی) حذف می‌شود و مشبه به جای آن می‌نشیند."
    },
    {
      id: 21,
      text: "آرایهٔ مراعات النظیر چیست؟",
      options: ["آوردن کلمات هم‌خانواده", "آوردن کلمات متناقض", "آوردن کلمات مرتبط با هم", "تکرار کلمات"],
      correctIndex: 2,
      answer: "گزینه ۳: مراعات النظیر آوردن کلماتی است که از نظر معنی با هم مرتبط هستند."
    },
    {
      id: 22,
      text: "جناس در ادبیات به چه معناست؟",
      options: ["شباهت آوایی دو کلمه", "شباهت معنایی دو کلمه", "تضاد بین دو کلمه", "تکرار یک کلمه"],
      correctIndex: 0,
      answer: "گزینه ۱: جناس شباهت آوایی دو کلمه است که معنی متفاوتی دارند."
    },
    {
      id: 23,
      text: "سجع در نثر فارسی چیست؟",
      options: ["هم‌آهنگی و توازن در جمله", "تکرار کلمات", "استفاده از وزن", "استفاده از قافیه"],
      correctIndex: 0,
      answer: "گزینه ۱: سجع هم‌آهنگی و توازن میان جمله‌های نثر است."
    },
    {
      id: 24,
      text: "تلمیح در ادبیات چیست؟",
      options: ["اشاره به داستان‌ها و شخصیت‌های معروف", "استفاده از تشبیه", "استفاده از استعاره", "تکرار کلمات"],
      correctIndex: 0,
      answer: "گزینه ۱: تلمیح اشاره به داستان‌ها، شخصیت‌ها و رویدادهای معروف است."

    },

    // ==================== سوالات ترکیبی ====================
    {
      id: 25,
      text: "کدام یک از موارد زیر از شاعران سبک خراسانی است؟",
      options: ["فردوسی", "سعدی", "حافظ", "مولوی"],
      correctIndex: 0,
      answer: "گزینه ۱: فردوسی بزرگ‌ترین شاعر سبک خراسانی است."
    },
    {
      id: 26,
      text: "وزن شعر 'بشنو از نی چون حکایت می‌کند' در کدام بحر عروضی است؟",
      options: ["مثنوی", "مضارع", "رمل", "هزج"],
      correctIndex: 0,
      answer: "گزینه ۱: این وزن در بحر مثنوی (مفاعیلن مفاعیلن فعولن) است."
    },
    {
      id: 27,
      text: "آرایهٔ تضاد به چه معناست؟",
      options: ["آوردن دو کلمه متضاد", "آوردن دو کلمه هم‌معنی", "تکرار یک کلمه", "حذف کلمه"],
      correctIndex: 0,
      answer: "گزینه ۱: تضاد آوردن دو کلمه متضاد در کنار هم است."
    },
    {
      id: 28,
      text: "شعر سپید چه تفاوتی با شعر نو دارد؟",
      options: ["فاقد وزن و قافیه است", "دارای وزن است اما قافیه ندارد", "دارای قافیه است اما وزن ندارد", "هیچ تفاوتی ندارند"],
      correctIndex: 0,
      answer: "گزینه ۱: شعر سپید فاقد وزن و قافیه است و بر اساس زبان روزمره نوشته می‌شود."
    },
    {
      id: 29,
      text: "معروف‌ترین اثر جلال آل‌احمد کدام است؟",
      options: ["غربزدگی", "مدیر مدرسه", "چشم‌هایش", "سگ ولگرد"],
      correctIndex: 0,
      answer: "گزینه ۱: 'غربزدگی' معروف‌ترین اثر جلال آل‌احمد است."
    },
    {
      id: 30,
      text: "کدام آرایه در بیت 'چون قلم در نیم‌شب خونین جگر' وجود دارد؟",
      options: ["تشبیه", "کنایه", "استعاره", "جناس"],
      correctIndex: 0,
      answer: "گزینه ۱: قلم به نویسنده تشبیه شده است (تشبیه)."
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
        backgroundColor: '#C62828',
        color: 'white',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '30px',
        textAlign: 'center',
        position: 'relative'
      }}>
        <button 
          onClick={() => router.push('/exam/davazdahom/riyazi/sanjesh/first-half/farsi-3-riazi')}
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
            <h1 style={{ margin: 0, fontSize: '28px' }}>📖 آزمون جامع فارسی (۳)</h1>
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
                backgroundColor: '#C62828',
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
                      border: isSelected ? '3px solid #C62828' : '1px solid #dee2e6',
                      borderRadius: '10px',
                      backgroundColor: isSelected ? '#ffebee' : '#fff',
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
                      backgroundColor: isSelected ? '#C62828' : '#fff',
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
                  backgroundColor: canCalculate ? '#C62828' : '#6c757d',
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
              <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#C62828' }}>
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
            borderTop: '4px solid #C62828',
            paddingTop: '40px',
            backgroundColor: '#ffffff',
            padding: '40px',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
            width: '100%'
          }}>
            <h2 style={{ 
              textAlign: 'center', 
              borderBottom: '3px solid #C62828', 
              paddingBottom: '20px', 
              marginBottom: '40px',
              fontSize: '26px',
              color: '#C62828'
            }}>
              📝 پاسخنامه تشریحی فارسی (۳)
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
                      color: '#C62828',
                      backgroundColor: '#ffebee',
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
                    <span style={{ fontWeight: 'bold', color: '#C62828' }}>📖 توضیح:</span> 
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

export default Farsi3FinalExam;