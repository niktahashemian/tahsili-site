"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Farsi2FinalExam = () => {
  const router = useRouter();

  // ================= سوالات جامع فارسی (2) (ترکیبی از ۴ فصل) =================
  const questions = [
    // ==================== فصل اول: ادبیات و هنر (۱۲ سوال) ====================
    {
      id: 1,
      text: "کدام یک از موارد زیر قالب شعری نیست؟",
      options: ["غزل", "قصیده", "داستان", "رباعی"],
      correctIndex: 2,
      answer: "گزینه ۳ (داستان): داستان یک قالب شعری نیست، بلکه یک نوع ادبیات منثور است."
    },
    {
      id: 2,
      text: "آرایه ادبی 'ماه مانند سپید است' چه نام دارد؟",
      options: ["استعاره", "تشبیه", "کنایه", "مجاز"],
      correctIndex: 1,
      answer: "گزینه ۲ (تشبیه): در این عبارت، ماه به سپید تشبیه شده است و ادات تشبیه 'مانند' به کار رفته است."
    },
    {
      id: 3,
      text: "سبک هندی مربوط به کدام دوره است؟",
      options: ["دوره صفوی", "دوره سامانی", "دوره غزنوی", "دوره قاجار"],
      correctIndex: 0,
      answer: "گزینه ۱: سبک هندی مربوط به دوره صفوی (قرن ۱۰-۱۲ هجری) است."
    },
    {
      id: 4,
      text: "در بیت 'چو خورشید از برج حمل بردمید / جهان را ز سر نو بهاران رسید'، چه آرایه‌ای به کار رفته است؟",
      options: ["تشبیه", "استعاره", "کنایه", "مجاز"],
      correctIndex: 1,
      answer: "گزینه ۲ (استعاره): خورشید استعاره از نور و روشنایی است و 'برج حمل' استعاره از آغاز بهار."
    },
    {
      id: 5,
      text: "کدام یک از موارد زیر از ویژگی‌های سبک خراسانی است؟",
      options: ["استفاده از کلمات عربی زیاد", "سادگی و روانی", "پیچیدگی و ابهام", "استفاده از اصطلاحات علمی"],
      correctIndex: 1,
      answer: "گزینه ۲: سبک خراسانی با سادگی و روانی و استفاده از کلمات فارسی شناخته می‌شود."
    },
    {
      id: 6,
      text: "آرایه ادبی 'زبان‌درازی' چه نوع کنایه‌ای است؟",
      options: ["کنایه از حقیقت", "کنایه از صفت", "کنایه از نسبت", "کنایه از فعل"],
      correctIndex: 1,
      answer: "گزینه ۲: 'زبان‌درازی' کنایه از صفت پرگویی و پرحرفی است."
    },
    {
      id: 7,
      text: "کدام یک از شاعران زیر در سبک عراقی سروده است؟",
      options: ["فردوسی", "سعدی", "خیام", "نیما یوشیج"],
      correctIndex: 1,
      answer: "گزینه ۲ (سعدی): سعدی از شاعران بزرگ سبک عراقی است."
    },
    {
      id: 8,
      text: "در بیت 'گفتم که لب شیرین، پرسید که خندیدی / گفتم که ز دل بردی، گفتا که تو خود دانی'، چه آرایه‌ای به کار رفته است؟",
      options: ["جناس", "تضاد", "مراعات نظیر", "تلمیح"],
      correctIndex: 1,
      answer: "گزینه ۲ (تضاد): تضاد بین 'لب شیرین' و 'دل بردی' و 'خندیدی' و 'تو خود دانی'."
    },
    {
      id: 9,
      text: "قالب شعری رباعی از چند مصراع تشکیل شده است؟",
      options: ["۲", "۳", "۴", "۵"],
      correctIndex: 2,
      answer: "گزینه ۳ (۴): رباعی از ۴ مصراع (۲ بیت) تشکیل شده است."
    },
    {
      id: 10,
      text: "کدام یک از موارد زیر مجاز است؟",
      options: ["دست از کار کشیدن", "گلستان سعدی", "آب حیات", "چشم و چراغ"],
      correctIndex: 1,
      answer: "گزینه ۲ (گلستان سعدی): 'گلستان' مجاز از کتاب سعدی است."
    },
    {
      id: 11,
      text: "در بیت 'ای اهل خراسان که درین شهر شمایید / فریاد که از دست شما ملک عرب راست'، شاعر چه کسی است؟",
      options: ["فردوسی", "ناصرخسرو", "انوری", "خیام"],
      correctIndex: 2,
      answer: "گزینه ۳ (انوری): این بیت از انوری شاعر سبک خراسانی است."
    },
    {
      id: 12,
      text: "آرایه ادبی 'مراعات نظیر' به چه معناست؟",
      options: ["آوردن کلمات هم‌خانواده", "آوردن کلمات مرتبط با یکدیگر", "تکرار یک واژه", "استفاده از دو واژه متضاد"],
      correctIndex: 1,
      answer: "گزینه ۲: مراعات نظیر به آوردن کلماتی گفته می‌شود که از نظر معنی با یکدیگر مرتبط هستند."
    },

    // ==================== فصل دوم: دستور زبان فارسی (۱۳ سوال) ====================
    {
      id: 13,
      text: "در جمله 'علی کتاب را خواند'، نقش دستوری 'کتاب' چیست؟",
      options: ["نهاد", "مفعول", "متمم", "مسند"],
      correctIndex: 1,
      answer: "گزینه ۲ (مفعول): 'کتاب' مفعول است و فعل 'خواند' روی آن انجام شده است."
    },
    {
      id: 14,
      text: "در جمله 'حسن دانشمند است'، نقش دستوری 'دانشمند' چیست؟",
      options: ["نهاد", "مفعول", "متمم", "مسند"],
      correctIndex: 3,
      answer: "گزینه ۴ (مسند): 'دانشمند' مسند است و با فعل ربطی 'است' آمده است."
    },
    {
      id: 15,
      text: "فعل 'می‌روم' در چه زمانی است؟",
      options: ["گذشته", "حال", "آینده", "گذشته نقلی"],
      correctIndex: 1,
      answer: "گزینه ۲ (حال): 'می‌روم' فعل مضارع اخباری (زمان حال) است."
    },
    {
      id: 16,
      text: "کدام یک از موارد زیر نهاد جمله است؟",
      options: ["علی", "کتاب را", "از مدرسه", "آمد"],
      correctIndex: 0,
      answer: "گزینه ۱ (علی): 'علی' نهاد جمله است زیرا فعل 'آمد' به او نسبت داده شده است."
    },
    {
      id: 17,
      text: "در جمله 'من به مدرسه رفتم'، نقش دستوری 'به مدرسه' چیست؟",
      options: ["نهاد", "مفعول", "متمم", "قید"],
      correctIndex: 2,
      answer: "گزینه ۳ (متمم): 'به مدرسه' متمم قیدی است که مکان را نشان می‌دهد."
    },
    {
      id: 18,
      text: "کدام یک از موارد زیر فعل است؟",
      options: ["رفتن", "رفتم", "رفته", "می‌روم"],
      correctIndex: 1,
      answer: "گزینه ۲ (رفتم): 'رفتم' یک فعل ماضی ساده است."
    },
    {
      id: 19,
      text: "در جمله 'کتاب را روی میز گذاشتم'، 'روی میز' چه نقشی دارد؟",
      options: ["مفعول", "متمم", "قید مکان", "نهاد"],
      correctIndex: 2,
      answer: "گزینه ۳ (قید مکان): 'روی میز' قید مکان است."
    },
    {
      id: 20,
      text: "کدام یک از موارد زیر جمله خبری است؟",
      options: ["علی رفت", "علی رفت؟", "علی برو", "ای کاش علی می‌رفت"],
      correctIndex: 0,
      answer: "گزینه ۱ (علی رفت): این جمله خبری است زیرا یک خبر را بیان می‌کند."
    },
    {
      id: 21,
      text: "در جمله 'آب خنک است'، 'خنک' چه نقشی دارد؟",
      options: ["نهاد", "مفعول", "مسند", "متمم"],
      correctIndex: 2,
      answer: "گزینه ۳ (مسند): 'خنک' مسند است و با فعل ربطی 'است' آمده است."
    },
    {
      id: 22,
      text: "فعل 'خوانده بودم' در چه زمانی است؟",
      options: ["گذشته ساده", "گذشته نقلی", "گذشته بعید", "حال"],
      correctIndex: 2,
      answer: "گزینه ۳ (گذشته بعید): 'خوانده بودم' فعل ماضی بعید است."
    },
    {
      id: 23,
      text: "در جمله 'او به دوستش نامه نوشت'، 'به دوستش' چه نقشی دارد؟",
      options: ["مفعول", "متمم", "قید", "نهاد"],
      correctIndex: 1,
      answer: "گزینه ۲ (متمم): 'به دوستش' متمم است و با حرف اضافه 'به' آمده است."
    },
    {
      id: 24,
      text: "کدام یک از موارد زیر جمله امری است؟",
      options: ["می‌روی", "برو", "رفتی", "رفته است"],
      correctIndex: 1,
      answer: "گزینه ۲ (برو): 'برو' یک جمله امری است."
    },
    {
      id: 25,
      text: "در جمله 'همه دانش‌آموزان به مدرسه رفتند'، نهاد جمله چیست؟",
      options: ["همه", "دانش‌آموزان", "همه دانش‌آموزان", "مدرسه"],
      correctIndex: 2,
      answer: "گزینه ۳ (همه دانش‌آموزان): 'همه دانش‌آموزان' نهاد جمله است."

    // ادامه سوالات تا ۵۰...
    }
  ];

  // State ها
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: number}>({});
  const [showAnswers, setShowAnswers] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);
  
  const [timeLeft, setTimeLeft] = useState(60 * 60); // 60 دقیقه به ثانیه
  const [isTimeUp, setIsTimeUp] = useState(false);

  useEffect(() => {
    if (isTimeUp || hasCalculated) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsTimeUp(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimeUp, hasCalculated]);

  const handleOptionClick = (questionId: number, optionIndex: number) => {
    if (isTimeUp) return;

    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: optionIndex
    });
    if (hasCalculated) {
      setHasCalculated(false);
      setScore(null);
    }
  };

  const calculateScore = () => {
    let correctCount = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });
    const percentage = (correctCount / questions.length) * 100;
    setScore(percentage);
    setHasCalculated(true);
    setIsTimeUp(true); 
  };

  useEffect(() => {
    if (isTimeUp && !hasCalculated) {
      calculateScore();
    }
  }, [isTimeUp]);

  const isAllAnswered = questions.every(q => selectedAnswers[q.id] !== undefined);
  const canCalculate = isAllAnswered && !hasCalculated && !isTimeUp;

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
          onClick={() => router.push('/exam/yazdahom/riyazi/sanjesh/second-half/farsi-2')}
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
            <h1 style={{ margin: 0, fontSize: '28px' }}>📜 آزمون جامع کل کتاب فارسی (2)</h1>
            <p style={{ marginTop: '10px', fontSize: '16px', opacity: 0.9 }}>ویژه آزمون‌های قلمچی - شامل {questions.length} سوال ترکیبی از ۴ فصل</p>
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
            gap: '10px',
            border: isTimeUp ? '2px solid #ffcccc' : '1px solid rgba(255,255,255,0.3)'
          }}>
            <span>⏱️</span>
            <span>{isTimeUp ? 'زمان تمام شد!' : formatTime(timeLeft)}</span>
          </div>
        </div>
        {!isTimeUp && <p style={{ fontSize: '14px', opacity: 0.7, marginTop: '5px' }}>زمان باقی‌مانده</p>}
      </div>

      <div style={{ width: '100%' }}>
        {questions.map((q, index) => (
          <div key={q.id} style={{
            marginBottom: '25px',
            backgroundColor: '#ffffff',
            padding: '20px 25px',
            borderRadius: '0px',
            borderBottom: '2px solid #e9ecef',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
            width: '100%'
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
                marginTop: '2px',
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
                const disabled = isTimeUp; 
                
                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionClick(q.id, idx)}
                    disabled={disabled}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '12px 18px',
                      border: isSelected ? '3px solid #8D6E63' : '1px solid #dee2e6',
                      borderRadius: '10px',
                      backgroundColor: isSelected ? '#efebe9' : '#fff',
                      cursor: disabled ? 'not-allowed' : 'pointer',
                      fontSize: '15px',
                      textAlign: 'right',
                      transition: 'all 0.2s',
                      width: '100%',
                      opacity: disabled && !isSelected ? 0.6 : 1
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

        {(isAllAnswered || hasCalculated || isTimeUp) && (
          <div style={{
            marginTop: '30px', 
            marginBottom: '30px', 
            padding: '20px', 
            backgroundColor: '#ffffff', 
            borderRadius: '12px', 
            border: '1px solid #dee2e6',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
              
              <div>
                {!hasCalculated ? (
                  <button
                    onClick={calculateScore}
                    disabled={!canCalculate}
                    style={{
                      padding: '12px 30px',
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
                    {!isAllAnswered && !isTimeUp ? 'لطفاً به همه سوالات پاسخ دهید' : 'محاسبه درصد'}
                  </button>
                ) : (
                  <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#8D6E63' }}>
                    ✅ درصد شما: <span style={{ color: getScoreColor(score!), fontSize: '22px' }}>{Math.round(score!)}%</span>
                    {isTimeUp && hasCalculated && <span style={{ fontSize: '14px', color: '#dc3545', marginRight: '15px' }}>(زمان پایان یافت)</span>}
                  </div>
                )}
              </div>

              {hasCalculated && (
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <div style={{
                    width: '100%',
                    height: '15px',
                    backgroundColor: '#e9ecef',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    marginTop: '5px'
                  }}>
                    <div style={{
                      width: `${score}%`,
                      height: '100%',
                      backgroundColor: getScoreColor(score!),
                      transition: 'width 0.5s ease-in-out'
                    }} />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '60px' }}>
          <button
            onClick={() => setShowAnswers(!showAnswers)}
            style={{
              padding: '18px 50px',
              fontSize: '20px',
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

        {showAnswers && (
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
              📝 پاسخنامه تشریحی آزمون جامع فارسی (2)
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
                  <div style={{ fontSize: '18px', lineHeight: '2' }}>
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
                    <span style={{ fontWeight: 'bold', color: '#28a745' }}>✅ پاسخ صحیح:</span> <span style={{ fontSize: '16px' }}>{q.options[q.correctIndex]}</span>
                    <br />
                    {userAnswer !== undefined && (
                      <span>
                        <span style={{ fontWeight: 'bold', color: isCorrect ? '#28a745' : '#dc3545' }}>
                          {isCorrect ? '✔️ پاسخ شما صحیح است' : '❌ پاسخ شما نادرست است'}
                        </span>
                        <span style={{ fontSize: '16px', color: '#666', marginRight: '10px' }}>
                          (شما گزینه {String.fromCharCode(65 + userAnswer)} را انتخاب کردید)
                        </span>
                        <br />
                      </span>
                    )}
                    <span style={{ fontWeight: 'bold', color: '#8D6E63' }}>📖 توضیح کامل:</span> 
                    <br />
                    <span style={{ fontSize: '16px', lineHeight: '1.8' }}>{q.answer}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Farsi2FinalExam;