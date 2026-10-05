"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const Shimi2lesson11 = () => {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  // ================= سوالات درس ۲-۴: ترموشیمی =================
  const questions = [
    
    {
      id: 134,
      text: "اگر به 160 گرم آب با دمای 10°C، 41800 ژول گرما داده شود، دمای آن 62/5 درجه افزایش می‌یابد. در آزمایش دیگر همان 160 گرم آب با دمای 10°C را با 1000 گرم روغن زیتون با دمای 70°C مخلوط می‌کنیم که به دمای تعادل 55°C می‌رسند. حال اگر به یک کیلوگرم روغن و یک کیلوگرم آب (در دو ظرف جداگانه و دمای یکسان) هرکدام به طور جداگانه 60 kJ گرما داده شود، تفاوت دمای این دو ماده، به تقریب چند درجه سانتی‌گراد خواهد بود؟",
      options: ["23", "32", "43", "55"],
      correctIndex: 0,
      answer: "۲۳ درجه سانتی‌گراد"
    },
    
    {
      id: 136,
      text: "مجموع آنتالپی‌های پیوند در دو گاز اتان و پروپان برابر با 2820 و 3992 کیلوژول است. تفاوت آنتالپی پیوندهای C – C و C – H چند کیلوژول بر مول است؟",
      options: ["64", "45", "46", "54"],
      correctIndex: 0,
      answer: "۶۴ کیلوژول بر مول"
    },
    
    {
      id: 138,
      text: "مقداری آمونیاک طی واکنش NH₃(g) → NH(g) + 2H(g)، 12 مول فرآورده ایجاد می‌کند. اگر آنتالپی این واکنش، صد برابر گرمای لازم برای افزایش دمای این مقدار آمونیاک از 25°C به 100°C باشد، ΔH این واکنش بر حسب کیلوژول بر مول کدام است؟ (گرمای ویژۀ آمونیاک را 1/15 J.g⁻¹.C⁻¹ در نظر بگیرید) (N = 14, H = 1: g.mol⁻¹)",
      options: ["395", "391", "377", "386"],
      correctIndex: 0,
      answer: "۳۹۵ کیلوژول بر مول"
    },
    
    {
      id: 140,
      text: "کدام گزینه زیر درست است؟\n۱) در واکنش تجزیه دی‌نیتروژن تترااکسید به نیتروژن دی‌اکسید علامت Q منفی است.\n۲) در واکنش تجزیه هیدروژن پراکسید پایداری فرآورده‌ها از پایداری واکنش‌دهنده بیشتر است.\n۳) سطح انرژی واکنش‌دهنده‌ها در واکنش فتوسنتز از سطح انرژی فرآورده‌ها بیشتر است.\n۴) انحلال کلسیم کلرید خشک در آب، گرم‌گیر است.",
      options: ["گزینه ۱", "گزینه ۲", "گزینه ۳", "گزینه ۴"],
      correctIndex: 1,
      answer: "گزینه ۲ درست است."
    },
    
    
    {
      id: 143,
      text: "۲۲ گرم گاز پروپان را با ۷۰/۴ گرم گاز اکسیژن می‌سوزانیم. به‌علت کمبود اکسیژن، علاوه بر سوختن کامل، مقداری از پروپان به‌طور ناقص مطابق معادله‌های ترموشیمیایی زیر سوخته و در پایان تمام پروپان و اکسیژن مصرف می‌شوند. مقدار گرمای آزاد شده در این فرایند برحسب کیلوژول کدام است؟ (C = 12, H = 1: g.mol⁻¹)\nC₃H₈(g) + 5O₂(g) → 3CO₂(g) + 4H₂O(g)  ΔH = -1898 kJ\n۲C₃H₈(g) + 7O₂(g) → 6CO(g) + 8H₂O(g)  ΔH = -2410 kJ",
      options: ["912/5", "1077", "741/4", "810/4"],
      correctIndex: 0,
      answer: "۹۱۲/۵ کیلوژول"
    },
    
    {
      id: 145,
      text: "اگر آنتالپی سوختن متان با گرمای آزادشده از سوختن ۱۷/۸ گرم پروپان برابر باشد، بر اثر سوختن ۴ گرم متان چند kJ انرژی آزاد می‌شود؟ (آنتالپی سوختن پروپان را -2220 کیلوژول بر مول در نظر بگیرید) (C = 12, H = 1: g.mol⁻¹)",
      options: ["236/5", "236/5", "222/5", "222/5"],
      correctIndex: 0,
      answer: "۲۳۶/۵ کیلوژول"
    },
    
    {
      id: 147,
      text: "کدام گزینه نادرست است؟\n۱) ΔH یک واکنش به راهی که برای انجام واکنش انتخاب می‌کند، وابسته نیست.\n۲) استفاده از آنتالپی پیوند، همانند قانون هس، راهی غیرمستقیم برای محاسبة گرمای واکنش است.\n۳) به کار بردن آنتالپی‌های پیوند برای تعیین ΔH واکنش‌هایی مناسب است که همه اجزای آن واکنش به حالت گاز باشند.\n۴) پیچیدگی مولکول‌ها در یک واکنش گازی، با اختلاف گرمای محاسبه‌شده به کمک آنتالپی پیوند و داده‌های تجربی، رابطه عکس دارد.",
      options: ["گزینه ۱", "گزینه ۲", "گزینه ۳", "گزینه ۴"],
      correctIndex: 3,
      answer: "گزینه ۴ نادرست است."
    },
    
    {
      id: 149,
      text: "کشاورزی در گلخانه خود ۲۰۰ نهال سیب کاشته است. اگر هر نهال روزانه ۳ لیتر گاز اکسیژن تولید کند، گرمای مصرف شده توسط این نهال‌ها در مدت یک هفته در عمل فتوسنتز، برحسب کیلوژول کدام است؟ (چگالی گاز اکسیژن را در شرایط گلخانه ۱/۶ گرم بر لیتر و تغییر آنتالپی را در واکنش موازنه شده فتوسنتز، ۲۸۰۰ کیلوژول بر مول در نظر بگیرید) (O₂ = ۳۲ g.mol⁻¹)\n۶CO₂(g) + ۶H₂O(l) → C₆H₁₂O₆(s) + ۶O₂(g)",
      options: ["98000", "14000", "58800", "84000"],
      correctIndex: 2,
      answer: "۵۸۸۰۰ کیلوژول"
    },
    
    {
      id: 151,
      text: "کدام گزینه، جاهای خالی موجود در جمله زیر را به درستی کامل می‌کند؟\nمقدار آنتالپی پیوند ...... از آنتالپی پیوند ...... در شرایط یکسان ...... است.\n۱) O – H, کوچک‌تر\n۲) N – H, بزرگ‌تر\n۳) C = C, کوچک‌تر\n۴) H – Cl, بزرگ‌تر",
      options: ["گزینه ۱", "گزینه ۲", "گزینه ۳", "گزینه ۴"],
      correctIndex: 0,
      answer: "گزینه ۱ درست است."
    },
    
    
    {
      id: 154,
      text: "اگر برای شکستن همۀ پیوندهای موجود در ۶/۴ گرم متان و تبدیل آنها به اتم‌های سازنده، ۸۳۰ کیلوژول انرژی صرف شود، میانگین آنتالپی پیوند C – H در مولکول متان چند کیلوژول بر مول است؟ (C = 12, H = 1: g.mol⁻¹)",
      options: ["540", "415", "400", "450"],
      correctIndex: 1,
      answer: "۴۱۵ کیلوژول بر مول"
    },
    
  ];

  // ==================== State ====================
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: number}>({});
  const [showAnswers, setShowAnswers] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [isScoreCalculated, setIsScoreCalculated] = useState(false);
  const [timeLeft, setTimeLeft] = useState(90 * 60);
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
        backgroundColor: '#2196F3',
        color: 'white',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '30px',
        textAlign: 'center',
        position: 'relative'
      }}>
        <button 
          onClick={() => router.push('/exam/yazdahom/tajrobi/ghalamchi/second-half/shimi-2-tajrobi')}
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
            <h1 style={{ margin: 0, fontSize: '28px' }}>🧪 درس ۲-۴: ترموشیمی</h1>
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
              alignItems: 'flex-start',
              whiteSpace: 'pre-wrap'
            }}>
              <span style={{
                display: 'inline-block',
                backgroundColor: '#2196F3',
                color: 'white',
                width: '30px',
                height: '30px',
                textAlign: 'center',
                lineHeight: '30px',
                borderRadius: '50%',
                fontSize: '14px',
                marginLeft: '15px',
                flexShrink: 0,
                marginTop: '2px'
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
                      border: isSelected ? '3px solid #2196F3' : '1px solid #dee2e6',
                      borderRadius: '10px',
                      backgroundColor: isSelected ? '#e3f2fd' : '#fff',
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
                      backgroundColor: isSelected ? '#2196F3' : '#fff',
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
                  backgroundColor: canCalculate ? '#2196F3' : '#6c757d',
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
              <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#2196F3' }}>
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
            borderTop: '4px solid #2196F3',
            paddingTop: '40px',
            backgroundColor: '#ffffff',
            padding: '40px',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
            width: '100%'
          }}>
            <h2 style={{ 
              textAlign: 'center', 
              borderBottom: '3px solid #2196F3', 
              paddingBottom: '20px', 
              marginBottom: '40px',
              fontSize: '26px',
              color: '#2196F3'
            }}>
              📝 پاسخنامه تشریحی - درس ۲-۴: ترموشیمی
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
                      color: '#2196F3',
                      backgroundColor: '#e3f2fd',
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
                    <span style={{ fontWeight: 'bold', color: '#2196F3' }}>📖 توضیح:</span> 
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

export default Shimi2lesson11;