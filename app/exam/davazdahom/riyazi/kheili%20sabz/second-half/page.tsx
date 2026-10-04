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

export default function SecondHalfLessonsPage() {
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
      'maz': 'قلمچی',
      'gozine2': 'گزینه دو',
      'sanjesh': 'سنجش'
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

  // ======================== لیست دروس نیم سال دوم دوازدهم ریاضی قلمچی ========================
  const lessons: Lesson[] = [
    { 
      id: 1, 
      name: 'ریاضیات گسسته', 
      icon: '🧮', 
      color: '#353e60ff', 
      description: 'منطق و استدلال ریاضی، نظریه اعداد، ترکیبیات، گراف و درخت',
      questionCount: 30
    },
    { 
      id: 2, 
      name: 'فیزیک (3)', 
      icon: '⚡', 
      color: '#d07781ff', 
      description: 'الکتریسیته، مغناطیس، دینامیک',
      questionCount: 30
    },
    { 
      id: 3, 
      name: 'شیمی (3)', 
      icon: '🧪', 
      color: '#00BCD4', 
      description: 'تعادل شیمیایی، اسید و باز، هیدروکربن‌ها',
      questionCount: 30
    },
    { 
      id: 4, 
      name: 'هندسه (3)', 
      icon: '🔺', 
      color: '#4CAF50', 
      description: 'ماتریس و کاربردها، دستگاه معادلات خطی، بردارها و مقاطع مخروطی',
      questionCount: 25
    },
    { 
      id: 5, 
      name: 'حسابان (2)', 
      icon: '∫', 
      color: '#a991adff', 
      description: 'حد و پیوستگی، مشتق و کاربردهای آن',
      questionCount: 30
    },
    { 
      id: 6, 
      name: 'فارسی (3)', 
      icon: '📖', 
      color: '#9C27B0', 
      description: 'ادبیات فارسی پایه دوازدهم، آرایه‌ها و سبک‌شناسی',
      questionCount: 25
    },
    { 
      id: 7, 
      name: 'عربی (3)', 
      icon: '🕌', 
      color: '#2196F3', 
      description: 'عربی، زبان قرآن پایه دوازدهم، قواعد و ترجمه',
      questionCount: 25
    },
    { 
      id: 8, 
      name: 'دین و زندگی (3)', 
      icon: '🕌', 
      color: '#FF9800', 
      description: 'دینی پایه دوازدهم، انسان و ایمان، خداشناسی و معاد',
      questionCount: 25
    },
    { 
      id: 9, 
      name: 'زبان انگلیسی (3)', 
      icon: '🇬🇧', 
      color: '#F44336', 
      description: 'زبان عمومی پایه دوازدهم، گرامر و واژگان',
      questionCount: 25
    }
  ];

  const getLessonSlug = (lessonName: string): string => {
    const slugMap: Record<string, string> = {
      'ریاضیات گسسته': 'gosaste-riyazi',
      'فیزیک (3)': 'fizik-3-riyazi',
      'شیمی (3)': 'shimi-3-riyazi',
      'هندسه (3)': 'hendese-3-riyazi',
      'حسابان (2)': 'hesaban-2-riyazi',
      'فارسی (3)': 'farsi-3-riyazi',
      'عربی (3)': 'arabi-3-riyazi',
      'دین و زندگی (3)': 'din-va-zendegi-3-riyazi',
      'زبان انگلیسی (3)': 'english-3-riyazi'
    };
    return slugMap[lessonName] || lessonName.replace(/ /g, '-').toLowerCase();
  };

  const handleLessonClick = (lessonName: string) => {
    const lessonSlug = getLessonSlug(lessonName);
    router.push(`/exam/davazdahom/riyazi/kheili%20sabz/second-half/${lessonSlug}`);
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
            
            <div className="lesson-button" style={{ backgroundColor: lesson.color }}>
              شروع آزمون {lesson.name}
            </div>
          </div>
        ))}
      </div>

      <div className="info-box">
        <p>💡 هر آزمون شامل سوالات تخصصی نیم سال دوم {getGradeName(grade)} {getFieldName(field)} می‌باشد.</p>
        <p>📊 پس از اتمام هر آزمون، درصد شما به همراه پاسخنامه تشریحی نمایش داده می‌شود.</p>
        <p>🏆 آزمون‌های جامع شامل سوالات ترکیبی از تمام دروس می‌باشند.</p>
        <p>📚 این آزمون‌ها مطابق با کتاب‌های درسی پایه دوازدهم رشته ریاضی طراحی شده‌اند.</p>
      </div>

      <style>{`
        .exam-lessons-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          direction: rtl;
          font-family: 'Tahoma', 'Arial', sans-serif;
        }

        .exam-header {
          color: white;
          padding: 30px 40px;
          border-radius: 16px;
          margin-bottom: 30px;
          text-align: center;
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        }

        .back-to-home {
          display: inline-block;
          color: rgba(11, 11, 11, 0.8);
          text-decoration: none;
          font-size: 14px;
          margin-bottom: 15px;
          transition: color 0.3s;
        }

        .back-to-home:hover {
          color: white;
        }

        .exam-title {
          font-size: 28px;
          margin: 10px 0;
          font-weight: bold;
        }

        .exam-subtitle {
          font-size: 16px;
          opacity: 0.9;
          margin: 0;
        }

        .lessons-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }

        .lesson-card {
          background: white;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.08);
          transition: all 0.3s ease;
          text-align: center;
          cursor: pointer;
          border: 1px solid #e9ecef;
        }

        .lesson-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 8px 30px rgba(0,0,0,0.15);
        }

        .lesson-card:hover .lesson-button {
          transform: scale(1.05);
        }

        .lesson-icon {
          font-size: 42px;
          margin-bottom: 12px;
          display: block;
        }

        .lesson-name {
          font-size: 18px;
          font-weight: bold;
          color: #1a237e;
          margin: 10px 0 8px;
        }

        .lesson-description {
          font-size: 13px;
          color: #666;
          margin: 8px 0 12px;
          line-height: 1.6;
          min-height: 40px;
        }

        .lesson-stats {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin: 12px 0;
          flex-wrap: wrap;
        }

        .question-count {
          background: #f0f0f0;
          padding: 4px 14px;
          border-radius: 20px;
          font-size: 12px;
          color: #555;
        }

        .duration-badge {
          background: #e3f2fd;
          padding: 4px 14px;
          border-radius: 20px;
          font-size: 12px;
          color: #1565c0;
        }

        .lesson-button {
          display: inline-block;
          padding: 10px 24px;
          border-radius: 30px;
          color: white;
          font-size: 14px;
          font-weight: bold;
          transition: all 0.3s ease;
          border: none;
          margin-top: 8px;
        }

        .info-box {
          background: white;
          border-radius: 16px;
          padding: 24px;
          max-width: 700px;
          margin: 0 auto;
          text-align: center;
          box-shadow: 0 2px 12px rgba(0,0,0,0.08);
          border: 1px solid #e9ecef;
        }

        .info-box p {
          margin: 8px 0;
          color: #555;
          font-size: 14px;
        }

        @media (max-width: 768px) {
          .exam-header {
            padding: 20px;
          }
          
          .exam-title {
            font-size: 20px;
          }
          
          .lessons-grid {
            grid-template-columns: 1fr;
          }
          
          .lesson-card {
            padding: 18px;
          }

          .lesson-description {
            min-height: auto;
          }
        }
      `}</style>
    </div>
  );
}