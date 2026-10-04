"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Hesaban2FinalExam = () => {
  const router = useRouter();

  // ================= سوالات جامع هندسه (2) (ترکیبی از ۵ فصل) =================
  const questions = [
    // ==================== فصل اول: ترسیم‌های هندسی و استدلال (۱۰ سوال) ====================
    {
      id: 1,
      text: "برای رسم نیمساز یک زاویه، از کدام ابزار استفاده می‌شود؟",
      options: ["فقط خط‌کش", "فقط پرگار", "خط‌کش و پرگار", "گونیا"],
      correctIndex: 2,
      answer: "گزینه ۳: برای رسم نیمساز زاویه از خط‌کش و پرگار استفاده می‌شود."
    },
    {
      id: 2,
      text: "در استدلال مستقیم، برای اثبات یک گزاره چه می‌کنیم؟",
      options: ["از فرض به نتیجه می‌رسیم", "از نتیجه به فرض می‌رسیم", "فرض را نادیده می‌گیریم", "هیچ کدام"],
      correctIndex: 0,
      answer: "گزینه ۱: در استدلال مستقیم از فرض شروع کرده و با استفاده از قضایا به نتیجه می‌رسیم."
    },
    {
      id: 3,
      text: "برهان خلف چه نوع استدلالی است؟",
      options: ["مستقیم", "غیرمستقیم", "قیاسی", "استقرایی"],
      correctIndex: 1,
      answer: "گزینه ۲: برهان خلف یک استدلال غیرمستقیم است که در آن نقیض گزاره را فرض کرده و به تناقض می‌رسیم."
    },
    {
      id: 4,
      text: "برای رسم عمود منصف یک پاره‌خط از چه ابزاری استفاده می‌شود؟",
      options: ["فقط خط‌کش", "فقط پرگار", "خط‌کش و پرگار", "گونیا"],
      correctIndex: 2,
      answer: "گزینه ۳: برای رسم عمود منصف از خط‌کش و پرگار استفاده می‌شود."
    },
    {
      id: 5,
      text: "در یک مثلث، نیمسازهای داخلی در چه نقطه‌ای هم‌رأس هستند؟",
      options: ["مرکز دایره محاطی", "مرکز دایره محیطی", "نقطه تلاقی میانه‌ها", "هیچ کدام"],
      correctIndex: 0,
      answer: "گزینه ۱: نیمسازهای داخلی مثلث در مرکز دایره محاطی هم‌رأس هستند."
    },
    {
      id: 6,
      text: "در یک مثلث، عمود منصف‌های اضلاع در چه نقطه‌ای هم‌رأس هستند؟",
      options: ["مرکز دایره محاطی", "مرکز دایره محیطی", "نقطه تلاقی میانه‌ها", "هیچ کدام"],
      correctIndex: 1,
      answer: "گزینه ۲: عمود منصف‌های اضلاع مثلث در مرکز دایره محیطی هم‌رأس هستند."
    },
    {
      id: 7,
      text: "برای رسم خط موازی از یک نقطه خارج از خط، از کدام ابزار استفاده می‌شود؟",
      options: ["فقط خط‌کش", "خط‌کش و گونیا", "خط‌کش و پرگار", "فقط گونیا"],
      correctIndex: 1,
      answer: "گزینه ۲: برای رسم خط موازی از خط‌کش و گونیا استفاده می‌شود."
    },
    {
      id: 8,
      text: "در استدلال غیرمستقیم، هدف چیست؟",
      options: ["اثبات مستقیم گزاره", "رسیدن به تناقض", "نادیده گرفتن فرض", "تغییر نتیجه"],
      correctIndex: 1,
      answer: "گزینه ۲: در استدلال غیرمستقیم با فرض نقیض گزاره، به تناقض می‌رسیم و درستی گزاره را اثبات می‌کنیم."
    },
    {
      id: 9,
      text: "برای رسم یک زاویه مساوی با زاویه داده شده، از کدام ابزار استفاده می‌شود؟",
      options: ["فقط خط‌کش", "فقط پرگار", "خط‌کش و پرگار", "گونیا"],
      correctIndex: 2,
      answer: "گزینه ۳: برای رسم زاویه مساوی از خط‌کش و پرگار استفاده می‌شود."
    },
    {
      id: 10,
      text: "در یک مثلث متساوی‌الساقین، نیمساز زاویه رأس چه ویژگی دارد؟",
      options: ["عمود بر قاعده است", "موازی قاعده است", "عمود منصف قاعده است", "هیچ کدام"],
      correctIndex: 2,
      answer: "گزینه ۳: در مثلث متساوی‌الساقین، نیمساز زاویه رأس، عمود منصف قاعده است."
    },

    // ==================== فصل دوم: تبدیلات هندسی (۱۰ سوال) ====================
    {
      id: 11,
      text: "در انتقال، چه چیزی تغییر نمی‌کند؟",
      options: ["شکل", "اندازه", "جهت", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: در انتقال، شکل، اندازه و جهت همه ثابت می‌مانند."
    },
    {
      id: 12,
      text: "دوران ۱۸۰ درجه حول یک نقطه، معادل چیست؟",
      options: ["انتقال", "تجانس", "قرینه مرکزی", "قرینه محوری"],
      correctIndex: 2,
      answer: "گزینه ۳: دوران ۱۸۰ درجه حول یک نقطه، همان قرینه مرکزی است."
    },
    {
      id: 13,
      text: "در تجانس با نسبت ۲، طول هر پاره‌خط چند برابر می‌شود؟",
      options: ["۲ برابر", "۴ برابر", "نصف", "۳ برابر"],
      correctIndex: 0,
      answer: "گزینه ۱: در تجانس با نسبت ۲، طول هر پاره‌خط ۲ برابر می‌شود."
    },
    {
      id: 14,
      text: "ترکیب دو انتقال چه نوع تبدیلی است؟",
      options: ["یک انتقال", "یک دوران", "یک تجانس", "یک قرینه"],
      correctIndex: 0,
      answer: "گزینه ۱: ترکیب دو انتقال، یک انتقال است."
    },
    {
      id: 15,
      text: "در دوران، کدام نقطه ثابت می‌ماند؟",
      options: ["همه نقاط", "مرکز دوران", "نقاط روی محور", "هیچ نقطه"],
      correctIndex: 1,
      answer: "گزینه ۲: در دوران، مرکز دوران ثابت می‌ماند."
    },
    {
      id: 16,
      text: "در تجانس با نسبت منفی، شکل نسبت به مرکز تجانس چه می‌شود؟",
      options: ["بزرگتر می‌شود", "کوچکتر می‌شود", "قرینه می‌شود", "تغییر نمی‌کند"],
      correctIndex: 2,
      answer: "گزینه ۳: در تجانس با نسبت منفی، شکل قرینه می‌شود."
    },
    {
      id: 17,
      text: "قرینه یک نقطه نسبت به محور x، چه مختصاتی دارد؟",
      options: ["(x, y)", "(x, -y)", "(-x, y)", "(-x, -y)"],
      correctIndex: 1,
      answer: "گزینه ۲: قرینه نقطه (x, y) نسبت به محور x، نقطه (x, -y) است."
    },
    {
      id: 18,
      text: "قرینه یک نقطه نسبت به مبدأ مختصات، چه مختصاتی دارد؟",
      options: ["(x, y)", "(x, -y)", "(-x, y)", "(-x, -y)"],
      correctIndex: 3,
      answer: "گزینه ۴: قرینه نقطه (x, y) نسبت به مبدأ، نقطه (-x, -y) است."
    },
    {
      id: 19,
      text: "در انتقال با بردار (a, b)، نقطه (x, y) به کدام نقطه منتقل می‌شود؟",
      options: ["(x+a, y+b)", "(x-a, y-b)", "(x+a, y-b)", "(x-a, y+b)"],
      correctIndex: 0,
      answer: "گزینه ۱: در انتقال با بردار (a, b)، نقطه (x, y) به نقطه (x+a, y+b) منتقل می‌شود."
    },
    {
      id: 20,
      text: "دوران ۹۰ درجه در جهت مثبت، چه تغییری در مختصات ایجاد می‌کند؟",
      options: ["(x, y) → (y, -x)", "(x, y) → (-y, x)", "(x, y) → (-x, -y)", "(x, y) → (y, x)"],
      correctIndex: 0,
      answer: "گزینه ۱: دوران ۹۰ درجه در جهت مثبت: (x, y) → (y, -x)"
    },

    // ==================== فصل سوم: روابط طولی در مثلث (۱۰ سوال) ====================
    {
      id: 21,
      text: "قضیه تالس چه رابطه‌ای بین پاره‌خط‌ها برقرار می‌کند؟",
      options: ["نسبت مساوی", "مجموع مساوی", "تفاضل مساوی", "ضرب مساوی"],
      correctIndex: 0,
      answer: "گزینه ۱: قضیه تالس بیان می‌کند که نسبت پاره‌خط‌های متناظر برابر است."
    },
    {
      id: 22,
      text: "در مثلث قائم‌الزاویه، وتر بزرگ‌ترین ضلع است. این مطلب از چه قضیه‌ای نتیجه می‌شود؟",
      options: ["قضیه تالس", "قضیه فیثاغورس", "قضیه سینوس‌ها", "قضیه کسینوس‌ها"],
      correctIndex: 1,
      answer: "گزینه ۲: از قضیه فیثاغورس نتیجه می‌شود که وتر بزرگ‌ترین ضلع است."
    },
    {
      id: 23,
      text: "در مثلث قائم‌الزاویه با اضلاع ۳، ۴ و ۵، وتر کدام است؟",
      options: ["۳", "۴", "۵", "همه"],
      correctIndex: 2,
      answer: "گزینه ۳: در مثلث قائم‌الزاویه، وتر بزرگ‌ترین ضلع است که ۵ می‌باشد."
    },
    {
      id: 24,
      text: "نسبت‌های مثلثاتی در یک مثلث قائم‌الزاویه، به چه چیزی بستگی دارد؟",
      options: ["اندازه ضلع‌ها", "زاویه حاده", "هر دو", "هیچ کدام"],
      correctIndex: 1,
      answer: "گزینه ۲: نسبت‌های مثلثاتی فقط به زاویه حاده بستگی دارند و مستقل از اندازه ضلع‌ها هستند."
    },
    {
      id: 25,
      text: "در مثلث قائم‌الزاویه، sin A برابر است با؟",
      options: ["مجاور/وتر", "مقابل/وتر", "مقابل/مجاور", "مجاور/مقابل"],
      correctIndex: 1,
      answer: "گزینه ۲: sin A = مقابل/وتر"
    },
    {
      id: 26,
      text: "در مثلث قائم‌الزاویه، cos A برابر است با؟",
      options: ["مجاور/وتر", "مقابل/وتر", "مقابل/مجاور", "مجاور/مقابل"],
      correctIndex: 0,
      answer: "گزینه ۱: cos A = مجاور/وتر"
    },
    {
      id: 27,
      text: "در مثلث قائم‌الزاویه، tan A برابر است با؟",
      options: ["مجاور/وتر", "مقابل/وتر", "مقابل/مجاور", "مجاور/مقابل"],
      correctIndex: 2,
      answer: "گزینه ۳: tan A = مقابل/مجاور"
    },
    {
      id: 28,
      text: "اگر در یک مثلث، خطی موازی با یک ضلع رسم شود، چه نسبتی برقرار است؟",
      options: ["نسبت اضلاع برابر است", "نسبت مساحت‌ها برابر است", "نسبت زاویه‌ها برابر است", "هیچ کدام"],
      correctIndex: 0,
      answer: "گزینه ۱: طبق قضیه تالس، نسبت اضلاع متناظر برابر است."
    },
    {
      id: 29,
      text: "در مثلث قائم‌الزاویه با زاویه ۳۰ درجه، رابطه بین ضلع مقابل زاویه ۳۰ درجه و وتر چیست؟",
      options: ["برابر است", "نصف است", "دو برابر است", "سه برابر است"],
      correctIndex: 1,
      answer: "گزینه ۲: در مثلث قائم‌الزاویه با زاویه ۳۰ درجه، ضلع مقابل زاویه ۳۰ درجه نصف وتر است."
    },
    {
      id: 30,
      text: "در مثلث قائم‌الزاویه با زاویه ۴۵ درجه، دو ضلع زاویه قائمه چه رابطه‌ای دارند؟",
      options: ["با هم برابرند", "یکی نصف دیگری است", "یکی دو برابر دیگری است", "هیچ کدام"],
      correctIndex: 0,
      answer: "گزینه ۱: در مثلث قائم‌الزاویه با زاویه ۴۵ درجه، دو ضلع زاویه قائمه با هم برابرند."
    },

    // ==================== فصل چهارم: چندضلعی‌ها و دایره (۱۰ سوال) ====================
    {
      id: 31,
      text: "چندضلعی محاطی چه ویژگی دارد؟",
      options: ["همه رأس‌ها روی دایره هستند", "همه ضلع‌ها بر دایره مماس هستند", "همه زاویه‌ها برابرند", "هیچ کدام"],
      correctIndex: 0,
      answer: "گزینه ۱: در چندضلعی محاطی، همه رأس‌ها روی دایره قرار دارند."
    },
    {
      id: 32,
      text: "چندضلعی محیطی چه ویژگی دارد؟",
      options: ["همه رأس‌ها روی دایره هستند", "همه ضلع‌ها بر دایره مماس هستند", "همه زاویه‌ها برابرند", "هیچ کدام"],
      correctIndex: 1,
      answer: "گزینه ۲: در چندضلعی محیطی، همه ضلع‌ها بر دایره مماس هستند."
    },
    {
      id: 33,
      text: "در چهارضلعی محاطی، مجموع دو زاویه مقابل چند درجه است؟",
      options: ["۹۰", "۱۸۰", "۲۷۰", "۳۶۰"],
      correctIndex: 1,
      answer: "گزینه ۲: در چهارضلعی محاطی، مجموع دو زاویه مقابل برابر ۱۸۰ درجه است."
    },
    {
      id: 34,
      text: "قضیه بطلمیوس برای چه نوع چهارضلعی‌هایی کاربرد دارد؟",
      options: ["چهارضلعی محیطی", "چهارضلعی محاطی", "چهارضلعی متساوی‌الساقین", "چهارضلعی عمودی"],
      correctIndex: 1,
      answer: "گزینه ۲: قضیه بطلمیوس برای چهارضلعی‌های محاطی کاربرد دارد."
    },
    {
      id: 35,
      text: "در قضیه بطلمیوس، حاصلضرب قطرها برابر است با؟",
      options: ["مجموع اضلاع", "مجموع حاصلضرب اضلاع مقابل", "مجموع زاویه‌ها", "هیچ کدام"],
      correctIndex: 1,
      answer: "گزینه ۲: در قضیه بطلمیوس، حاصلضرب قطرها برابر با مجموع حاصلضرب اضلاع مقابل است."
    },
    {
      id: 36,
      text: "شرط محاطی بودن یک چهارضلعی چیست؟",
      options: ["مجموع دو زاویه مقابل ۱۸۰ است", "اضلاع برابرند", "قطرها برابرند", "همه اضلاع بر دایره مماسند"],
      correctIndex: 0,
      answer: "گزینه ۱: شرط محاطی بودن چهارضلعی این است که مجموع دو زاویه مقابل ۱۸۰ درجه باشد."
    },
    {
      id: 37,
      text: "در چهارضلعی محیطی، مجموع دو ضلع مقابل چه رابطه‌ای دارد؟",
      options: ["برابرند", "اختلاف دارند", "مجموع برابر است", "هیچ کدام"],
      correctIndex: 0,
      answer: "گزینه ۱: در چهارضلعی محیطی، مجموع دو ضلع مقابل با هم برابرند."
    },
    {
      id: 38,
      text: "چهارضلعی که هم محاطی و هم محیطی باشد، چه نام دارد؟",
      options: ["مربع", "لوزی", "مستطیل", "ذوزنقه"],
      correctIndex: 0,
      answer: "گزینه ۱: مربع تنها چهارضلعی است که هم محاطی و هم محیطی است."
    },
    {
      id: 39,
      text: "در یک چندضلعی محاطی، مرکز دایره چه نام دارد؟",
      options: ["مرکز ثقل", "مرکز محاطی", "مرکز محیطی", "هیچ کدام"],
      correctIndex: 2,
      answer: "گزینه ۳: مرکز دایره در چندضلعی محاطی، مرکز محیطی نام دارد."
    },
    {
      id: 40,
      text: "در یک چندضلعی محیطی، مرکز دایره چه نام دارد؟",
      options: ["مرکز ثقل", "مرکز محاطی", "مرکز محیطی", "هیچ کدام"],
      correctIndex: 1,
      answer: "گزینه ۲: مرکز دایره در چندضلعی محیطی، مرکز محاطی نام دارد."
    },

    // ==================== فصل پنجم: اندازه‌گیری و محاسبه در دایره (۱۰ سوال) ====================
    {
      id: 41,
      text: "زاویه مرکزی چیست؟",
      options: ["زاویه با رأس روی دایره", "زاویه با رأس در مرکز دایره", "زاویه با رأس خارج دایره", "هیچ کدام"],
      correctIndex: 1,
      answer: "گزینه ۲: زاویه مرکزی، زاویه‌ای است که رأس آن در مرکز دایره قرار دارد."
    },
    {
      id: 42,
      text: "زاویه محاطی چیست؟",
      options: ["زاویه با رأس روی دایره", "زاویه با رأس در مرکز دایره", "زاویه با رأس خارج دایره", "هیچ کدام"],
      correctIndex: 0,
      answer: "گزینه ۱: زاویه محاطی، زاویه‌ای است که رأس آن روی دایره قرار دارد."
    },
    {
      id: 43,
      text: "رابطه بین زاویه مرکزی و کمان مقابل آن چیست؟",
      options: ["برابر است", "دو برابر است", "نصف است", "سه برابر است"],
      correctIndex: 0,
      answer: "گزینه ۱: اندازه زاویه مرکزی برابر با اندازه کمان مقابل آن است."
    },
    {
      id: 44,
      text: "رابطه بین زاویه محاطی و کمان مقابل آن چیست؟",
      options: ["برابر است", "دو برابر است", "نصف است", "سه برابر است"],
      correctIndex: 2,
      answer: "گزینه ۳: اندازه زاویه محاطی نصف اندازه کمان مقابل آن است."
    },
    {
      id: 45,
      text: "محیط دایره با شعاع r برابر است با؟",
      options: ["πr", "2πr", "πr²", "2πr²"],
      correctIndex: 1,
      answer: "گزینه ۲: محیط دایره = 2πr"
    },
    {
      id: 46,
      text: "مساحت دایره با شعاع r برابر است با؟",
      options: ["πr", "2πr", "πr²", "2πr²"],
      correctIndex: 2,
      answer: "گزینه ۳: مساحت دایره = πr²"
    },
    {
      id: 47,
      text: "اگر دو وتر در یک دایره با هم برابر باشند، کمان‌های مقابل آنها چه رابطه‌ای دارند؟",
      options: ["برابرند", "یکی دو برابر دیگری است", "نصف هستند", "هیچ کدام"],
      correctIndex: 0,
      answer: "گزینه ۱: اگر دو وتر در یک دایره برابر باشند، کمان‌های مقابل آنها نیز برابرند."
    },
    {
      id: 48,
      text: "در یک دایره، وتر بزرگ‌تر به چه کمانی روبرو است؟",
      options: ["کمان بزرگ‌تر", "کمان کوچک‌تر", "کمان مساوی", "هیچ کدام"],
      correctIndex: 0,
      answer: "گزینه ۱: در یک دایره، وتر بزرگ‌تر به کمان بزرگ‌تر روبرو است."
    },
    {
      id: 49,
      text: "مساحت یک بخش دایره با زاویه مرکزی θ (بر حسب رادیان) برابر است با؟",
      options: ["(θ/2)r²", "(θ/2)r", "θr²", "θr"],
      correctIndex: 0,
      answer: "گزینه ۱: مساحت بخش دایره = (θ/2)r² که θ بر حسب رادیان است."
    },
    {
      id: 50,
      text: "طول کمان یک دایره با زاویه مرکزی θ (بر حسب رادیان) برابر است با؟",
      options: ["θr", "θr²", "(θ/2)r", "2θr"],
      correctIndex: 0,
      answer: "گزینه ۱: طول کمان دایره = θr که θ بر حسب رادیان است."
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
        backgroundColor: '#E91E63',
        color: 'white',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '30px',
        textAlign: 'center',
        position: 'relative'
      }}>
        <button 
          onClick={() => router.push('http://localhost:3000/exam/yazdahom/riyazi/kheili%20sabz/second-half/hesaban-1')}
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
            <h1 style={{ margin: 0, fontSize: '28px' }}>📐 آزمون جامع کل کتاب حسابان </h1>
            <p style={{ marginTop: '10px', fontSize: '16px', opacity: 0.9 }}>ویژه آزمون‌های قلمچی - شامل {questions.length} سوال ترکیبی از ۵ فصل</p>
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
                backgroundColor: '#E91E63',
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
                      border: isSelected ? '3px solid #E91E63' : '1px solid #dee2e6',
                      borderRadius: '10px',
                      backgroundColor: isSelected ? '#fce4ec' : '#fff',
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
                      backgroundColor: isSelected ? '#E91E63' : '#fff',
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
                      backgroundColor: canCalculate ? '#E91E63' : '#6c757d',
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
                  <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#E91E63' }}>
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
            borderTop: '4px solid #E91E63',
            paddingTop: '40px',
            backgroundColor: '#ffffff',
            padding: '40px',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
            width: '100%'
          }}>
            <h2 style={{ 
              textAlign: 'center', 
              borderBottom: '3px solid #E91E63', 
              paddingBottom: '20px', 
              marginBottom: '40px',
              fontSize: '26px',
              color: '#E91E63'
            }}>
              📝 پاسخنامه تشریحی آزمون جامع هندسه (2)
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
                      color: '#E91E63',
                      backgroundColor: '#fce4ec',
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
                    <span style={{ fontWeight: 'bold', color: '#E91E63' }}>📖 توضیح کامل:</span> 
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

export default Hesaban2FinalExam;