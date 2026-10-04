
'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

interface Lesson {
  id: number;
  name: string;
  icon: string;
  color: string;
  description: string;
  questionCount: number;
}

export default function FirstHalfLessonsPage() {
  const params = useParams();
  const router = useRouter();
  const grade = params.grade as string;
  const field = params.field as string;
  const exam = params.exam as string;
  const semester = params.semester as string;

  // دریافت نام فارسی پایه
  const getGradeName = (gradePath: string): string => {
    const gradeMap: Record<string, string> = {
      'dahom': 'دهم',
      'yazdahom': 'یازدهم',
      'davazdahom': 'دوازدهم'
    };
    return gradeMap[gradePath] || gradePath;
  };

  // دریافت نام فارسی رشته
  const getFieldName = (fieldPath: string): string => {
    const fieldMap: Record<string, string> = {
      'ensani': 'انسانی',
      'riyazi': 'ریاضی',
      'tajrobi': 'تجربی'
    };
    return fieldMap[fieldPath] || fieldPath;
  };

  // دریافت نام فارسی آزمون
  const getExamName = (examPath: string): string => {
    const examMap: Record<string, string> = {
      'ghalamchi': 'قلمچی',
      'maz': 'ماز',
      'gozine2': 'گزینه دو',
      'sanjesh': 'سنجش',
      'kheili-sabz': 'خیلی سبز'
    };
    return examMap[examPath] || examPath;
  };

  // دریافت نام فارسی نیم سال
  const getSemesterName = (semesterPath: string): string => {
    const semesterMap: Record<string, string> = {
      'first-half': 'نیم سال اول',
      'second-half': 'نیم سال دوم'
    };
    return semesterMap[semesterPath] || semesterPath;
  };

  // ======================== لیست دروس ========================
  const lessons: Lesson[] = [
    { 
      id: 1, 
      name: 'فیزیک (2)', 
      icon: '⚡', 
      color: '#FF9800', 
      description: 'الکتریسیته، مغناطیس، دینامیک',
      questionCount: 10
    },
    { 
      id: 2, 
      name: 'شیمی (2)', 
      icon: '🧪', 
      color: '#00BCD4', 
      description: 'تعادل شیمیایی، اسید و باز، هیدروکربن‌ها',
      questionCount: 10
    },
    { 
      id: 3, 
      name: 'هندسه (2)', 
      icon: '🔺', 
      color: '#4CAF50', 
      description: 'استدلال، قضایای هندسی، تشابه',
      questionCount: 8
    },
    { 
      id: 4, 
      name: 'حسابان (1)', 
      icon: '∫', 
      color: '#9C27B0', 
      description: 'حد و پیوستگی',
      questionCount: 10
    },
    { 
      id: 5, 
      name: 'آمار و احتمال', 
      icon: '📊', 
      color: '#2196F3', 
      description: 'آمار توصیفی، نمودارها، شاخص‌ها',
      questionCount: 8
    },
    { 
      id: 6, 
      name: 'فارسی (2)', 
      icon: '📖', 
      color: '#9C27B0', 
      description: 'ادبیات فارسی پایه یازدهم',
      questionCount: 8
    },
    { 
      id: 7, 
      name: 'عربی (2)', 
      icon: '🕌', 
      color: '#2196F3', 
      description: 'عربی، زبان قرآن پایه یازدهم',
      questionCount: 8
    },
    { 
      id: 8, 
      name: 'دین و زندگی (2)', 
      icon: '🕌', 
      color: '#FF9800', 
      description: 'دینی پایه یازدهم',
      questionCount: 8
    },
    { 
      id: 9, 
      name: 'زبان انگلیسی (2)', 
      icon: '🇬🇧', 
      color: '#F44336', 
      description: 'زبان عمومی پایه یازدهم',
      questionCount: 8
    }
  ];

  // نگاشت نام درس به slug
  const getLessonSlug = (lessonName: string): string => {
    const slugMap: Record<string, string> = {
      'فیزیک (2)': 'fizik-2',
      'شیمی (2)': 'shimi-2',
      'هندسه (2)': 'hendese-2',
      'حسابان (1)': 'hesaban-1',
      'آمار و احتمال': 'amar-va-ehtemal',
      'فارسی (2)': 'farsi-2',
      'عربی (2)': 'arabi-2',
      'دین و زندگی (2)': 'din-va-zendegi-2',
      'زبان انگلیسی (2)': 'english-2'
    };
    return slugMap[lessonName] || lessonName.replace(/ /g, '-').toLowerCase();
  };

  const handleLessonClick = (lessonName: string) => {
    const lessonSlug = getLessonSlug(lessonName);
    router.push(`/exam/yazdahom/riyazi/sanjesh/second-half/${lessonSlug}`);
  };

  return (
    <div className="exam-lessons-container">
      <div className="exam-header">
        <Link href="/" className="back-to-home">
          ← بازگشت به صفحه اصلی
        </Link>
        <h1 className="exam-title">
          📚 {getExamName(exam)} - {getGradeName(grade)} {getFieldName(field)}
        </h1>
        <p className="exam-subtitle">
          {getSemesterName(semester)} - درس مورد نظر خود را انتخاب کنید:
        </p>
      </div>

      <div className="lessons-grid">
        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            className="lesson-card"
            onClick={() => handleLessonClick(lesson.name)}
            style={{ cursor: 'pointer' }}
          >
            <div className="lesson-icon">{lesson.icon}</div>
            <h3 className="lesson-name">{lesson.name}</h3>
            <p className="lesson-description">{lesson.description}</p>
            <div className="lesson-stats">
              <span className="question-count">📝 {lesson.questionCount} سوال</span>
            </div>
            <div className="lesson-button" style={{ backgroundColor: lesson.color }}>
              شروع آزمون {lesson.name}
            </div>
          </div>
        ))}
      </div>

      <div className="info-box">
        <p>💡 هر آزمون شامل سوالات تخصصی {getSemesterName(semester)} {getGradeName(grade)} {getFieldName(field)} می‌باشد.</p>
        <p>📊 پس از اتمام آزمون، درصد شما به همراه پاسخنامه تشریحی نمایش داده می‌شود.</p>
      </div>

      <style jsx>{`
        .exam-lessons-container {
          min-height: 100vh;
          padding: 2rem;
          font-family: 'IranSans', Tahoma, sans-serif;
          background: #f0f4f8;
        }
        .exam-header {
          text-align: center;
          margin-bottom: 2rem;
        }
        .back-to-home {
          display: inline-block;
          background: #4a5568;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          text-decoration: none;
          margin-bottom: 1rem;
          font-size: 0.9rem;
          transition: background 0.3s;
        }
        .back-to-home:hover {
          background: #2d3748;
        }
        .exam-title {
          font-size: 2rem;
          color: #1a202c;
          margin: 0.5rem 0;
        }
        .exam-subtitle {
          color: #4a5568;
          font-size: 1rem;
        }
        .lessons-grid {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        .lesson-card {
          background: white;
          border-radius: 1rem;
          padding: 1.5rem;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .lesson-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }
        .lesson-icon {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
        }
        .lesson-name {
          font-size: 1.1rem;
          font-weight: bold;
          margin: 0.5rem 0;
          color: #2d3748;
        }
        .lesson-description {
          font-size: 0.8rem;
          color: #718096;
          margin: 0.5rem 0;
          line-height: 1.4;
          flex: 1;
        }
        .lesson-stats {
          margin: 0.5rem 0;
        }
        .question-count {
          background: #edf2f7;
          padding: 0.2rem 0.6rem;
          border-radius: 1rem;
          font-size: 0.7rem;
          color: #4a5568;
        }
        .lesson-button {
          display: inline-block;
          padding: 0.4rem 1rem;
          border-radius: 2rem;
          color: white;
          font-size: 0.8rem;
          font-weight: bold;
          text-align: center;
          transition: opacity 0.2s;
          margin-top: 0.5rem;
          width: 100%;
        }
        .lesson-button:hover {
          opacity: 0.9;
        }
        .info-box {
          background: white;
          border-radius: 1rem;
          padding: 1rem;
          margin-top: 2rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          text-align: center;
          color: #4a5568;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        /* ======================================== */
        /* ریسپانسیو: 3 ستون در لپ‌تاپ، 2 ستون در تبلت، 1 ستون در موبایل */
        /* ======================================== */

        /* لپ‌تاپ و دسکتاپ کوچک (کمتر از 1200px) */
        @media (max-width: 1200px) {
          .lessons-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        /* تبلت (کمتر از 992px) */
        @media (max-width: 992px) {
          .lessons-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* موبایل (کمتر از 576px) */
        @media (max-width: 576px) {
          .exam-lessons-container {
            padding: 1rem;
          }
          .lessons-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          .exam-title {
            font-size: 1.3rem;
          }
          .lesson-card {
            padding: 1rem;
          }
        }

        /* موبایل خیلی کوچک (کمتر از 400px) */
        @media (max-width: 400px) {
          .exam-lessons-container {
            padding: 0.5rem;
          }
          .lessons-grid {
            gap: 0.8rem;
          }
          .lesson-card {
            padding: 0.8rem;
          }
          .lesson-icon {
            font-size: 2rem;
          }
          .lesson-name {
            font-size: 0.95rem;
          }
          .lesson-description {
            font-size: 0.7rem;
          }
          .lesson-button {
            font-size: 0.7rem;
            padding: 0.3rem 0.8rem;
          }
        }
      `}</style>
    </div>
  );
}