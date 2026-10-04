'use client';
import Link from 'next/link';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// تعریف تایپ برای درس
interface Lesson {
  id: number;
  name: string;
  description: string;
  questionCount: number;
  slug: string;
}

// تعریف تایپ برای فصل
interface Chapter {
  id: number;
  name: string;
  icon: string;
  color: string;
  lessons: Lesson[];
  examSlug: string;
  examName: string;
  examQuestionCount: number;
}

export default function Sociology2ChaptersPage() {
  const router = useRouter();
  const [openChapter, setOpenChapter] = useState<number | null>(null);

  // ======================== ساختار فصل‌ها و درس‌های کتاب جامعه‌شناسی (2) ========================
  const chapters: Chapter[] = [
    {
      id: 1,
      name: 'فصل اول: فرهنگ جهانی',
      icon: '🌐',
      color: '#9C27B0',
      examSlug: 'chapter1-exam',
      examName: 'آزمون جامع فصل اول: فرهنگ جهانی',
      examQuestionCount: 20,
      lessons: [
        { id: 1, name: 'درس اول: جهان فرهنگی', description: 'مفهوم فرهنگ، عناصر و کارکردهای آن', questionCount: 10, slug: 'lesson1' },
        { id: 2, name: 'درس دوم: فرهنگ جهانی', description: 'جهانی‌شدن فرهنگ و پیامدهای آن', questionCount: 10, slug: 'lesson2' },
        { id: 3, name: 'درس سوم: نمونه‌های فرهنگ جهانی ۱', description: 'بررسی نمونه‌های فرهنگ جهانی (بخش اول)', questionCount: 10, slug: 'lesson3' },
        { id: 4, name: 'درس چهارم: نمونه‌های فرهنگ جهانی ۲', description: 'بررسی نمونه‌های فرهنگ جهانی (بخش دوم)', questionCount: 10, slug: 'lesson4' },
      ]
    },
    {
      id: 2,
      name: 'فصل دوم: فرهنگ معاصر غرب و نظام نوین جهانی',
      icon: '🏛️',
      color: '#2196F3',
      examSlug: 'chapter2-exam',
      examName: 'آزمون جامع فصل دوم: فرهنگ معاصر غرب و نظام نوین جهانی',
      examQuestionCount: 25,
      lessons: [
        { id: 5, name: 'درس پنجم: باورها و ارزش‌های بنیادین فرهنگ غرب', description: 'مبانی فکری و ارزشی فرهنگ غرب', questionCount: 8, slug: 'lesson5' },
        { id: 6, name: 'درس ششم: چگونگی تکوین فرهنگ معاصر غرب', description: 'مراحل شکل‌گیری فرهنگ غرب معاصر', questionCount: 8, slug: 'lesson6' },
        { id: 7, name: 'درس هفتم: جامعهٔ جهانی', description: 'مفهوم جامعهٔ جهانی و ویژگی‌های آن', questionCount: 8, slug: 'lesson7' },
        { id: 8, name: 'درس هشتم: تحولات نظام جهانی', description: 'تغییرات نظام جهانی و تأثیر آن بر جوامع', questionCount: 8, slug: 'lesson8' },
      ]
    },
    {
      id: 3,
      name: 'فصل سوم: چالش‌های جهانی',
      icon: '⚡',
      color: '#FF9800',
      examSlug: 'chapter3-exam',
      examName: 'آزمون جامع فصل سوم: چالش‌های جهانی',
      examQuestionCount: 30,
      lessons: [
        { id: 9, name: 'درس نهم: جهان دو قطبی', description: 'جنگ سرد، شرق و غرب، نظم دو قطبی', questionCount: 8, slug: 'lesson9' },
        { id: 10, name: 'درس دهم: جنگ‌ها و تقابل‌های جهانی', description: 'جنگ‌های جهانی، تقابل‌های سیاسی و نظامی', questionCount: 8, slug: 'lesson10' },
        { id: 11, name: 'درس یازدهم: بحران‌های اقتصادی و زیست‌محیطی', description: 'بحران‌های اقتصادی و زیست‌محیطی معاصر', questionCount: 8, slug: 'lesson11' },
        { id: 12, name: 'درس دوازدهم: بحران‌های معرفتی و معنوی', description: 'بحران معنا، هویت و بحران‌های فکری در عصر جدید', questionCount: 8, slug: 'lesson12' },
      ]
    },
    {
      id: 4,
      name: 'فصل چهارم: بیداری اسلامی و جهان جدید',
      icon: '☪️',
      color: '#4CAF50',
      examSlug: 'chapter4-exam',
      examName: 'آزمون جامع فصل چهارم: بیداری اسلامی و جهان جدید',
      examQuestionCount: 20,
      lessons: [
        { id: 13, name: 'درس سیزدهم: سرآغاز بیداری اسلامی', description: 'ریشه‌ها و زمینه‌های بیداری اسلامی', questionCount: 8, slug: 'lesson13' },
        { id: 14, name: 'درس چهاردهم: انقلاب اسلامی ایران؛ نقطهٔ عطف بیداری اسلامی', description: 'نقش انقلاب اسلامی در بیداری اسلامی', questionCount: 8, slug: 'lesson14' },
        { id: 15, name: 'درس پانزدهم: افق بیداری اسلامی', description: 'آینده بیداری اسلامی و جهان اسلام', questionCount: 8, slug: 'lesson15' },
      ]
    },
    // ======================== آزمون جامع کل کتاب ========================
    {
      id: 5,
      name: '🎯 آزمون جامع کل کتاب جامعه‌شناسی (2)',
      icon: '🏆',
      color: '#FF6B6B',
      examSlug: 'final-exam',
      examName: 'آزمون جامع کل کتاب جامعه‌شناسی (2)',
      examQuestionCount: 40,
      lessons: [
        { id: 16, name: '📚 کل دروس کتاب جامعه‌شناسی (2)', description: 'شامل تمام مباحث: فرهنگ جهانی، فرهنگ غرب، چالش‌های جهانی، بیداری اسلامی', questionCount: 40, slug: 'final-exam' },
      ]
    }
  ];

  const handleChapterClick = (chapterId: number) => {
    setOpenChapter(openChapter === chapterId ? null : chapterId);
  };

  const handleLessonClick = (lessonSlug: string) => {
    router.push(`/exam/yazdahom/ensani/ghalamchi/first-half/jamee-shenasi-2/${lessonSlug}`);
  };

  const handleChapterExamClick = (examSlug: string) => {
    router.push(`/exam/yazdahom/ensani/ghalamchi/first-half/jamee-shenasi-2/chapter-exam/${examSlug}`);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <Link href="/exam/yazdahom/ensani/sanjesh/second-half" style={styles.backButtonLink}>
          ← بازگشت به لیست دروس
        </Link>
        <h1 style={styles.title}>📚 جامعه‌شناسی (2) - انتخاب فصل و درس</h1>
        <p style={styles.subtitle}>برای شروع، روی هر فصل کلیک کنید و سپس درس یا آزمون جامع مورد نظر را انتخاب نمایید</p>
      </div>

      <div style={styles.chaptersContainer}>
        {chapters.map((chapter) => (
          <div key={chapter.id} style={styles.chapterWrapper}>
            <button
              onClick={() => handleChapterClick(chapter.id)}
              style={{
                ...styles.chapterButton,
                backgroundColor: openChapter === chapter.id ? chapter.color : '#4a5568',
              }}
            >
              <span style={styles.chapterIcon}>{chapter.icon}</span>
              <span style={styles.chapterName}>{chapter.name}</span>
              <span style={styles.chapterArrow}>{openChapter === chapter.id ? '▲' : '▼'}</span>
            </button>

            {openChapter === chapter.id && (
              <div style={styles.lessonsContainer}>
                <div
                  style={styles.chapterExamCard}
                  onClick={() => handleChapterExamClick(chapter.examSlug)}
                >
                  <div style={styles.chapterExamIcon}>🎯</div>
                  <div style={styles.lessonInfo}>
                    <h3 style={styles.chapterExamTitle}>{chapter.examName}</h3>
                    <p style={styles.lessonDescription}>آزمون جامع تمام دروس این فصل</p>
                    <div style={styles.lessonStats}>
                      <span style={styles.questionCount}>📝 {chapter.examQuestionCount} سوال</span>
                      <span style={styles.durationBadge}>⏱️ {Math.floor(chapter.examQuestionCount * 1.5)} دقیقه</span>
                    </div>
                  </div>
                  <div style={styles.examButton}>شروع آزمون جامع →</div>
                </div>

                <div style={styles.divider}>
                  <span style={styles.dividerText}>📖 دروس فصل</span>
                </div>

                {chapter.lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    style={styles.lessonCard}
                    onClick={() => handleLessonClick(lesson.slug)}
                  >
                    <div style={styles.lessonIcon}>📘</div>
                    <div style={styles.lessonInfo}>
                      <h3 style={styles.lessonName}>{lesson.name}</h3>
                      <p style={styles.lessonDescription}>{lesson.description}</p>
                      <div style={styles.lessonStats}>
                        <span style={styles.questionCount}>📝 {lesson.questionCount} سوال</span>
                      </div>
                    </div>
                    <div style={styles.lessonButton}>شروع آزمون →</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={styles.infoBox}>
        <p>💡 نکته: برای شروع آزمون هر درس یا آزمون جامع فصل، روی آن کلیک کنید.</p>
        <p>📊 پس از اتمام هر آزمون، درصد شما به همراه پاسخنامه تشریحی نمایش داده می‌شود.</p>
        <p>🏆 آزمون‌های جامع شامل سوالات ترکیبی از تمام دروس آن فصل می‌باشند.</p>
        <p>🎯 آزمون جامع کل کتاب شامل ۴۰ سوال از تمام مباحث جامعه‌شناسی (۲) می‌باشد.</p>
      </div>

      <style>{`
        .lesson-card:hover {
          transform: translateX(5px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        .lesson-card:hover .lesson-button {
          background-color: #10b981;
        }
        .chapter-exam-card:hover {
          transform: translateX(5px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }
        .chapter-exam-card:hover .exam-button {
          background-color: #10b981;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .lessons-container {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: '100vh',
    padding: '2rem',
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem',
    
  },
  backButtonLink: {
    display: 'inline-block',
    backgroundColor: 'rgba(255,255,255,0.2)',
    color:'rgba(9, 9, 9, 0.97)',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    fontSize: '0.9rem',
    marginBottom: '1rem',
    textDecoration: 'none',
  },
  title: {
    fontSize: '2rem',
    color: 'rgba(9, 9, 9, 0.97)',
    margin: '0.5rem 0',
  },
  subtitle: {
    color: 'rgba(9, 9, 9, 0.97)',
    fontSize: '1rem',
  },
  chaptersContainer: {
    maxWidth: '900px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  chapterWrapper: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: '1rem',
    overflow: 'hidden',
  },
  chapterButton: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1.2rem 1.5rem',
    border: 'none',
    color: 'white',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  chapterIcon: {
    fontSize: '1.5rem',
  },
  chapterName: {
    flex: 1,
    textAlign: 'right',
    marginRight: '1rem',
  },
  chapterArrow: {
    fontSize: '0.9rem',
  },
  lessonsContainer: {
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem',
    backgroundColor: 'rgba(255,255,255,0.95)',
  },
  chapterExamCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1rem',
    backgroundColor: '#e8f5e9',
    borderRadius: '0.75rem',
    cursor: 'pointer',
    transition: 'all 0.2s',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    border: '1px solid #81c784',
  },
  chapterExamIcon: {
    fontSize: '2rem',
    marginRight: '1rem',
  },
  chapterExamTitle: {
    margin: 0,
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  divider: {
    textAlign: 'center',
    margin: '0.5rem 0',
    position: 'relative',
  },
  dividerText: {
    backgroundColor: '#f5f5f5',
    padding: '0.2rem 1rem',
    borderRadius: '1rem',
    fontSize: '0.75rem',
    color: '#888',
  },
  lessonCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1rem',
    backgroundColor: 'white',
    borderRadius: '0.75rem',
    cursor: 'pointer',
    transition: 'all 0.2s',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  lessonIcon: {
    fontSize: '1.8rem',
    marginRight: '1rem',
  },
  lessonInfo: {
    flex: 1,
  },
  lessonName: {
    margin: 0,
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#333',
  },
  lessonDescription: {
    margin: '0.25rem 0',
    fontSize: '0.75rem',
    color: '#666',
  },
  lessonStats: {
    marginTop: '0.25rem',
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap',
  },
  questionCount: {
    backgroundColor: '#f0f0f0',
    padding: '0.2rem 0.6rem',
    borderRadius: '1rem',
    fontSize: '0.7rem',
    color: '#555',
  },
  durationBadge: {
    backgroundColor: '#e3f2fd',
    padding: '0.2rem 0.6rem',
    borderRadius: '1rem',
    fontSize: '0.7rem',
    color: '#1565c0',
  },
  lessonButton: {
    backgroundColor: '#9C27B0',
    color: 'white',
    padding: '0.4rem 0.8rem',
    borderRadius: '2rem',
    fontSize: '0.75rem',
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    transition: 'all 0.2s',
  },
  examButton: {
    backgroundColor: '#4caf50',
    color: 'white',
    padding: '0.4rem 0.8rem',
    borderRadius: '2rem',
    fontSize: '0.75rem',
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    transition: 'all 0.2s',
  },
  infoBox: {
    backgroundColor: 'rgba(9, 9, 9, 0.1)',
    borderRadius: '1rem',
    padding: '1rem',
    marginTop: '2rem',
    maxWidth: '600px',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
    color: 'rgba(9, 9, 9, 0.97)',
  },
};