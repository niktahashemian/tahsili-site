'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';
import { Clock, ArrowLeft, RotateCcw, CheckCircle, XCircle } from 'lucide-react';

interface QuestionType {
  id: number;
  text: string;
  options: { A: string; B: string; C: string; D: string };
  correctAnswer: string;
  explanation: string;
}

const questionsData: QuestionType[] = [
  { id: 1, text: '\\text{مجموعه جواب نامعادله } (0.2)^x \\geq (0.7)^x \\text{ کدام است؟}', options: { A: '(-\\infty, 0)', B: '(-\\infty, 1)', C: '[0, +\\infty)', D: '[1, +\\infty)' }, correctAnswer: 'A', explanation: 'طبق پاسخنامه: گزینه 1 صحیح است.' },
  { id: 2, text: '\\text{اگر } \\log 3 = b \\text{ و } \\log 2 = a \\text{ باشد، حاصل } \\log 0.75 \\text{ کدام است؟}', options: { A: 'b - 2a', B: 'a - 2b', C: 'b - a', D: 'b - a - 2' }, correctAnswer: 'A', explanation: 'طبق پاسخنامه: گزینه 1 صحیح است.' },
  { id: 3, text: '\\text{اگر وارون تابع } f(x) = 5^{x-1} + a \\text{ برابر } g(x) = b + \\log_c(x-2) \\text{ باشد، حاصل } a+b+c \\text{ کدام است؟}', options: { A: '0.2', B: '0.3', C: '0.6', D: '0.4' }, correctAnswer: 'D', explanation: 'طبق پاسخنامه: گزینه 4 (0.4) صحیح است.' },
  { id: 4, text: '\\text{اگر } \\log_4 A = \\log_6 B = \\log_4(A+B) \\text{ باشد، حاصل } \\log_4(\\frac{B}{A}) + \\log_6(A+B) \\text{ کدام است؟}', options: { A: '\\sqrt{5} - 1', B: '\\sqrt{5} + 1', C: '\\sqrt{5} - 1', D: '\\sqrt{5} + 1' }, correctAnswer: 'B', explanation: 'طبق پاسخنامه: گزینه 2 (√5+1) صحیح است.' },
  { id: 5, text: '\\text{حاصل } \\sin 210^\\circ + \\tan(-\\frac{\\pi}{4}) - \\sqrt{2} \\sin \\frac{3\\pi}{4} \\text{ کدام است؟}', options: { A: '\\frac{1}{2}', B: '\\frac{3}{2}', C: '-\\frac{3}{2}', D: '-\\frac{1}{2}' }, correctAnswer: 'C', explanation: 'طبق پاسخنامه: گزینه 3 (-3/2) صحیح است.' },
  { id: 6, text: '\\text{تابع } f(x) = \\cos x \\text{ در بازه } [-2\\pi, 4\\pi] \\text{ مفروض است. اگر } m \\text{ تعداد نقاطی باشد که } f(x) = \\frac{1}{2} \\text{ و } n \\text{ تعداد نقاطی باشد که } f(x) = 2 \\text{، آنگاه } m+n \\text{ کدام است؟}', options: { A: '12', B: '6', C: '4', D: '8' }, correctAnswer: 'A', explanation: 'طبق پاسخنامه: گزینه 1 (12) صحیح است.' },
  { id: 7, text: 'x = \\pi \\text{ صفر کدام یک از توابع زیر است؟}', options: { A: '\\cot x', B: '\\frac{1}{\\cos x}', C: '\\sin x', D: '\\cos x' }, correctAnswer: 'C', explanation: 'طبق پاسخنامه: گزینه 3 (sin x) صحیح است.' },
  { id: 8, text: '\\text{کدام یک از گزینه‌های زیر نادرست است؟}', options: { A: '\\sin(\\alpha+\\beta)+\\sin(\\alpha-\\beta)=2\\sin\\alpha\\cos\\beta', B: '\\sin(\\alpha+\\beta)-\\sin(\\alpha-\\beta)=2\\sin\\beta\\cos\\alpha', C: '\\cos(\\alpha+\\beta)+\\cos(\\alpha-\\beta)=2\\cos\\alpha\\cos\\beta', D: '\\cos(\\alpha+\\beta)-\\cos(\\alpha-\\beta)=2\\sin\\alpha\\sin\\beta' }, correctAnswer: 'D', explanation: 'طبق پاسخنامه: گزینه 4 نادرست است.' },
  { id: 17, text: '\\text{حاصل } \\lim_{x \\to 3} \\frac{x^2-9}{\\sqrt{3x-5}-2} \\text{ کدام است؟}', options: { A: '4', B: '8', C: '6', D: '10' }, correctAnswer: 'D', explanation: 'طبق پاسخنامه: گزینه 4 (10) صحیح است.' },
  { id: 18, text: '\\text{حاصل } \\lim_{x \\to 0} \\frac{\\tan 3x - \\sin 3x}{x^3} \\text{ کدام است؟}', options: { A: '\\text{صفر}', B: '1', C: '9', D: '27' }, correctAnswer: 'D', explanation: 'طبق پاسخنامه: گزینه 4 (27) صحیح است.' },
  { id: 19, text: '\\text{اگر } \\lim_{x \\to 1} f(x) = a \\text{ و } g(x) = 2-\\sqrt{x} \\text{ و } f(x) = x^2|x|-a \\text{ و } \\lim_{x \\to 1} g(x) \\text{ کدام است؟}', options: { A: '-1', B: '3', C: '-3', D: '4' }, correctAnswer: 'B', explanation: 'طبق پاسخنامه: گزینه 2 (3) صحیح است.' },
  { id: 20, text: '\\text{اگر } \\lim_{x \\to \\pi} \\frac{\\sin 2x - a}{(4x-\\pi)^2} = b \\text{ باشد، مقدار } a \\text{ کدام است؟}', options: { A: '16', B: '-1', C: '1', D: '\\text{صفر}' }, correctAnswer: 'A', explanation: 'طبق پاسخنامه: گزینه 1 (16) صحیح است.' },
];

