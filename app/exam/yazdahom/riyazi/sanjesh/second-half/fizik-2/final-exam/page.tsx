"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const PhysicsFinalExam = () => {
  const router = useRouter();

  // ================= سوالات جامع فیزیک ۲ (ترکیبی از ۴ فصل) =================
  const questions = [
    // --- فصل اول: الکتریسیته ساکن ---
    {
      id: 1,
      text: "دو بار الکتریکی نقطه‌ای یکسان با بار q = +2 μC در فاصله ۱۰ سانتی‌متری از یکدیگر قرار دارند. اندازه نیروی الکتریکی بین این دو بار چند نیوتون است؟ (k = 9 × 10^9 N.m^2/C^2)",
      options: ["3.6", "1.8", "0.9", "0.45"],
      correctIndex: 0,
      answer: "گزینه ۱ (3.6 N): طبق قانون کولن F = k(q1*q2)/r^2 = 9*10^9 * (2*10^-6 * 2*10^-6) / (0.1)^2 = 3.6 N"
    },
    {
      id: 2,
      text: "یک کره رسانای توپر با بار Q = +12 μC و شعاع ۵ سانتی‌متر داریم. میدان الکتریکی در فاصله ۱۰ سانتی‌متری از مرکز این کره چند نیوتون بر کولن است؟",
      options: ["1.08 × 10^7", "2.16 × 10^7", "4.32 × 10^7", "صفر"],
      correctIndex: 0,
      answer: "گزینه ۱: میدان خارج از کره مانند بار نقطه‌ای است. r = 0.1 m → E = k*Q/r^2 = 9*10^9 * 12*10^-6 / (0.01) = 1.08 × 10^7 N/C"
    },
    {
      id: 3,
      text: "پتانسیل الکتریکی در فاصله r از یک بار نقطه‌ای Q برابر با V است. اگر فاصله را نصف کنیم و بار را دو برابر کنیم، پتانسیل جدید چند برابر V می‌شود؟",
      options: ["2", "4", "6", "8"],
      correctIndex: 1,
      answer: "گزینه ۲ (4): رابطه پتانسیل V = kQ/r است. در حالت جدید: V' = k(2Q) / (r/2) = 4(kQ/r) = 4V."
    },
    {
      id: 4,
      text: "یک خازن تخت با صفحه‌های مساحت A و فاصله d در خلأ، ظرفیت C دارد. اگر فاصله صفحه‌ها را نصف کرده و ماده‌ای با ثابت دی‌الکتریک K=3 بین آنها قرار دهیم، ظرفیت جدید چند برابر C می‌شود؟",
      options: ["1.5", "3", "6", "12"],
      correctIndex: 2,
      answer: "گزینه ۳ (6): C = ε₀A/d. فاصله نصف و K=3 می‌شود: C' = 3ε₀A / (d/2) = 6C."
    },
    // --- فصل دوم: جریان الکتریکی و مدارها ---
    {
      id: 5,
      text: "در یک مدار الکتریکی، جریان I = 2 آمپر به مدت t = ۵ دقیقه از یک مقطع سیم می‌گذرد. تعداد الکترون‌هایی که در این مدت از مقطع عبور می‌کنند، کدام است؟ (بار الکترون e = 1.6 × 10^-19 C)",
      options: ["3.75 × 10^21", "7.5 × 10^20", "3.75 × 10^20", "1.5 × 10^21"],
      correctIndex: 0,
      answer: "گزینه ۱: بار کل Q = I*t = 2 * (5*60) = 600 C. تعداد الکترون‌ها n = Q/e = 600 / 1.6×10^-19 = 3.75 × 10^21."
    },
    {
      id: 6,
      text: "یک سیم مسی به طول L و سطح مقطع A مقاومت R دارد. اگر طول آن را دو برابر کرده و سطح مقطع آن را نصف کنیم (دمای ثابت)، مقاومت جدید چند برابر R می‌شود؟",
      options: ["2", "4", "8", "16"],
      correctIndex: 1,
      answer: "گزینه ۲ (4): R = ρL/A. L'=2L و A'=A/2 → R' = ρ(2L) / (A/2) = 4ρL/A = 4R."
    },
    {
      id: 7,
      text: "در یک مدار، دو مقاومت R1= 6Ω و R2= 12Ω به صورت موازی بسته شده‌اند. مقاومت معادل این دو چند اهم است؟",
      options: ["2", "4", "6", "18"],
      correctIndex: 1,
      answer: "گزینه ۲ (4): در اتصال موازی: 1/Req = 1/R1 + 1/R2 → 1/Req = 1/6 + 1/12 = 3/12 → Req = 4Ω."
    },
    {
      id: 8,
      text: "اگر اختلاف پتانسیل دو سر یک مقاومت ۴ برابر شود، توان مصرفی چند برابر می‌شود؟",
      options: ["2", "4", "8", "16"],
      correctIndex: 3,
      answer: "گزینه ۴ (16): فرمول توان P = V²/R. ولتاژ ۴ برابر → V'² = (4V)² = 16V² → توان ۱۶ برابر می‌شود."
    },
    // --- فصل سوم: مغناطیس ---
    {
      id: 9,
      text: "یک پروتون با سرعت v = 2 × 10^6 m/s در راستای محور +x وارد میدان مغناطیسی یکنواخت B = 0.5 T در راستای محور +y می‌شود. اندازه نیروی مغناطیسی وارد بر پروتون چند نیوتون است؟ (بار پروتون q = 1.6 × 10^-19 C)",
      options: ["0", "1.6 × 10^-13", "3.2 × 10^-13", "6.4 × 10^-13"],
      correctIndex: 1,
      answer: "گزینه ۲: F = qvB sinθ. زاویه بین بردار سرعت (x) و میدان (y) برابر ۹۰ درجه است. F = (1.6×10^-19) * (2×10^6) * 0.5 = 1.6×10^-13 N."
    },
    {
      id: 10,
      text: "یک سیم بلند حامل جریان I = 10 A در میدان مغناطیسی خارجی B = 0.2 T قرار دارد. اگر طول سیم درون میدان L = 0.5 m باشد و زاویه بین جریان و میدان ۳۰ درجه باشد، اندازه نیرو چقدر است؟",
      options: ["0.5 N", "0.25 N", "1.0 N", "2.0 N"],
      correctIndex: 0,
      answer: "گزینه ۱: F = BIL sinθ = 0.2 * 10 * 0.5 * sin(30°) = 1 * 0.5 = 0.5 N."
    },
    // --- فصل چهارم: القای الکترومغناطیسی ---
    {
      id: 11,
      text: "یک سیم‌لوله با ۲۰۰ دور و طول ۲۰ سانتی‌متر، حامل جریان ۲ آمپر است. میدان مغناطیسی داخل این سیم‌لوله چند تسلا است؟ (μ₀ = 4π × 10^-7 T.m/A)",
      options: ["2.5 × 10^-4", "5 × 10^-4", "2.5 × 10^-3", "5 × 10^-3"],
      correctIndex: 2,
      answer: "گزینه ۳: B = μ₀ * (N/L) * I = 4π×10^-7 * (200/0.2) * 2 = 2.5 × 10^-3 T."
    },
    {
      id: 12,
      text: "شار مغناطیسی عبوری از یک پیچه در مدت 0.1 ثانیه به طور یکنواخت از 2 Wb به 8 Wb افزایش می‌یابد. اگر این پیچه ۵۰ دور داشته باشد، نیروی محرکه القایی متوسط چقدر است؟",
      options: ["3000 V", "300 V", "60 V", "6 V"],
      correctIndex: 0,
      answer: "گزینه ۱: ε = N * (ΔΦ/Δt) = 50 * ((8-2)/0.1) = 50 * 60 = 3000 V."
    }
  ];

  // State ها
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: number}>({});
  const [showAnswers, setShowAnswers] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);
  
  // =============== State مربوط به تایمر ===============
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 دقیقه به ثانیه
  const [isTimeUp, setIsTimeUp] = useState(false);

  // =============== useEffect تایمر ===============
  useEffect(() => {
    // اگر زمان تمام شده یا درصد محاسبه شده، تایمر را متوقف کن
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

    // پاکسازی تایمر هنگام unmount شدن کامپوننت
    return () => clearInterval(timer);
  }, [isTimeUp, hasCalculated]);

  // =============== تابع هندل کردن کلیک روی گزینه‌ها ===============
  const handleOptionClick = (questionId: number, optionIndex: number) => {
    if (isTimeUp) return; // اگر زمان تمام شده، اجازه تغییر پاسخ را نده

    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: optionIndex
    });
    // وقتی کاربر پاسخ جدیدی می‌دهد، اگر قبلا محاسبه شده بود، آن را ریست می‌کنیم
    if (hasCalculated) {
      setHasCalculated(false);
      setScore(null);
    }
  };

  // =============== تابع محاسبه درصد ===============
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
    
    // تایمر را متوقف کن (چون محاسبه انجام شد)
    setIsTimeUp(true); 
  };

  // =============== استفاده از useEffect برای محاسبه خودکار در پایان زمان ===============
  useEffect(() => {
    if (isTimeUp && !hasCalculated) {
      calculateScore();
    }
  }, [isTimeUp]);

  // بررسی اینکه آیا کاربر به همه سوالات پاسخ داده است
  const isAllAnswered = questions.every(q => selectedAnswers[q.id] !== undefined);
  // آیا می‌توان درصد را محاسبه کرد؟
  const canCalculate = isAllAnswered && !hasCalculated && !isTimeUp;

  // دریافت رنگ بر اساس درصد
  const getScoreColor = (score: number) => {
    if (score >= 80) return '#28a745';
    if (score >= 50) return '#ffc107';
    return '#dc3545';
  };

  // فرمت کردن زمان (دقیقه:ثانیه)
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
      
      {/* هدر آزمون جامع */}
      <div style={{
        backgroundColor: '#2c3e50',
        color: 'white',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '30px',
        textAlign: 'center',
        position: 'relative'
      }}>
        <button 
          onClick={() => router.push('/exam/yazdahom/riyazi/sanjesh/second-half/fizik-2')}
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
          ← بازگشت
        </button>
        
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '28px' }}>🏆 آزمون جامع کل کتاب فیزیک (۲)</h1>
            <p style={{ marginTop: '10px', fontSize: '16px', opacity: 0.9 }}>ویژه آزمون‌های قلمچی - شامل {questions.length} سوال ترکیبی از ۴ فصل</p>
          </div>
          
          {/* =============== نمایش تایمر =============== */}
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

      {/* بخش سوالات */}
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
            {/* شماره سوال و متن */}
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
                backgroundColor: '#2c3e50',
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
            
            {/* گزینه‌ها (دو ستونی) */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px 30px',
              marginRight: '20px'
            }}>
              {q.options.map((opt, idx) => {
                const isSelected = selectedAnswers[q.id] === idx;
                // اگر زمان تمام شده، گزینه‌ها غیرفعال می‌شوند
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
                      border: isSelected ? '3px solid #2c3e50' : '1px solid #dee2e6',
                      borderRadius: '10px',
                      backgroundColor: isSelected ? '#e9ecef' : '#fff',
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
                      backgroundColor: isSelected ? '#2c3e50' : '#fff',
                      color: isSelected ? '#fff' : '#000'
                    }}>
                      {String.fromCharCode(65 + idx)} {/* A, B, C, D */}
                    </span>
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* ===== بخش نمایش درصد ===== */}
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
              
              {/* دکمه محاسبه درصد */}
              <div>
                {!hasCalculated ? (
                  <button
                    onClick={calculateScore}
                    disabled={!canCalculate}
                    style={{
                      padding: '12px 30px',
                      fontSize: '18px',
                      backgroundColor: canCalculate ? '#007bff' : '#6c757d',
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
                  <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#2c3e50' }}>
                    ✅ درصد شما: <span style={{ color: getScoreColor(score!), fontSize: '22px' }}>{Math.round(score!)}%</span>
                    {isTimeUp && hasCalculated && <span style={{ fontSize: '14px', color: '#dc3545', marginRight: '15px' }}>(زمان پایان یافت)</span>}
                  </div>
                )}
              </div>

              {/* نوار پیشرفت (Progress Bar) درصد */}
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

        {/* دکمه نمایش پاسخنامه */}
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

        {/* بخش پاسخنامه */}
        {showAnswers && (
          <div style={{
            marginTop: '30px',
            borderTop: '4px solid #2c3e50',
            paddingTop: '40px',
            backgroundColor: '#ffffff',
            padding: '40px',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
            width: '100%'
          }}>
            <h2 style={{ 
              textAlign: 'center', 
              borderBottom: '3px solid #2c3e50', 
              paddingBottom: '20px', 
              marginBottom: '40px',
              fontSize: '26px',
              color: '#2c3e50'
            }}>
              📝 پاسخنامه تشریحی آزمون جامع
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
                      color: '#2c3e50',
                      backgroundColor: '#f8f9fa',
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
                    {/* نمایش پاسخ کاربر و درستی آن */}
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
                    <span style={{ fontWeight: 'bold', color: '#007bff' }}>📖 توضیح کامل:</span> 
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

export default PhysicsFinalExam;