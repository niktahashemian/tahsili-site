
// 'use client';

// import { useParams } from 'next/navigation';
// import Link from 'next/link';
// import { useState } from 'react';

// // تعریف تایپ‌ها
// interface Question {
//   id: number;
//   text: string;
//   options: string[];
//   correct: number;
// }

// interface Lesson {
//   id: number;
//   name: string;
//   icon: string;
//   color: string;
//   description: string;
// }

// interface QuestionsDatabase {
//   [key: string]: Question[];
// }

// export default function ExamLessonsPage() {
//   const params = useParams();
//   const grade = params.grade as string;
//   const field = params.field as string;
//   // const exam = params.exam as string; // حذف شد چون استفاده نمی‌شه

//   const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
//   const [userAnswers, setUserAnswers] = useState<number[]>([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [showResult, setShowResult] = useState(false);

//   // دریافت نام فارسی پایه
//   const getGradeName = (gradePath: string): string => {
//     const gradeMap: { [key: string]: string } = {
//       'dahom': 'دهم',
//       'yazdahom': 'یازدهم',
//       'davazdahom': 'دوازدهم'
//     };
//     return gradeMap[gradePath] || gradePath;
//   };

//   // دریافت نام فارسی رشته
//   const getFieldName = (fieldPath: string): string => {
//     const fieldMap: { [key: string]: string } = {
//       'ensani': 'انسانی',
//       'riyazi': 'ریاضی',
//       'tajrobi': 'تجربی'
//     };
//     return fieldMap[fieldPath] || fieldPath;
//   };

//   // لیست دروس دهم انسانی برای آزمون قلمچی
//   const lessons: Lesson[] = [
//     { id: 1, name: 'علوم و فنون ادبی', icon: '📖', color: '#4CAF50', description: 'سوالات تخصصی علوم و فنون ادبی' },
//     { id: 2, name: 'عربی', icon: '🕌', color: '#2196F3', description: 'سوالات عربی پایه دهم' },
//     { id: 3, name: 'فارسی', icon: '✍️', color: '#9C27B0', description: 'سوالات فارسی پایه دهم' },
//     { id: 4, name: 'دینی', icon: '🕌', color: '#FF9800', description: 'سوالات دینی پایه دهم' },
//     { id: 5, name: 'زبان انگلیسی', icon: '🇬🇧', color: '#F44336', description: 'سوالات زبان انگلیسی پایه دهم' },
//     { id: 6, name: 'تاریخ', icon: '📜', color: '#795548', description: 'سوالات تاریخ پایه دهم' },
//     { id: 7, name: 'جغرافیا', icon: '🌍', color: '#00BCD4', description: 'سوالات جغرافیا پایه دهم' },
//     { id: 8, name: 'جامعه‌شناسی', icon: '👥', color: '#E91E63', description: 'سوالات جامعه‌شناسی پایه دهم' },
//     { id: 9, name: 'منطق', icon: '🧠', color: '#3F51B5', description: 'سوالات منطق پایه دهم' },
//     { id: 10, name: 'روانشناسی', icon: '🧘', color: '#009688', description: 'سوالات روانشناسی پایه دهم' },
//     { id: 11, name: 'ریاضی', icon: '🔢', color: '#607D8B', description: 'سوالات ریاضی پایه دهم' },
//     { id: 12, name: 'اقتصاد', icon: '💰', color: '#8BC34A', description: 'سوالات اقتصاد پایه دهم' }
//   ];