export default function Hesaban1Exam() {
  const router = useRouter();
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const suggestedTime = Math.floor(questionsData.length * 2 * 60);
  const [timeLeft, setTimeLeft] = useState(suggestedTime);

  useEffect(() => {
    if (submitted || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => { if (prev <= 1) { setSubmitted(true); return 0; } return prev - 1; });
    }, 1000);
    return () => clearInterval(timer);
  }, [submitted, timeLeft]);

  const formatTime = (sec: number) => `${Math.floor(sec / 60).toString().padStart(2, '0')}:${(sec % 60).toString().padStart(2, '0')}`;
  const answeredCount = Object.keys(userAnswers).length;
  const progress = (answeredCount / questionsData.length) * 100;

  const handleOptionSelect = (qId: number, val: string) => setUserAnswers(prev => ({ ...prev, [qId]: val }));
  const handleSubmit = () => setSubmitted(true);
  const handleReset = () => { setUserAnswers({}); setSubmitted(false); setTimeLeft(suggestedTime); };
  
  const correctCount = questionsData.filter(q => userAnswers[q.id] === q.correctAnswer).length;
  const wrongCount = answeredCount - correctCount;
  const score = { correct: correctCount, wrong: wrongCount, unanswered: questionsData.length - answeredCount, total: questionsData.length };
  const percentage = (correctCount / questionsData.length) * 100;

  if (!submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-100 py-8 px-4">
        <div className="max-w-5xl mx-auto">
          {/* نوار بالایی */}
          <div className="sticky top-4 z-20 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-4 mb-8 flex flex-wrap justify-between items-center gap-3">
            <div className="flex items-center gap-4">
              <div className="bg-indigo-100 rounded-full px-4 py-2 font-mono text-2xl font-bold text-indigo-700 flex items-center gap-2">
                <Clock className="w-5 h-5" /> {formatTime(timeLeft)}
              </div>
              <div>
                <p className="text-sm text-gray-500">پاسخ ثبت شده</p>
                <p className="font-bold">{answeredCount} از {questionsData.length}</p>
              </div>
            </div>
            <div className="flex-1 h-2 bg-gray-200 rounded-full max-w-md">
              <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
            <button onClick={() => router.back()} className="text-gray-500 hover:text-gray-700">
              <ArrowLeft className="w-5 h-5" />
            </button>
          </div>

          {/* لیست سوالات */}
          <div className="space-y-8">
            {questionsData.map((q, idx) => (
              <div key={q.id} className="bg-white rounded-2xl shadow-md overflow-hidden">
                
                {/* ========== بخش سوال (رنگ قرمز) ========== */}
                <div className="bg-gradient-to-r from-red-50 to-red-100 p-6 border-b-2 border-red-200">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-3">
                      <span className="bg-red-600 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center text-base shadow-md">
                        {idx + 1}
                      </span>
                      <span className="font-bold text-red-700 text-lg">سوال {q.id}</span>
                      {userAnswers[q.id] && (
                        <span className="flex items-center gap-1 bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full">
                          <CheckCircle className="w-4 h-4" /> پاسخ داده شده
                        </span>
                      )}
                    </div>
                  </div>
                  {/* متن سوال با رنگ قرمز */}
                  <div className="text-red-800 text-xl md:text-2xl leading-relaxed font-bold">
                    <InlineMath math={q.text} />
                  </div>
                </div>

                {/* ========== بخش جواب (بدون بردر) ========== */}
                <div className="p-6 bg-white">
                  <div className="text-gray-500 text-sm mb-3 font-semibold">📌 گزینه‌های پاسخ:</div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(q.options).map(([key, value]) => (
                      <label
                        key={key}
                        className={`flex items-center justify-center gap-2 p-3 rounded-xl cursor-pointer transition-all text-center ${
                          userAnswers[q.id] === key
                            ? 'bg-green-100 ring-2 ring-green-300'
                            : 'bg-gray-50 hover:bg-gray-100'
                        }`}
                      >
                        <input
                          type="radio"
                          name={`q${q.id}`}
                          value={key}
                          checked={userAnswers[q.id] === key}
                          onChange={() => handleOptionSelect(q.id, key)}
                          className="w-4 h-4 text-green-600"
                        />
                        <div className="text-gray-700 text-base md:text-lg">
                          <span className={`font-bold ml-2 ${userAnswers[q.id] === key ? 'text-green-700' : 'text-indigo-600'}`}>
                            {key}.
                          </span>
                          <InlineMath math={value} />
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-12 pb-10">
            <button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              <CheckCircle className="w-5 h-5" /> ثبت پاسخ‌ها و مشاهده نتیجه
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ========== صفحه نتیجه با نمایش تعداد پاسخ‌های مثبت، منفی و درصد ==========
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">🎉 نتیجه آزمون</h2>
          
          {/* دایره درصد */}
          <div className="inline-flex flex-col items-center justify-center w-40 h-40 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 my-6">
            <span className="text-5xl font-bold text-indigo-700">{percentage.toFixed(1)}</span>
            <span className="text-gray-500">درصد</span>
          </div>

          {/* آمار پاسخ‌ها */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-md mx-auto my-6">
            <div className="bg-green-50 rounded-xl p-4 text-center border border-green-200">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-700">{score.correct}</div>
              <div className="text-sm text-green-600">پاسخ صحیح</div>
            </div>
            <div className="bg-red-50 rounded-xl p-4 text-center border border-red-200">
              <XCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-red-700">{score.wrong}</div>
              <div className="text-sm text-red-600">پاسخ غلط</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
              <div className="w-8 h-8 mx-auto mb-2 text-2xl">❓</div>
              <div className="text-2xl font-bold text-gray-700">{score.unanswered}</div>
              <div className="text-sm text-gray-600">پاسخ نداده</div>
            </div>
          </div>

          {/* نوار پیشرفت کلی */}
          <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
            <div className="bg-green-500 h-4 rounded-full transition-all duration-500" style={{ width: `${percentage}%` }} />
          </div>

          <div className="flex justify-center gap-4 mt-6">
            <button onClick={handleReset} className="flex items-center gap-2 bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition">
              <RotateCcw className="w-4 h-4" /> آزمون مجدد
            </button>
            <button onClick={() => router.back()} className="flex items-center gap-2 bg-indigo-500 text-white px-6 py-2 rounded-full hover:bg-indigo-600 transition">
              <ArrowLeft className="w-4 h-4" /> بازگشت
            </button>
          </div>
        </div>

        {/* پاسخنامه تشریحی */}
        <div className="mt-10 bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold border-r-4 border-indigo-500 pr-3 mb-6">📖 پاسخنامه تشریحی</h3>
          {questionsData.map((q, idx) => (
            <div key={q.id} className="border-b pb-5 mb-5 last:border-0">
              <div className="flex items-start gap-2">
                <span className="bg-gray-100 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">{idx + 1}</span>
                <div className="font-medium text-gray-800"><InlineMath math={q.text} /></div>
                {userAnswers[q.id] === q.correctAnswer ? (
                  <span className="text-green-600 text-sm flex items-center gap-1">✓ صحیح</span>
                ) : (
                  <span className="text-red-600 text-sm flex items-center gap-1">✗ غلط</span>
                )}
              </div>
              <div className="mr-8 mt-2 space-y-1 text-sm">
                <p><span className="font-semibold text-green-700">✓ پاسخ صحیح:</span> گزینه {q.correctAnswer} – <InlineMath math={q.options[q.correctAnswer as keyof typeof q.options]} /></p>
                <p><span className="font-semibold text-blue-700">ℹ️ توضیح:</span> {q.explanation}</p>
                <p className={userAnswers[q.id] === q.correctAnswer ? 'text-green-600' : 'text-red-500'}>
                  📌 پاسخ شما: {userAnswers[q.id] ? `گزینه ${userAnswers[q.id]}` : 'پاسخ نداده‌اید'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}