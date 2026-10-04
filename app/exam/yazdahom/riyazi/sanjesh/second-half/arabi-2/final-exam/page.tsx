"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Arabi2FinalExam = () => {
  const router = useRouter();

  // ================= سوالات جامع عربی (2) (ترکیبی از ۳ فصل) =================
  const questions = [
    // ==================== فصل اول: قواعد عربی (۱۷ سوال) ====================
    {
      id: 1,
      text: "فعل ماضی از چه اجزایی تشکیل شده است؟",
      options: ["فعل + فاعل", "فعل + مفعول", "فعل + حرف", "فعل + صفت"],
      correctIndex: 0,
      answer: "گزینه ۱: فعل ماضی از دو جزء فعل و فاعل تشکیل شده است."
    },
    {
      id: 2,
      text: "کدام یک از موارد زیر فعل مضارع است؟",
      options: ["کَتَبَ", "یَکتُبُ", "اُکتُبْ", "کاتِب"],
      correctIndex: 1,
      answer: "گزینه ۲ (یَکتُبُ): 'یَکتُبُ' فعل مضارع است زیرا با حرف مضارعه 'ی' شروع می‌شود."
    },
    {
      id: 3,
      text: "اسم فاعل از چه وزنی ساخته می‌شود؟",
      options: ["فاعِل", "مَفْعُول", "فَعّال", "مِفْعال"],
      correctIndex: 0,
      answer: "گزینه ۱: اسم فاعل به وزن 'فاعِل' ساخته می‌شود مانند 'ضارب'."
    },
    {
      id: 4,
      text: "کدام یک از موارد زیر حرف جر است؟",
      options: ["إلی", "فـ", "و", "عَن"],
      correctIndex: 0,
      answer: "گزینه ۱ (إلی): 'إلی' حرف جر است. 'فـ' و 'و' حروف عطف و 'عَن' حرف جر است."
    },
    {
      id: 5,
      text: "در جمله 'رَأَیْتُ الْکِتابَ'، کلمه 'الْکِتابَ' چه نقشی دارد؟",
      options: ["فاعل", "مفعول به", "مبتدا", "خبر"],
      correctIndex: 1,
      answer: "گزینه ۲: 'الْکِتابَ' مفعول به است و با علامت نصب (فتحه) مشخص شده است."
    },
    {
      id: 6,
      text: "اسم مصدر چیست؟",
      options: ["مصدر اصلی", "مصدر غیراصلی", "اسم فاعل", "اسم مفعول"],
      correctIndex: 1,
      answer: "گزینه ۲: اسم مصدر، مصدر غیراصلی است که از ریشه فعل ساخته می‌شود."
    },
    {
      id: 7,
      text: "کدام یک از موارد زیر اسم مفعول است؟",
      options: ["ضارِب", "مَضْرُوب", "ضَرْب", "ضَرَبَ"],
      correctIndex: 1,
      answer: "گزینه ۲ (مَضْرُوب): اسم مفعول به وزن 'مَفْعُول' ساخته می‌شود."
    },
    {
      id: 8,
      text: "در جمله 'إِنَّ اللّهَ غَفُورٌ رَحِیمٌ'، 'إِنَّ' چه نوع حرفی است؟",
      options: ["حرف جر", "حرف ندا", "حرف مشبه بالفعل", "حرف استفهام"],
      correctIndex: 2,
      answer: "گزینه ۳: 'إِنَّ' حرف مشبه بالفعل است و بر تأکید دلالت می‌کند."
    },
    {
      id: 9,
      text: "فعل امر از چه صیغه‌ای ساخته می‌شود؟",
      options: ["ماضی", "مضارع", "مضارع مجزوم", "ماضی مجزوم"],
      correctIndex: 2,
      answer: "گزینه ۳: فعل امر از مضارع مجزوم ساخته می‌شود و حرف مضارعه حذف می‌شود."
    },
    {
      id: 10,
      text: "کدام یک از موارد زیر از علائم اعراب است؟",
      options: ["فتحه", "ضمه", "کسره", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: فتحه، ضمه و کسره همه از علائم اعراب اصلی هستند."
    },
    {
      id: 11,
      text: "در جمله 'الْعِلْمُ نُورٌ'، 'نُورٌ' چه نقشی دارد؟",
      options: ["مبتدا", "خبر", "مفعول", "فاعل"],
      correctIndex: 1,
      answer: "گزینه ۲: 'نُورٌ' خبر مبتدا 'الْعِلْمُ' است و مرفوع است."
    },
    {
      id: 12,
      text: "حرف عطف کدام است؟",
      options: ["فـ", "و", "ثم", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: همه موارد 'فـ' و 'و' و 'ثم' حروف عطف هستند."
    },
    {
      id: 13,
      text: "کدام یک از موارد زیر اسم اشاره است؟",
      options: ["هذا", "الَّذی", "مَن", "کَم"],
      correctIndex: 0,
      answer: "گزینه ۱: 'هذا' اسم اشاره است. 'الَّذی' اسم موصول است."
    },
    {
      id: 14,
      text: "در جمله 'یُکْرِمُ الْمُعَلِّمُ التَّلامِیذَ'، فاعل کدام است؟",
      options: ["الْمُعَلِّمُ", "التَّلامِیذَ", "یُکْرِمُ", "هیچ کدام"],
      correctIndex: 0,
      answer: "گزینه ۱: 'الْمُعَلِّمُ' فاعل است و مرفوع است."
    },
    {
      id: 15,
      text: "کدام یک از موارد زیر از نظر وزن صرفی صحیح است؟",
      options: ["کاتِب (فاعِل)", "مَکْتُوب (مَفْعُول)", "ضَارِب (فاعِل)", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: همه موارد به درستی وزن صرفی خود را دارند."
    },
    {
      id: 16,
      text: "در جمله 'یا مُحَمَّدُ'، 'یا' چه نوع حرفی است؟",
      options: ["حرف جر", "حرف ندا", "حرف عطف", "حرف استفهام"],
      correctIndex: 1,
      answer: "گزینه ۲: 'یا' حرف ندا است و برای صدا زدن استفاده می‌شود."
    },
    {
      id: 17,
      text: "کدام یک از موارد زیر فعل معتل است؟",
      options: ["کَتَبَ", "قَالَ", "ضَرَبَ", "فَتَحَ"],
      correctIndex: 1,
      answer: "گزینه ۲ (قَالَ): فعل 'قَالَ' معتل است زیرا دارای حرف عله (الف) است."
    },

    // ==================== فصل دوم: ترجمه و مفاهیم (۱۷ سوال) ====================
    {
      id: 18,
      text: "ترجمه جمله 'الْعِلْمُ فِی الْقَلْبِ' چیست؟",
      options: ["دانش در قلب است", "علم در کتاب است", "عقل در سر است", "هیچ کدام"],
      correctIndex: 0,
      answer: "گزینه ۱: 'الْعِلْمُ فِی الْقَلْبِ' به معنای 'دانش در قلب است' می‌باشد."
    },
    {
      id: 19,
      text: "کلمه 'رَحْمَة' در قرآن به چه معناست؟",
      options: ["عذاب", "رحمت", "نعمت", "بخشش"],
      correctIndex: 1,
      answer: "گزینه ۲: 'رَحْمَة' به معنای 'رحمت' و 'مهربانی' است."
    },
    {
      id: 20,
      text: "ترجمه 'لَا إِلٰهَ إِلَّا اللّٰه' چیست؟",
      options: ["خدایی جز الله نیست", "الله بزرگ است", "لا اله الا الله", "هیچ کدام"],
      correctIndex: 0,
      answer: "گزینه ۱: 'لَا إِلٰهَ إِلَّا اللّٰه' به معنای 'خدایی جز الله نیست' است."
    },
    {
      id: 21,
      text: "کلمه 'مُؤْمِن' در قرآن به چه معناست؟",
      options: ["کافر", "منافق", "مؤمن", "مسلمان"],
      correctIndex: 2,
      answer: "گزینه ۳: 'مُؤْمِن' به معنای 'مؤمن' و 'ایمان آورنده' است."
    },
    {
      id: 22,
      text: "ترجمه 'الصَّلَاةُ مِفْتَاحُ الْجَنَّةِ' چیست؟",
      options: ["نماز کلید بهشت است", "روزه کلید بهشت است", "حج کلید بهشت است", "زکات کلید بهشت است"],
      correctIndex: 0,
      answer: "گزینه ۱: 'الصَّلَاةُ مِفْتَاحُ الْجَنَّةِ' به معنای 'نماز کلید بهشت است' می‌باشد."
    },
    {
      id: 23,
      text: "کلمه 'تَقْوَی' در قرآن به چه معناست؟",
      options: ["ترس", "خوف", "پرهیزگاری", "نافرمانی"],
      correctIndex: 2,
      answer: "گزینه ۳: 'تَقْوَی' به معنای 'پرهیزگاری' و 'خدا ترسی' است."
    },
    {
      id: 24,
      text: "ترجمه 'فَلَا تَکُونَنَّ مِنَ الْجَاهِلِینَ' چیست؟",
      options: ["پس از جاهلان مباش", "پس از عالمان باش", "پس از مؤمنان باش", "هیچ کدام"],
      correctIndex: 0,
      answer: "گزینه ۱: 'فَلَا تَکُونَنَّ مِنَ الْجَاهِلِینَ' به معنای 'پس از جاهلان مباش' است."
    },
    {
      id: 25,
      text: "کلمه 'إِحْسَان' در قرآن به چه معناست؟",
      options: ["بندگی", "نیکوکاری", "عبادت", "اطاعت"],
      correctIndex: 1,
      answer: "گزینه ۲: 'إِحْسَان' به معنای 'نیکوکاری' و 'احسان' است."
    },
    {
      id: 26,
      text: "ترجمه 'کَتَبَ اللّٰهُ الْإِیمَانَ فِی قُلُوبِهِمْ' چیست؟",
      options: ["خداوند ایمان را در دل‌هایشان نوشت", "خداوند کفر را در دل‌هایشان نوشت", "خداوند تقوا را در دل‌هایشان نوشت", "هیچ کدام"],
      correctIndex: 0,
      answer: "گزینه ۱: 'کَتَبَ اللّٰهُ الْإِیمَانَ فِی قُلُوبِهِمْ' به معنای 'خداوند ایمان را در دل‌هایشان نوشت' است."
    },
    {
      id: 27,
      text: "کلمه 'نِعْمَة' در قرآن به چه معناست؟",
      options: ["نعمت", "عذاب", "بلا", "آزمایش"],
      correctIndex: 0,
      answer: "گزینه ۱: 'نِعْمَة' به معنای 'نعمت' و 'برکت' است."
    },
    {
      id: 28,
      text: "ترجمه 'إِنَّ اللّهَ مَعَ الصَّابِرِینَ' چیست؟",
      options: ["خداوند با صابران است", "خداوند با کافران است", "خداوند با منافقان است", "هیچ کدام"],
      correctIndex: 0,
      answer: "گزینه ۱: 'إِنَّ اللّهَ مَعَ الصَّابِرِینَ' به معنای 'خداوند با صابران است' می‌باشد."
    },
    {
      id: 29,
      text: "کلمه 'شُکْر' در قرآن به چه معناست؟",
      options: ["کفران", "سپاسگزاری", "ناسپاسی", "نافرمانی"],
      correctIndex: 1,
      answer: "گزینه ۲: 'شُکْر' به معنای 'سپاسگزاری' و 'شکرگزاری' است."
    },
    {
      id: 30,
      text: "ترجمه 'وَ مَنْ یَتَّقِ اللّهَ یَجْعَلْ لَهُ مَخْرَجًا' چیست؟",
      options: ["هر کس تقوا پیشه کند، خدا برایش گشایشی قرار می‌دهد", "هر کس کفر ورزد، خدا او را عذاب می‌کند", "هر کس ایمان آورد، خدا او را می‌بخشد", "هیچ کدام"],
      correctIndex: 0,
      answer: "گزینه ۱: 'وَ مَنْ یَتَّقِ اللّهَ یَجْعَلْ لَهُ مَخْرَجًا' به معنای 'هر کس تقوا پیشه کند، خدا برایش گشایشی قرار می‌دهد' است."
    },
    {
      id: 31,
      text: "کلمه 'غَفُور' در قرآن به چه معناست؟",
      options: ["بخشنده", "مهربان", "عذاب‌دهنده", "هیچ کدام"],
      correctIndex: 0,
      answer: "گزینه ۱: 'غَفُور' به معنای 'بخشنده' و 'آمرزنده' است."
    },
    {
      id: 32,
      text: "ترجمه 'لَا تُضَارَّ وَالِدَةٌ بِوَلَدِهَا' چیست؟",
      options: ["مادری نباید به فرزندش زیان برساند", "پدری نباید به فرزندش زیان برساند", "فرزندی نباید به مادرش زیان برساند", "هیچ کدام"],
      correctIndex: 0,
      answer: "گزینه ۱: 'لَا تُضَارَّ وَالِدَةٌ بِوَلَدِهَا' به معنای 'مادری نباید به فرزندش زیان برساند' است."
    },
    {
      id: 33,
      text: "کلمه 'فَلَاح' در قرآن به چه معناست؟",
      options: ["شکست", "رستگاری", "گمراهی", "بدبختی"],
      correctIndex: 1,
      answer: "گزینه ۲: 'فَلَاح' به معنای 'رستگاری' و 'کامیابی' است."
    },
    {
      id: 34,
      text: "ترجمه 'إِنَّ اللّهَ یُحِبُّ الْمُحْسِنِینَ' چیست؟",
      options: ["خداوند نیکوکاران را دوست دارد", "خداوند بدکاران را دوست دارد", "خداوند کافران را دوست دارد", "هیچ کدام"],
      correctIndex: 0,
      answer: "گزینه ۱: 'إِنَّ اللّهَ یُحِبُّ الْمُحْسِنِینَ' به معنای 'خداوند نیکوکاران را دوست دارد' است."
    },
    {
      id: 35,
      text: "کلمه 'رِزْق' در قرآن به چه معناست؟",
      options: ["روزنه", "روزی", "درخت", "هیچ کدام"],
      correctIndex: 1,
      answer: "گزینه ۲: 'رِزْق' به معنای 'روزی' و 'نعمت' است."
    },

    // ==================== فصل سوم: صرف و نحو (۱۵ سوال) ====================
    {
      id: 36,
      text: "در جمله 'ضَرَبَ زَیْدٌ عَمْرًا'، کلمه 'زَیْدٌ' چه نقشی دارد؟",
      options: ["فاعل", "مفعول به", "مبتدا", "خبر"],
      correctIndex: 0,
      answer: "گزینه ۱: 'زَیْدٌ' فاعل است و مرفوع است."
    },
    {
      id: 37,
      text: "وزن صرفی 'مَکْتُوب' چیست؟",
      options: ["فاعِل", "مَفْعُول", "فَعّال", "مِفْعال"],
      correctIndex: 1,
      answer: "گزینه ۲: 'مَکْتُوب' به وزن 'مَفْعُول' است."
    },
    {
      id: 38,
      text: "در جمله 'الْکِتابُ جَدِیدٌ'، 'جَدِیدٌ' چه نقشی دارد؟",
      options: ["مبتدا", "خبر", "فاعل", "مفعول"],
      correctIndex: 1,
      answer: "گزینه ۲: 'جَدِیدٌ' خبر مبتدا 'الْکِتابُ' است."
    },
    {
      id: 39,
      text: "کدام یک از موارد زیر از نظر نحو صحیح است؟",
      options: ["ضَرَبَ زَیْدٌ", "ضَرَبَ عَمْرًا", "ضَرَبَ الْکِتابَ", "همه موارد"],
      correctIndex: 0,
      answer: "گزینه ۱: 'ضَرَبَ زَیْدٌ' جمله فعلیه صحیح است."
    },
    {
      id: 40,
      text: "اسم 'قِط' در جمله 'جَاءَ الْقِطُ' چه اعرابی دارد؟",
      options: ["مرفوع", "منصوب", "مجرور", "مبنی"],
      correctIndex: 0,
      answer: "گزینه ۱: 'الْقِطُ' مرفوع است زیرا فاعل است."
    },
    {
      id: 41,
      text: "کدام یک از موارد زیر فعل معلوم است؟",
      options: ["ضُرِبَ", "ضَرَبَ", "انْکَسَرَ", "کُسِرَ"],
      correctIndex: 1,
      answer: "گزینه ۲: 'ضَرَبَ' فعل معلوم است در حالی که 'ضُرِبَ' فعل مجهول است."
    },
    {
      id: 42,
      text: "در جمله 'فِی الْبَیْتِ کِتابٌ'، 'فِی الْبَیْتِ' چه نقشی دارد؟",
      options: ["مبتدا", "خبر", "جار و مجرور", "فاعل"],
      correctIndex: 2,
      answer: "گزینه ۳: 'فِی الْبَیْتِ' جار و مجرور است و خبر محسوب می‌شود."
    },
    {
      id: 43,
      text: "وزن صرفی 'کَاتِب' چیست؟",
      options: ["فاعِل", "مَفْعُول", "فَعّال", "مِفْعال"],
      correctIndex: 0,
      answer: "گزینه ۱: 'کَاتِب' به وزن 'فاعِل' است."
    },
    {
      id: 44,
      text: "در جمله 'إِنَّ زَیْدًا قَائِمٌ'، کلمه 'قَائِمٌ' چه نقشی دارد؟",
      options: ["مبتدا", "خبر", "فاعل", "مفعول"],
      correctIndex: 1,
      answer: "گزینه ۲: 'قَائِمٌ' خبر 'إِنَّ' است."
    },
    {
      id: 45,
      text: "کدام یک از موارد زیر از نظر صرفی درست است؟",
      options: ["ضَرْب (مصدر)", "ضَارِب (اسم فاعل)", "مَضْرُوب (اسم مفعول)", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: همه موارد از نظر صرفی درست هستند."
    },
    {
      id: 46,
      text: "در جمله 'الْمُسْلِمُونَ یُصَلُّونَ'، کلمه 'یُصَلُّونَ' چه نوع فعلی است؟",
      options: ["ماضی", "مضارع", "امر", "نهی"],
      correctIndex: 1,
      answer: "گزینه ۲: 'یُصَلُّونَ' فعل مضارع است."
    },
    {
      id: 47,
      text: "کدام یک از موارد زیر اسم مبنی است؟",
      options: ["کِتاب", "مِن", "زَیْد", "عَمْر"],
      correctIndex: 1,
      answer: "گزینه ۲: 'مِن' اسم مبنی است زیرا حرکت آن ثابت است."
    },
    {
      id: 48,
      text: "در جمله 'ذَهَبَ الطُّلَّابُ إِلَی الْمَدْرَسَةِ'، 'إِلَی الْمَدْرَسَةِ' چه نقشی دارد؟",
      options: ["مفعول به", "متمم", "فاعل", "مبتدا"],
      correctIndex: 1,
      answer: "گزینه ۲: 'إِلَی الْمَدْرَسَةِ' متمم است و با حرف جر 'إِلَی' آمده است."
    },
    {
      id: 49,
      text: "کدام یک از موارد زیر از نظر نحو صحیح است؟",
      options: ["الْکِتابُ جَدِیدٌ", "جَدِیدٌ الْکِتابُ", "الْکِتابُ جَدِیدَ", "هیچ کدام"],
      correctIndex: 0,
      answer: "گزینه ۱: 'الْکِتابُ جَدِیدٌ' جمله اسمیه صحیح است."
    },
    {
      id: 50,
      text: "در جمله 'لَا تَقْرَبُوا الصَّلَاةَ'، کلمه 'تَقْرَبُوا' چه نوع فعلی است؟",
      options: ["ماضی", "مضارع مجزوم", "امر", "نهی"],
      correctIndex: 3,
      answer: "گزینه ۴: 'تَقْرَبُوا' فعل نهی است زیرا با 'لا' نهی آمده است."
    }
  ];

  // State ها
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: number}>({});
  const [showAnswers, setShowAnswers] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);
  
  const [timeLeft, setTimeLeft] = useState(60 * 60); // 60 دقیقه به ثانیه
  const [isTimeUp, setIsTimeUp] = useState(false);

  useEffect(() => {
    if (isTimeUp || hasCalculated) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsTimeUp(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimeUp, hasCalculated]);

  const handleOptionClick = (questionId: number, optionIndex: number) => {
    if (isTimeUp) return;

    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: optionIndex
    });
    if (hasCalculated) {
      setHasCalculated(false);
      setScore(null);
    }
  };

  const calculateScore = () => {
    let correctCount = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });
    const percentage = (correctCount / questions.length) * 100;
    setScore(percentage);
    setHasCalculated(true);
    setIsTimeUp(true); 
  };

  useEffect(() => {
    if (isTimeUp && !hasCalculated) {
      calculateScore();
    }
  }, [isTimeUp]);

  const isAllAnswered = questions.every(q => selectedAnswers[q.id] !== undefined);
  const canCalculate = isAllAnswered && !hasCalculated && !isTimeUp;

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
          onClick={() => router.push('/exam/yazdahom/riyazi/sanjesh/second-half/arabi-2')}
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
          ← بازگشت به فصل‌ها
        </button>
        
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '28px' }}>📖 آزمون جامع کل کتاب عربی (2)</h1>
            <p style={{ marginTop: '10px', fontSize: '16px', opacity: 0.9 }}>ویژه آزمون‌های قلمچی - شامل {questions.length} سوال ترکیبی از ۳ فصل</p>
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
            gap: '10px',
            border: isTimeUp ? '2px solid #ffcccc' : '1px solid rgba(255,255,255,0.3)'
          }}>
            <span>⏱️</span>
            <span>{isTimeUp ? 'زمان تمام شد!' : formatTime(timeLeft)}</span>
          </div>
        </div>
        {!isTimeUp && <p style={{ fontSize: '14px', opacity: 0.7, marginTop: '5px' }}>زمان باقی‌مانده</p>}
      </div>

      <div style={{ width: '100%' }}>
        {questions.map((q, index) => (
          <div key={q.id} style={{
            marginBottom: '25px',
            backgroundColor: '#ffffff',
            padding: '20px 25px',
            borderRadius: '0px',
            borderBottom: '2px solid #e9ecef',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
            width: '100%'
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
                marginTop: '2px',
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
                const disabled = isTimeUp; 
                
                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionClick(q.id, idx)}
                    disabled={disabled}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '12px 18px',
                      border: isSelected ? '3px solid #2E7D32' : '1px solid #dee2e6',
                      borderRadius: '10px',
                      backgroundColor: isSelected ? '#e8f5e9' : '#fff',
                      cursor: disabled ? 'not-allowed' : 'pointer',
                      fontSize: '15px',
                      textAlign: 'right',
                      transition: 'all 0.2s',
                      width: '100%',
                      opacity: disabled && !isSelected ? 0.6 : 1
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

        {(isAllAnswered || hasCalculated || isTimeUp) && (
          <div style={{
            marginTop: '30px', 
            marginBottom: '30px', 
            padding: '20px', 
            backgroundColor: '#ffffff', 
            borderRadius: '12px', 
            border: '1px solid #dee2e6',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
              
              <div>
                {!hasCalculated ? (
                  <button
                    onClick={calculateScore}
                    disabled={!canCalculate}
                    style={{
                      padding: '12px 30px',
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
                    {!isAllAnswered && !isTimeUp ? 'لطفاً به همه سوالات پاسخ دهید' : 'محاسبه درصد'}
                  </button>
                ) : (
                  <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#2E7D32' }}>
                    ✅ درصد شما: <span style={{ color: getScoreColor(score!), fontSize: '22px' }}>{Math.round(score!)}%</span>
                    {isTimeUp && hasCalculated && <span style={{ fontSize: '14px', color: '#dc3545', marginRight: '15px' }}>(زمان پایان یافت)</span>}
                  </div>
                )}
              </div>

              {hasCalculated && (
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <div style={{
                    width: '100%',
                    height: '15px',
                    backgroundColor: '#e9ecef',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    marginTop: '5px'
                  }}>
                    <div style={{
                      width: `${score}%`,
                      height: '100%',
                      backgroundColor: getScoreColor(score!),
                      transition: 'width 0.5s ease-in-out'
                    }} />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '60px' }}>
          <button
            onClick={() => setShowAnswers(!showAnswers)}
            style={{
              padding: '18px 50px',
              fontSize: '20px',
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

        {showAnswers && (
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
              📝 پاسخنامه تشریحی آزمون جامع عربی (2)
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
                  <div style={{ fontSize: '18px', lineHeight: '2' }}>
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
                    <span style={{ fontWeight: 'bold', color: '#28a745' }}>✅ پاسخ صحیح:</span> <span style={{ fontSize: '16px' }}>{q.options[q.correctIndex]}</span>
                    <br />
                    {userAnswer !== undefined && (
                      <span>
                        <span style={{ fontWeight: 'bold', color: isCorrect ? '#28a745' : '#dc3545' }}>
                          {isCorrect ? '✔️ پاسخ شما صحیح است' : '❌ پاسخ شما نادرست است'}
                        </span>
                        <span style={{ fontSize: '16px', color: '#666', marginRight: '10px' }}>
                          (شما گزینه {String.fromCharCode(65 + userAnswer)} را انتخاب کردید)
                        </span>
                        <br />
                      </span>
                    )}
                    <span style={{ fontWeight: 'bold', color: '#2E7D32' }}>📖 توضیح کامل:</span> 
                    <br />
                    <span style={{ fontSize: '16px', lineHeight: '1.8' }}>{q.answer}</span>
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

export default Arabi2FinalExam;