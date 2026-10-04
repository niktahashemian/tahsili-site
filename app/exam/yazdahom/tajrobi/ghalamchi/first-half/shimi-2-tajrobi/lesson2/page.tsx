"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const Shimi2Lesson3Exam1 = () => {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  const questions = [
    {
      id: 1,
      text: "باتوجه به جدول زیر، (بخشی از جدول تناوبی) کدام مطلب نادرست است؟\n(گروه‌های ۱۳، ۱۴، ۱۵، ۱۶، ۱۷ و دوره‌های ۲، ۳، ۴)",
      options: [
        "خصلت فلزی عنصر C از A بیشتر است.",
        "تفاوت شمار پروتون‌های I و E برابر ۱۹ و تفاوت شمار الکترون‌های اتم F و H برابر ۱۷ است.",
        "دو عنصر B و H هر دو در برابر ضربه خرد می‌شوند.",
        "مقایسهٔ شعاع اتمی عناصر G و C، I به صورت G < I < C است."
      ],
      correctIndex: 0,
      answer: "گزینه ۱ نادرست است. عنصر C در گروه ۱۵ و عنصر A در گروه ۱۳ است. در یک دوره از چپ به راست خصلت فلزی کاهش می‌یابد، پس خصلت فلزی C از A کمتر است."
    },
    {
      id: 2,
      text: "مقایسهٔ شعاع اتمی عناصر زیر باتوجه به آرایش الکترونی لایهٔ ظرفیت آن‌ها به چه صورت است؟\n(الف) 2s2 2p2\n(ب) 2s1\n(پ) 3s2 3p4\n(ت) 3s2",
      options: [
        "ب < الف < ت < پ",
        "ت < پ < الف < ب",
        "ت < پ < ب < الف",
        "پ < ت < الف < ب"
      ],
      correctIndex: 0,
      answer: "گزینه ۱ درست است. ترتیب شعاع اتمی: ب (Li) < الف (C) < ت (Mg) < پ (S)."
    },
    {
      id: 3,
      text: "روند تغییر ............ عنصرهای 3Li، 11Na و 19K به صورت ............ است و در میان آن‌ها، ............ بیشترین ............ را دارا است.",
      options: [
        "شعاع اتمی - Li < Na < K - K - شعاع اتمی",
        "شدت نور آزادشده در واکنش با گاز کلر - Li < Na < K - K - شدت نور",
        "مجموع دو عدد کوانتومی اصلی و فرعی الکترون بیرونی‌ترین زیرلایه - Li < Na < K - K - مجموع اعداد کوانتومی",
        "خصلت فلزی - Li < Na < K - K - خصلت فلزی"
      ],
      correctIndex: 0,
      answer: "گزینه ۱ درست است. شعاع اتمی از بالا به پایین در گروه افزایش می‌یابد."
    },
    {
      id: 4,
      text: "کدام گزینه دربارهٔ عنصر X درست است؟\n(X عنصری است که شعاع اتمی آن از عنصر بعد از آن بیشتر است.)",
      options: [
        "شعاع اتمی آن از یون پایدارش بیشتر است.",
        "خصلت نافلزی آن از عنصر بعد از آن بیشتر است.",
        "عنصر اصلی سازندۀ سلول‌های خورشیدی است.",
        "مانند دیگر عنصر هم‌گروه خود، در واکنش با دیگر اتم‌ها، الکترون به اشتراک می‌گذارد."
      ],
      correctIndex: 0,
      answer: "گزینه ۱ درست است. عنصر X سدیم (Na) است که شعاع اتمی آن از یون Na+ بیشتر است."
    },
    {
      id: 5,
      text: "اگر شعاع اتمی نیتروژن ۶۵ pm و شعاع یونی Li+ ۷۶ pm باشد، شعاع کدام مورد می‌تواند درست باشد؟",
      options: [
        "O → ۶۰ pm",
        "Li → ۷۰ pm",
        "Ne → ۳۸ pm",
        "N3- → ۴۰ pm"
      ],
      correctIndex: 0,
      answer: "گزینه ۱ درست است. شعاع O از N کمتر است و ۶۰ pm می‌تواند درست باشد."
    },
    {
      id: 6,
      text: "عناصر هم‌دورهٔ A و B به ترتیب جزو عناصر قلیایی خاکی و قلیایی هستند. چه تعداد از ویژگی‌های زیر در عنصر A بیشتر یا بزرگ‌تر از عنصر B است؟\nالف) شعاع اتمی\nب) خصلت نافلزی\nپ) تمایل به از دست دادن الکترون\nت) آهنگ خروج گاز آزادشده به هنگام واکنش با HCl",
      options: ["۱", "۲", "۳", "۴"],
      correctIndex: 1,
      answer: "گزینه ۲ درست است. ۲ ویژگی (شعاع اتمی و تمایل به از دست دادن الکترون) در عنصر A بیشتر است."
    },
    {
      id: 7,
      text: "کدام گزینه نادرست است؟",
      options: [
        "تمامی عنصرهای گروه ۱۴ رسانایی الکتریکی دارند و سطح همه آن‌ها به‌جز یک مورد براق و صیقلی است.",
        "تفاوت شعاع اتمی عنصرهای شماره ۱۳ و ۱۴ جدول دوره‌ای کمتر از این تفاوت در عنصرهای شماره ۱۱ و ۱۲ است.",
        "هالوژنی که در دمای اتاق به آرامی با هیدروژن واکنش می‌دهد، مجموع n + l آخرین زیرلایه اتم آن برابر با ۴ است.",
        "شعاع اتمی منیزیم از سدیم و کلسیم کوچک‌تر و پتاسیم از همه بزرگ‌تر است."
      ],
      correctIndex: 0,
      answer: "گزینه ۱ نادرست است. کربن (گرافیت) رسانایی الکتریکی دارد اما سطح آن تیره است و براق نیست."
    },
    {
      id: 8,
      text: "کدام گزینه نادرست است؟",
      options: [
        "در بین نافلزهای دورهٔ دوم جدول دوره‌ای کمترین عدد اتمی مربوط به کربن است.",
        "گاز کلر همانند گوگرد زردرنگ است.",
        "شبه‌فلزها دارای خواص فیزیکی شبیه به فلزها هستند.",
        "عنصرهایی که در گروه ۱۴ جدول دوره‌ای دارای سطحی براق هستند با ضربه خرد نمی‌شوند."
      ],
      correctIndex: 3,
      answer: "گزینه ۴ نادرست است. سیلیسیم و ژرمانیم (شبه‌فلزهای گروه ۱۴) سطح براق دارند اما با ضربه خرد می‌شوند."
    },
    {
      id: 9,
      text: "الف) در بین فلزها، هرچه خاصیت فلزی بیشتر باشد، تمایل به از دست دادن الکترون بیشتر شده و فعالیت و واکنش‌پذیری افزایش می‌یابد.\nب) واکنش عنصری که ۵ الکترون با ویژگی ۱ = l دارد با اکسید دومین فلز قلیایی خاکی به‌طور خودبه‌خود انجام می‌شود.\nپ) هرچه شدت نور یا آهنگ خروج گاز آزادشده در یک واکنش بیشتر باشد، واکنش شیمیایی شدیدتر بوده و فرآورده‌ها فعالیت شیمیایی بیشتری دارند.\nت) هرچه شعاع اتمی یک فلز بزرگ‌تر باشد، آسان‌تر الکترون از دست می‌دهد.",
      options: ["۱", "۲", "۳", "۴"],
      correctIndex: 3,
      answer: "گزینه ۴ درست است. هر چهار عبارت درست هستند."
    },
    {
      id: 10,
      text: "باتوجه به واکنش زیر کدام نتیجه‌گیری در مورد هالوژن A نادرست است؟\nA2(?) + H2(g) → 2HA(g)",
      options: [
        "اگر A، فلوئور باشد می‌توان گفت که واکنش در هر دمایی به‌شدت انجام می‌شود.",
        "اگر T برابر با دمای اتاق باشد، آنگاه حالت فیزیکی A2 نمی‌تواند مایع یا جامد باشد.",
        "هالوژن جامد در هر حالت فیزیکی در دمای بالاتر از ۴۰۰ °C با گاز هیدروژن واکنش می‌دهد.",
        "اگر A هالوژنی از دورۀ سوم جدول تناوبی باشد، آنگاه نقطه جوش HA بالاتر از دمای اتاق است."
      ],
      correctIndex: 2,
      answer: "گزینه ۳ نادرست است. هالوژن جامد (ید) در دمای بالاتر از ۴۰۰ °C با هیدروژن واکنش می‌دهد، نه در هر حالت فیزیکی."
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
            <h1 style={{ margin: 0, fontSize: '28px' }}>🧪 آزمون ۱ - رفتار عناصرها و شعاع اتم</h1>
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

export default Shimi2Lesson3Exam1;