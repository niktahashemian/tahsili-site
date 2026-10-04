"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Hesaban1FinalExam = () => {
  const router = useRouter();

  // ================= سوالات جامع حسابان (1) (ترکیبی از ۵ فصل) =================
  const questions = [
    // ==================== فصل اول: جبر و معادله (۱۰ سوال) ====================
    {
      id: 1,
      text: "معادله x² - 5x + 6 = 0 را حل کنید. مجموع ریشه‌های این معادله کدام است؟",
      options: ["۵", "۶", "-۵", "-۶"],
      correctIndex: 0,
      answer: "گزینه ۱ (۵): طبق رابطه مجموع ریشه‌ها = -b/a = -(-5)/1 = 5"
    },
    {
      id: 2,
      text: "معادله ۲x² - 3x - 2 = 0 را حل کنید. ریشه بزرگ‌تر این معادله کدام است؟",
      options: ["۲", "-۰.۵", "۱", "-۲"],
      correctIndex: 0,
      answer: "گزینه ۱ (۲): با حل معادله: x = (3 ± √(9+16))/4 = (3 ± 5)/4 → x₁ = 2, x₂ = -0.5"
    },
    {
      id: 3,
      text: "سهمی y = x² - 4x + 3 را در نظر بگیرید. رأس این سهمی در چه نقطه‌ای قرار دارد؟",
      options: ["(۲, -۱)", "(-۲, ۱)", "(۲, ۱)", "(-۲, -۱)"],
      correctIndex: 0,
      answer: "گزینه ۱: x = -b/2a = 4/2 = 2 → y = 4 - 8 + 3 = -1. رأس در نقطه (۲, -۱) است."
    },
    {
      id: 4,
      text: "تعیین علامت عبارت (x-2)(x+3) > 0 کدام است؟",
      options: ["x < -3 یا x > 2", "-3 < x < 2", "x < 2 یا x > -3", "هیچ کدام"],
      correctIndex: 0,
      answer: "گزینه ۱: ریشه‌ها x = 2 و x = -3 هستند. با رسم خط اعداد، علامت در بازه‌های (-∞, -3) مثبت و (2, ∞) مثبت است."
    },
    {
      id: 5,
      text: "دستگاه معادلات {x + y = 5, 2x - y = 1} را حل کنید. مقدار x چند است؟",
      options: ["۲", "۳", "۴", "۱"],
      correctIndex: 0,
      answer: "گزینه ۱: از معادله اول y = 5-x. در معادله دوم: 2x - (5-x) = 1 → 3x - 5 = 1 → 3x = 6 → x = 2"
    },
    {
      id: 6,
      text: "معادله x² + 4x + 4 = 0 چه نوع ریشه‌هایی دارد؟",
      options: ["دو ریشه متمایز", "دو ریشه مساوی", "ریشه حقیقی ندارد", "هیچ کدام"],
      correctIndex: 1,
      answer: "گزینه ۲: Δ = 16 - 16 = 0 → ریشه‌ها مساوی هستند. x = -2 (دوتایی)."
    },
    {
      id: 7,
      text: "مجموع جملات دنباله حسابی ۲، ۵، ۸، ...، ۲۰ چند است؟",
      options: ["۷۷", "۸۸", "۶۶", "۵۵"],
      correctIndex: 0,
      answer: "گزینه ۱ (۷۷): a₁=۲, d=۳, aₙ=۲۰ → ۲۰=۲+(n-1)۳ → n=۷. S₇ = ۷/۲(۲+۲۰) = ۷۷"
    },
    {
      id: 8,
      text: "معادله |x - 3| = 5 را حل کنید.",
      options: ["x = 8 یا x = -2", "x = 8 یا x = 2", "x = -8 یا x = 2", "x = -8 یا x = -2"],
      correctIndex: 0,
      answer: "گزینه ۱: x - 3 = 5 → x = 8 و x - 3 = -5 → x = -2"
    },
    {
      id: 9,
      text: "فاصله بین دو نقطه A(1, 2) و B(4, 6) چند است؟",
      options: ["۵", "۴", "۶", "۳"],
      correctIndex: 0,
      answer: "گزینه ۱ (۵): d = √((4-1)² + (6-2)²) = √(9+16) = √25 = 5"
    },
    {
      id: 10,
      text: "معادله x² - 4x + m = 0 دارای ریشه‌های مساوی است. مقدار m چند است؟",
      options: ["۴", "-۴", "۰", "۸"],
      correctIndex: 0,
      answer: "گزینه ۱ (۴): شرط ریشه‌های مساوی Δ = 0 → 16 - 4m = 0 → m = 4"
    },

    // ==================== فصل دوم: تابع (۱۰ سوال) ====================
    {
      id: 11,
      text: "تابع f(x) = 2x + 3 را در نظر بگیرید. دامنه این تابع چیست؟",
      options: ["R", "R - {3}", "R - {2}", "[0, ∞)"],
      correctIndex: 0,
      answer: "گزینه ۱ (R): تابع خطی بر روی تمام اعداد حقیقی تعریف شده است."
    },
    {
      id: 12,
      text: "تابع f(x) = x² - 4 را در نظر بگیرید. برد این تابع چیست؟",
      options: ["[-4, ∞)", "(-∞, -4]", "[0, ∞)", "R"],
      correctIndex: 0,
      answer: "گزینه ۱: تابع درجه دوم با ضریب a>0 دارای مینیمم در رأس است. رأس (۰, -۴) → برد = [-4, ∞)"
    },
    {
      id: 13,
      text: "توابع f(x) = 2x + 1 و g(x) = x - 3 داده شده‌اند. (f∘g)(x) برابر چیست؟",
      options: ["۲x - ۵", "۲x - ۳", "۲x + ۱", "x - ۵"],
      correctIndex: 0,
      answer: "گزینه ۱: (f∘g)(x) = f(g(x)) = f(x-3) = 2(x-3) + 1 = 2x - 5"
    },
    {
      id: 14,
      text: "تابع f(x) = x² - 2x + 1 را در نظر بگیرید. نقطه بحرانی این تابع کدام است؟",
      options: ["x = 1", "x = -1", "x = 2", "x = 0"],
      correctIndex: 0,
      answer: "گزینه ۱: f'(x) = 2x - 2 = 0 → x = 1"
    },
    {
      id: 15,
      text: "تابع f(x) = |x - 2| را در نظر بگیرید. این تابع در چه نقطه‌ای پیوسته نیست؟",
      options: ["در x = 2", "در x = -2", "در x = 0", "همه جا پیوسته است"],
      correctIndex: 3,
      answer: "گزینه ۴: تابع قدر مطلق در همه نقاط پیوسته است."
    },
    {
      id: 16,
      text: "تابع معکوس f(x) = 3x - 2 را بیابید.",
      options: ["f⁻¹(x) = (x+2)/3", "f⁻¹(x) = (x-2)/3", "f⁻¹(x) = 3x + 2", "f⁻¹(x) = (x+3)/2"],
      correctIndex: 0,
      answer: "گزینه ۱: y = 3x - 2 → y + 2 = 3x → x = (y+2)/3 → f⁻¹(x) = (x+2)/3"
    },
    {
      id: 17,
      text: "دامنه تابع f(x) = 1/(x-3) چیست؟",
      options: ["R - {3}", "R - {-3}", "R - {0}", "R"],
      correctIndex: 0,
      answer: "گزینه ۱: مخرج کسر نباید صفر شود → x - 3 ≠ 0 → x ≠ 3"
    },
    {
      id: 18,
      text: "تابع f(x) = x² + 2x + 1 را به صورت مربع کامل بنویسید.",
      options: ["(x+1)²", "(x-1)²", "(x+2)²", "(x-2)²"],
      correctIndex: 0,
      answer: "گزینه ۱: x² + 2x + 1 = (x+1)²"
    },
    {
      id: 19,
      text: "اگر f(x) = 2x و g(x) = x + 1 باشد، (f - g)(2) برابر چیست؟",
      options: ["۱", "۲", "۳", "۴"],
      correctIndex: 0,
      answer: "گزینه ۱: (f-g)(2) = f(2) - g(2) = 4 - 3 = 1"
    },
    {
      id: 20,
      text: "تابع f(x) = 2x² - 4x + 3 را در نظر بگیرید. مینیمم این تابع چند است؟",
      options: ["۱", "۲", "۳", "۰"],
      correctIndex: 0,
      answer: "گزینه ۱: رأس سهمی در x = 1 قرار دارد. f(1) = 2 - 4 + 3 = 1"
    },

    // ==================== فصل سوم: توابع نمایی و لگاریتمی (۱۰ سوال) ====================
    {
      id: 21,
      text: "تابع f(x) = 2^x را در نظر بگیرید. مقدار f(3) چند است؟",
      options: ["۸", "۹", "۶", "۴"],
      correctIndex: 0,
      answer: "گزینه ۱: 2^3 = 8"
    },
    {
      id: 22,
      text: "log₂(8) برابر چیست؟",
      options: ["۳", "۴", "۲", "۸"],
      correctIndex: 0,
      answer: "گزینه ۱: log₂(8) = 3 زیرا 2^3 = 8"
    },
    {
      id: 23,
      text: "log₃(81) را محاسبه کنید.",
      options: ["۴", "۵", "۳", "۲"],
      correctIndex: 0,
      answer: "گزینه ۱: log₃(81) = 4 زیرا 3^4 = 81"
    },
    {
      id: 24,
      text: "معادله 2^x = 16 را حل کنید.",
      options: ["۴", "۸", "۳", "۲"],
      correctIndex: 0,
      answer: "گزینه ۱: 2^x = 16 = 2^4 → x = 4"
    },
    {
      id: 25,
      text: "معادله log₂(x) = 3 را حل کنید.",
      options: ["۸", "۶", "۴", "۲"],
      correctIndex: 0,
      answer: "گزینه ۱: log₂(x) = 3 → x = 2^3 = 8"
    },
    {
      id: 26,
      text: "خواص لگاریتم: logₐ(xy) برابر است با؟",
      options: ["logₐx + logₐy", "logₐx - logₐy", "logₐx × logₐy", "logₐx / logₐy"],
      correctIndex: 0,
      answer: "گزینه ۱: logₐ(xy) = logₐx + logₐy"
    },
    {
      id: 27,
      text: "مقدار log₂(32) + log₂(2) چند است؟",
      options: ["۶", "۵", "۴", "۳"],
      correctIndex: 0,
      answer: "گزینه ۱: log₂(32) = 5 و log₂(2) = 1 → 5 + 1 = 6"
    },
    {
      id: 28,
      text: "تابع f(x) = log₂(x) در چه بازه‌ای تعریف شده است؟",
      options: ["(0, ∞)", "(-∞, 0)", "(0, 1)", "R"],
      correctIndex: 0,
      answer: "گزینه ۱: تابع لگاریتمی برای اعداد مثبت تعریف شده است."
    },
    {
      id: 29,
      text: "معادله 3^(2x) = 81 را حل کنید.",
      options: ["۲", "۳", "۴", "۱"],
      correctIndex: 0,
      answer: "گزینه ۱: 3^(2x) = 81 = 3^4 → 2x = 4 → x = 2"
    },
    {
      id: 30,
      text: "مقدار log₄(64) چند است؟",
      options: ["۳", "۴", "۲", "۵"],
      correctIndex: 0,
      answer: "گزینه ۱: log₄(64) = 3 زیرا 4^3 = 64"
    },

    // ==================== فصل چهارم: مثلثات (۱۰ سوال) ====================
    {
      id: 31,
      text: "۱۸۰ درجه معادل چند رادیان است؟",
      options: ["π", "π/2", "2π", "π/4"],
      correctIndex: 0,
      answer: "گزینه ۱: ۱۸۰° = π رادیان"
    },
    {
      id: 32,
      text: "مقدار sin(30°) برابر چیست؟",
      options: ["۱/۲", "√۳/۲", "۱", "۰"],
      correctIndex: 0,
      answer: "گزینه ۱: sin(30°) = 1/2"
    },
    {
      id: 33,
      text: "مقدار cos(60°) برابر چیست؟",
      options: ["۱/۲", "√۳/۲", "۱", "۰"],
      correctIndex: 0,
      answer: "گزینه ۱: cos(60°) = 1/2"
    },
    {
      id: 34,
      text: "مقدار tan(45°) برابر چیست؟",
      options: ["۱", "√۳", "۱/√۳", "۰"],
      correctIndex: 0,
      answer: "گزینه ۱: tan(45°) = 1"
    },
    {
      id: 35,
      text: "sin²(θ) + cos²(θ) برابر چیست؟",
      options: ["۱", "۰", "-۱", "۲"],
      correctIndex: 0,
      answer: "گزینه ۱: sin²θ + cos²θ = 1 (اتحاد اصلی مثلثاتی)"
    },
    {
      id: 36,
      text: "زاویه ۴۵ درجه معادل چند رادیان است؟",
      options: ["π/4", "π/2", "π/3", "π/6"],
      correctIndex: 0,
      answer: "گزینه ۱: ۴۵° = π/4 رادیان"
    },
    {
      id: 37,
      text: "sin(90°) برابر چیست؟",
      options: ["۱", "۰", "-۱", "۱/۲"],
      correctIndex: 0,
      answer: "گزینه ۱: sin(90°) = 1"
    },
    {
      id: 38,
      text: "cos(0°) برابر چیست؟",
      options: ["۱", "۰", "-۱", "۱/۲"],
      correctIndex: 0,
      answer: "گزینه ۱: cos(0°) = 1"
    },
    {
      id: 39,
      text: "مقدار sin(45°) برابر چیست؟",
      options: ["√۲/۲", "۱/۲", "√۳/۲", "۱"],
      correctIndex: 0,
      answer: "گزینه ۱: sin(45°) = √2/2"
    },
    {
      id: 40,
      text: "مقدار cos(45°) برابر چیست؟",
      options: ["√۲/۲", "۱/۲", "√۳/۲", "۱"],
      correctIndex: 0,
      answer: "گزینه ۱: cos(45°) = √2/2"
    },

    // ==================== فصل پنجم: حد و پیوستگی (۱۰ سوال) ====================
    {
      id: 41,
      text: "حد lim(x→2) (x² - 4)/(x - 2) را محاسبه کنید.",
      options: ["۴", "۲", "۰", "∞"],
      correctIndex: 0,
      answer: "گزینه ۱: lim(x→2) (x²-4)/(x-2) = lim(x→2) (x-2)(x+2)/(x-2) = lim(x→2) (x+2) = 4"
    },
    {
      id: 42,
      text: "حد lim(x→∞) (1/x) برابر چیست؟",
      options: ["۰", "۱", "∞", "-∞"],
      correctIndex: 0,
      answer: "گزینه ۱: lim(x→∞) (1/x) = 0"
    },
    {
      id: 43,
      text: "حد lim(x→0) (sin x/x) برابر چیست؟",
      options: ["۱", "۰", "∞", "-۱"],
      correctIndex: 0,
      answer: "گزینه ۱: lim(x→0) (sin x/x) = 1 (حد معروف مثلثاتی)"
    },
    {
      id: 44,
      text: "تابع f(x) = (x² - 1)/(x - 1) در x = 1 چه نوع ناپیوستگی دارد؟",
      options: ["قابل رفع", "غیرقابل رفع", "پیوسته", "هیچ کدام"],
      correctIndex: 0,
      answer: "گزینه ۱: f(x) = (x-1)(x+1)/(x-1) = x+1 برای x≠1. حد در x=1 برابر 2 است اما تابع تعریف نشده → ناپیوستگی قابل رفع"
    },
    {
      id: 45,
      text: "حد lim(x→0) (e^x - 1)/x برابر چیست؟",
      options: ["۱", "۰", "e", "∞"],
      correctIndex: 0,
      answer: "گزینه ۱: lim(x→0) (e^x - 1)/x = 1"
    },
    {
      id: 46,
      text: "حد lim(x→3) (x - 3)/(x² - 9) را محاسبه کنید.",
      options: ["۱/۶", "۰", "∞", "-∞"],
      correctIndex: 0,
      answer: "گزینه ۱: lim(x→3) (x-3)/(x²-9) = lim(x→3) (x-3)/((x-3)(x+3)) = lim(x→3) 1/(x+3) = 1/6"
    },
    {
      id: 47,
      text: "حد lim(x→0) (cos x - 1)/x برابر چیست؟",
      options: ["۰", "۱", "-۱", "∞"],
      correctIndex: 0,
      answer: "گزینه ۱: lim(x→0) (cos x - 1)/x = 0"
    },
    {
      id: 48,
      text: "حد lim(x→0) (tan x)/x برابر چیست؟",
      options: ["۱", "۰", "∞", "-۱"],
      correctIndex: 0,
      answer: "گزینه ۱: lim(x→0) (tan x)/x = 1"
    },
    {
      id: 49,
      text: "حد lim(x→∞) (2x² + 3)/(x² - 1) را محاسبه کنید.",
      options: ["۲", "۳", "۰", "∞"],
      correctIndex: 0,
      answer: "گزینه ۱: lim(x→∞) (2x²+3)/(x²-1) = lim(x→∞) (2 + 3/x²)/(1 - 1/x²) = 2"
    },
    {
      id: 50,
      text: "حد lim(x→0) (1 - cos x)/x² را محاسبه کنید.",
      options: ["۱/۲", "۰", "۱", "∞"],
      correctIndex: 0,
      answer: "گزینه ۱: lim(x→0) (1 - cos x)/x² = 1/2"
    }
  ];

  // State ها
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: number}>({});
  const [showAnswers, setShowAnswers] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);
  
  const [timeLeft, setTimeLeft] = useState(75 * 60); // 75 دقیقه به ثانیه
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
        backgroundColor: '#1a237e',
        color: 'white',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '30px',
        textAlign: 'center',
        position: 'relative'
      }}>
        <button 
          onClick={() => router.push('/exam/yazdahom/riyazi/ghalamchi/first-half/hesaban-1')}
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
            <h1 style={{ margin: 0, fontSize: '28px' }}>🏆 آزمون جامع کل کتاب حسابان (1)</h1>
            <p style={{ marginTop: '10px', fontSize: '16px', opacity: 0.9 }}>ویژه آزمون‌های قلمچی - شامل {questions.length} سوال ترکیبی از ۵ فصل</p>
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
                backgroundColor: '#1a237e',
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
                      border: isSelected ? '3px solid #1a237e' : '1px solid #dee2e6',
                      borderRadius: '10px',
                      backgroundColor: isSelected ? '#e8eaf6' : '#fff',
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
                      backgroundColor: isSelected ? '#1a237e' : '#fff',
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
                      backgroundColor: canCalculate ? '#1a237e' : '#6c757d',
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
                  <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#1a237e' }}>
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
            borderTop: '4px solid #1a237e',
            paddingTop: '40px',
            backgroundColor: '#ffffff',
            padding: '40px',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
            width: '100%'
          }}>
            <h2 style={{ 
              textAlign: 'center', 
              borderBottom: '3px solid #1a237e', 
              paddingBottom: '20px', 
              marginBottom: '40px',
              fontSize: '26px',
              color: '#1a237e'
            }}>
              📝 پاسخنامه تشریحی آزمون جامع حسابان (1)
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
                      color: '#1a237e',
                      backgroundColor: '#e8eaf6',
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
                    <span style={{ fontWeight: 'bold', color: '#1a237e' }}>📖 توضیح کامل:</span> 
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

export default Hesaban1FinalExam;