//   // دیتابیس سوالات برای هر درس
//   const questionsDatabase: QuestionsDatabase = {
//     'علوم و فنون ادبی': [
//       { id: 1, text: 'کدام گزینه از نظر آرایه‌های ادبی صحیح است؟', options: ['تشبیه', 'استعاره', 'کنایه', 'مجاز'], correct: 0 },
//       { id: 2, text: 'معنی کلمه "بسمل" چیست؟', options: ['کشته شده', 'بیمار', 'خسته', 'غمگین'], correct: 0 },
//       { id: 3, text: 'کدام بیت دارای آرایه "تضاد" است؟', options: ['گزینه اول', 'گزینه دوم', 'گزینه سوم', 'گزینه چهارم'], correct: 2 }
//     ],
//     'عربی': [
//       { id: 1, text: 'ترجمه صحیح "ذهب الولد إلی المدرسة" کدام است؟', options: ['پسر به مدرسه رفت', 'پدر به مدرسه رفت', 'معلم به مدرسه رفت', 'دانش‌آموز به مدرسه رفت'], correct: 0 },
//       { id: 2, text: 'کلمه "کتاب" چه نوع اسمی است؟', options: ['جامد', 'مشتق', 'مصدر', 'اسم فاعل'], correct: 0 },
//       { id: 3, text: 'جمع مکسر "قلم" چیست؟', options: ['أقلام', 'قلام', 'قلمون', 'قلامة'], correct: 0 }
//     ],
//     'فارسی': [
//       { id: 1, text: 'کدام گزینه صحیح است؟', options: ['گزینه اول', 'گزینه دوم', 'گزینه سوم', 'گزینه چهارم'], correct: 1 },
//       { id: 2, text: 'معنی کلمه "ستاره" چیست؟', options: ['سنگ', 'اختر', 'گل', 'شمع'], correct: 1 },
//       { id: 3, text: 'کدام آرایه در بیت "چو گفتم غم دارم بگفتا غم مخور" وجود دارد؟', options: ['جناس', 'تکرار', 'واج‌آرایی', 'مراعات نظیر'], correct: 1 }
//     ],
//     'ریاضی': [
//       { id: 1, text: 'حاصل عبارت 5 + 3 × 2 برابر است با:', options: ['16', '11', '13', '10'], correct: 1 },
//       { id: 2, text: 'مساحت مربعی به ضلع 5 سانتی‌متر چقدر است؟', options: ['10', '15', '20', '25'], correct: 3 },
//       { id: 3, text: 'کدام عدد اول است؟', options: ['21', '23', '25', '27'], correct: 1 }
//     ],
//     'منطق': [
//       { id: 1, text: 'تعریف منطق چیست؟', options: ['علم قوانین تفکر صحیح', 'علم ریاضیات', 'علم فیزیک', 'علم شیمی'], correct: 0 },
//       { id: 2, text: 'کدام گزینه یک قضیه حملی است؟', options: ['انسان موجودی متفکر است', 'امروز بارانی است یا نیست', 'اگر باران ببارد زمین خیس می‌شود', 'انسان یا متفکر است یا نیست'], correct: 0 },
//       { id: 3, text: 'کدام گزینه از اقسام قضیه شرطی است؟', options: ['متصل', 'منفصل', 'حقیقی', 'اتفاقی'], correct: 0 }
//     ],
//     'اقتصاد': [
//       { id: 1, text: 'عرضه چیست؟', options: ['مقدار کالایی که تولیدکنندگان آماده فروش هستند', 'مقدار کالایی که مصرف‌کنندگان می‌خواهند', 'مقدار کالای موجود در بازار', 'قیمت کالا'], correct: 0 },
//       { id: 2, text: 'تقاضا چیست؟', options: ['مقدار کالایی که مصرف‌کنندگان می‌خواهند بخرند', 'قیمت کالا', 'هزینه تولید', 'سود تولیدکننده'], correct: 0 },
//       { id: 3, text: 'قانون عرضه و تقاضا بیانگر چیست؟', options: ['رابطه قیمت و مقدار', 'رابطه تولید و مصرف', 'رابطه خرید و فروش', 'رابطه سود و زیان'], correct: 0 }
//     ]
//   };

//   // سوالات پیش‌فرض برای دروسی که سوالات خاص ندارن
//   const getDefaultQuestions = (lessonName: string): Question[] => {
//     return [
//       { id: 1, text: `سوال اول درس ${lessonName}`, options: ['گزینه اول', 'گزینه دوم', 'گزینه سوم', 'گزینه چهارم'], correct: 0 },
//       { id: 2, text: `سوال دوم درس ${lessonName}`, options: ['گزینه اول', 'گزینه دوم', 'گزینه سوم', 'گزینه چهارم'], correct: 1 },
//       { id: 3, text: `سوال سوم درس ${lessonName}`, options: ['گزینه اول', 'گزینه دوم', 'گزینه سوم', 'گزینه چهارم'], correct: 2 }
//     ];
//   };

//   const getQuestionsForLesson = (lessonName: string): Question[] => {
//     return questionsDatabase[lessonName] || getDefaultQuestions(lessonName);
//   };

//   const handleLessonClick = (lessonName: string): void => {
//     setSelectedLesson(lessonName);
//     setUserAnswers([]);
//     setCurrentQuestionIndex(0);
//     setShowResult(false);
//   };

