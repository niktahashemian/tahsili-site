"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const DinVaZendegiFinalExam = () => {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  // ================= سوالات دین و زندگی - جامع نیم‌سال دوم =================
  const questions = [
    // ==================== فصل اول: توحید و خداشناسی ====================
    {
      id: 1,
      text: "اولین قدم برای شناخت خداوند چیست؟",
      options: ["تفکر در آفرینش", " مطالعه قرآن", "پیروی از دیگران", "انکار صفات خداوند"],
      correctIndex: 0,
      answer: "گزینه ۱: اولین قدم برای شناخت خداوند، تفکر در آفرینش و نشانه‌های او در طبیعت است."
    },
    {
      id: 2,
      text: "کدام یک از صفات زیر از صفات جلال خداوند است؟",
      options: ["رحمان", "رحیم", "قاهر", "ودود"],
      correctIndex: 2,
      answer: "گزینه ۳: 'قاهر' (غالب و چیره) از صفات جلال خداوند است که نشان‌دهنده عظمت و قدرت مطلق اوست."
    },
    {
      id: 3,
      text: "توحید در عبادت به چه معناست؟",
      options: ["فقط خدا را عبادت کردن", "عبادت فرشتگان", "عبادت پیامبران", "عبادت اولیاء خدا"],
      correctIndex: 0,
      answer: "گزینه ۱: توحید در عبادت یعنی تنها خداوند شایسته عبادت است و هیچ موجود دیگری را نباید عبادت کرد."
    },
    {
      id: 4,
      text: "در قرآن، کدام سوره به طور کامل به توحید پرداخته است؟",
      options: ["سوره توحید", "سوره فاتحه", "سوره بقره", "سوره آل عمران"],
      correctIndex: 0,
      answer: "گزینه ۱: سوره توحید (سوره ۱۱۲) به طور کامل به موضوع توحید و یکتایی خداوند پرداخته است."
    },
    {
      id: 5,
      text: "معنای 'توکل' بر خدا چیست؟",
      options: ["اعتماد کامل به خداوند در همه امور", "انکار قدرت دیگران", "فقط دعا کردن", "دست از تلاش برداشتن"],
      correctIndex: 0,
      answer: "گزینه ۱: توکل یعنی اعتماد کامل به خداوند و تکیه بر او در همه امور زندگی در عین تلاش و کوشش."
    },
    {
      id: 6,
      text: "کدام آیه به توحید و یکتایی خداوند اشاره دارد؟",
      options: ["إِنَّ اللَّهَ وَاحِدٌ", "اللَّهُ وَلِيُّ الَّذِينَ آمَنُوا", "سَنُرِيهِمْ آيَاتِنَا", "قُلْ هُوَ اللَّهُ أَحَدٌ"],
      correctIndex: 3,
      answer: "گزینه ۴: سوره توحید با 'قُلْ هُوَ اللَّهُ أَحَدٌ' (بگو او خداوند یکتا است) شروع می‌شود."
    },

    // ==================== فصل دوم: عدل الهی ====================
    {
      id: 7,
      text: "عدل الهی به چه معناست؟",
      options: ["خداوند به هر کس حق خود را می‌دهد", "خداوند همه را یکسان آفریده است", "خداوند فقط نیکان را دوست دارد", "خداوند با همه یکسان رفتار می‌کند"],
      correctIndex: 0,
      answer: "گزینه ۱: عدل الهی یعنی خداوند به هر موجودی آنچه شایسته و سزاوار است را عطا می‌کند."
    },
    {
      id: 8,
      text: "قضا و قدر الهی چیست؟",
      options: ["تقدیر و اندازه‌گیری همه چیز توسط خداوند", "اختیار انسان", "حوادث طبیعی", "تصادف در جهان"],
      correctIndex: 0,
      answer: "گزینه ۱: قضا و قدر یعنی خداوند همه چیز را با اندازه و تقدیر معین آفریده است."
    },
    {
      id: 9,
      text: "رابطه اختیار انسان با قضا و قدر چیست؟",
      options: ["اختیار انسان در چارچوب قضا و قدر معنا می‌شود", "اختیار انسان با قضا و قدر در تضاد است", "قضا و قدر اختیار انسان را نفی می‌کند", "هیچ رابطه‌ای بین آن‌ها نیست"],
      correctIndex: 0,
      answer: "گزینه ۱: اختیار انسان در چارچوب قضا و قدر الهی معنا می‌شود و با آن در تضاد نیست."
    },
    {
      id: 10,
      text: "حکمت خداوند در آفرینش جهان چیست؟",
      options: ["جهان با هدف و حکمت آفریده شده است", "جهان به صورت تصادفی به وجود آمده است", "جهان فقط برای انسان آفریده شده است", "جهان بی‌هدف است"],
      correctIndex: 0,
      answer: "گزینه ۱: حکمت الهی نشان می‌دهد که جهان با هدف و نظم دقیق آفریده شده است."
    },
    {
      id: 11,
      text: "عدالت اجتماعی در اسلام بر چه اساسی استوار است؟",
      options: ["حقوق طبیعی انسان‌ها", "قدرت و ثروت", "نژاد و قومیت", "جنسیت"],
      correctIndex: 0,
      answer: "گزینه ۱: عدالت اجتماعی در اسلام بر اساس حقوق طبیعی و کرامت انسانی استوار است."
    },
    {
      id: 12,
      text: "در قرآن، کدام آیه به عدل الهی اشاره دارد؟",
      options: ["إِنَّ اللَّهَ يَأْمُرُ بِالْعَدْلِ", "وَمَا خَلَقْتُ الْجِنَّ وَالْإِنسَ", "يَوْمَ يَقُومُ النَّاسُ", "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا"],
      correctIndex: 0,
      answer: "گزینه ۱: آیه 'إِنَّ اللَّهَ يَأْمُرُ بِالْعَدْلِ' (خداوند به عدل امر می‌کند) در سوره نحل آمده است."
    },

    // ==================== فصل سوم: نبوت و رسالت ====================
    {
      id: 13,
      text: "چرا بشر به پیامبران نیاز دارد؟",
      options: ["برای هدایت و راهنمایی به سوی خدا", "برای سرگرمی", "برای ایجاد اختلاف", "برای جمع‌آوری ثروت"],
      correctIndex: 0,
      answer: "گزینه ۱: بشر به پیامبران نیاز دارد تا او را به سوی خدا و مسیر درست هدایت کنند."
    },
    {
      id: 14,
      text: "عصمت پیامبران به چه معناست؟",
      options: ["آن‌ها از گناه و خطا مصون هستند", "آن‌ها هرگز مریض نمی‌شوند", "آن‌ها همیشه ثروتمند هستند", "آن‌ها هرگز نمی‌میرند"],
      correctIndex: 0,
      answer: "گزینه ۱: عصمت یعنی پیامبران از گناه و خطا مصون هستند تا پیام الهی را به درستی برسانند."
    },
    {
      id: 15,
      text: "معجزه چیست؟",
      options: ["کاری خارق‌العاده که توسط پیامبران انجام می‌شود", "فعل عادی انسان‌ها", "حوادث طبیعی", "سحر و جادو"],
      correctIndex: 0,
      answer: "گزینه ۱: معجزه کاری خارق‌العاده است که توسط پیامبران برای اثبات نبوت خود انجام می‌شود."
    },
    {
      id: 16,
      text: "خاتمیت پیامبر اسلام به چه معناست؟",
      options: ["پس از حضرت محمد(ص) پیامبری نخواهد آمد", "پیامبران بعد از ایشان هم می‌آیند", "ایشان بزرگ‌ترین پیامبر هستند", "دین ایشان کامل نیست"],
      correctIndex: 0,
      answer: "گزینه ۱: خاتمیت یعنی حضرت محمد(ص) آخرین پیامبر خداوند است و پس از ایشان پیامبری مبعوث نمی‌شود."
    },
    {
      id: 17,
      text: "کدام آیه دلالت بر خاتمیت پیامبر اسلام دارد؟",
      options: ["مَا كَانَ مُحَمَّدٌ أَبَا أَحَدٍ مِّن رِّجَالِكُمْ", "يَا أَيُّهَا النَّبِيُّ", "إِنَّا أَرْسَلْنَاكَ", "هُوَ الَّذِي أَرْسَلَ رَسُولَهُ"],
      correctIndex: 0,
      answer: "گزینه ۱: آیه 'مَا كَانَ مُحَمَّدٌ أَبَا أَحَدٍ...' در سوره احزاب به خاتمیت اشاره دارد."
    },
    {
      id: 18,
      text: "تفاوت معجزه با سحر چیست؟",
      options: ["معجزه با اذن خداوند انجام می‌شود", "سحر با اذن خداوند است", "هیچ فرقی ندارند", "هر دو با قدرت نفسانی انجام می‌شوند"],
      correctIndex: 0,
      answer: "گزینه ۱: معجزه با اذن و قدرت خداوند انجام می‌شود اما سحر وابسته به شیاطین است."
    },

    // ==================== فصل چهارم: امامت و ولایت ====================
    {
      id: 19,
      text: "امامت در اسلام به چه معناست؟",
      options: ["رهبری و جانشینی پیامبر در همه امور", "فقط رهبری سیاسی", "فقط رهبری مذهبی", "فقط قضاوت"],
      correctIndex: 0,
      answer: "گزینه ۱: امامت یعنی رهبری و جانشینی پیامبر در همه امور دینی و دنیوی جامعه اسلامی."
    },
    {
      id: 20,
      text: "اولین امام معصوم کیست؟",
      options: ["امام علی(ع)", "امام حسن(ع)", "امام حسین(ع)", "امام سجاد(ع)"],
      correctIndex: 0,
      answer: "گزینه ۱: امام علی(ع) اولین امام معصوم و جانشین پیامبر اسلام است."
    },
    {
      id: 21,
      text: "مهدویت و ظهور امام زمان(عج) چه پیامی دارد؟",
      options: ["پیروزی نهایی حق بر باطل", "پایان تاریخ", "انقلاب اجتماعی", "همه موارد"],
      correctIndex: 0,
      answer: "گزینه ۱: مهدویت نوید پیروزی نهایی حق بر باطل و استقرار عدالت در جامعه بشری را می‌دهد."
    },
    {
      id: 22,
      text: "وظایف منتظران ظهور امام زمان(عج) چیست؟",
      options: ["انتظار فعال با عمل به دین و اخلاق", "فقط دعا کردن", "فقط گریه کردن", "فقط منتظر ماندن"],
      correctIndex: 0,
      answer: "گزینه ۱: منتظران باید با عمل به دین، اخلاق، و آمادگی کامل در انتظار ظهور باشند."
    },
    {
      id: 23,
      text: "امامت در قرآن در کدام آیه ذکر شده است؟",
      options: ["إِنِّي جَاعِلُكَ لِلنَّاسِ إِمَامًا", "يَا أَيُّهَا الَّذِينَ آمَنُوا", "وَلْتَكُن مِّنكُمْ أُمَّةٌ", "إِنَّ اللَّهَ اشْتَرَى"],
      correctIndex: 0,
      answer: "گزینه ۱: آیه 'إِنِّي جَاعِلُكَ لِلنَّاسِ إِمَامًا' (من تو را امام مردم قرار دادم) در سوره بقره آمده است."
    },
    {
      id: 24,
      text: "کدام امام به 'باب العلم' (در علم) مشهور است؟",
      options: ["امام علی(ع)", "امام باقر(ع)", "امام صادق(ع)", "امام رضا(ع)"],
      correctIndex: 1,
      answer: "گزینه ۲: امام باقر(ع) به 'باب العلم' (در علم) مشهور است و در گسترش علوم دینی نقش بسزایی داشت."
    },

    // ==================== فصل پنجم: معاد و آخرت ====================
    {
      id: 25,
      text: "برزخ به چه معناست؟",
      options: ["عالم میان مرگ و قیامت", "بهشت", "جهنم", "دنیا"],
      correctIndex: 0,
      answer: "گزینه ۱: برزخ عالمی است که انسان پس از مرگ تا روز قیامت در آن به سر می‌برد."
    },
    {
      id: 26,
      text: "قیامت چه روزی است؟",
      options: ["روز ظهور حق و حساب همه انسان‌ها", "روز تولد دوباره زمین", "روز تعطیلی همه کارها", "روز فرار انسان‌ها"],
      correctIndex: 0,
      answer: "گزینه ۱: قیامت روزی است که خداوند همه انسان‌ها را برای حساب و کتاب مجدد زنده می‌کند."
    },
    {
      id: 27,
      text: "نامه اعمال چیست؟",
      options: ["ثبت تمام اعمال انسان توسط فرشتگان", "سندی برای ورود به بهشت", "سندی برای ورود به جهنم", "گواهی تولد"],
      correctIndex: 0,
      answer: "گزینه ۱: نامه اعمال سندی است که تمام اعمال انسان در دنیا توسط فرشتگان ثبت شده است."
    },
    {
      id: 28,
      text: "بهشت چه نعمت‌هایی دارد؟",
      options: ["نعمت‌های مادی و معنوی ابدی", "فقط غذاهای خوشمزه", "فقط باغ‌های سرسبز", "فقط لباس‌های زیبا"],
      correctIndex: 0,
      answer: "گزینه ۱: بهشت دارای نعمت‌های مادی و معنوی ابدی است که هیچ پایانی ندارد."
    },
    {
      id: 29,
      text: "جهنم چه عذاب‌هایی دارد؟",
      options: ["عذاب‌های روحی و جسمی سخت", "فقط آتش", "فقط تاریکی", "فقط تنهایی"],
      correctIndex: 0,
      answer: "گزینه ۱: جهنم دارای عذاب‌های روحی و جسمی بسیار سخت و دردناک است."
    },
    {
      id: 30,
      text: "کدام آیه به معاد و قیامت اشاره دارد؟",
      options: ["كُلُّ نَفْسٍ ذَائِقَةُ الْمَوْتِ", "أَيَحْسَبُ الْإِنسَانُ أَن يُتْرَكَ سُدًى", "إِنَّ الْإِنسَانَ لَفِي خُسْرٍ", "وَالْعَصْرِ"],
      correctIndex: 0,
      answer: "گزینه ۱: آیه 'كُلُّ نَفْسٍ ذَائِقَةُ الْمَوْتِ' (هر نفسی طعم مرگ را خواهد چشید) در سوره آل عمران آمده است."
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
          onClick={() => router.push('/exam/davazdahom/riyazi/ghalamchi/first-half/din-va-zendegi-3-riyazi')}
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
            <h1 style={{ margin: 0, fontSize: '28px' }}>🕌 آزمون جامع دین و زندگی ۳</h1>
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
              📝 پاسخنامه تشریحی دین و زندگی ۳
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

export default DinVaZendegiFinalExam;