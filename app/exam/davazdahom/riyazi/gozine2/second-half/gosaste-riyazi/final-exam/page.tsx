"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const GosasteRiyaziSecondHalfFinalExam = () => {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  // ================= سوالات ریاضی گسسته - جامع نیم‌سال دوم =================
  const questions = [
    // ==================== فصل اول: نظریه اعداد پیشرفته ====================
    {
      id: 1,
      text: "بزرگترین مقسوم‌علیه مشترک (ب.م.م) اعداد 48 و 72 چند است؟",
      options: ["12", "24", "36", "48"],
      correctIndex: 1,
      answer: "گزینه ۲: ب.م.م(48,72) = 24"
    },
    {
      id: 2,
      text: "کوچکترین مضرب مشترک (ک.م.م) اعداد 12 و 18 چند است؟",
      options: ["24", "36", "48", "72"],
      correctIndex: 1,
      answer: "گزینه ۲: ک.م.م(12,18) = 36"
    },
    {
      id: 3,
      text: "معادله 7x + 11y = 2 چند جواب صحیح دارد؟",
      options: ["یک جواب", "دو جواب", "نامتناهی جواب", "هیچ جواب"],
      correctIndex: 2,
      answer: "گزینه ۳: معادلات دیوفانتین خطی با جواب، دارای نامتناهی جواب صحیح هستند."
    },
    {
      id: 4,
      text: "طبق قضیه کوچک فرما، 3^10 ≡ ? (mod 11)",
      options: ["1", "3", "10", "0"],
      correctIndex: 0,
      answer: "گزینه ۱: طبق قضیه کوچک فرما، a^(p-1) ≡ 1 (mod p). پس 3^10 ≡ 1 (mod 11)"
    },
    {
      id: 5,
      text: "همنهشتی 23 ≡ 3 (mod 5) به چه معناست؟",
      options: ["23 بر 5 بخش‌پذیر است", "3 بر 5 بخش‌پذیر است", "23 و 3 باقیمانده یکسان بر 5 دارند", "23 و 3 متضاد هستند"],
      correctIndex: 2,
      answer: "گزینه ۳: یعنی 23 و 3 هنگام تقسیم بر 5 باقیمانده یکسانی دارند."
    },
    {
      id: 6,
      text: "مخرج مشترک کسرهای 1/6 و 1/8 کدام است؟",
      options: ["12", "18", "24", "48"],
      correctIndex: 2,
      answer: "گزینه ۳: ک.م.م(6,8) = 24"
    },

    // ==================== فصل دوم: ترکیبیات پیشرفته ====================
    {
      id: 7,
      text: "تعداد راه‌های انتخاب 4 نفر از 8 نفر چند است؟",
      options: ["56", "70", "80", "90"],
      correctIndex: 1,
      answer: "گزینه ۲: C(8,4) = 8!/(4!×4!) = 70"
    },
    {
      id: 8,
      text: "تعداد جایگشت‌های حروف کلمه 'MISSISSIPPI' چند است؟",
      options: ["34650", "69300", "138600", "277200"],
      correctIndex: 0,
      answer: "گزینه ۱: 11!/(4!×4!×2!) = 34650"
    },
    {
      id: 9,
      text: "ضریب جمله x⁴ در بسط (x+3)⁶ کدام است؟",
      options: ["540", "1215", "2430", "7290"],
      correctIndex: 1,
      answer: "گزینه ۲: C(6,4) × x⁴ × 3² = 15 × 9 = 135"
    },
    {
      id: 10,
      text: "در مثلث خیام، سطر ششم (از صفر شروع) شامل چند عدد است؟",
      options: ["5", "6", "7", "8"],
      correctIndex: 2,
      answer: "گزینه ۳: سطر ششم شامل 7 عدد است (n+1 = 7)"
    },
    {
      id: 11,
      text: "تعداد زیرمجموعه‌های یک مجموعه 5 عضوی چند است؟",
      options: ["16", "24", "32", "64"],
      correctIndex: 2,
      answer: "گزینه ۳: 2^5 = 32"
    },
    {
      id: 12,
      text: "در چند راه می‌توان 3 کتاب از 5 کتاب مختلف را در یک قفسه چید؟",
      options: ["60", "120", "240", "360"],
      correctIndex: 0,
      answer: "گزینه ۱: P(5,3) = 5!/(5-3)! = 120/2 = 60"
    },

    // ==================== فصل سوم: گراف و درخت پیشرفته ====================
    {
      id: 13,
      text: "در یک گراف ساده با 7 راس، حداکثر تعداد یال‌ها چند است؟",
      options: ["14", "21", "28", "42"],
      correctIndex: 1,
      answer: "گزینه ۲: حداکثر یال‌ها = n(n-1)/2 = 7×6/2 = 21"
    },
    {
      id: 14,
      text: "یک گراف با 6 راس و 7 یال، حداقل چند دور دارد؟",
      options: ["0", "1", "2", "3"],
      correctIndex: 0,
      answer: "گزینه ۱: گراف می‌تواند بدون دور باشد (درخت با 5 یال، با اضافه کردن 2 یال می‌تواند دور داشته باشد یا نداشته باشد)"
    },
    {
      id: 15,
      text: "در یک درخت با 10 راس، چند یال وجود دارد؟",
      options: ["8", "9", "10", "11"],
      correctIndex: 1,
      answer: "گزینه ۲: درخت با n راس، n-1 = 9 یال دارد."
    },
    {
      id: 16,
      text: "گراف کامل K₅ چند یال دارد؟",
      options: ["5", "8", "10", "15"],
      correctIndex: 2,
      answer: "گزینه ۳: K₅ = 5×4/2 = 10"
    },
    {
      id: 17,
      text: "گراف دوبخشی کامل K₂,₃ چند یال دارد؟",
      options: ["5", "6", "8", "10"],
      correctIndex: 1,
      answer: "گزینه ۲: K₂,₃ = 2×3 = 6"
    },
    {
      id: 18,
      text: "کد پرودو برای درخت با 5 راس چند عضو دارد؟",
      options: ["3", "4", "5", "6"],
      correctIndex: 0,
      answer: "گزینه ۱: کد پرودو برای درخت با n راس، n-2 = 3 عضو دارد."
    },

    // ==================== فصل چهارم: کاربردهای گراف ====================
    {
      id: 19,
      text: "الگوریتم دایجسترا برای چه کاری استفاده می‌شود؟",
      options: ["پیدا کردن کوتاه‌ترین مسیر", "پیدا کردن طولانی‌ترین مسیر", "پیدا کردن درخت پوشا", "رنگ‌آمیزی گراف"],
      correctIndex: 0,
      answer: "گزینه ۱: الگوریتم دایجسترا برای یافتن کوتاه‌ترین مسیر در گراف‌های وزن‌دار استفاده می‌شود."
    },
    {
      id: 20,
      text: "الگوریتم پریما برای چه کاری استفاده می‌شود؟",
      options: ["پیدا کردن کوتاه‌ترین مسیر", "پیدا کردن درخت پوشای کمینه", "پیدا کردن دور اویلری", "رنگ‌آمیزی گراف"],
      correctIndex: 1,
      answer: "گزینه ۲: الگوریتم پریما برای یافتن درخت پوشای کمینه استفاده می‌شود."
    },
    {
      id: 21,
      text: "گراف اویلری چه شرطی دارد؟",
      options: ["همه راس‌ها درجه زوج دارند", "همه راس‌ها درجه فرد دارند", "حداکثر دو راس درجه فرد دارند", "هیچ راس درجه فردی ندارد"],
      correctIndex: 0,
      answer: "گزینه ۱: گراف اویلری دارای مداری است که از همه یال‌ها دقیقاً یک بار عبور کند و شرط آن زوج بودن درجه همه راس‌هاست."
    },
    {
      id: 22,
      text: "گراف همیلتونی چه ویژگی دارد؟",
      options: ["مداری دارد که از همه راس‌ها دقیقاً یک بار عبور کند", "مداری دارد که از همه یال‌ها دقیقاً یک بار عبور کند", "همه راس‌ها درجه زوج دارند", "هیچکدام"],
      correctIndex: 0,
      answer: "گزینه ۱: گراف همیلتونی دارای مداری است که از همه راس‌ها دقیقاً یک بار عبور کند."
    },
    {
      id: 23,
      text: "در گراف جهت‌دار، درجه ورودی یک راس به چه معناست؟",
      options: ["تعداد یال‌های ورودی به راس", "تعداد یال‌های خروجی از راس", "مجموع یال‌های ورودی و خروجی", "تعداد راس‌های همسایه"],
      correctIndex: 0,
      answer: "گزینه ۱: درجه ورودی، تعداد یال‌هایی است که به آن راس وارد می‌شوند."
    },
    {
      id: 24,
      text: "الگوریتم کراسکال برای چه کاری استفاده می‌شود؟",
      options: ["پیدا کردن کوتاه‌ترین مسیر", "پیدا کردن درخت پوشای کمینه", "پیدا کردن دور اویلری", "رنگ‌آمیزی گراف"],
      correctIndex: 1,
      answer: "گزینه ۲: الگوریتم کراسکال مانند پریما برای یافتن درخت پوشای کمینه استفاده می‌شود."
    },

    // ==================== سوالات ترکیبی ====================
    {
      id: 25,
      text: "در یک گراف با 8 راس و 12 یال، تعداد درخت‌های پوشا حداقل چند است؟",
      options: ["1", "2", "3", "4"],
      correctIndex: 0,
      answer: "گزینه ۱: هر گراف همبند حداقل یک درخت پوشا دارد."
    },
    {
      id: 26,
      text: "تعداد راه‌های تقسیم 6 نفر به دو تیم 3 نفره چند است؟",
      options: ["10", "15", "20", "30"],
      correctIndex: 2,
      answer: "گزینه ۳: C(6,3)/2 = 20/2 = 10"
    },
    {
      id: 27,
      text: "در یک مسابقه شطرنج با 8 شرکت‌کننده، تعداد کل بازی‌ها چند است؟",
      options: ["16", "20", "28", "36"],
      correctIndex: 2,
      answer: "گزینه ۳: C(8,2) = 28"
    },
    {
      id: 28,
      text: "ب.م.م و ک.م.م دو عدد به ترتیب 8 و 96 هستند. اگر یکی از اعداد 24 باشد، عدد دیگر چند است؟",
      options: ["16", "24", "32", "48"],
      correctIndex: 2,
      answer: "گزینه ۳: حاصل ضرب دو عدد = ب.م.م × ک.م.م = 8×96 = 768. عدد دیگر = 768/24 = 32"
    },
    {
      id: 29,
      text: "معادله 4x + 6y = 10 چند جواب صحیح مثبت دارد؟",
      options: ["0", "1", "2", "3"],
      correctIndex: 0,
      answer: "گزینه ۱: معادله 4x + 6y = 10 هیچ جواب صحیح مثبتی ندارد."
    },
    {
      id: 30,
      text: "در یک گراف همبند با n راس، حداقل چند یال لازم است تا دور داشته باشد؟",
      options: ["n-1", "n", "n+1", "n+2"],
      correctIndex: 1,
      answer: "گزینه ۲: برای داشتن دور در گراف همبند با n راس، حداقل به n یال نیاز است."
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
          onClick={() => router.push('/exam/davazdahom/riyazi/gozine2/second-half')}
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
            <h1 style={{ margin: 0, fontSize: '28px' }}>🧮 آزمون جامع ریاضی گسسته - نیم‌سال دوم</h1>
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
              📝 پاسخنامه تشریحی ریاضی گسسته - نیم‌سال دوم
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

export default GosasteRiyaziSecondHalfFinalExam;