"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const DinVaZendegi2FinalExam = () => {
  const router = useRouter();

  // ================= سوالات جامع دین و زندگی (2) (ترکیبی از ۴ فصل) =================
  const questions = [
    // ==================== فصل اول: هستی و خداشناسی (۱۲ سوال) ====================
    {
      id: 1,
      text: "کدام یک از موارد زیر از راه‌های خداشناسی است؟",
      options: ["برهان نظم", "برهان علّی", "فطرت", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: برهان نظم، برهان علّی و فطرت همه از راه‌های خداشناسی هستند."
    },
    {
      id: 2,
      text: "صفات جمالی خداوند کدامند؟",
      options: ["حیات، علم، قدرت", "عدل، انتقام، جلال", "غضب، قهر، عزت", "هیچ کدام"],
      correctIndex: 0,
      answer: "گزینه ۱: صفات جمالی مانند حیات، علم و قدرت هستند که بیانگر کمال خداوندند."
    },
    {
      id: 3,
      text: "توحید به چه معناست؟",
      options: ["یگانه دانستن خدا", "سه دانستن خدا", "انکار خدا", "هیچ کدام"],
      correctIndex: 0,
      answer: "گزینه ۱: توحید یعنی یگانه دانستن خدا و اعتقاد به یکتایی او."
    },
    {
      id: 4,
      text: "کدام یک از موارد زیر از صفات جلالی خداوند است؟",
      options: ["رحمان", "رحیم", "جبار", "کریم"],
      correctIndex: 2,
      answer: "گزینه ۳: 'جبار' از صفات جلالی خداوند است که بیانگر جبروت و قدرت اوست."
    },
    {
      id: 5,
      text: "برهان نظم بر چه اساسی استوار است؟",
      options: ["وجود نظم در جهان", "وجود شواهد تاریخی", "احساسات انسانی", "هیچ کدام"],
      correctIndex: 0,
      answer: "گزینه ۱: برهان نظم بر اساس وجود نظم و هماهنگی در جهان استوار است."
    },
    {
      id: 6,
      text: "اسم اعظم خداوند در قرآن کدام است؟",
      options: ["اللّه", "رحمان", "رحیم", "قدوس"],
      correctIndex: 0,
      answer: "گزینه ۱: 'اللّه' اسم اعظم خداوند است که در قرآن بسیار به کار رفته است."
    },
    {
      id: 7,
      text: "شرک به چه معناست؟",
      options: ["یگانه دانستن خدا", "شریک قائل شدن برای خدا", "انکار خدا", "نادیده گرفتن خدا"],
      correctIndex: 1,
      answer: "گزینه ۲: شرک یعنی برای خدا شریک قائل شدن و چیزی را هم‌تای او دانستن."
    },
    {
      id: 8,
      text: "صفات خداوند به چند دسته تقسیم می‌شوند؟",
      options: ["یک دسته", "دو دسته", "سه دسته", "چهار دسته"],
      correctIndex: 1,
      answer: "گزینه ۲: صفات خداوند به دو دسته صفات جمالی و صفات جلالی تقسیم می‌شوند."
    },
    {
      id: 9,
      text: "کدام یک از موارد زیر از آثار توحید در زندگی است؟",
      options: ["امیدواری", "استقلال", "آرامش", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: توحید آثار زیادی مانند امیدواری، استقلال و آرامش در زندگی دارد."
    },
    {
      id: 10,
      text: "برهان علّی بر چه اساسی استوار است؟",
      options: ["وجود علت برای هر پدیده", "وجود نظم در جهان", "احساسات انسانی", "هیچ کدام"],
      correctIndex: 0,
      answer: "گزینه ۱: برهان علّی بر اساس وجود علت برای هر پدیده استوار است."
    },
    {
      id: 11,
      text: "کدام یک از موارد زیر از اسماء و صفات خداوند است؟",
      options: ["الرحمن", "الرحیم", "الملك", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: الرحمن، الرحیم و الملك همه از اسماء و صفات خداوند هستند."
    },
    {
      id: 12,
      text: "آیه 'لَيْسَ كَمِثْلِهِ شَيْءٌ' بر چه موضوعی دلالت دارد؟",
      options: ["توحید", "تنزیه خداوند", "نفی شباهت خدا به مخلوقات", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: این آیه بر توحید، تنزیه و نفی شباهت خداوند به مخلوقات دلالت دارد."
    },

    // ==================== فصل دوم: نبوت و امامت (۱۳ سوال) ====================
    {
      id: 13,
      text: "ضرورت نبوت به چه دلیل است؟",
      options: ["نیاز بشر به هدایت", "نیاز به قوانین الهی", "تعالی انسان", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: انسان برای هدایت، قوانین الهی و تعالی به نبوت نیاز دارد."
    },
    {
      id: 14,
      text: "عصمت پیامبران به چه معناست؟",
      options: ["خطا نکردن در رسالت", "گناه نکردن", "مصون از اشتباه", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: عصمت یعنی مصونیت از گناه، خطا و اشتباه در رسالت الهی."
    },
    {
      id: 15,
      text: "ویژگی‌های امام در دیدگاه شیعه کدام است؟",
      options: ["عصمت", "علم لدنی", "نصب الهی", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: امام در دیدگاه شیعه باید معصوم، دارای علم لدنی و منصوب از طرف خدا باشد."
    },
    {
      id: 16,
      text: "آیه 'إِنَّمَا وَلِیُّكُمُ اللّٰهُ وَ رَسُولُهُ وَ الَّذِینَ آمَنُوا' در شأن چه کسی نازل شده است؟",
      options: ["امام علی (ع)", "ابوبکر", "عمر", "عثمان"],
      correctIndex: 0,
      answer: "گزینه ۱: این آیه در شأن امام علی (ع) و درباره ولایت ایشان نازل شده است."
    },
    {
      id: 17,
      text: "عصمت پیامبران چه نقشی در هدایت دارد؟",
      options: ["افزایش اعتماد مردم", "کاهش خطا", "تضمین درست بودن پیام", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: عصمت باعث افزایش اعتماد، کاهش خطا و تضمین درست بودن پیام الهی می‌شود."
    },
    {
      id: 18,
      text: "امامت چه تفاوتی با نبوت دارد؟",
      options: ["امامت ادامه‌دهنده نبوت است", "نبوت بالاتر از امامت است", "امامت دارای ولایت است", "همه موارد"],
      correctIndex: 0,
      answer: "گزینه ۱: امامت ادامه‌دهنده نبوت و دارای ولایت سیاسی و دینی است."
    },
    {
      id: 19,
      text: "کدام یک از پیامبران دارای کتاب آسمانی هستند؟",
      options: ["موسی (ع)", "عیسی (ع)", "محمد (ص)", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: حضرت موسی (تورات)، عیسی (انجیل) و محمد (قرآن) دارای کتاب آسمانی هستند."
    },
    {
      id: 20,
      text: "حدیث غدیر درباره چه موضوعی است؟",
      options: ["ولایت امام علی (ع)", "خدا شناسی", "معاد", "اخلاق"],
      correctIndex: 0,
      answer: "گزینه ۱: حدیث غدیر درباره ولایت و جانشینی امام علی (ع) است."
    },
    {
      id: 21,
      text: "دلیل عصمت امام در دیدگاه شیعه چیست؟",
      options: ["آیات قرآن", "روایات", "عقل", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: عصمت امام بر اساس آیات قرآن، روایات و عقل اثبات می‌شود."
    },
    {
      id: 22,
      text: "پیامبر اسلام (ص) در چه سالی به پیامبری مبعوث شد؟",
      options: ["۵۷۰ میلادی", "۶۱۰ میلادی", "۶۲۲ میلادی", "۶۳۲ میلادی"],
      correctIndex: 1,
      answer: "گزینه ۲: پیامبر اسلام (ص) در سال ۶۱۰ میلادی به پیامبری مبعوث شدند."
    },
    {
      id: 23,
      text: "کدام یک از موارد زیر از ویژگی‌های امامان معصوم است؟",
      options: ["علم غیب", "شفاعت", "ولایت تکوینی", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: امامان معصوم دارای علم غیب، شفاعت و ولایت تکوینی هستند."
    },
    {
      id: 24,
      text: "نقش اهل بیت در تفسیر قرآن چیست؟",
      options: ["تفسیر کامل قرآن", "بیان شأن نزول", "تأویل آیات", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: اهل بیت نقش مهمی در تفسیر کامل قرآن، بیان شأن نزول و تأویل آیات دارند."
    },
    {
      id: 25,
      text: "آیه 'أَطِیعُوا اللّٰهَ وَ أَطِیعُوا الرَّسُولَ وَ أُولِي الْأَمْرِ مِنکُمْ' بر چه موضوعی دلالت دارد؟",
      options: ["لزوم اطاعت از خدا", "اطاعت از پیامبر", "اطاعت از اولی الامر", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: این آیه بر لزوم اطاعت از خدا، پیامبر و اولی الامر (امامان) دلالت دارد."
    },

    // ==================== فصل سوم: معاد و آخرت‌شناسی (۱۲ سوال) ====================
    {
      id: 26,
      text: "معاد به چه معناست؟",
      options: ["زندگی دوباره", "مرگ", "جهنم", "بهشت"],
      correctIndex: 0,
      answer: "گزینه ۱: معاد به معنای زندگی دوباره و رستاخیز پس از مرگ است."
    },
    {
      id: 27,
      text: "برزخ به چه معناست؟",
      options: ["عالم پس از مرگ تا قیامت", "جهنم", "بهشت", "هیچ کدام"],
      correctIndex: 0,
      answer: "گزینه ۱: برزخ عالم فاصله بین مرگ تا قیامت است که انسان در آن به سر می‌برد."
    },
    {
      id: 28,
      text: "در قیامت چه وقایعی رخ می‌دهد؟",
      options: ["حساب و کتاب", "پاداش و کیفر", "نور و ظلمت", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: در قیامت حساب و کتاب، پاداش و کیفر و نور و ظلمت رخ می‌دهد."
    },
    {
      id: 29,
      text: "بهشت در قرآن چگونه توصیف شده است؟",
      options: ["باغ‌هایی با نهرهای جاری", "میوه‌های فراوان", "نعمت‌های جاودان", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: بهشت در قرآن به باغ‌هایی با نهرهای جاری، میوه‌های فراوان و نعمت‌های جاودان توصیف شده است."
    },
    {
      id: 30,
      text: "جهنم در قرآن چگونه توصیف شده است؟",
      options: ["آتش سوزان", "غذای زقوم", "زنجیر و غل و زنجیر", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: جهنم در قرآن به آتش سوزان، غذای زقوم و زنجیر و غل و زنجیر توصیف شده است."
    },
    {
      id: 31,
      text: "دلیل عقلی معاد چیست؟",
      options: ["عدالت الهی", "حکمت الهی", "وعد و وعید الهی", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: عدالت الهی، حکمت الهی و وعد و وعید الهی از دلایل عقلی معاد هستند."
    },
    {
      id: 32,
      text: "در روز قیامت چه کتابی به انسان داده می‌شود؟",
      options: ["کتاب اعمال", "کتاب دعا", "کتاب قرآن", "هیچ کدام"],
      correctIndex: 0,
      answer: "گزینه ۱: در روز قیامت به انسان کتاب اعمال او داده می‌شود که همه کارهایش در آن ثبت شده است."
    },
    {
      id: 33,
      text: "نعمت‌های بهشتی از چه نوعی هستند؟",
      options: ["مادی", "معنوی", "هر دو", "هیچ کدام"],
      correctIndex: 2,
      answer: "گزینه ۳: نعمت‌های بهشتی هم مادی و هم معنوی هستند و از هر دو نوع لذت دارند."
    },
    {
      id: 34,
      text: "عذاب‌های جهنمی از چه نوعی هستند؟",
      options: ["فیزیکی", "روحی", "هر دو", "هیچ کدام"],
      correctIndex: 2,
      answer: "گزینه ۳: عذاب‌های جهنمی هم فیزیکی و هم روحی هستند و از هر دو نوع رنج دارند."
    },
    {
      id: 35,
      text: "آیه 'كُلُّ نَفْسٍ ذَائِقَةُ الْمَوْتِ' بر چه موضوعی دلالت دارد؟",
      options: ["مرگ", "زندگی", "معاد", "هیچ کدام"],
      correctIndex: 0,
      answer: "گزینه ۱: این آیه بر حتمی بودن مرگ برای هر انسانی دلالت دارد."
    },
    {
      id: 36,
      text: "هدف از آفرینش انسان چیست؟",
      options: ["عبادت", "آزمایش", "رسیدن به کمال", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: هدف از آفرینش انسان عبادت، آزمایش و رسیدن به کمال است."
    },
    {
      id: 37,
      text: "در قیامت انسان‌ها به چند گروه تقسیم می‌شوند؟",
      options: ["دو گروه", "سه گروه", "چهار گروه", "پنج گروه"],
      correctIndex: 1,
      answer: "گزینه ۲: در قیامت انسان‌ها به سه گروه مؤمنان، کافران و منافقان تقسیم می‌شوند."
    },

    // ==================== فصل چهارم: اخلاق و سبک زندگی (۱۳ سوال) ====================
    {
      id: 38,
      text: "اخلاق فردی به چه موضوعاتی می‌پردازد؟",
      options: ["خودسازی", "تزکیه نفس", "مبارزه با رذایل", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: اخلاق فردی به خودسازی، تزکیه نفس و مبارزه با رذایل اخلاقی می‌پردازد."
    },
    {
      id: 39,
      text: "عدالت در اسلام چه جایگاهی دارد؟",
      options: ["ارزشی اساسی", "فرعی", "غیر ضروری", "هیچ کدام"],
      correctIndex: 0,
      answer: "گزینه ۱: عدالت در اسلام ارزشی اساسی و زیربنایی دارد و بر همه ابعاد زندگی حاکم است."
    },
    {
      id: 40,
      text: "احسان به چه معناست؟",
      options: ["نیکوکاری", "بدکاری", "بی‌تفاوتی", "هیچ کدام"],
      correctIndex: 0,
      answer: "گزینه ۱: احسان به معنای نیکوکاری و انجام کارهای خیر برای دیگران است."
    },
    {
      id: 41,
      text: "سبک زندگی اسلامی بر چه اصولی استوار است؟",
      options: ["توحید", "عدالت", "اخلاق", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: سبک زندگی اسلامی بر اصول توحید، عدالت و اخلاق استوار است."
    },
    {
      id: 42,
      text: "نقش خانواده در اسلام چیست؟",
      options: ["محیط تربیت", "محیط آرامش", "محیط رشد", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: خانواده در اسلام محیط تربیت، آرامش و رشد اعضای خود است."
    },
    {
      id: 43,
      text: "اقتصاد در اسلام بر چه اصولی استوار است؟",
      options: ["عدالت", "اخلاق", "انصاف", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: اقتصاد در اسلام بر اصول عدالت، اخلاق و انصاف استوار است."
    },
    {
      id: 44,
      text: "رذایل اخلاقی کدامند؟",
      options: ["حسد", "کبر", "بخل", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: حسد، کبر و بخل از رذایل اخلاقی هستند که انسان باید با آنها مبارزه کند."
    },
    {
      id: 45,
      text: "فضایل اخلاقی کدامند؟",
      options: ["تواضع", "سخاوت", "حلم", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: تواضع، سخاوت و حلم از فضایل اخلاقی هستند که انسان باید آنها را کسب کند."
    },
    {
      id: 46,
      text: "اسلام به تغذیه سالم چه نگاهی دارد؟",
      options: ["مهم", "بی‌اهمیت", "ممنوع", "هیچ کدام"],
      correctIndex: 0,
      answer: "گزینه ۱: اسلام به تغذیه سالم و بهداشت فردی اهمیت زیادی می‌دهد."
    },
    {
      id: 47,
      text: "حقوق دیگران در اسلام چه جایگاهی دارد؟",
      options: ["بسیار مهم", "بی‌اهمیت", "فرعی", "هیچ کدام"],
      correctIndex: 0,
      answer: "گزینه ۱: حقوق دیگران در اسلام بسیار مهم است و رعایت آن از واجبات است."
    },
    {
      id: 48,
      text: "تزکیه نفس به چه معناست؟",
      options: ["پالایش روح", "آراستن به اخلاق نیک", "هر دو", "هیچ کدام"],
      correctIndex: 2,
      answer: "گزینه ۳: تزکیه نفس هم به معنای پالایش روح از رذایل و هم آراستن به فضایل اخلاقی است."
    },
    {
      id: 49,
      text: "آیه 'إِنَّ اللّهَ یَأْمُرُ بِالْعَدْلِ وَ الْإِحْسَانِ' بر چه موضوعی دلالت دارد؟",
      options: ["عدالت و احسان", "نماز و روزه", "حج و زکات", "هیچ کدام"],
      correctIndex: 0,
      answer: "گزینه ۱: این آیه بر لزوم عدالت و احسان در زندگی دلالت دارد."
    },
    {
      id: 50,
      text: "هدف نهایی اخلاق اسلامی چیست؟",
      options: ["قرب الهی", "خوشبختی دنیوی", "ثروت", "شهرت"],
      correctIndex: 0,
      answer: "گزینه ۱: هدف نهایی اخلاق اسلامی، قرب الهی و رسیدن به کمال انسانی است."
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
        backgroundColor: '#1A237E',
        color: 'white',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '30px',
        textAlign: 'center',
        position: 'relative'
      }}>
        <button 
          onClick={() => router.push('/exam/yazdahom/riyazi/maz/first-half/din-va-zendegi-2')}
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
            <h1 style={{ margin: 0, fontSize: '28px' }}>🕌 آزمون جامع کل کتاب دین و زندگی (2)</h1>
            <p style={{ marginTop: '10px', fontSize: '16px', opacity: 0.9 }}>ویژه آزمون‌های قلمچی - شامل {questions.length} سوال ترکیبی از ۴ فصل</p>
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
                backgroundColor: '#1A237E',
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
                      border: isSelected ? '3px solid #1A237E' : '1px solid #dee2e6',
                      borderRadius: '10px',
                      backgroundColor: isSelected ? '#e8eaf6' : '#fff',
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
                      backgroundColor: canCalculate ? '#1A237E' : '#6c757d',
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
                  <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#1A237E' }}>
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
              📝 پاسخنامه تشریحی آزمون جامع دین و زندگی (2)
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
                    <span style={{ fontWeight: 'bold', color: '#1A237E' }}>📖 توضیح کامل:</span> 
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

export default DinVaZendegi2FinalExam;