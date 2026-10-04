"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const ArabiRiyaziFinalExam = () => {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  // ================= سوالات عربی ۳ - جامع نیم‌سال دوم =================
  const questions = [
    // ==================== فصل اول: قواعد و ترجمه ====================
    {
      id: 1,
      text: "در جمله 'قرأ الطالبُ الدرسَ'، کلمه 'الدرسَ' چه اعرابی دارد؟",
      options: ["مرفوع", "منصوب", "مجرور", "مجزوم"],
      correctIndex: 1,
      answer: "گزینه ۲: 'الدرسَ' مفعول به و منصوب است. علامت نصب آن فتحه ظاهر است."
    },
    {
      id: 2,
      text: "ترجمه صحیح جمله 'یُحِبُّ الْمُسْلِمُونَ وَطَنَهُمْ' چیست؟",
      options: ["مسلمانان وطن خود را دوست دارند", "مسلمانان وطن خود را دوست دارد", "مسلمان وطن خود را دوست دارند", "مسلمانان وطن خود را دوست داری"],
      correctIndex: 0,
      answer: "گزینه ۱: 'یُحِبُّ' = دوست دارند، 'الْمُسْلِمُونَ' = مسلمانان، 'وَطَنَهُمْ' = وطن خود را"
    },
    {
      id: 3,
      text: "در جمله 'رأیتُ رجلاً کریماً'، کلمه 'کریماً' چه نقشی دارد؟",
      options: ["نعت (صفت)", "بدل", "عطف بیان", "تٴکید"],
      correctIndex: 0,
      answer: "گزینه ۱: 'کریماً' صفت (نعت) برای 'رجلاً' است و از نظر جنس، عدد، اعراب و تعریف با آن مطابقت دارد."
    },
    {
      id: 4,
      text: "کدام یک از موارد زیر نشانه‌های اسم است؟",
      options: ["ال، تنوین، حرف جر", "ال، حرف عطف، حرف ندا", "تنوین، حرف ندا، حرف عطف", "ال، حرف جر، حرف شرط"],
      correctIndex: 0,
      answer: "گزینه ۱: علامت‌های اسم عبارتند از: ال (الف و لام تعریف)، تنوین و حروف جر."
    },
    {
      id: 5,
      text: "ترجمه 'کُلُّ نَفْسٍ ذائِقَةُ الْمَوْتِ' کدام است؟",
      options: ["هر نفس‌کشنده مرگ است", "هر کسی چشنده مرگ است", "هر نفسی مرگ را می‌چشد", "همه نفس‌ها مرگ را می‌چشند"],
      correctIndex: 2,
      answer: "گزینه ۳: 'کُلُّ نَفْسٍ' = هر نفسی، 'ذائِقَةُ' = چشنده (مونث)، 'الْمَوْتِ' = مرگ را"
    },

    // ==================== فصل دوم: اسم‌های معرب و مبنی ====================
    {
      id: 6,
      text: "کدام یک از ضمایر زیر مبنی است؟",
      options: ["أنا", "أنتَ", "هو", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: تمام ضمایر منفصل و متصل در زبان عربی مبنی هستند و حرکت آخر آنها تغییر نمی‌کند."
    },
    {
      id: 7,
      text: "اسماء خمسه (پنج اسم) کدامند؟",
      options: ["أب، أخ، حم، فو، ذو", "أب، أم، أخ، بنت، فو", "أب، أخ، حم، فو، أخو", "أب، أخ، حم، فو، ذا"],
      correctIndex: 0,
      answer: "گزینه ۱: اسماء خمسه عبارتند از: أب (پدر)، أخ (برادر)، حم (خواهر شوهر/پدر زن)، فو (دهان)، ذو (صاحب)"
    },
    {
      id: 8,
      text: "در جمله 'جاءَ أَبُوكَ'، کلمه 'أَبُو' چه اعرابی دارد و چرا؟",
      options: ["مرفوع به واو", "منصوب به الف", "مجرور به یاء", "مرفوع به ضمه"],
      correctIndex: 0,
      answer: "گزینه ۱: 'أَبُو' از اسماء خمسه است و در حالت رفع با واو، نصب با الف و جر با یاء علامت‌گذاری می‌شود."
    },
    {
      id: 9,
      text: "کلمه 'مُوسَى' چه نوع اسمی است؟",
      options: ["اسم مقصور", "اسم منقوص", "اسم ممدود", "اسم معرب"],
      correctIndex: 0,
      answer: "گزینه ۱: 'مُوسَى' اسم مقصور است که به ألف مقصوره ختم می‌شود و در حالت‌های مختلف اعراب، حرکت آن تغییر می‌کند."
    },
    {
      id: 10,
      text: "کدام یک از اسامی زیر مبنی است؟",
      options: ["کتاب", "هذا", "معلم", "مسلم"],
      correctIndex: 1,
      answer: "گزینه ۲: 'هذا' (این) از اسماء اشاره است و مبنی می‌باشد، در حالی که سایر گزینه‌ها معرب هستند."
    },

    // ==================== فصل سوم: فعل‌ها و اشتقاق ====================
    {
      id: 11,
      text: "فعل 'قالَ' از کدام نوع فعل‌های معتل است؟",
      options: ["مثال", "اجوف", "ناقص", "لفیف"],
      correctIndex: 1,
      answer: "گزینه ۲: 'قالَ' از نوع اجوف است زیرا حرف عله (ألف) در وسط کلمه قرار دارد و اصل آن 'قَوَلَ' بوده است."
    },
    {
      id: 12,
      text: "اسم فاعل از فعل 'کَتَبَ' چیست؟",
      options: ["مَکْتُوب", "کاتِب", "کِتاب", "کَتَبَة"],
      correctIndex: 1,
      answer: "گزینه ۲: اسم فاعل از فعل ثلاثی مجرد بر وزن 'فاعِل' ساخته می‌شود: کَتَبَ → کاتِب"
    },
    {
      id: 13,
      text: "در جمله 'کانَ الطالِبُ مُجْتَهِداً'، کلمه 'مُجْتَهِداً' چه اعرابی دارد؟",
      options: ["خبر کان منصوب", "اسم کان مرفوع", "خبر کان مرفوع", "مفعول به منصوب"],
      correctIndex: 0,
      answer: "گزینه ۱: 'کانَ' از فعل‌های ناقصه است و خبر آن منصوب می‌شود، بنابراین 'مُجْتَهِداً' خبر کان و منصوب است."
    },
    {
      id: 14,
      text: "فعل مجهول از 'ضَرَبَ' در زمان ماضی چه شکلی است؟",
      options: ["ضُرِبَ", "ضَرَبَ", "یُضْرَبُ", "ضَرْب"],
      correctIndex: 0,
      answer: "گزینه ۱: فعل مجهول ماضی از 'ضَرَبَ' به شکل 'ضُرِبَ' در می‌آید که با تغییر حرکات (ضمّه بر اول و کسره بر دوم) ساخته می‌شود."
    },
    {
      id: 15,
      text: "کدام یک از موارد زیر از مشتقات فعل است؟",
      options: ["اسم فاعل", "اسم مفعول", "صفت مشبهه", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: اسم فاعل، اسم مفعول، صفت مشبهه، اسم مبالغه و اسم زمان و مکان همه از مشتقات فعل محسوب می‌شوند."
    },

    // ==================== فصل چهارم: جملات و عبارات عربی ====================
    {
      id: 16,
      text: "جمله 'الطالِبُ ناجِحٌ' چه نوع جمله‌ای است؟",
      options: ["جمله اسمیه", "جمله فعلیه", "جمله شرطیه", "جمله قسمیه"],
      correctIndex: 0,
      answer: "گزینه ۱: این جمله با اسم (مبتدا) شروع شده است، پس جمله اسمیه است. 'الطالِبُ' مبتدا و 'ناجِحٌ' خبر است."
    },
    {
      id: 17,
      text: "در جمله 'إِنْ تَدْرُسْ تَنْجَحْ'، ادات شرط کدام است؟",
      options: ["إن", "تدرس", "تنجح", "لا"],
      correctIndex: 0,
      answer: "گزینه ۱: 'إنْ' از ادوات شرط جازمه است که فعل بعد از خود را مجزوم می‌کند."
    },
    {
      id: 18,
      text: "عطف در جمله 'جاءَ زیدٌ و عمروٌ' چه نوع عطفی است؟",
      options: ["عطف نسق", "عطف بیان", "عطف تفسیر", "عطف خاص"],
      correctIndex: 0,
      answer: "گزینه ۱: در این جمله، 'و' حرف عطف است و دو اسم را به هم عطف کرده است که به آن عطف نسق می‌گویند."
    },
    {
      id: 19,
      text: "ترجمه صحیح جمله 'لَوْ جِئْتَ لَرَأَیْتَ الْجَمَالَ' چیست؟",
      options: ["اگر بیایی زیبایی را می‌بینی", "اگر آمدی زیبایی را می‌دیدی", "اگر می‌آمدی زیبایی را می‌دیدی", "اگر بیایی زیبایی را می‌دیدی"],
      correctIndex: 2,
      answer: "گزینه ۳: 'لَوْ' برای شرط غیر واقعی است و 'جِئْتَ' = می‌آمدی، 'لَرَأَیْتَ' = می‌دیدی."
    },
    {
      id: 20,
      text: "در جمله 'الکتابُ الَّذی قَرَأْتُهُ'، کلمه 'الَّذی' چه نقشی دارد؟",
      options: ["اسم موصول", "حرف شرط", "حرف جر", "فعل"],
      correctIndex: 0,
      answer: "گزینه ۱: 'الَّذی' اسم موصول است که به کلمه قبل (الکتابُ) وصل می‌شود و صله آن 'قَرَأْتُهُ' است."
    },

    // ==================== سوالات ترکیبی ====================
    {
      id: 21,
      text: "در جمله 'أَعْجَبَنِی الکِتابُ الَّذِی قَرَأْتَهُ'، فاعل فعل 'أَعْجَبَ' چیست؟",
      options: ["الکتابُ", "أنا", "أنتَ", "الَّذی"],
      correctIndex: 0,
      answer: "گزینه ۱: 'الکتابُ' فاعل 'أَعْجَبَ' است و 'نِی' مفعول به (مرا) می‌باشد."
    },
    {
      id: 22,
      text: "کدام یک از گزینه‌ها جمله فعلیه است؟",
      options: ["الطالب مجتهد", "یَکْتُبُ الطالبُ الدرسَ", "الدرسُ سهلٌ", "اللهُ أکبرُ"],
      correctIndex: 1,
      answer: "گزینه ۲: 'یَکْتُبُ' فعل است و جمله با فعل شروع شده است، پس جمله فعلیه محسوب می‌شود."
    },
    {
      id: 23,
      text: "در جمله 'سَلَامٌ عَلَیْکُمْ'، کلمه 'عَلَیْکُمْ' چه نوع ترکیبی است؟",
      options: ["جار و مجرور", "مبتدا و خبر", "فعل و فاعل", "نعت و منعوت"],
      correctIndex: 0,
      answer: "گزینه ۱: 'عَلَیْ' حرف جر و 'کُمْ' ضمیر متصل مجرور است که ترکیب جار و مجرور را تشکیل می‌دهند."
    },
    {
      id: 24,
      text: "کدام گزینه ترجمه صحیح 'إِنَّ اللَّهَ مَعَ الصَّابِرِینَ' است؟",
      options: ["همانا خداوند با صابران است", "خداوند با صابران است", "اگر خداوند با صابران است", "خداوند با صابران نیست"],
      correctIndex: 0,
      answer: "گزینه ۱: 'إِنَّ' حرف مشبه بالفعل است و معنای تٴکید (همانا) دارد، پس ترجمه صحیح 'همانا خداوند با صابران است' می‌باشد."
    },
    {
      id: 25,
      text: "در جمله 'ضَرَبْتُ زَیْداً'، مفعول به چیست؟",
      options: ["زیداً", "ضربت", "أنا", "لا مفعول"],
      correctIndex: 0,
      answer: "گزینه ۱: 'زیداً' مفعول به است که عمل ضرب بر آن واقع شده و منصوب می‌باشد."
    },
    {
      id: 26,
      text: "کدام یک از موارد زیر نشانه‌های فعل است؟",
      options: ["تاء تأنیث، نون تأکید، یاء مخاطبه", "ال، تنوین، حرف جر", "حرف عطف، حرف ندا، حرف جر", "همه موارد"],
      correctIndex: 0,
      answer: "گزینه ۱: تاء تأنیث (ت)، نون تأکید (ن) و یاء مخاطبه از نشانه‌های فعل هستند."
    },
    {
      id: 27,
      text: "ترجمه 'وَاعْبُدُوا اللَّهَ وَلا تُشْرِکُوا بِهِ شَیْئاً' کدام است؟",
      options: ["خدا را بپرستید و به او شرک نورزید", "خدا را بپرست و به او شرک نورز", "خدا را می‌پرستید و شرک نمی‌ورزید", "خدا را پرستش کنید و به او شرک نورزید"],
      correctIndex: 0,
      answer: "گزینه ۱: 'وَاعْبُدُوا' = و بپرستید، 'اللَّهَ' = خدا را، 'وَلا تُشْرِکُوا' = و شرک نورزید، 'بِهِ' = به او، 'شَیْئاً' = چیزی"
    },
    {
      id: 28,
      text: "در جمله 'کَتَبْتُ رِسَالَةً طَوِیلَةً'، کلمه 'طَوِیلَةً' چه نقشی دارد؟",
      options: ["نعت (صفت)", "بدل", "مفعول مطلق", "حال"],
      correctIndex: 0,
      answer: "گزینه ۱: 'طَوِیلَةً' صفت (نعت) برای 'رِسَالَةً' است و از نظر جنس (مونث) و اعراب (نصب) با آن مطابقت دارد."
    },
    {
      id: 29,
      text: "کدام یک از افعال زیر از نوع افعال ناقصه است؟",
      options: ["کانَ", "ضَرَبَ", "کَتَبَ", "ذَهَبَ"],
      correctIndex: 0,
      answer: "گزینه ۱: 'کانَ' از افعال ناقصه است که جمله را به صورت 'کانَ + مبتدا + خبر' می‌آورد و خبر آن منصوب می‌شود."
    },
    {
      id: 30,
      text: "معنی صحیح 'یَعْمَلُونَ' در جمله 'الْمُؤْمِنُونَ یَعْمَلُونَ الصَّالِحَاتِ' چیست؟",
      options: ["عمل می‌کنند", "عمل می‌کند", "عمل کردند", "عمل خواهند کرد"],
      correctIndex: 0,
      answer: "گزینه ۱: 'یَعْمَلُونَ' فعل مضارع مرفوع است که به معنای 'عمل می‌کنند' می‌باشد و فاعل آن 'الْمُؤْمِنُونَ' است."
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
        backgroundColor: '#2E7D32',
        color: 'white',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '30px',
        textAlign: 'center',
        position: 'relative'
      }}>
        <button 
          onClick={() => router.push('/exam/davazdahom/riyazi/gozine2/second-half/arabi-3-riyazi')}
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
            <h1 style={{ margin: 0, fontSize: '28px' }}>📖 آزمون جامع عربی ۳</h1>
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
                backgroundColor: '#2E7D32',
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
                      border: isSelected ? '3px solid #2E7D32' : '1px solid #dee2e6',
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
                      backgroundColor: isSelected ? '#2E7D32' : '#fff',
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
                  backgroundColor: canCalculate ? '#2E7D32' : '#6c757d',
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
              <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#2E7D32' }}>
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
            borderTop: '4px solid #2E7D32',
            paddingTop: '40px',
            backgroundColor: '#ffffff',
            padding: '40px',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
            width: '100%'
          }}>
            <h2 style={{ 
              textAlign: 'center', 
              borderBottom: '3px solid #2E7D32', 
              paddingBottom: '20px', 
              marginBottom: '40px',
              fontSize: '26px',
              color: '#2E7D32'
            }}>
              📝 پاسخنامه تشریحی عربی ۳
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
                      color: '#2E7D32',
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
                    <span style={{ fontWeight: 'bold', color: '#2E7D32' }}>📖 توضیح:</span> 
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

export default ArabiRiyaziFinalExam;