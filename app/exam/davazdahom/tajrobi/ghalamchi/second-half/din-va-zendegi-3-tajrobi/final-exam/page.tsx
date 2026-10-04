"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const DinVaZendegi3FinalExam = () => {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  // ================= سوالات درس دین و زندگی ۳ =================
  const questions = [
    // ==================== سوالات ۱ تا ۵ ====================
    {
      id: 1,
      text: "عالم ذر به چه معناست؟",
      options: [
        "عالمی که در آن انسان‌ها با خدا پیمان بستند",
        "عالمی که در آن انسان‌ها زندگی می‌کنند",
        "عالمی که در آن فرشتگان هستند",
        "عالمی که در آن پیامبران بودند"
      ],
      correctIndex: 0,
      answer: "عالم ذر، عالمی است که در آن انسان‌ها با خداوند پیمان بستند."
    },
    {
      id: 2,
      text: "کدام یک از موارد زیر از صفات خداوند است؟",
      options: ["رحمان", "رحیم", "ملک", "همه موارد"],
      correctIndex: 3,
      answer: "همه موارد از صفات خداوند هستند."
    },
    {
      id: 3,
      text: "هدف از خلقت انسان چیست؟",
      options: [
        "عبادت و بندگی خدا",
        "زندگی در دنیا",
        "رسیدن به ثروت",
        "رسیدن به مقام"
      ],
      correctIndex: 0,
      answer: "هدف از خلقت انسان، عبادت و بندگی خداوند است."
    },
    {
      id: 4,
      text: "کدام یک از موارد زیر از نشانه‌های ایمان است؟",
      options: [
        "توکل به خدا",
        "صبر و استقامت",
        "اخلاص در عمل",
        "همه موارد"
      ],
      correctIndex: 3,
      answer: "همه موارد از نشانه‌های ایمان هستند."
    },
    {
      id: 5,
      text: "معنای 'لا إله إلا اللّه' چیست؟",
      options: [
        "خدایی جز الله نیست",
        "خداوند بزرگ است",
        "خداوند مهربان است",
        "خداوند شنوا است"
      ],
      correctIndex: 0,
      answer: "'لا إله إلا اللّه' به معنای 'خدایی جز الله نیست' است."
    },
    // ==================== سوالات ۶ تا ۱۰ ====================
    {
      id: 6,
      text: "کدام یک از موارد زیر از ارکان نماز است؟",
      options: ["قیام", "رکوع", "سجود", "همه موارد"],
      correctIndex: 3,
      answer: "همه موارد از ارکان نماز هستند."
    },
    {
      id: 7,
      text: "معنای 'توکل' چیست؟",
      options: [
        "تکیه بر خداوند",
        "تکیه بر خود",
        "تکیه بر دیگران",
        "تکیه بر ثروت"
      ],
      correctIndex: 0,
      answer: "توکل به معنای تکیه بر خداوند است."
    },
    {
      id: 8,
      text: "کدام یک از موارد زیر از نشانه‌های قیامت است؟",
      options: [
        "طلوع خورشید از مغرب",
        "ظهور دجال",
        "نزول حضرت عیسی",
        "همه موارد"
      ],
      correctIndex: 3,
      answer: "همه موارد از نشانه‌های قیامت هستند."
    },
    {
      id: 9,
      text: "معنای 'صبر' چیست؟",
      options: [
        "شکیبایی و استقامت",
        "عجله کردن",
        "ناراحت شدن",
        "خشمگین شدن"
      ],
      correctIndex: 0,
      answer: "صبر به معنای شکیبایی و استقامت است."
    },
    {
      id: 10,
      text: "کدام یک از موارد زیر از شکر عملی است؟",
      options: [
        "استفاده از نعمت‌ها در راه خدا",
        "انکار نعمت‌ها",
        "اسراف در نعمت‌ها",
        "بی‌توجهی به نعمت‌ها"
      ],
      correctIndex: 0,
      answer: "استفاده از نعمت‌ها در راه خدا، شکر عملی است."
    },
    // ==================== سوالات ۱۱ تا ۱۵ ====================
    {
      id: 11,
      text: "معنای 'اخبات' چیست؟",
      options: [
        "خشوع و فروتنی در برابر خدا",
        "تکبر و غرور",
        "خشم و عصبانیت",
        "نادانی و جهل"
      ],
      correctIndex: 0,
      answer: "اخبات به معنای خشوع و فروتنی در برابر خداوند است."
    },
    {
      id: 12,
      text: "کدام یک از موارد زیر از صفات پیامبران است؟",
      options: ["صادق", "امین", "فطانت", "همه موارد"],
      correctIndex: 3,
      answer: "همه موارد از صفات پیامبران هستند."
    },
    {
      id: 13,
      text: "معنای 'توبه' چیست؟",
      options: [
        "بازگشت به سوی خدا",
        "ادامه دادن گناه",
        "ترک نماز",
        "انکار خدا"
      ],
      correctIndex: 0,
      answer: "توبه به معنای بازگشت به سوی خداوند است."
    },
    {
      id: 14,
      text: "کدام یک از موارد زیر از نشانه‌های مؤمن است؟",
      options: [
        "دوست داشتن خدا",
        "دوست داشتن پیامبر",
        "دوست داشتن مؤمنان",
        "همه موارد"
      ],
      correctIndex: 3,
      answer: "همه موارد از نشانه‌های مؤمن هستند."
    },
    {
      id: 15,
      text: "معنای 'زکات' چیست؟",
      options: [
        "پاک کردن مال",
        "زیاد کردن مال",
        "کم کردن مال",
        "مخفی کردن مال"
      ],
      correctIndex: 0,
      answer: "زکات به معنای پاک کردن مال است."
    },
    // ==================== سوالات ۱۶ تا ۲۰ ====================
    {
      id: 16,
      text: "کدام یک از موارد زیر از اقسام توحید است؟",
      options: ["توحید ذاتی", "توحید صفاتی", "توحید عبادی", "همه موارد"],
      correctIndex: 3,
      answer: "همه موارد از اقسام توحید هستند."
    },
    {
      id: 17,
      text: "معنای 'جهاد' چیست؟",
      options: [
        "تلاش در راه خدا",
        "جنگ با دشمن",
        "جهاد با نفس",
        "همه موارد"
      ],
      correctIndex: 3,
      answer: "جهاد به معنای تلاش در راه خدا است و شامل همه موارد می‌شود."
    },
    {
      id: 18,
      text: "کدام یک از موارد زیر از شرایط قبولی اعمال است؟",
      options: [
        "ایمان به خدا",
        "اخلاص در عمل",
        "اتباع از پیامبر",
        "همه موارد"
      ],
      correctIndex: 3,
      answer: "همه موارد از شرایط قبولی اعمال هستند."
    },
    {
      id: 19,
      text: "معنای 'رحمان' چیست؟",
      options: [
        "بخشنده و مهربان",
        "قدرتمند",
        "دانا",
        "شنوا"
      ],
      correctIndex: 0,
      answer: "رحمان به معنای بخشنده و مهربان است."
    },
    {
      id: 20,
      text: "کدام یک از موارد زیر از آثار ایمان است؟",
      options: [
        "آرامش قلب",
        "امید به رحمت خدا",
        "توکل بر خدا",
        "همه موارد"
      ],
      correctIndex: 3,
      answer: "همه موارد از آثار ایمان هستند."
    },
    // ==================== سوالات ۲۱ تا ۲۵ ====================
    {
      id: 21,
      text: "معنای 'اسراف' چیست؟",
      options: [
        "زیاده‌روی در مصرف",
        "صرفه‌جویی",
        "بخشش",
        "اقتصاد"
      ],
      correctIndex: 0,
      answer: "اسراف به معنای زیاده‌روی در مصرف است."
    },
    {
      id: 22,
      text: "کدام یک از موارد زیر از اصول دین است؟",
      options: ["توحید", "نبوت", "معاد", "همه موارد"],
      correctIndex: 3,
      answer: "همه موارد از اصول دین هستند."
    },
    {
      id: 23,
      text: "معنای 'عدل' چیست؟",
      options: [
        "عدالت و دادگری",
        "ظلم و ستم",
        "بخل و حسد",
        "تکبر و غرور"
      ],
      correctIndex: 0,
      answer: "عدل به معنای عدالت و دادگری است."
    },
    {
      id: 24,
      text: "کدام یک از موارد زیر از فروع دین است؟",
      options: ["نماز", "روزه", "حج", "همه موارد"],
      correctIndex: 3,
      answer: "همه موارد از فروع دین هستند."
    },
    {
      id: 25,
      text: "معنای 'امامت' چیست؟",
      options: [
        "رهبری و پیشوایی",
        "عاقبت به خیری",
        "هدایت و راهنمایی",
        "همه موارد"
      ],
      correctIndex: 3,
      answer: "امامت به معنای رهبری و پیشوایی است و شامل همه موارد می‌شود."
    },
    // ==================== سوالات ۲۶ تا ۳۰ ====================
    {
      id: 26,
      text: "کدام یک از موارد زیر از نشانه‌های آخرالزمان است؟",
      options: [
        "ظهور سفیانی",
        "ظهور یمانی",
        "ظهور خراسانی",
        "همه موارد"
      ],
      correctIndex: 3,
      answer: "همه موارد از نشانه‌های آخرالزمان هستند."
    },
    {
      id: 27,
      text: "معنای 'تقی' چیست؟",
      options: [
        "پرهیزگار و باتقوا",
        "گناهکار",
        "منافق",
        "کافر"
      ],
      correctIndex: 0,
      answer: "تقی به معنای پرهیزگار و باتقوا است."
    },
    {
      id: 28,
      text: "کدام یک از موارد زیر از صفات مؤمن است؟",
      options: [
        "صداقت",
        "امانت‌داری",
        "حسن خلق",
        "همه موارد"
      ],
      correctIndex: 3,
      answer: "همه موارد از صفات مؤمن هستند."
    },
    {
      id: 29,
      text: "معنای 'یقین' چیست؟",
      options: [
        "ایمان و باور قلبی",
        "شک و تردید",
        "انکار و تکذیب",
        "نادانی"
      ],
      correctIndex: 0,
      answer: "یقین به معنای ایمان و باور قلبی است."
    },
    {
      id: 30,
      text: "کدام یک از موارد زیر از اسباب نزول رحمت است؟",
      options: [
        "استغفار",
        "توبه",
        "دعا",
        "همه موارد"
      ],
      correctIndex: 3,
      answer: "همه موارد از اسباب نزول رحمت هستند."
    },
    // ==================== سوالات ۳۱ تا ۳۵ ====================
    {
      id: 31,
      text: "معنای 'تسبیح' چیست؟",
      options: [
        "تنزیه خداوند از هر نقص",
        "تکبیر گفتن",
        "حمد گفتن",
        "استغفار کردن"
      ],
      correctIndex: 0,
      answer: "تسبیح به معنای تنزیه خداوند از هر نقص است."
    },
    {
      id: 32,
      text: "کدام یک از موارد زیر از شعب ایمان است؟",
      options: [
        "حبّ فی اللّه",
        "بغض فی اللّه",
        "جهاد فی سبیل اللّه",
        "همه موارد"
      ],
      correctIndex: 3,
      answer: "همه موارد از شعب ایمان هستند."
    },
    {
      id: 33,
      text: "معنای 'اخلاص' چیست؟",
      options: [
        "خالص کردن عمل برای خدا",
        "ریا و خودنمایی",
        "شرک و بت‌پرستی",
        "نفاق و دورویی"
      ],
      correctIndex: 0,
      answer: "اخلاص به معنای خالص کردن عمل برای خداوند است."
    },
    {
      id: 34,
      text: "کدام یک از موارد زیر از صفات واجب خداوند است؟",
      options: ["حیات", "علم", "قدرت", "همه موارد"],
      correctIndex: 3,
      answer: "همه موارد از صفات واجب خداوند هستند."
    },
    {
      id: 35,
      text: "معنای 'توبه نصوح' چیست؟",
      options: [
        "توبه خالص و حقیقی",
        "توبه سطحی",
        "توبه غیرخالص",
        "توبه ناقص"
      ],
      correctIndex: 0,
      answer: "توبه نصوح به معنای توبه خالص و حقیقی است."
    },
    // ==================== سوالات ۳۶ تا ۴۰ ====================
    {
      id: 36,
      text: "کدام یک از موارد زیر از ارکان حج است؟",
      options: ["احرام", "وقوف در عرفات", "طواف", "همه موارد"],
      correctIndex: 3,
      answer: "همه موارد از ارکان حج هستند."
    },
    {
      id: 37,
      text: "معنای 'ذکر' چیست؟",
      options: [
        "یاد خداوند",
        "فراموشی خدا",
        "انکار خدا",
        "نادانی"
      ],
      correctIndex: 0,
      answer: "ذکر به معنای یاد خداوند است."
    },
    {
      id: 38,
      text: "کدام یک از موارد زیر از عوامل نزول عذاب است؟",
      options: ["گناه", "ظلم", "فساد", "همه موارد"],
      correctIndex: 3,
      answer: "همه موارد از عوامل نزول عذاب هستند."
    },
    {
      id: 39,
      text: "معنای 'شکر' چیست؟",
      options: [
        "سپاس‌گزاری از خدا",
        "ناسپاسی",
        "کفران نعمت",
        "نادانی"
      ],
      correctIndex: 0,
      answer: "شکر به معنای سپاس‌گزاری از خداوند است."
    },
    {
      id: 40,
      text: "کدام یک از موارد زیر از صفات جمال خداوند است؟",
      options: ["رحمان", "رحیم", "لطیف", "همه موارد"],
      correctIndex: 3,
      answer: "همه موارد از صفات جمال خداوند هستند."
    },
  ];

  // ==================== State ====================
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: number}>({});
  const [showAnswers, setShowAnswers] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);
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
    setHasCalculated(true);
  }, [selectedAnswers, questions]);

  // ========== تابع انتخاب گزینه ==========
  const handleOptionClick = (questionId: number, optionIndex: number) => {
    if (isTimeUp || hasCalculated) return;

    setSelectedAnswers(prev => {
      const newAnswers = { ...prev, [questionId]: optionIndex };
      return newAnswers;
    });

    if (hasCalculated) {
      setHasCalculated(false);
      setScore(null);
      isCalculatedRef.current = false;
    }
  };

  // ========== تایمر ==========
  useEffect(() => {
    if (isTimeUp || hasCalculated) {
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
  }, [isTimeUp, hasCalculated]);

  // ========== زمان تمام شد ==========
  // ✅ اصلاح شده با استفاده از setTimeout و useRef
  useEffect(() => {
    if (isTimeUp && !hasCalculated && !isTimeUpRef.current) {
      isTimeUpRef.current = true;
      const timeoutId = setTimeout(() => {
        if (!isCalculatedRef.current) {
          calculateScore();
          isCalculatedRef.current = true;
        }
      }, 300);
      return () => clearTimeout(timeoutId);
    }
  }, [isTimeUp, hasCalculated, calculateScore]);

  // ========== بررسی پاسخ‌دهی ==========
  const isAllAnswered = questions.every(q => selectedAnswers[q.id] !== undefined);
  const canCalculate = isAllAnswered && !hasCalculated && !isTimeUp;
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
        backgroundColor: '#2c3e50',
        color: 'white',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '30px',
        textAlign: 'center',
        position: 'relative'
      }}>
        <button 
          onClick={() => router.push('/exam/davazdahom/tajrobi/ghalamchi/second-half/din-va-zendegi-3-tajrobi')}
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
                backgroundColor: '#2c3e50',
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
                const isDisabled = isTimeUp || hasCalculated;
                
                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionClick(q.id, idx)}
                    disabled={isDisabled}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '12px 18px',
                      border: isSelected ? '3px solid #2c3e50' : '1px solid #dee2e6',
                      borderRadius: '10px',
                      backgroundColor: isSelected ? '#ebf5fb' : '#fff',
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
                      backgroundColor: isSelected ? '#2c3e50' : '#fff',
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
          
          {!hasCalculated ? (
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
                  backgroundColor: canCalculate ? '#2c3e50' : '#6c757d',
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
              <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#2c3e50' }}>
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
                  setHasCalculated(false);
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
              backgroundColor: showAnswers ? '#dc3545' : '#2c3e50',
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
        {showAnswers && hasCalculated && (
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
                      color: '#2c3e50',
                      backgroundColor: '#ebf5fb',
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
                    <span style={{ fontWeight: 'bold', color: '#2c3e50' }}>📖 توضیح:</span> 
                    <br />
                    <span style={{ fontSize: '15px', lineHeight: '1.8', color: '#333' }}>{q.answer}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {showAnswers && !hasCalculated && (
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