//   const handleAnswer = (selectedIndex: number): void => {
//     const questions = getQuestionsForLesson(selectedLesson!);
//     const newAnswers = [...userAnswers];
//     newAnswers[currentQuestionIndex] = selectedIndex;
//     setUserAnswers(newAnswers);

//     if (currentQuestionIndex < questions.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     } else {
//       setShowResult(true);
//     }
//   };

//   const calculateScore = (): { correct: number; total: number; percentage: number } => {
//     const questions = getQuestionsForLesson(selectedLesson!);
//     let correct = 0;
//     userAnswers.forEach((answer, index) => {
//       if (answer === questions[index].correct) {
//         correct++;
//       }
//     });
//     return { correct, total: questions.length, percentage: (correct / questions.length) * 100 };
//   };

//   const restartLesson = (): void => {
//     setUserAnswers([]);
//     setCurrentQuestionIndex(0);
//     setShowResult(false);
//   };

//   const backToLessons = (): void => {
//     setSelectedLesson(null);
//     setUserAnswers([]);
//     setCurrentQuestionIndex(0);
//     setShowResult(false);
//   };

//   // صفحه اصلی لیست دروس
//   if (!selectedLesson) {
//     return (
//       <div className="exam-lessons-container">
//         <div className="exam-header">
//           <Link href="/" className="back-to-home">
//             ← بازگشت به صفحه اصلی
//           </Link>
//           <h1 className="exam-title">
//             📚 آزمون قلمچی - {getGradeName(grade)} {getFieldName(field)}
//           </h1>
//           <p className="exam-subtitle">
//             درس مورد نظر خود را برای آزمون قلمچی انتخاب کنید:
//           </p>
//         </div>

//         <div className="lessons-grid">
//           {lessons.map((lesson: Lesson) => (
//             <div
//               key={lesson.id}
//               className="lesson-card"
//               onClick={() => handleLessonClick(lesson.name)}
//               style={{ cursor: 'pointer' }}
//             >
//               <div className="lesson-icon">{lesson.icon}</div>
//               <h3 className="lesson-name">{lesson.name}</h3>
//               <p className="lesson-description">{lesson.description}</p>
//               <div className="lesson-button" style={{ backgroundColor: lesson.color }}>
//                 شروع آزمون {lesson.name}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   // صفحه سوالات درس انتخاب شده
//   const questions: Question[] = getQuestionsForLesson(selectedLesson);
//   const currentQuestion: Question = questions[currentQuestionIndex];

//   if (showResult) {
//     const score = calculateScore();
//     return (
//       <div className="exam-lessons-container">
//         <div className="exam-header">
//           <button onClick={backToLessons} className="back-button">
//             ← بازگشت به لیست دروس
//           </button>
//           <button onClick={restartLesson} className="restart-button" style={{ marginRight: '10px' }}>
//             ↺ شروع مجدد
//           </button>
//           <h1 className="exam-title">نتیجه آزمون {selectedLesson}</h1>
//         </div>

//         <div className="result-card">
//           <div className="score-circle">
//             <div className="score-number">{score.correct}</div>
//             <div className="score-total">از {score.total}</div>
//             <div className="score-percentage">{score.percentage.toFixed(1)}%</div>
//           </div>
          
//           <div className="result-details">
//             <div className="result-item correct">
//               ✅ پاسخ‌های صحیح: {score.correct}
//             </div>
//             <div className="result-item incorrect">
//               ❌ پاسخ‌های غلط: {score.total - score.correct}
//             </div>
//           </div>

//           <div className="result-buttons">
//             <button onClick={restartLesson} className="primary-button">
//               دوباره آزمون بده
//             </button>
//             <button onClick={backToLessons} className="secondary-button">
//               انتخاب درس دیگر
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="exam-lessons-container">
//       <div className="exam-header">
//         <button onClick={backToLessons} className="back-button">
//           ← بازگشت به لیست دروس
//         </button>
//         <h1 className="exam-title">{selectedLesson}</h1>
//         <div className="progress-bar">
//           سوال {currentQuestionIndex + 1} از {questions.length}
//         </div>
//       </div>

//       <div className="question-container">
//         <div className="question-text">
//           {currentQuestion.text}
//         </div>
        
