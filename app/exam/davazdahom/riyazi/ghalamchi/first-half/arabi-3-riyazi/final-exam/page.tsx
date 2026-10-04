"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const ArabicFinalExam = () => {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  // ================= سوالات عربی - جامع نیم‌سال دوم =================
  const questions = [
    // ==================== فصل اول: قواعد و صرف ====================
    {
      id: 1,
      text: "فعل ماضی از ریشه 'کتب' برای ضمیر 'هو' کدام است؟",
      options: ["کتبَ", "یکتبُ", "اکتب", "کتبوا"],
      correctIndex: 0,
      answer: "گزینه ۱: فعل ماضی برای 'هو' (مفرد مذکر) به صورت 'کتبَ' (نوشت) صرف می‌شود."
    },
    {
      id: 2,
      text: "فعل مضارع از ریشه 'نصر' برای ضمیر 'نحن' کدام است؟",
      options: ["ینصرُ", "تنصرُ", "ینصرون", "ننصرُ"],
      correctIndex: 3,
      answer: "گزینه ۴: برای 'نحن' (متکلم جمع) مضارع به صورت 'ننصرُ' (ما یاری می‌کنیم) می‌آید."
    },
    {
      id: 3,
      text: "فعل امر از ریشه 'فعل' برای ضمیر 'انت' کدام است؟",
      options: ["افعل", "فعل", "یفعل", "تفعل"],
      correctIndex: 0,
      answer: "گزینه ۱: فعل امر برای مفرد مذکر 'انت' از ریشه 'فعل' به صورت 'افعل' (بکن) می‌آید."
    },
    {
      id: 4,
      text: "کدام کلمه اسم مشتق است؟",
      options: ["شجر", "قلم", "کاتب", "بیت"],
      correctIndex: 2,
      answer: "گزینه ۳: 'کاتب' اسم فاعل مشتق از ریشه 'کتب' است، در حالی که سایر گزینه‌ها اسم جامد هستند."
    },
    {
      id: 5,
      text: "وزن کلمه 'مُستَفهَم' چیست؟",
      options: ["مُفتَعَل", "مُستَفعَل", "مُفاعَل", "مُتَفاعَل"],
      correctIndex: 1,
      answer: "گزینه ۲: وزن 'مُستَفهَم' (مفرد مذکر) = مُستَفعَل (با حروف اصلی ف-ع-ل) می‌باشد."
    },
    {
      id: 6,
      text: "صرف فعل ماضی 'ضرب' برای 'هم' کدام است؟",
      options: ["ضربوا", "ضربن", "ضربتم", "ضربا"],
      correctIndex: 0,
      answer: "گزینه ۱: برای جمع مذکر 'هم' (آن‌ها) فعل ماضی 'ضربوا' (زدند) استفاده می‌شود."
    },

    // ==================== فصل دوم: نحو و جمله‌سازی ====================
    {
      id: 7,
      text: "در جمله 'المعلمُ حاضرٌ'، 'المعلمُ' چه نقشی دارد؟",
      options: ["مبتدا", "خبر", "فاعل", "مفعول"],
      correctIndex: 0,
      answer: "گزینه ۱: 'المعلمُ' مبتدا (نهاد جمله اسمیه) است و 'حاضرٌ' خبر آن می‌باشد."
    },
    {
      id: 8,
      text: "در جمله 'ضربَ الطالبُ زیداً'، 'زیداً' چه نقشی دارد؟",
      options: ["فاعل", "مفعول", "نائب فاعل", "مجرور"],
      correctIndex: 1,
      answer: "گزینه ۲: 'زیداً' مفعول به است که با فتحه (ـَ) و تنوین منصوب می‌شود."
    },
    {
      id: 9,
      text: "در جمله 'نُفِعَ بالعلمِ'، 'العلمِ' چه نقشی دارد؟",
      options: ["فاعل", "مفعول", "نائب فاعل", "مجرور"],
      correctIndex: 3,
      answer: "گزینه ۴: 'العلمِ' مجرور به حرف جر 'ب' است و مفعول به واسطه حرف جر محسوب می‌شود."
    },
    {
      id: 10,
      text: "کدام گزینه جمله فعلیه است؟",
      options: ["السماءُ صافیةٌ", "ینجحُ المجتهدُ", "البابُ مفتوحٌ", "الطالبُ نشیطٌ"],
      correctIndex: 1,
      answer: "گزینه ۲: 'ینجحُ المجتهدُ' جمله فعلیه است (فعل + فاعل). سایر گزینه‌ها جمله اسمیه هستند."
    },
    {
      id: 11,
      text: "در جمله 'مررتُ بالرجلِ'، 'الرجلِ' چه علامت اعرابی دارد؟",
      options: ["فتحه", "کسره", "ضمه", "سکون"],
      correctIndex: 1,
      answer: "گزینه ۲: 'الرجلِ' مجرور به حرف جر 'ب' است و با کسره (ـِ) مشخص می‌شود."
    },
    {
      id: 12,
      text: "در جمله 'جاءَ الطالبُ و زیدٌ'، 'زیدٌ' چه نوع وابسته‌ای است؟",
      options: ["بدل", "معطوف", "تأکید", "نعت"],
      correctIndex: 1,
      answer: "گزینه ۲: 'زیدٌ' معطوف به 'الطالبُ' است و با حرف عطف 'و' آمده است."
    },

    // ==================== فصل سوم: ترجمه و درک مطلب ====================
    {
      id: 13,
      text: "ترجمه صحیح جمله 'الطلابُ یحبّون العلمَ' چیست؟",
      options: ["دانش‌آموزان علم را دوست دارند", "دانش‌آموز علم را دوست دارد", "دانش‌آموزان علم دوست دارند", "دانش‌آموز علم را می‌خواهد"],
      correctIndex: 0,
      answer: "گزینه ۱: 'الطلابُ' (جمع) + 'یحبّون' (جمع مذکر) = دانش‌آموزان علم را دوست دارند."
    },
    {
      id: 14,
      text: "ترجمه جمله 'الکتابُ مفیدٌ للتلامیذِ' چیست؟",
      options: ["کتاب برای دانش‌آموزان مفید است", "کتاب برای دانش‌آموز مفید است", "دانش‌آموزان کتاب را مفید می‌دانند", "کتاب مفید است"],
      correctIndex: 0,
      answer: "گزینه ۱: 'الکتابُ' = کتاب، 'مفیدٌ' = مفید، 'للتلامیذِ' = برای دانش‌آموزان (جمع)."
    },
    {
      id: 15,
      text: "معنای کلمه 'رشد' در جمله 'العلمُ یُساعدُ علی النموّ' چیست؟",
      options: ["پیشرفت", "رشد", "کمک", "علم"],
      correctIndex: 1,
      answer: "گزینه ۲: 'النموّ' به معنای رشد و تکامل است و در جمله به رشد علمی اشاره دارد."
    },
    {
      id: 16,
      text: "جمله 'المدرسةُ مکانُ التعلّمِ' به چه معناست؟",
      options: ["مدرسه جای یادگیری است", "مدرسه جای تدریس است", "مدرسه جای علم است", "مدرسه برای یادگیری است"],
      correctIndex: 0,
      answer: "گزینه ۱: 'مکانُ' به معنی مکان/جای و 'التعلّمِ' به معنی یادگیری است."
    },
    {
      id: 17,
      text: "ضد کلمه 'صعب' (دشوار) کدام است؟",
      options: ["سهل", "جدی", "جلیل", "کبیر"],
      correctIndex: 0,
      answer: "گزینه ۱: ضد 'صعب' (دشوار) کلمه 'سهل' (آسان) است."
    },
    {
      id: 18,
      text: "در جمله 'هذا کتابٌ مُفیدٌ'، 'مفید' چه نوع کلمه‌ای است؟",
      options: ["نعت", "مبتدا", "خبر", "فاعل"],
      correctIndex: 0,
      answer: "گزینه ۱: 'مفید' نعت (صفت) برای 'کتاب' است و با آن در نکرگی و تنوین تطابق دارد."
    },

    // ==================== فصل چهارم: شعر و ادبیات عرب ====================
    {
      id: 19,
      text: "قالب شعری 'قصیده' در ادبیات عرب چیست؟",
      options: ["شعر بلند با یک وزن و قافیه", "شعر کوتاه", "شعر روایی", "شعر غنایی"],
      correctIndex: 0,
      answer: "گزینه ۱: قصیده شعری بلند با وزن ثابت و قافیه واحد است که در ادبیات عرب رایج است."
    },
    {
      id: 20,
      text: "آرایه ادبی در جمله 'الرجلُ أسدٌ' چیست؟",
      options: ["تشبیه", "استعاره", "کنایه", "مجاز"],
      correctIndex: 0,
      answer: "گزینه ۱: 'الرجلُ أسدٌ' تشبیه مرد به شیر است (مشبه و مشبه به)."
    },
    {
      id: 21,
      text: "در بیت زیر، آرایه اصلی چیست؟ 'و الشمسُ طالعةٌ و القمرُ غاربٌ'",
      options: ["طباق", "جناس", "تشبیه", "استعاره"],
      correctIndex: 0,
      answer: "گزینه ۱: 'طالعة' (طلوع) و 'غارب' (غروب) طباق (تضاد) ایجاد کرده‌اند."
    },
    {
      id: 22,
      text: "معنای بیت: 'ما كلّ ما یتمنّی المرءُ یدرکُه / تجری الریاحُ بما لا تشتهی السفنُ' چیست؟",
      options: ["انسان به همه آرزوهایش نمی‌رسد", "انسان همه چیز را درک می‌کند", "بادها بر خلاف میل کشتی‌ها می‌وزند", "انسان به همه چیز می‌رسد"],
      correctIndex: 0,
      answer: "گزینه ۱: این بیت می‌گوید انسان به هر آنچه آرزو می‌کند نمی‌رسد (مانند باد که بر خلاف میل کشتی می‌وزد)."
    },
    {
      id: 23,
      text: "در جمله 'ما أنت إلا شاعرٌ'، آرایه چیست؟",
      options: ["حصر", "استعاره", "تشبیه", "کنایه"],
      correctIndex: 0,
      answer: "گزینه ۱: 'ما... إلا' در زبان عربی برای حصر (قصر) استفاده می‌شود و معنای 'تو فقط شاعری' را می‌رساند."
    },
    {
      id: 24,
      text: "شاعر معروف دوره جاهلی که معلقات سروده است کیست؟",
      options: ["امرؤ القیس", "فردوسی", "سعدی", "حافظ"],
      correctIndex: 0,
      answer: "گزینه ۱: امرؤ القیس از شاعران معروف دوره جاهلی و سراینده یکی از معلقات است."
    },

    // ==================== سوالات ترکیبی ====================
    {
      id: 25,
      text: "در جمله 'رأیتُ الشمسَ مشرقةً'، 'مشرقةً' چه نوع وابسته‌ای است؟",
      options: ["حال", "نعت", "بدل", "تأکید"],
      correctIndex: 0,
      answer: "گزینه ۱: 'مشرقةً' حال برای 'الشمس' است که حالت طلوع را توصیف می‌کند."
    },
    {
      id: 26,
      text: "ضد کلمه 'قریب' (نزدیک) کدام است؟",
      options: ["بعید", "سهل", "جلیل", "سریع"],
      correctIndex: 0,
      answer: "گزینه ۱: ضد 'قریب' کلمه 'بعید' (دور) است."
    },
    {
      id: 27,
      text: "وزن کلمه 'مُنتَصِر' چیست؟",
      options: ["مُفتَعِل", "مُستَفعِل", "مُفاعِل", "مُتَفاعِل"],
      correctIndex: 0,
      answer: "گزینه ۱: وزن 'مُنتَصِر' = مُفتَعِل (با حروف اصلی ن-ص-ر) است."
    },
    {
      id: 28,
      text: "ترجمه عبارت 'من ذهب الی عملٍ صالحٍ' چیست؟",
      options: ["هر که به کار شایسته رود", "هر که به کار بد رود", "کار شایسته انجام ده", "به کار خوب برو"],
      correctIndex: 0,
      answer: "گزینه ۱: 'من' شرطیه به معنی 'هر که' و 'عمل صالح' به معنی کار شایسته است."
    },
    {
      id: 29,
      text: "در جمله 'الطالبُ المجتهدُ نجحَ'، 'المجتهدُ' چیست؟",
      options: ["نعت", "خبر", "مبتدا", "فاعل"],
      correctIndex: 0,
      answer: "گزینه ۱: 'المجتهدُ' نعت (صفت) برای 'الطالبُ' است."
    },
    {
      id: 30,
      text: "معنای اصطلاح 'النورُ فی الفمِ' چیست؟",
      options: ["سخن گفتن درست", "نور در دهان", "خاموشی", "سخن نادرست"],
      correctIndex: 0,
      answer: "گزینه ۱: 'النورُ فی الفمِ' به معنی سخن گفتن درست و روشن است."
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
          onClick={() => router.push('/exam/davazdahom/riyazi/ghalamchi/first-half/arabi-3-riyazi')}
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
            <h1 style={{ margin: 0, fontSize: '28px' }}>📖 آزمون جامع عربی</h1>
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
              📝 پاسخنامه تشریحی عربی
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

export default ArabicFinalExam;