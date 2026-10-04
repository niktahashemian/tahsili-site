"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

// ================= سوالات فیزیک ۳ - جامع نیم‌سال اول قلمچی =================
const QUESTIONS = [
  // ==================== فصل اول: حرکت شناسی ====================
  {
    id: 1,
    text: "در حرکت یکنواخت بر روی خط راست، کدام یک از کمیت‌های زیر ثابت است؟",
    options: ["سرعت", "شتاب", "جابجایی", "شتاب و سرعت هر دو"],
    correctIndex: 0,
    answer: "گزینه ۱: در حرکت یکنواخت، سرعت ثابت است و شتاب صفر می‌باشد."
  },
  {
    id: 2,
    text: "معادله مکان متحرکی به صورت x = 5t² + 2t + 3 (متر) است. شتاب متحرک چند متر بر مجذور ثانیه است؟",
    options: ["۵", "۱۰", "۲", "۴"],
    correctIndex: 1,
    answer: "گزینه ۲: با دو بار مشتق‌گیری از معادله مکان: a = 10 m/s²"
  },
  {
    id: 3,
    text: "در سقوط آزاد، شتاب حرکت چه مقدار است؟",
    options: ["۹.۸ m/s² به سمت بالا", "۹.۸ m/s² به سمت پایین", "۰ m/s²", "متغیر"],
    correctIndex: 1,
    answer: "گزینه ۲: شتاب سقوط آزاد برابر g = 9.8 m/s² و به سمت پایین است."
  },
  {
    id: 4,
    text: "در حرکت پرتابی، کدام یک از کمیت‌های زیر در نقطه اوج صفر می‌شود؟",
    options: ["سرعت افقی", "سرعت عمودی", "شتاب", "سرعت کل"],
    correctIndex: 1,
    answer: "گزینه ۲: در نقطه اوج، سرعت عمودی صفر می‌شود، اما سرعت افقی ثابت و شتاب برابر g است."
  },
  {
    id: 5,
    text: "در حرکت دایره‌ای یکنواخت، جهت شتاب مرکزگرا به کدام سمت است؟",
    options: ["به سمت خارج دایره", "به سمت مرکز دایره", "در جهت حرکت", "عمود بر صفحه حرکت"],
    correctIndex: 1,
    answer: "گزینه ۲: شتاب مرکزگرا همواره به سمت مرکز دایره است و بزرگی آن برابر v²/r می‌باشد."
  },

  // ==================== فصل دوم: دینامیک ====================
  {
    id: 6,
    text: "قانون دوم نیوتن به صورت ریاضی چگونه بیان می‌شود؟",
    options: ["F = ma", "F = mg", "F = mv", "F = m/a"],
    correctIndex: 0,
    answer: "گزینه ۱: قانون دوم نیوتن: F = ma که در آن F نیروی حاصل، m جرم و a شتاب است."
  },
  {
    id: 7,
    text: "ضریب اصطکاک ایستایی بین دو سطح، چه رابطه‌ای با ضریب اصطکاک جنبشی دارد؟",
    options: ["کمتر است", "بیشتر است", "برابر است", "رابطه مشخصی ندارد"],
    correctIndex: 1,
    answer: "گزینه ۲: ضریب اصطکاک ایستایی معمولاً از ضریب اصطکاک جنبشی بیشتر است (μs > μk)."
  },
  {
    id: 8,
    text: "اگر جسمی در حال حرکت در سیال به سرعت حد برسد، چه اتفاقی می‌افتد؟",
    options: ["شتاب آن صفر می‌شود", "سرعت آن صفر می‌شود", "نیروی مقاومت صفر می‌شود", "جسم متوقف می‌شود"],
    correctIndex: 0,
    answer: "گزینه ۱: در سرعت حد، نیروی مقاومت با نیروی وزن برابر می‌شود و شتاب جسم صفر می‌گردد."
  },
  {
    id: 9,
    text: "در یک دستگاه غیرلخت که با شتاب a حرکت می‌کند، نیروی مجازی به چه صورت است؟",
    options: ["F = ma در خلاف جهت شتاب", "F = ma در جهت شتاب", "F = mg", "F = 0"],
    correctIndex: 0,
    answer: "گزینه ۱: نیروی مجازی (نیروی شبه‌اینرسی) برابر F = -ma است که در خلاف جهت شتاب دستگاه اعمال می‌شود."
  },

  // ==================== فصل سوم: کار و انرژی ====================
  {
    id: 10,
    text: "کار نیروی ثابت F در جابجایی d برابر است با:",
    options: ["F.d", "F × d × sin θ", "F × d × cos θ", "F/d"],
    correctIndex: 2,
    answer: "گزینه ۳: کار = F × d × cos θ که θ زاویه بین نیرو و جابجایی است."
  },
  {
    id: 11,
    text: "انرژی جنبشی جسمی به جرم m و سرعت v برابر است با:",
    options: ["½mv²", "mv²", "½mv", "mgh"],
    correctIndex: 0,
    answer: "گزینه ۱: انرژی جنبشی = ½mv²"
  },
  {
    id: 12,
    text: "قانون پایستگی انرژی مکانیکی در چه شرایطی برقرار است؟",
    options: ["همیشه برقرار است", "در صورت نبود نیروی اصطکاک", "در صورت وجود نیروی خارجی", "فقط در حرکت دایره‌ای"],
    correctIndex: 1,
    answer: "گزینه ۲: وقتی فقط نیروهای محافظه‌کار (مانند گرانش و کشسانی) کار انجام دهند، انرژی مکانیکی پایسته می‌ماند."
  },
  {
    id: 13,
    text: "رابطه بین کار و انرژی (قضیه کار-انرژی) چیست؟",
    options: ["W = ΔK", "W = ΔU", "W = K + U", "W = ½mv²"],
    correctIndex: 0,
    answer: "گزینه ۱: قضیه کار-انرژی: کار کل وارد بر جسم برابر با تغییر انرژی جنبشی آن است (W = ΔK)."
  },

  // ==================== فصل چهارم: تکانه و برخورد ====================
  {
    id: 14,
    text: "تکانه خطی یک جسم به جرم m و سرعت v برابر است با:",
    options: ["p = mv", "p = ½mv²", "p = mgh", "p = F/m"],
    correctIndex: 0,
    answer: "گزینه ۱: تکانه خطی = p = mv"
  },
  {
    id: 15,
    text: "در یک برخورد کاملاً ناکشسان، چه قانونی برقرار است؟",
    options: ["فقط پایستگی تکانه", "فقط پایستگی انرژی", "پایستگی تکانه و انرژی", "هیچکدام"],
    correctIndex: 0,
    answer: "گزینه ۱: در برخورد ناکشسان، تکانه پایسته می‌ماند اما انرژی جنبشی پایسته نیست."
  },
  {
    id: 16,
    text: "مرکز جرم یک سیستم از ذرات چگونه حرکت می‌کند؟",
    options: ["مانند ذره‌ای با جرم کل تحت نیروی خارجی", "همیشه ساکن است", "با شتاب ثابت حرکت می‌کند", "حرکت دایره‌ای دارد"],
    correctIndex: 0,
    answer: "گزینه ۱: مرکز جرم مانند ذره‌ای به جرم کل سیستم تحت تأثیر نیروی خارجی حرکت می‌کند."
  },
  {
    id: 17,
    text: "ضربه (Impulse) برابر است با:",
    options: ["تغییر تکانه", "تغییر انرژی", "تغییر جرم", "تغییر شتاب"],
    correctIndex: 0,
    answer: "گزینه ۱: ضربه = F × Δt = Δp (تغییر تکانه)"
  },

  // ==================== فصل پنجم: فیزیک اتمی و هسته‌ای ====================
  {
    id: 18,
    text: "در اثر فوتوالکتریک، با افزایش شدت نور، چه تغییراتی رخ می‌دهد؟",
    options: ["انرژی جنبشی فوتوالکترون‌ها افزایش می‌یابد", "تعداد فوتوالکترون‌ها افزایش می‌یابد", "انرژی جنبشی کاهش می‌یابد", "هیچ تغییری رخ نمی‌دهد"],
    correctIndex: 1,
    answer: "گزینه ۲: افزایش شدت نور باعث افزایش تعداد فوتون‌ها و در نتیجه افزایش تعداد فوتوالکترون‌ها می‌شود."
  },
  {
    id: 19,
    text: "در واپاشی آلفا، عدد اتمی و عدد جرمی به ترتیب چگونه تغییر می‌کنند؟",
    options: ["Z-2, A-4", "Z+1, A", "Z-1, A", "Z, A-4"],
    correctIndex: 0,
    answer: "گزینه ۱: در واپاشی آلفا، عدد اتمی ۲ واحد کاهش و عدد جرمی ۴ واحد کاهش می‌یابد."
  },
  {
    id: 20,
    text: "کدام یک از موارد زیر در هم‌جوشی هسته‌ای رخ می‌دهد؟",
    options: ["شکافت هسته‌های سنگین", "اتصال هسته‌های سبک", "واپاشی خودبخودی", "گسیل الکترون"],
    correctIndex: 1,
    answer: "گزینه ۲: در هم‌جوشی، دو هسته سبک به هم متصل شده و هسته سنگین‌تری را تشکیل می‌دهند."

  // ==================== سوالات ترکیبی ====================
  },
  {
    id: 21,
    text: "جسمی از ارتفاع ۲۰ متری رها می‌شود. سرعت آن هنگام برخورد با زمین چقدر است؟ (g = 10 m/s²)",
    options: ["۱۰ m/s", "۱۴ m/s", "۲۰ m/s", "۴۰ m/s"],
    correctIndex: 2,
    answer: "گزینه ۳: v² = 2gh = 2×10×20 = 400 ⇒ v = 20 m/s"
  },
  {
    id: 22,
    text: "جسمی به جرم ۲ کیلوگرم با سرعت ۳ m/s روی سطح افقی حرکت می‌کند. انرژی جنبشی آن چند ژول است؟",
    options: ["۳", "۶", "۹", "۱۸"],
    correctIndex: 2,
    answer: "گزینه ۳: K = ½mv² = ½×2×9 = 9 J"
  },
  {
    id: 23,
    text: "نیروی ۲۰ نیوتنی به جسمی به جرم ۴ کیلوگرم وارد می‌شود. شتاب جسم چند m/s² است؟",
    options: ["۳", "۴", "۵", "۶"],
    correctIndex: 2,
    answer: "گزینه ۳: a = F/m = 20/4 = 5 m/s²"
  },
  {
    id: 24,
    text: "در حرکت دایره‌ای یکنواخت با شعاع ۲ متر و سرعت ۴ m/s، شتاب مرکزگرا چند m/s² است؟",
    options: ["۴", "۶", "۸", "۱۶"],
    correctIndex: 2,
    answer: "گزینه ۳: ac = v²/r = 16/2 = 8 m/s²"
  },
  {
    id: 25,
    text: "جسمی به جرم ۵ کیلوگرم از ارتفاع ۱۰ متری سقوط می‌کند. انرژی پتانسیل آن در ارتفاع ۴ متری چقدر است؟ (g = 10 m/s²)",
    options: ["۱۰۰ J", "۲۰۰ J", "۳۰۰ J", "۴۰۰ J"],
    correctIndex: 1,
    answer: "گزینه ۲: U = mgh = 5×10×4 = 200 J"
  },
  {
    id: 26,
    text: "تکانه جسمی به جرم ۰.۵ کیلوگرم با سرعت ۱۰ m/s چند kg.m/s است؟",
    options: ["۲", "۳", "۴", "۵"],
    correctIndex: 3,
    answer: "گزینه ۴: p = mv = 0.5×10 = 5 kg.m/s"
  },
  {
    id: 27,
    text: "در یک برخورد کشسان یک‌بعدی بین دو جسم با جرم‌های مساوی، پس از برخورد چه اتفاقی می‌افتد؟",
    options: ["سرعت‌ها عوض می‌شوند", "هر دو متوقف می‌شوند", "با سرعت اولیه حرکت می‌کنند", "در هم ادغام می‌شوند"],
    correctIndex: 0,
    answer: "گزینه ۱: در برخورد کشسان یک‌بعدی با جرم‌های مساوی، سرعت‌ها با یکدیگر جابه‌جا می‌شوند."
  },
  {
    id: 28,
    text: "نیروی هسته‌ای قوی چه ویژگی مهمی دارد؟",
    options: ["برد کوتاه و بسیار قوی", "برد بلند و ضعیف", "فقط بین پروتون‌ها عمل می‌کند", "فقط در دماهای پایین عمل می‌کند"],
    correctIndex: 0,
    answer: "گزینه ۱: نیروی هسته‌ای قوی برد بسیار کوتاه (حدود ۱ فمتومتر) و قدرت بسیار زیادی دارد."
  },
  {
    id: 29,
    text: "در معادله x = A sin(ωt + φ)، کدام یک از موارد زیر دامنه نوسان را نشان می‌دهد؟",
    options: ["A", "ω", "φ", "t"],
    correctIndex: 0,
    answer: "گزینه ۱: A دامنه نوسان، ω بسامد زاویه‌ای، φ فاز اولیه و t زمان است."
  },
  {
    id: 30,
    text: "اگر جرم یک جسم را دو برابر کنیم و سرعت آن را نصف کنیم، انرژی جنبشی آن چند برابر می‌شود؟",
    options: ["۲ برابر", "۰.۵ برابر", "۴ برابر", "۰.۲۵ برابر"],
    correctIndex: 1,
    answer: "گزینه ۲: K1 = ½mv²، K2 = ½(2m)(v/2)² = ½(2m)(v²/4) = ½mv² × 0.5 = 0.5K1"
  },
];