//         <div className="options-container">
//           {currentQuestion.options.map((option: string, index: number) => (
//             <button
//               key={index}
//               className="option-button"
//               onClick={() => handleAnswer(index)}
//             >
//               <span className="option-letter">{String.fromCharCode(65 + index)}</span>
//               <span className="option-text">{option}</span>
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';


// تعریف تایپ‌ها
interface Question {
  id: number;
  text: string;
  options: string[];
  correct: number;
}

interface Lesson {
  id: number;
  name: string;
  icon: string;
  color: string;
  description: string;
}

interface Chapter {
  id: number;
  title: string;
  lessons: string[];
}

interface QuestionsDatabase {
  [key: string]: Question[];
}

export default function ExamLessonsPage() {
  const params = useParams();
  const grade = params.grade as string;
  const field = params.field as string;

  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);

  // دریافت نام فارسی پایه
  const getGradeName = (gradePath: string): string => {
    const gradeMap: { [key: string]: string } = {
      'dahom': 'دهم',
      'yazdahom': 'یازدهم',
      'davazdahom': 'دوازدهم'
    };
    return gradeMap[gradePath] || gradePath;
  };

  // دریافت نام فارسی رشته
  const getFieldName = (fieldPath: string): string => {
    const fieldMap: { [key: string]: string } = {
      'ensani': 'انسانی',
      'riyazi': 'ریاضی',
      'tajrobi': 'تجربی'
    };
    return fieldMap[fieldPath] || fieldPath;
  };

  // فصل‌های کتاب علوم و فنون ادبی دهم انسانی
  const chapters: Chapter[] = [
    {
      id: 1,
      title: "فصل اول",
      lessons: [
        "درس اول: مبانی تحلیل متن",
        "درس دوم: سازه‌ها و عوامل تأثیر گذار شعر فارسی",
        "درس سوم: واج آرایی، واژه آرایی",
        "کارگاه تحلیل فصل اول"
      ]
    },
    {
      id: 2,
      title: "فصل دوم",
      lessons: [
        "درس چهارم: تاریخ ادبیات پیش از اسلام و قرن‌های اولیۀ هجری",
        "درس پنجم: هماهنگی پاره‌های کلام",
        "درس ششم: سجع و انواع آن",
        "کارگاه تحلیل فصل دوم"
      ]
    },
    {
      id: 3,
      title: "فصل سوم",
      lessons: [
        "درس هفتم: سبک و سبک شناسی (سبک خراسانی)",
        "درس هشتم: وزن شعر فارسی",
        "درس نهم: موازنه و ترصیع",
        "کارگاه تحلیل فصل سوم"
      ]
    },
    {
      id: 4,
      title: "فصل چهارم",
      lessons: [
        "درس دهم : زبان و ادبیات فارسی در سده‌های پنجم و ششم و ویژگی‌های سبکی آن",
        "درس یازدهم : قافیه",
        "درس دوازدهم : جناس و انواع آن",
        "کارگاه تحلیل فصل چهارم"
      ]
    }
  ];

  // لیست دروس دهم انسانی برای آزمون قلمچی
  const lessons: Lesson[] = [
    { id: 1, name: 'علوم و فنون ادبی', icon: '📖', color: '#4CAF50', description: 'سوالات تخصصی علوم و فنون ادبی' },
    { id: 2, name: 'عربی', icon: '🕌', color: '#2196F3', description: 'سوالات عربی پایه دهم' },
    { id: 3, name: 'فارسی', icon: '✍️', color: '#9C27B0', description: 'سوالات فارسی پایه دهم' },
    { id: 4, name: 'دینی', icon: '🕌', color: '#FF9800', description: 'سوالات دینی پایه دهم' },
    { id: 5, name: 'زبان انگلیسی', icon: '🇬🇧', color: '#F44336', description: 'سوالات زبان انگلیسی پایه دهم' },
    { id: 6, name: 'تاریخ', icon: '📜', color: '#795548', description: 'سوالات تاریخ پایه دهم' },
    { id: 7, name: 'جغرافیا', icon: '🌍', color: '#00BCD4', description: 'سوالات جغرافیا پایه دهم' },
    { id: 8, name: 'جامعه‌شناسی', icon: '👥', color: '#E91E63', description: 'سوالات جامعه‌شناسی پایه دهم' },
    { id: 9, name: 'منطق', icon: '🧠', color: '#3F51B5', description: 'سوالات منطق پایه دهم' },
    { id: 10, name: 'روانشناسی', icon: '🧘', color: '#009688', description: 'سوالات روانشناسی پایه دهم' },
    { id: 11, name: 'ریاضی', icon: '🔢', color: '#607D8B', description: 'سوالات ریاضی پایه دهم' },
    { id: 12, name: 'اقتصاد', icon: '💰', color: '#8BC34A', description: 'سوالات اقتصاد پایه دهم' }
  ];

  // دیتابیس سوالات برای هر درس
  const questionsDatabase: QuestionsDatabase = {
    'علوم و فنون ادبی': [
      { id: 1, text: 'کدام گزینه از نظر آرایه‌های ادبی صحیح است؟', options: ['تشبیه', 'استعاره', 'کنایه', 'مجاز'], correct: 0 },
      { id: 2, text: 'معنی کلمه "بسمل" چیست؟', options: ['کشته شده', 'بیمار', 'خسته', 'غمگین'], correct: 0 },
      { id: 3, text: 'کدام بیت دارای آرایه "تضاد" است؟', options: ['گزینه اول', 'گزینه دوم', 'گزینه سوم', 'گزینه چهارم'], correct: 2 },
      { id: 4, text: 'در کدام گزینه آرایه "واج آرایی" دیده می‌شود؟', options: ['باد و باران', 'آب و آتش', 'سرو سمن', 'گل و گلدان'], correct: 2 },
      { id: 5, text: 'کدام گزینه مربوط به "سبک خراسانی" است؟', options: ['زبان ساده و روان', 'کلمات عربی فراوان', 'تکلف و تصنع', 'زبان عامیانه'], correct: 0 }
    ],
    'عربی': [
      { id: 1, text: 'ترجمه صحیح "ذهب الولد إلی المدرسة" کدام است؟', options: ['پسر به مدرسه رفت', 'پدر به مدرسه رفت', 'معلم به مدرسه رفت', 'دانش‌آموز به مدرسه رفت'], correct: 0 },
      { id: 2, text: 'کلمه "کتاب" چه نوع اسمی است؟', options: ['جامد', 'مشتق', 'مصدر', 'اسم فاعل'], correct: 0 },
      { id: 3, text: 'جمع مکسر "قلم" چیست؟', options: ['أقلام', 'قلام', 'قلمون', 'قلامة'], correct: 0 }
    ],
    'فارسی': [
      { id: 1, text: 'کدام گزینه صحیح است؟', options: ['گزینه اول', 'گزینه دوم', 'گزینه سوم', 'گزینه چهارم'], correct: 1 },
      { id: 2, text: 'معنی کلمه "ستاره" چیست؟', options: ['سنگ', 'اختر', 'گل', 'شمع'], correct: 1 },
      { id: 3, text: 'کدام آرایه در بیت "چو گفتم غم دارم بگفتا غم مخور" وجود دارد؟', options: ['جناس', 'تکرار', 'واج‌آرایی', 'مراعات نظیر'], correct: 1 }
    ],
    'ریاضی': [
      { id: 1, text: 'حاصل عبارت 5 + 3 × 2 برابر است با:', options: ['16', '11', '13', '10'], correct: 1 },
      { id: 2, text: 'مساحت مربعی به ضلع 5 سانتی‌متر چقدر است؟', options: ['10', '15', '20', '25'], correct: 3 },
      { id: 3, text: 'کدام عدد اول است؟', options: ['21', '23', '25', '27'], correct: 1 }
    ],
    'منطق': [
      { id: 1, text: 'تعریف منطق چیست؟', options: ['علم قوانین تفکر صحیح', 'علم ریاضیات', 'علم فیزیک', 'علم شیمی'], correct: 0 },
      { id: 2, text: 'کدام گزینه یک قضیه حملی است؟', options: ['انسان موجودی متفکر است', 'امروز بارانی است یا نیست', 'اگر باران ببارد زمین خیس می‌شود', 'انسان یا متفکر است یا نیست'], correct: 0 },
      { id: 3, text: 'کدام گزینه از اقسام قضیه شرطی است؟', options: ['متصل', 'منفصل', 'حقیقی', 'اتفاقی'], correct: 0 }
    ],
    'اقتصاد': [
      { id: 1, text: 'عرضه چیست؟', options: ['مقدار کالایی که تولیدکنندگان آماده فروش هستند', 'مقدار کالایی که مصرف‌کنندگان می‌خواهند', 'مقدار کالای موجود در بازار', 'قیمت کالا'], correct: 0 },
      { id: 2, text: 'تقاضا چیست؟', options: ['مقدار کالایی که مصرف‌کنندگان می‌خواهند بخرند', 'قیمت کالا', 'هزینه تولید', 'سود تولیدکننده'], correct: 0 },
      { id: 3, text: 'قانون عرضه و تقاضا بیانگر چیست؟', options: ['رابطه قیمت و مقدار', 'رابطه تولید و مصرف', 'رابطه خرید و فروش', 'رابطه سود و زیان'], correct: 0 }
    ]
  };

  // سوالات پیش‌فرض برای دروسی که سوالات خاص ندارن
  const getDefaultQuestions = (lessonName: string): Question[] => {
    return [
      { id: 1, text: `سوال اول درس ${lessonName}`, options: ['گزینه اول', 'گزینه دوم', 'گزینه سوم', 'گزینه چهارم'], correct: 0 },
      { id: 2, text: `سوال دوم درس ${lessonName}`, options: ['گزینه اول', 'گزینه دوم', 'گزینه سوم', 'گزینه چهارم'], correct: 1 },
      { id: 3, text: `سوال سوم درس ${lessonName}`, options: ['گزینه اول', 'گزینه دوم', 'گزینه سوم', 'گزینه چهارم'], correct: 2 }
    ];
  };

  const getQuestionsForLesson = (lessonName: string): Question[] => {
    return questionsDatabase[lessonName] || getDefaultQuestions(lessonName);
  };

  const handleLessonClick = (lessonName: string): void => {
    if (lessonName === 'علوم و فنون ادبی') {
      setSelectedLesson(lessonName);
      setSelectedChapter(null);
      setUserAnswers([]);
      setCurrentQuestionIndex(0);
      setShowResult(false);
    } else {
      // برای سایر دروس مستقیم وارد آزمون می‌شویم
      setSelectedLesson(lessonName);
      setSelectedChapter(null);
      setUserAnswers([]);
      setCurrentQuestionIndex(0);
      setShowResult(false);
    }
  };

  const handleChapterClick = (chapterId: number): void => {
    setSelectedChapter(selectedChapter === chapterId ? null : chapterId);
  };

  const handleLessonItemClick = (lessonName: string): void => {
    // می‌توانید برای هر درس خاص سوالات مرتبط طراحی کنید
    console.log(`شروع آزمون از مبحث: ${lessonName}`);
    // در صورت نیاز می‌توانید سوالات مرتبط با آن درس خاص را بارگذاری کنید
  };

  const handleAnswer = (selectedIndex: number): void => {
    const questions = getQuestionsForLesson(selectedLesson!);
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = selectedIndex;
    setUserAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  const calculateScore = (): { correct: number; total: number; percentage: number } => {
    const questions = getQuestionsForLesson(selectedLesson!);
    let correct = 0;
    userAnswers.forEach((answer, index) => {
      if (answer === questions[index].correct) {
        correct++;
      }
    });
    return { correct, total: questions.length, percentage: (correct / questions.length) * 100 };
  };

  const restartLesson = (): void => {
    setUserAnswers([]);
    setCurrentQuestionIndex(0);
    setShowResult(false);
  };

  const backToLessons = (): void => {
    setSelectedLesson(null);
    setSelectedChapter(null);
    setUserAnswers([]);
    setCurrentQuestionIndex(0);
    setShowResult(false);
  };

  // صفحه ویژه علوم و فنون ادبی با نمایش فصل‌ها
  if (selectedLesson === 'علوم و فنون ادبی' && !showResult && userAnswers.length === 0) {
    return (
      <div className="exam-lessons-container">
        <div className="exam-header">
          <button onClick={backToLessons} className="back-button">
            ← بازگشت به لیست دروس
          </button>
          <h1 className="exam-title">
            📚 {selectedLesson} - دهم انسانی
          </h1>
          <p className="exam-subtitle">
            فصل مورد نظر خود را انتخاب کنید:
          </p>
        </div>

        <div className="chapters-container">
          {chapters.map((chapter) => (
            <div key={chapter.id} className="chapter-wrapper">
              <button
                className={`chapter-button ${selectedChapter === chapter.id ? 'active' : ''}`}
                onClick={() => handleChapterClick(chapter.id)}
              >
                <span className="chapter-title">{chapter.title}</span>
                <span className="chapter-icon">{selectedChapter === chapter.id ? '▲' : '▼'}</span>
              </button>
              
              {selectedChapter === chapter.id && (
                <div className="lessons-list">
                  {chapter.lessons.map((lesson, index) => (
                    <button
                      key={index}
                      className="lesson-item-button"
                      onClick={() => handleLessonItemClick(lesson)}
                    >
                      <span className="lesson-bullet">📘</span>
                      <span className="lesson-name">{lesson}</span>
                      <span className="lesson-arrow">→</span>
                    </button>
                  ))}
                  <button
                    className="start-exam-button"
                    onClick={() => {
                      setUserAnswers([]);
                      setCurrentQuestionIndex(0);
                      setShowResult(false);
                    }}
                  >
                    🎯 شروع آزمون جامع {chapter.title}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="info-box">
          <p>💡 نکته: با کلیک روی هر فصل، درس‌های آن نمایش داده می‌شود.</p>
          <p>📝 برای شروع آزمون جامع هر فصل، روی دکمه شروع آزمون جامع کلیک کنید.</p>
        </div>
      </div>
    );
  }

  // صفحه اصلی لیست دروس
  if (!selectedLesson) {
    return (
      <div className="exam-lessons-container">
        <div className="exam-header">
          <Link href="/" className="back-to-home">
            ← بازگشت به صفحه اصلی
          </Link>
          <h1 className="exam-title">
            📚 آزمون قلمچی - {getGradeName(grade)} {getFieldName(field)}
          </h1>
          <p className="exam-subtitle">
            درس مورد نظر خود را برای آزمون قلمچی انتخاب کنید:
          </p>
        </div>

        <div className="lessons-grid">
          {lessons.map((lesson: Lesson) => (
            <div
              key={lesson.id}
              className="lesson-card"
              onClick={() => handleLessonClick(lesson.name)}
              style={{ cursor: 'pointer' }}
            >
              <div className="lesson-icon">{lesson.icon}</div>
              <h3 className="lesson-name">{lesson.name}</h3>
              <p className="lesson-description">{lesson.description}</p>
              <div className="lesson-button" style={{ backgroundColor: lesson.color }}>
                شروع آزمون {lesson.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // صفحه سوالات درس انتخاب شده
  const questions: Question[] = getQuestionsForLesson(selectedLesson);
  const currentQuestion: Question = questions[currentQuestionIndex];

  if (showResult) {
    const score = calculateScore();
    return (
      <div className="exam-lessons-container">
        <div className="exam-header">
          <button onClick={backToLessons} className="back-button">
            ← بازگشت به لیست دروس
          </button>
          <button onClick={restartLesson} className="restart-button" style={{ marginRight: '10px' }}>
            ↺ شروع مجدد
          </button>
          <h1 className="exam-title">نتیجه آزمون {selectedLesson}</h1>
        </div>

        <div className="result-card">
          <div className="score-circle">
            <div className="score-number">{score.correct}</div>
            <div className="score-total">از {score.total}</div>
            <div className="score-percentage">{score.percentage.toFixed(1)}%</div>
          </div>
          
          <div className="result-details">
            <div className="result-item correct">
              ✅ پاسخ‌های صحیح: {score.correct}
            </div>
            <div className="result-item incorrect">
              ❌ پاسخ‌های غلط: {score.total - score.correct}
            </div>
          </div>

          <div className="result-buttons">
            <button onClick={restartLesson} className="primary-button">
              دوباره آزمون بده
            </button>
            <button onClick={backToLessons} className="secondary-button">
              انتخاب درس دیگر
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="exam-lessons-container">
      <div className="exam-header">
        <button onClick={backToLessons} className="back-button">
          ← بازگشت به لیست دروس
        </button>
        <h1 className="exam-title">{selectedLesson}</h1>
        <div className="progress-bar">
          سوال {currentQuestionIndex + 1} از {questions.length}
        </div>
      </div>

      <div className="question-container">
        <div className="question-text">
          {currentQuestion.text}
        </div>
        
        <div className="options-container">
          {currentQuestion.options.map((option: string, index: number) => (
            <button
              key={index}
              className="option-button"
              onClick={() => handleAnswer(index)}
            >
              <span className="option-letter">{String.fromCharCode(65 + index)}</span>
              <span className="option-text">{option}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}