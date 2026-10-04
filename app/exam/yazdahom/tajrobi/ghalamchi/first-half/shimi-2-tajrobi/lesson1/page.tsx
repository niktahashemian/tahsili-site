"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const Shimi2Lesson5Exam1 = () => {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  const questions = [
    {
      id: 1,
      text: "چه تعداد از گزاره‌های زیر درست هستند؟\nالف) همۀ فلزات در طبیعت به صورت ترکیبات یونی همچون اکسیدها، کربنات‌ها و ... یافت می‌شوند.\nب) سرخی یاقوت و سبزی زمرد مربوط به وجود فلزات اصلی در ترکیبات آن‌ها است.\nپ) سدیم فلزی نرم است که با چاقو بریده می‌شود و در هوا به آرامی رنگش تیره می‌شود.\nت) رسانایی الکتریسیته و گرما از ویژگی‌های مشترک میان تمام فلزات است.",
      options: ["صفر", "۲", "۳", "۴"],
      correctIndex: 1,
      answer: "۲ مورد درست است (پ و ت)."
    },
    {
      id: 2,
      text: "چند مورد از عبارت‌های پیشنهادی برای تکمیل جملهٔ زیر مناسب است؟\n'آهن فلزی است که ......'\nالف) در سطح جهان دارای بیشترین مصرف سالانه در بین صنایع گوناگون است.\nب) در طبیعت فقط به شکل هماتیت یافت می‌شود.\nپ) دارای دو نوع یون با بارهای الکتریکی +۲ و +۳ است.\nت) ترکیب‌های دارای آن در آب نامحلول ولی در اسیدها محلول هستند.",
      options: ["۱", "۲", "۳", "۴"],
      correctIndex: 2,
      answer: "۳ مورد درست است (الف، پ و ت)."
    },
    {
      id: 3,
      text: "چند مورد از مطالب زیر درست است؟\nالف) برخی نافلزها مانند اکسیژن، نیتروژن، فسفر و ... به شکل آزاد در طبیعت وجود دارند.\nب) در اثر انجام واکنش انجام‌یافته در استخراج آهن از آهن (III) اکسید توسط کربن، جرم مواد جامد موجود در مخلوط واکنش کاهش می‌یابد.\nپ) یکی از دلایل استفاده از عنصر کربن به‌جای فلز سدیم در استخراج آهن، واکنش‌پذیری بیش‌ازحد فلز سدیم است.\nت) در هر واکنشی که انجام می‌شود، واکنش‌پذیری فرآورده‌ها از واکنش‌دهنده‌ها کمتر است.\nث) در میان فلزها، تنها طلا به‌شکل کلوخه یا رگه‌های زرد لابه‌الی خاک یافت می‌شود.",
      options: ["۳", "۴", "۱", "۲"],
      correctIndex: 0,
      answer: "۳ مورد درست است (الف، ب و ث)."
    },
    {
      id: 4,
      text: "چند مورد از موارد زیر درست است؟\nالف) نخستین عنصر دورۀ چهارم جدول دوره‌ای عناصر در تلویزیون‌های رنگی و برخی شیشه‌ها کاربرد دارد.\nب) برخی فلزات مانند نقره، طلا و پلاتین به‌صورت رگه‌هایی لابه‌الی خاک در طبیعت یافت می‌شوند.\nپ) نخستین عنصری که لایه سوم اتم آن از الکترون پر می‌شود، واکنش‌پذیری کمتری نسبت به دومین عنصری که لایه سوم آن از الکترون پر می‌شود، دارد.\nت) عنصرهای جدول دوره‌ای را می‌توان بر اساس بنیادی‌ترین ویژگی آن‌ها، یعنی عدد اتمی (Z) در سه دسته شامل فلز، نافلز و شبه‌فلز جای داد.",
      options: ["۲", "۱", "۴", "۳"],
      correctIndex: 0,
      answer: "۲ مورد درست است (ب و پ)."
    },
    {
      id: 5,
      text: "پاسخ دو سوال 'الف' و 'ب' در کدام گزینه به درستی آمده است؟\nالف) درصورتی که در پالایش طلا به کمک گیاهان در هر هکتار بتوان ۲۰ تن گیاه برداشت کرد و بیشترین مقدار فلز طلا در یک کیلوگرم از گیاه ۱/۰ گرم باشد در هر هکتار چند کیلوگرم طلا از زمین بیرون کشیده می‌شود؟\nب) درصد کدام فلز در گیاهانی که آن را جذب می‌کنند کمتر از درصد آن فلز در سنگ معدن است؟",
      options: ["Ni, ۲", "Zn, ۲", "Ni, ۱", "Zn, ۱"],
      correctIndex: 0,
      answer: "گزینه ۱ درست است. ۲ کیلوگرم طلا و فلز نیکل (Ni)."
    },
    {
      id: 6,
      text: "چند مورد از عنصرهای پیشنهادی برای تکمیل جملۀ زیر مناسب است؟\n'عنصرهایی همانند ...... به شکل آزاد در طبیعت یافت نمی‌شوند.'\n- هیدروژن\n- گوگرد\n- پلاتین\n- نیتروژن\n- سدیم\n- کلر\n- مس\n- کربن",
      options: ["۳", "۲", "۵", "۴"],
      correctIndex: 2,
      answer: "۵ مورد مناسب است (هیدروژن، نیتروژن، سدیم، کلر و کربن)."
    },
    {
      id: 7,
      text: "در مورد فلز طلا (Au) چند مورد از عبارت‌های زیر صحیح است؟\n- در میان فلزها، تنها طلا به شکل کلوخه‌ها یا رگه‌های زرد لایه‌ای خاک یافت می‌شود.\n- در طبیعت به شکل فلزی و عنصری خود نیز یافت می‌شود.\n- چند گرم از آن را با چکش‌کاری می‌توان به صفحه‌ای با مساحت چند متر مربع تبدیل کرد.\n- رسانایی الکتریکی بالای آن در شرایط دمایی گوناگون حفظ نمی‌شود.",
      options: ["۱", "۲", "۳", "۴"],
      correctIndex: 2,
      answer: "۳ مورد درست است (مورد اول، دوم و سوم)."
    },
    {
      id: 8,
      text: "کدام‌یک از عبارت‌های زیر درست هستند؟\nالف) اکسیژن برخلاف نیتروژن به شکل آزاد در طبیعت یافت می‌شود.\nب) تنها فلزی که به شکل کلوخه لایه‌ای خاک یافت می‌شود، طلا است.\nپ) اغلب عنصرها مانند پلاتین تنها به شکل ترکیب در طبیعت یافت می‌شوند.\nت) آهن فلزی است که در سطح جهان بیشترین مصرف سالانه را در بین صنایع گوناگون دارد.",
      options: ["الف - پ", "ب - ت", "پ - ت", "الف - ت"],
      correctIndex: 1,
      answer: "عبارت‌های ب و ت درست هستند."
    },
    {
      id: 9,
      text: "کدام گزینه نادرست است؟",
      options: [
        "استفاده از گیاهان برای استخراج فلزات نیکل و روی مقرون به صرفه نیست.",
        "از براده‌های آهن حاصل از واکنش ترمیت برای جوش دادن خطوط راه آهن استفاده می‌کنند.",
        "واکنش‌پذیری فلز آلومینیم بیشتر از آهن است.",
        "از آهن (III) اکسید به‌عنوان رنگ قرمز در نقاشی استفاده می‌شود."
      ],
      correctIndex: 0,
      answer: "گزینه ۱ نادرست است. استفاده از گیاهان برای استخراج فلزات نیکل و روی مقرون به صرفه نیست."
    },
    {
      id: 10,
      text: "همۀ مطالب زیر نادرست‌اند، به‌جز:",
      options: [
        "در استخراج فلز تنها درصد کمی از سنگ معدن به فلز تبدیل می‌شود.",
        "آهنگ مصرف و استخراج فلز با آهنگ برگشت فلز به طبیعت به شکل سنگ معدن یکسان است.",
        "بازیافت فلزها و ازجمله فلز آهن ردپای کربن دی اکسید را افزایش می دهد.",
        "غلظت بیشتر گونه‌های فلزی موجود در زمین نسبت به ذخایر اقیانوسی، بهره‌برداری از این منابع را نوید می‌دهد."
      ],
      correctIndex: 0,
      answer: "گزینه ۱ درست است. در استخراج فلز تنها درصد کمی از سنگ معدن به فلز تبدیل می‌شود."
    }
  ];

  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: number}>({});
  const [showAnswers, setShowAnswers] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [isScoreCalculated, setIsScoreCalculated] = useState(false);
  const [timeLeft, setTimeLeft] = useState(90 * 60);
  const [isTimeUp, setIsTimeUp] = useState(false);

  const calculateScore = useCallback(() => {
    if (isCalculatedRef.current) return;
    isCalculatedRef.current = true;
    let correctCount = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) correctCount++;
    });
    setScore((correctCount / questions.length) * 100);
    setIsScoreCalculated(true);
  }, [selectedAnswers, questions]);

  const handleOptionClick = (questionId: number, optionIndex: number) => {
    if (isTimeUp || isScoreCalculated) return;
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
    if (isScoreCalculated) {
      setIsScoreCalculated(false);
      setScore(null);
      isCalculatedRef.current = false;
    }
  };

  useEffect(() => {
    if (isTimeUp || isScoreCalculated) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsTimeUp(true);
          isTimeUpRef.current = true;
          if (timerRef.current) clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isTimeUp, isScoreCalculated]);

  useEffect(() => {
    if (isTimeUp && !isScoreCalculated && !isTimeUpRef.current) {
      isTimeUpRef.current = true;
      setTimeout(() => calculateScore(), 300);
    }
  }, [isTimeUp, isScoreCalculated, calculateScore]);

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
    <div style={{ fontFamily: 'Tahoma, Arial, sans-serif', width: '100vw', minHeight: '100vh', padding: '15px 10px', backgroundColor: '#f8f9fa', direction: 'rtl', textAlign: 'right', boxSizing: 'border-box', overflowX: 'hidden' }}>
      <div style={{ backgroundColor: '#E65100', color: 'white', padding: '20px', borderRadius: '8px', marginBottom: '30px', textAlign: 'center', position: 'relative' }}>
        <button onClick={() => router.push('/exam/yazdahom/tajrobi/ghalamchi/first-half/shimi-2-tajrobi')} style={{ position: 'absolute', left: '20px', top: '20px', padding: '8px 16px', backgroundColor: 'rgba(255,255,255,0.2)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' }}>← بازگشت</button>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '28px' }}>🧪 آزمون ۱ - عناصر به چه شکلی در طبیعت یافت می‌شوند؟</h1>
            <p style={{ marginTop: '10px', fontSize: '16px', opacity: 0.9 }}>{questions.length} سوال - پاسخ داده شده: {answeredCount}/{questions.length}</p>
          </div>
          <div style={{ backgroundColor: isTimeUp ? '#dc3545' : 'rgba(255,255,255,0.15)', padding: '10px 25px', borderRadius: '50px', fontSize: '24px', fontWeight: 'bold', fontFamily: 'monospace', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>⏱️</span><span>{isTimeUp ? '⏰ تمام شد!' : formatTime(timeLeft)}</span>
          </div>
        </div>
      </div>

      <div style={{ width: '100%' }}>
        {questions.map((q, index) => (
          <div key={q.id} style={{ marginBottom: '25px', backgroundColor: '#ffffff', padding: '20px 25px', borderRadius: '8px', border: '1px solid #e9ecef', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: '17px', lineHeight: '1.9', marginBottom: '20px', fontWeight: '500', display: 'flex', alignItems: 'flex-start', whiteSpace: 'pre-wrap' }}>
              <span style={{ display: 'inline-block', backgroundColor: '#E65100', color: 'white', width: '30px', height: '30px', textAlign: 'center', lineHeight: '30px', borderRadius: '50%', fontSize: '14px', marginLeft: '15px', flexShrink: 0, marginTop: '2px' }}>{index + 1}</span>
              <span>{q.text}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 30px', marginRight: '20px' }}>
              {q.options.map((opt, idx) => {
                const isSelected = selectedAnswers[q.id] === idx;
                const isDisabled = isTimeUp || isScoreCalculated;
                return (
                  <button key={idx} onClick={() => handleOptionClick(q.id, idx)} disabled={isDisabled} style={{ display: 'flex', alignItems: 'center', padding: '12px 18px', border: isSelected ? '3px solid #E65100' : '1px solid #dee2e6', borderRadius: '10px', backgroundColor: isSelected ? '#fff3e0' : '#fff', cursor: isDisabled ? 'not-allowed' : 'pointer', fontSize: '15px', textAlign: 'right', transition: 'all 0.2s', width: '100%', opacity: isDisabled && !isSelected ? 0.6 : 1 }}>
                    <span style={{ display: 'inline-block', width: '28px', height: '28px', border: '1px solid #000', borderRadius: '50%', textAlign: 'center', lineHeight: '28px', fontSize: '14px', marginLeft: '15px', backgroundColor: isSelected ? '#E65100' : '#fff', color: isSelected ? '#fff' : '#000' }}>{String.fromCharCode(65 + idx)}</span>
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        <div style={{ marginTop: '30px', marginBottom: '30px', padding: '20px', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #dee2e6', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', textAlign: 'center' }}>
          {!isScoreCalculated ? (
            <div>
              <button onClick={() => { if (canCalculate) calculateScore(); }} disabled={!canCalculate} style={{ padding: '15px 40px', fontSize: '18px', backgroundColor: canCalculate ? '#E65100' : '#6c757d', color: '#fff', border: 'none', borderRadius: '50px', cursor: canCalculate ? 'pointer' : 'not-allowed', fontWeight: 'bold', opacity: canCalculate ? 1 : 0.6 }}>
                {!isAllAnswered && !isTimeUp ? `✅ ${answeredCount}/${questions.length} پاسخ داده شده - ادامه دهید` : '📊 محاسبه درصد'}
              </button>
            </div>
          ) : (
            <div>
              <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#E65100' }}>✅ درصد شما: <span style={{ color: getScoreColor(score!), fontSize: '28px' }}>{Math.round(score!)}%</span></div>
              <div style={{ width: '80%', maxWidth: '400px', height: '20px', backgroundColor: '#e9ecef', borderRadius: '10px', overflow: 'hidden', margin: '15px auto' }}>
                <div style={{ width: `${score}%`, height: '100%', backgroundColor: getScoreColor(score!), transition: 'width 0.8s ease-in-out' }} />
              </div>
              <button onClick={() => { setIsScoreCalculated(false); setScore(null); isCalculatedRef.current = false; isTimeUpRef.current = false; }} style={{ padding: '10px 25px', fontSize: '14px', backgroundColor: '#ff9800', color: '#fff', border: 'none', borderRadius: '50px', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px' }}>🔄 تغییر پاسخ‌ها</button>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '60px' }}>
          <button onClick={() => setShowAnswers(!showAnswers)} style={{ padding: '15px 40px', fontSize: '18px', backgroundColor: showAnswers ? '#dc3545' : '#28a745', color: '#fff', border: 'none', borderRadius: '50px', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 4px 10px rgba(0,0,0,0.15)' }}>
            {showAnswers ? "❌ بستن پاسخنامه" : "📄 مشاهده پاسخنامه تشریحی"}
          </button>
        </div>

        {showAnswers && isScoreCalculated && (
          <div style={{ marginTop: '30px', borderTop: '4px solid #E65100', paddingTop: '40px', backgroundColor: '#ffffff', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)', width: '100%' }}>
            <h2 style={{ textAlign: 'center', borderBottom: '3px solid #E65100', paddingBottom: '20px', marginBottom: '40px', fontSize: '26px', color: '#E65100' }}>📝 پاسخنامه تشریحی آزمون ۱</h2>
            {questions.map((q, index) => {
              const userAnswer = selectedAnswers[q.id];
              const isCorrect = userAnswer === q.correctIndex;
              return (
                <div key={q.id} style={{ marginBottom: '35px', borderBottom: '1px dashed #ced4da', paddingBottom: '25px' }}>
                  <div style={{ fontSize: '16px', lineHeight: '2' }}>
                    <span style={{ fontWeight: 'bold', color: '#E65100', backgroundColor: '#fff3e0', padding: '5px 15px', borderRadius: '20px', display: 'inline-block', marginBottom: '10px' }}>سوال {index + 1}</span>
                    <br />
                    <span style={{ fontWeight: 'bold', color: '#28a745' }}>✅ پاسخ صحیح:</span> <span style={{ fontSize: '15px' }}>{q.options[q.correctIndex]}</span>
                    <br />
                    {userAnswer !== undefined && (
                      <span>
                        <span style={{ fontWeight: 'bold', color: isCorrect ? '#28a745' : '#dc3545' }}>{isCorrect ? '✔️ صحیح' : '❌ نادرست'}</span>
                        <span style={{ fontSize: '14px', color: '#666', marginRight: '10px' }}>(انتخاب شما: {String.fromCharCode(65 + userAnswer)})</span>
                        <br />
                      </span>
                    )}
                    <span style={{ fontWeight: 'bold', color: '#E65100' }}>📖 توضیح:</span> <br />
                    <span style={{ fontSize: '15px', lineHeight: '1.8', color: '#333' }}>{q.answer}</span>
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

export default Shimi2Lesson5Exam1;