"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const Arabi3FinalExam = () => {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  // ================= سوالات درس عربی ۳ =================
  const questions = [
    // ==================== سوالات ۱ تا ۵ ====================
    {
      id: 1,
      text: "مترادف کلمه 'کبیر' چیست؟",
      options: ["صغیر", "عظیم", "قلیل", "ضعیف"],
      correctIndex: 1,
      answer: "مترادف کبیر، عظیم است."
    },
    {
      id: 2,
      text: "معنی 'ذَهَبَ الطَّالِبُ إِلَی المَدْرَسَةِ' چیست؟",
      options: ["دانش‌آموز به مدرسه رفت", "دانش‌آموز از مدرسه آمد", "دانش‌آموز در مدرسه است", "دانش‌آموز به خانه رفت"],
      correctIndex: 0,
      answer: "جمله به معنای 'دانش‌آموز به مدرسه رفت' است."
    },
    {
      id: 3,
      text: "کدام یک از موارد زیر اسم اشاره برای مذکر است؟",
      options: ["هَذِهِ", "هَذَا", "تِلْکَ", "أُولَٰئِکَ"],
      correctIndex: 1,
      answer: "هَذَا اسم اشاره برای مذکر است."
    },
    {
      id: 4,
      text: "وزن کلمه 'مُسْتَفْعِل' چیست؟",
      options: ["مُسْتَفْعِل", "مُفْتَعِل", "مُسْتَفْعَل", "مُفْتَعَل"],
      correctIndex: 0,
      answer: "وزن کلمه 'مُسْتَفْعِل' خودش است."
    },
    {
      id: 5,
      text: "کدام یک از موارد زیر فعل مضارع است؟",
      options: ["ذَهَبَ", "یَذْهَبُ", "اِذْهَبْ", "ذَاهِبٌ"],
      correctIndex: 1,
      answer: "یَذْهَبُ فعل مضارع است."
    },
    // ==================== سوالات ۶ تا ۱۰ ====================
    {
      id: 6,
      text: "معنی 'جَلَسَ الوَلَدُ عَلَی الكُرْسِيِّ' چیست؟",
      options: ["پسر روی صندلی نشست", "پسر از صندلی بلند شد", "پسر کنار صندلی ایستاد", "پسر صندلی را برداشت"],
      correctIndex: 0,
      answer: "جمله به معنای 'پسر روی صندلی نشست' است."
    },
    {
      id: 7,
      text: "کدام یک از موارد زیر جمع مونث سالم است؟",
      options: ["مُسْلِمُونَ", "مُسْلِمَاتٌ", "مَسَاجِدُ", "کُتُبٌ"],
      correctIndex: 1,
      answer: "مُسْلِمَاتٌ جمع مونث سالم است."
    },
    {
      id: 8,
      text: "ترجمه 'کَتَبَ الطَّالِبُ الدَّرْسَ' چیست؟",
      options: ["دانش‌آموز درس را نوشت", "دانش‌آموز درس را خواند", "دانش‌آموز درس را حفظ کرد", "دانش‌آموز درس را فهمید"],
      correctIndex: 0,
      answer: "جمله به معنای 'دانش‌آموز درس را نوشت' است."
    },
    {
      id: 9,
      text: "کدام یک از موارد زیر حرف جر است؟",
      options: ["مِنْ", "عَلَی", "فِي", "همه موارد"],
      correctIndex: 3,
      answer: "همه موارد حرف جر هستند."
    },
    {
      id: 10,
      text: "معنی 'یَقْرَأُ الوَلَدُ الكِتَابَ' چیست؟",
      options: ["پسر کتاب را می‌خواند", "پسر کتاب را نوشت", "پسر کتاب را خرید", "پسر کتاب را داد"],
      correctIndex: 0,
      answer: "جمله به معنای 'پسر کتاب را می‌خواند' است."
    },
    // ==================== سوالات ۱۱ تا ۱۵ ====================
    {
      id: 11,
      text: "کدام یک از موارد زیر اسم تفضیل است؟",
      options: ["أَکْبَرُ", "کَبِیرٌ", "مُکَبَّرٌ", "تَکْبِیرٌ"],
      correctIndex: 0,
      answer: "أَکْبَرُ اسم تفضیل است."
    },
    {
      id: 12,
      text: "ترجمه 'فِي المَدْرَسَةِ مُعَلِّمُونَ مُخْتَلِفُونَ' چیست؟",
      options: ["در مدرسه معلمان مختلفی هستند", "در مدرسه معلمی نیست", "معلمان به مدرسه رفتند", "مدرسه معلمان زیادی دارد"],
      correctIndex: 0,
      answer: "جمله به معنای 'در مدرسه معلمان مختلفی هستند' است."
    },
    {
      id: 13,
      text: "کدام یک از موارد زیر فعل ماضی است؟",
      options: ["یَکْتُبُ", "کَتَبَ", "اُکْتُبْ", "کَاتِبٌ"],
      correctIndex: 1,
      answer: "کَتَبَ فعل ماضی است."
    },
    {
      id: 14,
      text: "معنی 'رَأَیْتُ رَجُلًا طَوِیلًا' چیست؟",
      options: ["مردی بلندقد دیدم", "مردی کوتاه‌قد دیدم", "مردی را صدا زدم", "مردی را شناختم"],
      correctIndex: 0,
      answer: "جمله به معنای 'مردی بلندقد دیدم' است."
    },
    {
      id: 15,
      text: "کدام یک از موارد زیر از اقسام منصوبات است؟",
      options: ["المفعول به", "المبتدأ", "الخبر", "الفاعل"],
      correctIndex: 0,
      answer: "المفعول به از اقسام منصوبات است."
    },
    // ==================== سوالات ۱۶ تا ۲۰ ====================
    {
      id: 16,
      text: "ترجمه 'إِنَّ اللَّهَ غَفُورٌ رَحِيمٌ' چیست؟",
      options: ["همانا خداوند آمرزنده و مهربان است", "خداوند را نمی‌بینیم", "خداوند بزرگ است", "خداوند شنوا است"],
      correctIndex: 0,
      answer: "جمله به معنای 'همانا خداوند آمرزنده و مهربان است' است."
    },
    {
      id: 17,
      text: "کدام یک از موارد زیر جمع مذکر سالم است؟",
      options: ["مُعَلِّمُونَ", "مُعَلِّمَاتٌ", "مَدَارِسُ", "کُتُبٌ"],
      correctIndex: 0,
      answer: "مُعَلِّمُونَ جمع مذکر سالم است."
    },
    {
      id: 18,
      text: "معنی 'اِسْتَقْبَلَ الطَّالِبُ أُسْتَاذَهُ' چیست؟",
      options: ["دانش‌آموز استاد خود را استقبال کرد", "دانش‌آموز استاد خود را دید", "دانش‌آموز از استاد خود پرسید", "دانش‌آموز استاد خود را همراهی کرد"],
      correctIndex: 0,
      answer: "جمله به معنای 'دانش‌آموز استاد خود را استقبال کرد' است."
    },
    {
      id: 19,
      text: "کدام یک از موارد زیر اسم مکان است؟",
      options: ["مَسْجِدٌ", "مَكْتُوبٌ", "مُسْلِمٌ", "مِفْتَاحٌ"],
      correctIndex: 0,
      answer: "مَسْجِدٌ اسم مکان است."
    },
    {
      id: 20,
      text: "ترجمه 'سَمِعْتُ صَوْتًا جَمِیلًا' چیست؟",
      options: ["صدای زیبایی شنیدم", "صدای بلندی شنیدم", "صدایی را خواندم", "صدایی را دیدم"],
      correctIndex: 0,
      answer: "جمله به معنای 'صدای زیبایی شنیدم' است."
    },
    // ==================== سوالات ۲۱ تا ۲۵ ====================
    {
      id: 21,
      text: "کدام یک از موارد زیر از نواسخ است؟",
      options: ["إِنَّ", "کَانَ", "ظَنَّ", "همه موارد"],
      correctIndex: 3,
      answer: "همه موارد از نواسخ هستند."
    },
    {
      id: 22,
      text: "معنی 'يَکْتُبُ الطَّالِبُ الدَّرْسَ فِي الكِتَابِ' چیست؟",
      options: ["دانش‌آموز درس را در کتاب می‌نویسد", "دانش‌آموز درس را از کتاب می‌خواند", "دانش‌آموز کتاب را می‌خواند", "دانش‌آموز درس را حفظ می‌کند"],
      correctIndex: 0,
      answer: "جمله به معنای 'دانش‌آموز درس را در کتاب می‌نویسد' است."
    },
    {
      id: 23,
      text: "کدام یک از موارد زیر فعل امر است؟",
      options: ["اِذْهَبْ", "یَذْهَبُ", "ذَهَبَ", "ذَاهِبٌ"],
      correctIndex: 0,
      answer: "اِذْهَبْ فعل امر است."
    },
    {
      id: 24,
      text: "ترجمه 'أَحَبَّ الوَلَدُ أُمَّهُ' چیست؟",
      options: ["پسر مادرش را دوست داشت", "پسر از مادرش خواست", "پسر مادرش را دید", "پسر مادرش را صدا زد"],
      correctIndex: 0,
      answer: "جمله به معنای 'پسر مادرش را دوست داشت' است."
    },
    {
      id: 25,
      text: "کدام یک از موارد زیر اسم فاعل است؟",
      options: ["کَاتِبٌ", "مَكْتُوبٌ", "کِتَابَةٌ", "مَكْتَبٌ"],
      correctIndex: 0,
      answer: "کَاتِبٌ اسم فاعل است."
    },
    // ==================== سوالات ۲۶ تا ۳۰ ====================
    {
      id: 26,
      text: "معنی 'يَزُورُ الوَلَدُ جَدَّهُ كُلَّ يَوْمٍ' چیست؟",
      options: ["پسر هر روز پدربزرگش را ملاقات می‌کند", "پسر هر روز به مدرسه می‌رود", "پسر هر روز کتاب می‌خواند", "پسر هر روز به مسجد می‌رود"],
      correctIndex: 0,
      answer: "جمله به معنای 'پسر هر روز پدربزرگش را ملاقات می‌کند' است."
    },
    {
      id: 27,
      text: "کدام یک از موارد زیر از حروف مشبهة بالفعل است؟",
      options: ["إِنَّ", "أَنَّ", "کَأَنَّ", "همه موارد"],
      correctIndex: 3,
      answer: "همه موارد از حروف مشبهة بالفعل هستند."
    },
    {
      id: 28,
      text: "ترجمه 'اِشْتَرَیْتُ كِتَابًا جَدِیدًا' چیست؟",
      options: ["کتاب جدیدی خریدم", "کتاب قدیمی خریدم", "کتابی را خواندم", "کتابی را نوشتم"],
      correctIndex: 0,
      answer: "جمله به معنای 'کتاب جدیدی خریدم' است."
    },
    {
      id: 29,
      text: "کدام یک از موارد زیر اسم زمان است؟",
      options: ["مَغْرِبٌ", "مَغْرِبَةٌ", "مَغْرِبِیٌ", "مَغْرِباً"],
      correctIndex: 0,
      answer: "مَغْرِبٌ اسم زمان است."
    },
    {
      id: 30,
      text: "معنی 'فَهِمَ الطَّالِبُ الدَّرْسَ بِسُرْعَةٍ' چیست؟",
      options: ["دانش‌آموز درس را به سرعت فهمید", "دانش‌آموز درس را به سرعت نوشت", "دانش‌آموز درس را به سرعت خواند", "دانش‌آموز درس را به سرعت حفظ کرد"],
      correctIndex: 0,
      answer: "جمله به معنای 'دانش‌آموز درس را به سرعت فهمید' است."
    },
    // ==================== سوالات ۳۱ تا ۳۵ ====================
    {
      id: 31,
      text: "کدام یک از موارد زیر از اقسام مفعول است؟",
      options: ["مفعول به", "مفعول مطلق", "مفعول فیه", "همه موارد"],
      correctIndex: 3,
      answer: "همه موارد از اقسام مفعول هستند."
    },
    {
      id: 32,
      text: "ترجمه 'نَظَرَ الوَلَدُ إِلَی السَّمَاءِ' چیست؟",
      options: ["پسر به آسمان نگاه کرد", "پسر به زمین نگاه کرد", "پسر به دریا نگاه کرد", "پسر به کوه نگاه کرد"],
      correctIndex: 0,
      answer: "جمله به معنای 'پسر به آسمان نگاه کرد' است."
    },
    {
      id: 33,
      text: "کدام یک از موارد زیر فعل ناقص است؟",
      options: ["کَانَ", "أَصْبَحَ", "ظَلَّ", "همه موارد"],
      correctIndex: 3,
      answer: "همه موارد از افعال ناقص هستند."
    },
    {
      id: 34,
      text: "معنی 'یَسْكُنُ الوَلَدُ فِي بَيْتٍ كَبِیرٍ' چیست؟",
      options: ["پسر در خانه بزرگی زندگی می‌کند", "پسر در خانه کوچکی زندگی می‌کند", "پسر خانه بزرگی خرید", "پسر خانه بزرگی دید"],
      correctIndex: 0,
      answer: "جمله به معنای 'پسر در خانه بزرگی زندگی می‌کند' است."
    },
    {
      id: 35,
      text: "کدام یک از موارد زیر اسم آلت است؟",
      options: ["مِفْتَاحٌ", "مِكْتَبٌ", "مَسْجِدٌ", "مَكْتُوبٌ"],
      correctIndex: 0,
      answer: "مِفْتَاحٌ اسم آلت است."
    },
    // ==================== سوالات ۳۶ تا ۴۰ ====================
    {
      id: 36,
      text: "ترجمه 'قَرَأَ الوَلَدُ القُرْآنَ الكَرِیمَ' چیست؟",
      options: ["پسر قرآن کریم را خواند", "پسر قرآن کریم را نوشت", "پسر قرآن کریم را حفظ کرد", "پسر قرآن کریم را شنید"],
      correctIndex: 0,
      answer: "جمله به معنای 'پسر قرآن کریم را خواند' است."
    },
    {
      id: 37,
      text: "کدام یک از موارد زیر از اسم‌های پنجگانه است؟",
      options: ["أَبُو", "أَخُو", "حَمُو", "همه موارد"],
      correctIndex: 3,
      answer: "همه موارد از اسم‌های پنجگانه هستند."
    },
    {
      id: 38,
      text: "معنی 'أَکْرَمَ المُعَلِّمُ الطَّالِبَ المُجْتَهِدَ' چیست؟",
      options: ["معلم دانش‌آموز کوشا را گرامی داشت", "معلم دانش‌آموز کوشا را دید", "معلم دانش‌آموز کوشا را صدا زد", "معلم دانش‌آموز کوشا را تشویق کرد"],
      correctIndex: 0,
      answer: "جمله به معنای 'معلم دانش‌آموز کوشا را گرامی داشت' است."
    },
    {
      id: 39,
      text: "کدام یک از موارد زیر ظرف زمان است؟",
      options: ["یَوْمَ", "لَیْلَةَ", "سَاعَةَ", "همه موارد"],
      correctIndex: 3,
      answer: "همه موارد ظرف زمان هستند."
    },
    {
      id: 40,
      text: "ترجمه 'رَجَعَ الوَلَدُ إِلَی البَيْتِ' چیست؟",
      options: ["پسر به خانه برگشت", "پسر به خانه رفت", "پسر در خانه ماند", "پسر از خانه خارج شد"],
      correctIndex: 0,
      answer: "جمله به معنای 'پسر به خانه برگشت' است."
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
        backgroundColor: '#1a7a3a',
        color: 'white',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '30px',
        textAlign: 'center',
        position: 'relative'
      }}>
        <button 
          onClick={() => router.push('/exam/davazdahom/tajrobi/ghalamchi/second-half/arabi-3-tajrobi')}
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
            <h1 style={{ margin: 0, fontSize: '28px' }}>📖 آزمون جامع عربی (۳)</h1>
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
                backgroundColor: '#1a7a3a',
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
                      border: isSelected ? '3px solid #1a7a3a' : '1px solid #dee2e6',
                      borderRadius: '10px',
                      backgroundColor: isSelected ? '#e8f5e9' : '#fff',
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
                      backgroundColor: isSelected ? '#1a7a3a' : '#fff',
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
                  backgroundColor: canCalculate ? '#1a7a3a' : '#6c757d',
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
              <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#1a7a3a' }}>
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
              backgroundColor: showAnswers ? '#dc3545' : '#1a7a3a',
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
            borderTop: '4px solid #1a7a3a',
            paddingTop: '40px',
            backgroundColor: '#ffffff',
            padding: '40px',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
            width: '100%'
          }}>
            <h2 style={{ 
              textAlign: 'center', 
              borderBottom: '3px solid #1a7a3a', 
              paddingBottom: '20px', 
              marginBottom: '40px',
              fontSize: '26px',
              color: '#1a7a3a'
            }}>
              📝 پاسخنامه تشریحی عربی (۳)
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
                      color: '#1a7a3a',
                      backgroundColor: '#e8f5e9',
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
                    <span style={{ fontWeight: 'bold', color: '#1a7a3a' }}>📖 توضیح:</span> 
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

export default Arabi3FinalExam;