const FizikRiyaziFinalExam = () => {
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
        backgroundColor: '#1565C0',
        color: 'white',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '30px',
        textAlign: 'center',
        position: 'relative'
      }}>
        <button
          onClick={() => router.push('/exam/davazdahom/riyazi/maz/first-half/fizik-3-riyazi')}
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
            <h1 style={{ margin: 0, fontSize: '28px' }}>⚡ آزمون جامع فیزیک ۳</h1>
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
                backgroundColor: '#1565C0',
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
                      border: isSelected ? '3px solid #1565C0' : '1px solid #dee2e6',
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
                      backgroundColor: isSelected ? '#1565C0' : '#fff',
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
                  backgroundColor: canCalculate ? '#1565C0' : '#6c757d',
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
              <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#1565C0' }}>
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
            borderTop: '4px solid #1565C0',
            paddingTop: '40px',
            backgroundColor: '#ffffff',
            padding: '40px',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
            width: '100%'
          }}>
            <h2 style={{
              textAlign: 'center',
              borderBottom: '3px solid #1565C0',
              paddingBottom: '20px',
              marginBottom: '40px',
              fontSize: '26px',
              color: '#1565C0'
            }}>
              📝 پاسخنامه تشریحی فیزیک ۳
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
                      color: '#1565C0',
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
                    <span style={{ fontWeight: 'bold', color: '#1565C0' }}>📖 توضیح:</span>
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

export default FizikRiyaziFinalExam;