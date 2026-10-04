"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Shimi2FinalExam = () => {
  const router = useRouter();

  // ================= سوالات جامع شیمی (2) (ترکیبی از ۳ فصل) =================
  const questions = [
    // ==================== فصل اول: قدر هدایای زمینی را بدانیم (۱۰ سوال) ====================
    {
      id: 1,
      text: "در آرایش الکترونی عنصر ۱۷Cl، تعداد الکترون‌های لایه ظرفیت چند است؟",
      options: ["۵", "۷", "۸", "۱۰"],
      correctIndex: 1,
      answer: "گزینه ۲ (۷): آرایش الکترونی کلر: ۱s² ۲s² ۲p⁶ ۳s² ۳p⁵ → لایه ظرفیت (n=۳) شامل ۲+۵ = ۷ الکترون است."
    },
    {
      id: 2,
      text: "کدام یک از عناصر زیر بیشترین الکترونگاتیوی را دارد؟",
      options: ["F", "O", "Cl", "N"],
      correctIndex: 0,
      answer: "گزینه ۱ (F): فلوئور با الکترونگاتیوی ۴.۰ بیشترین الکترونگاتیوی را در بین عناصر جدول تناوبی دارد."
    },
    {
      id: 3,
      text: "در واکنش ۲H₂ + O₂ → ۲H₂O، اگر ۴ گرم هیدروژن با ۳۲ گرم اکسیژن واکنش دهد، چند گرم آب تولید می‌شود؟ (H=1, O=16)",
      options: ["۱۸", "۲۴", "۳۶", "۴۰"],
      correctIndex: 2,
      answer: "گزینه ۳ (۳۶): ۴ گرم H₂ = ۲ مول و ۳۲ گرم O₂ = ۱ مول. طبق استوکیومتری ۲ مول H₂ با ۱ مول O₂ واکنش می‌دهد → ۲ مول آب = ۳۶ گرم."
    },
    {
      id: 4,
      text: "نام IUPAC ترکیب CH₃-CH₂-CH₂-CH₃ چیست؟",
      options: ["بوتان", "پروپان", "پنتان", "هگزان"],
      correctIndex: 0,
      answer: "گزینه ۱ (بوتان): این ترکیب دارای ۴ اتم کربن است و یک آلکان با فرمول C₄H₁₀ است که بوتان نام دارد."
    },
    {
      id: 5,
      text: "کدام یک از موارد زیر مربوط به آرایش الکترونی صحیح است؟",
      options: [
        "در اوربیتال p حداکثر ۶ الکترون قرار می‌گیرد",
        "عدد کوانتومی اصلی (n) نشان‌دهنده شکل اوربیتال است",
        "الکترون‌ها ابتدا اوربیتال‌های با انرژی بالاتر را پر می‌کنند",
        "هر اوربیتال s گنجایش ۲ الکترون با اسپین مخالف را دارد"
      ],
      correctIndex: 3,
      answer: "گزینه ۴: هر اوربیتال s حداکثر ۲ الکترون با اسپین مخالف را در خود جای می‌دهد (اصل طرد پائولی)."
    },
    {
      id: 6,
      text: "انرژی یونش یک عنصر به چه عواملی بستگی دارد؟",
      options: [
        "فقط به شعاع اتمی",
        "فقط به بار هسته",
        "به شعاع اتمی و بار هسته",
        "به تعداد نوترون‌ها"
      ],
      correctIndex: 2,
      answer: "گزینه ۳: انرژی یونش به شعاع اتمی (فاصله الکترون از هسته) و بار هسته (نیروی جاذبه) بستگی دارد."
    },
    {
      id: 7,
      text: "در جدول تناوبی، روند تغییر شعاع اتمی در یک دوره از چپ به راست چگونه است؟",
      options: ["افزایشی", "کاهشی", "ثابت", "ناپایدار"],
      correctIndex: 1,
      answer: "گزینه ۲ (کاهشی): با افزایش عدد اتمی در یک دوره، بار هسته افزایش یافته و الکترون‌ها بیشتر جذب می‌شوند → شعاع اتمی کاهش می‌یابد."
    },
    {
      id: 8,
      text: "کدام یک از عناصر زیر در گروه ۱۷ جدول تناوبی قرار دارد؟",
      options: ["O", "S", "Cl", "N"],
      correctIndex: 2,
      answer: "گزینه ۳ (Cl): کلر در گروه ۱۷ (هالوژن‌ها) قرار دارد و دارای ۷ الکترون ظرفیت است."
    },
    {
      id: 9,
      text: "کدام یک از موارد زیر مربوط به روند تناوبی شعاع اتمی است؟",
      options: [
        "از چپ به راست در یک دوره افزایش می‌یابد",
        "از چپ به راست در یک دوره کاهش می‌یابد",
        "از بالا به پایین در یک گروه کاهش می‌یابد",
        "ثابت است"
      ],
      correctIndex: 1,
      answer: "گزینه ۲: از چپ به راست در یک دوره، شعاع اتمی کاهش می‌یابد زیرا بار هسته افزایش می‌یابد."
    },
    {
      id: 10,
      text: "در یک واکنش استوکیومتری، اگر ۱ مول A با ۲ مول B واکنش دهد، نسبت مولی A به B برابر چیست؟",
      options: ["۱:۱", "۱:۲", "۲:۱", "۱:۳"],
      correctIndex: 1,
      answer: "گزینه ۲ (۱:۲): نسبت مولی A به B برابر ۱:۲ است (۱ مول A با ۲ مول B واکنش می‌دهد)."
    },

    // ==================== فصل دوم: پیوندها و انرژی شیمیایی (۱۰ سوال) ====================
    {
      id: 11,
      text: "واکنش ۲H₂ + O₂ → ۲H₂O + انرژی، چه نوع واکنشی است؟",
      options: ["گرمازا", "گرماگیر", "خنثی", "پایدار"],
      correctIndex: 0,
      answer: "گزینه ۱ (گرمازا): این واکنش انرژی آزاد می‌کند (گرمازا) زیرا انرژی محصولات کمتر از انرژی مواد اولیه است."
    },
    {
      id: 12,
      text: "در واکنش A + B → C، آنتالپی واکنش برابر -۵۰ kJ/mol است. این واکنش چه ویژگی دارد؟",
      options: ["گرمازا", "گرماگیر", "پایدار", "ناپایدار"],
      correctIndex: 0,
      answer: "گزینه ۱ (گرمازا): آنتالپی منفی (ΔH<0) نشان‌دهنده واکنش گرمازا است."
    },
    {
      id: 13,
      text: "قانون هس چه رابطه‌ای بین آنتالپی واکنش‌ها برقرار می‌کند؟",
      options: [
        "آنتالپی واکنش مستقل از مسیر است",
        "آنتالپی واکنش وابسته به مسیر است",
        "آنتالپی واکنش برابر صفر است",
        "هیچ کدام"
      ],
      correctIndex: 0,
      answer: "گزینه ۱: قانون هس بیان می‌کند که آنتالپی واکنش مستقل از مسیر است و فقط به حالت اولیه و نهایی بستگی دارد."
    },
    {
      id: 14,
      text: "عوامل مؤثر بر سرعت واکنش کدامند؟",
      options: [
        "فقط دما",
        "فقط غلظت",
        "دما، غلظت، سطح تماس و کاتالیزور",
        "فقط کاتالیزور"
      ],
      correctIndex: 2,
      answer: "گزینه ۳: عوامل مؤثر بر سرعت واکنش شامل دما، غلظت مواد، سطح تماس و کاتالیزور می‌باشند."
    },
    {
      id: 15,
      text: "افزایش دما در یک واکنش چه تأثیری بر سرعت آن دارد؟",
      options: ["کاهش", "افزایش", "ثابت", "متوقف"],
      correctIndex: 1,
      answer: "گزینه ۲ (افزایش): با افزایش دما، انرژی جنبشی مولکول‌ها افزایش یافته و برخوردهای مؤثر بیشتر می‌شود → سرعت واکنش افزایش می‌یابد."
    },
    {
      id: 16,
      text: "کاتالیزور چه تأثیری بر انرژی فعال‌سازی دارد؟",
      options: ["افزایش", "کاهش", "ثابت", "حذف"],
      correctIndex: 1,
      answer: "گزینه ۲ (کاهش): کاتالیزور با کاهش انرژی فعال‌سازی، سرعت واکنش را افزایش می‌دهد."
    },
    {
      id: 17,
      text: "آنتالپی یک واکنش گرمازا چه علامتی دارد؟",
      options: ["مثبت", "منفی", "صفر", "متغیر"],
      correctIndex: 1,
      answer: "گزینه ۲ (منفی): در واکنش‌های گرمازا، آنتالپی منفی است (ΔH<0) زیرا سیستم انرژی از دست می‌دهد."
    },
    {
      id: 18,
      text: "کدام عامل در افزایش سرعت واکنش تأثیر مستقیم دارد؟",
      options: [
        "افزایش حجم ظرف",
        "افزایش دما",
        "کاهش فشار",
        "افزایش خلوص"
      ],
      correctIndex: 1,
      answer: "گزینه ۲ (افزایش دما): افزایش دما باعث افزایش انرژی جنبشی مولکول‌ها و در نتیجه افزایش سرعت واکنش می‌شود."
    },
    {
      id: 19,
      text: "در واکنش های گرمازا، انرژی مواد اولیه نسبت به انرژی محصولات چگونه است؟",
      options: ["بیشتر", "کمتر", "برابر", "متغیر"],
      correctIndex: 0,
      answer: "گزینه ۱ (بیشتر): در واکنش‌های گرمازا، انرژی مواد اولیه بیشتر از انرژی محصولات است و مازاد انرژی آزاد می‌شود."
    },
    {
      id: 20,
      text: "کدام یک از موارد زیر باعث افزایش سرعت واکنش نمی‌شود؟",
      options: ["افزایش دما", "افزایش غلظت", "افزودن کاتالیزور", "افزایش حجم ظرف"],
      correctIndex: 3,
      answer: "گزینه ۴ (افزایش حجم ظرف): افزایش حجم ظرف باعث کاهش غلظت و در نتیجه کاهش سرعت واکنش می‌شود."
    },

    // ==================== فصل سوم: پوشاک، نیازی پایان‌ناپذیر (۱۰ سوال) ====================
    {
      id: 21,
      text: "کدام یک از ترکیبات زیر آلی است؟",
      options: ["CO₂", "NaCl", "CH₄", "H₂O"],
      correctIndex: 2,
      answer: "گزینه ۳ (CH₄): متان (CH₄) یک ترکیب آلی است که از کربن و هیدروژن تشکیل شده است."
    },
    {
      id: 22,
      text: "گروه عاملی استرها چیست؟",
      options: ["-OH", "-COOH", "-COO-", "-CHO"],
      correctIndex: 2,
      answer: "گزینه ۳ (-COO-): گروه عاملی استرها R-COO-R' است که از واکنش اسید و الکل تشکیل می‌شود."
    },
    {
      id: 23,
      text: "نایلون چه نوع پلیمری است؟",
      options: ["پلی‌استر", "پلی‌آمید", "پلی‌اتیلن", "پلی‌وینیل"],
      correctIndex: 1,
      answer: "گزینه ۲ (پلی‌آمید): نایلون یک پلی‌آمید است که از تکرار واحدهای آمیدی (-CONH-) تشکیل شده است."
    },
    {
      id: 24,
      text: "در واکنش استری شدن، چه ترکیباتی با هم واکنش می‌دهند؟",
      options: [
        "اسید + باز",
        "اسید + الکل",
        "الکل + باز",
        "اسید + نمک"
      ],
      correctIndex: 1,
      answer: "گزینه ۲ (اسید + الکل): استری شدن واکنش بین یک اسید کربوکسیلیک و یک الکل است که استر و آب تولید می‌کند."
    },
    {
      id: 25,
      text: "کدام یک از موارد زیر یک الیاف طبیعی است؟",
      options: ["نایلون", "پلی‌استر", "پنبه", "پلی‌اتیلن"],
      correctIndex: 2,
      answer: "گزینه ۳ (پنبه): پنبه یک الیاف طبیعی (سلولزی) است در حالی که نایلون، پلی‌استر و پلی‌اتیلن الیاف مصنوعی هستند."
    },
    {
      id: 26,
      text: "پلی‌استرها از چه نوع واکنشی تشکیل می‌شوند؟",
      options: [
        "واکنش افزایشی",
        "واکنش تراکمی",
        "واکنش سوختن",
        "واکنش تجزیه"
      ],
      correctIndex: 1,
      answer: "گزینه ۲ (واکنش تراکمی): پلی‌استرها از واکنش تراکمی (استری شدن) بین اسید و الکل تشکیل می‌شوند."
    },
    {
      id: 27,
      text: "کدام یک از موارد زیر گروه عاملی کربوکسیلیک اسید است؟",
      options: ["-OH", "-COOH", "-COO-", "-CHO"],
      correctIndex: 1,
      answer: "گزینه ۲ (-COOH): گروه عاملی کربوکسیلیک اسید -COOH است که شامل یک گروه کربونیل و یک هیدروکسیل است."
    },
    {
      id: 28,
      text: "کدام یک از موارد زیر یک الیاف مصنوعی است؟",
      options: ["پشم", "ابریشم", "نایلون", "کتان"],
      correctIndex: 2,
      answer: "گزینه ۳ (نایلون): نایلون یک الیاف مصنوعی (پلی‌آمید) است در حالی که پشم، ابریشم و کتان الیاف طبیعی هستند."
    },
    {
      id: 29,
      text: "کدام یک از ترکیبات زیر یک آلکان است؟",
      options: ["C₂H₄", "C₂H₂", "C₂H₆", "C₂H₅OH"],
      correctIndex: 2,
      answer: "گزینه ۳ (C₂H₆): اتان (C₂H₆) یک آلکان با پیوندهای ساده است. C₂H₄ آلکن و C₂H₂ آلکین است."
    },
    {
      id: 30,
      text: "کدام یک از موارد زیر گروه عاملی الکل است؟",
      options: ["-OH", "-COOH", "-COO-", "-CHO"],
      correctIndex: 0,
      answer: "گزینه ۱ (-OH): گروه عاملی الکل -OH (هیدروکسیل) است که به کربن متصل می‌شود."
    },

    // ==================== سوالات ترکیبی از هر ۳ فصل (۲۰ سوال) ====================
    {
      id: 31,
      text: "در یک ترکیب آلی با گروه عاملی استر، کدام پیوندها وجود دارند؟",
      options: [
        "فقط پیوندهای ساده",
        "پیوندهای دوگانه کربن-اکسیژن",
        "پیوندهای هیدروژنی",
        "پیوندهای یونی"
      ],
      correctIndex: 1,
      answer: "گزینه ۲: در گروه استر (R-COO-R') یک پیوند دوگانه بین کربن و اکسیژن وجود دارد (C=O)."
    },
    {
      id: 32,
      text: "کدام یک از موارد زیر در جدول تناوبی در یک گروه قرار دارند؟",
      options: ["Li و Na", "Li و Be", "Na و Mg", "F و Cl"],
      correctIndex: 0,
      answer: "گزینه ۱ (Li و Na): لیتیوم و سدیم هر دو در گروه ۱ (فلزات قلیایی) قرار دارند."
    },
    {
      id: 33,
      text: "کدام یک از موارد زیر یک هیدروکربن اشباع است؟",
      options: ["اتان", "اتن", "اتین", "بنزن"],
      correctIndex: 0,
      answer: "گزینه ۱ (اتان): اتان (C₂H₆) یک هیدروکربن اشباع (آلکان) با پیوندهای ساده است."
    },
    {
      id: 34,
      text: "در واکنش ۲Mg + O₂ → ۲MgO، اگر ۴۸ گرم منیزیم با اکسیژن واکنش دهد، چند گرم MgO تولید می‌شود؟ (Mg=24, O=16)",
      options: ["۴۰", "۶۰", "۸۰", "۱۰۰"],
      correctIndex: 2,
      answer: "گزینه ۳ (۸۰): ۴۸ گرم Mg = ۲ مول. طبق استوکیومتری ۲ مول Mg → ۲ مول MgO = ۲ × (۲۴+۱۶) = ۸۰ گرم."
    },
    {
      id: 35,
      text: "کدام یک از موارد زیر در افزایش سرعت واکنش نقش کاتالیزوری دارد؟",
      options: ["افزایش دما", "افزایش غلظت", "افزودن ماده‌ای که انرژی فعال‌سازی را کاهش دهد", "افزایش سطح تماس"],
      correctIndex: 2,
      answer: "گزینه ۳: کاتالیزور ماده‌ای است که انرژی فعال‌سازی را کاهش داده و سرعت واکنش را افزایش می‌دهد."
    },
    {
      id: 36,
      text: "کدام یک از موارد زیر یک پلیمر طبیعی است؟",
      options: ["نایلون", "پلی‌اتیلن", "سلولز", "پلی‌استر"],
      correctIndex: 2,
      answer: "گزینه ۳ (سلولز): سلولز یک پلیمر طبیعی است که در دیواره سلولی گیاهان یافت می‌شود."
    },
    {
      id: 37,
      text: "در آرایش الکترونی عنصر ۱۱Na، تعداد الکترون‌های لایه ظرفیت چند است؟",
      options: ["۱", "۲", "۸", "۱۱"],
      correctIndex: 0,
      answer: "گزینه ۱ (۱): آرایش الکترونی سدیم: ۱s² ۲s² ۲p⁶ ۳s¹ → لایه ظرفیت (n=۳) شامل ۱ الکترون است."
    },
    {
      id: 38,
      text: "کدام یک از موارد زیر یک واکنش گرماگیر است؟",
      options: ["سوختن چوب", "واکنش ۲H₂ + O₂ → ۲H₂O", "ذوب شدن یخ", "سوختن گاز"],
      correctIndex: 2,
      answer: "گزینه ۳ (ذوب شدن یخ): ذوب شدن یخ یک فرآیند گرماگیر است زیرا برای انجام آن باید انرژی جذب شود."
    },
    {
      id: 39,
      text: "گروه عاملی آلدهید چیست؟",
      options: ["-OH", "-COOH", "-COO-", "-CHO"],
      correctIndex: 3,
      answer: "گزینه ۴ (-CHO): گروه عاملی آلدهید -CHO است که یک گروه کربونیل با یک هیدروژن است."
    },
    {
      id: 40,
      text: "کدام یک از موارد زیر در یک دوره از جدول تناوبی قرار دارد؟",
      options: ["Li و Na", "Li و Be", "Na و K", "F و Cl"],
      correctIndex: 1,
      answer: "گزینه ۲ (Li و Be): لیتیوم و بریلیم هر دو در دوره دوم جدول تناوبی قرار دارند."
    },
    {
      id: 41,
      text: "در واکنش استری شدن، محصولات جانبی واکنش چیست؟",
      options: ["آب", "هیدروژن", "اکسیژن", "کربن دی‌اکسید"],
      correctIndex: 0,
      answer: "گزینه ۱ (آب): در واکنش استری شدن، آب به عنوان محصول جانبی تولید می‌شود."
    },
    {
      id: 42,
      text: "کدام یک از موارد زیر یک هیدروکربن غیراشباع است؟",
      options: ["متان", "اتان", "اتن", "پروپان"],
      correctIndex: 2,
      answer: "گزینه ۳ (اتن): اتن (C₂H₄) یک هیدروکربن غیراشباع (آلکن) با پیوند دوگانه است."
    },
    {
      id: 43,
      text: "الکترونگاتیوی عناصر در یک گروه از بالا به پایین چگونه تغییر می‌کند؟",
      options: ["افزایش", "کاهش", "ثابت", "ناپایدار"],
      correctIndex: 1,
      answer: "گزینه ۲ (کاهش): با افزایش شعاع اتمی در یک گروه، الکترونگاتیوی کاهش می‌یابد."
    },
    {
      id: 44,
      text: "کدام یک از موارد زیر برای افزایش سرعت واکنش مؤثر است؟",
      options: ["کاهش دما", "کاهش غلظت", "افزایش سطح تماس", "کاهش فشار"],
      correctIndex: 2,
      answer: "گزینه ۳ (افزایش سطح تماس): افزایش سطح تماس باعث افزایش برخورد بین ذرات و افزایش سرعت واکنش می‌شود."
    },
    {
      id: 45,
      text: "کدام یک از موارد زیر یک پلی‌آمید است؟",
      options: ["پلی‌اتیلن", "نایلون", "پلی‌استر", "پلی‌وینیل کلراید"],
      correctIndex: 1,
      answer: "گزینه ۲ (نایلون): نایلون یک پلی‌آمید است که از تکرار واحدهای آمیدی تشکیل شده است."
    },
    {
      id: 46,
      text: "در واکنش گرمازا، انرژی فعال‌سازی چیست؟",
      options: ["انرژی لازم برای شروع واکنش", "انرژی آزاد شده در واکنش", "انرژی محصولات", "انرژی مواد اولیه"],
      correctIndex: 0,
      answer: "گزینه ۱: انرژی فعال‌سازی حداقل انرژی لازم برای شروع یک واکنش شیمیایی است."
    },
    {
      id: 47,
      text: "کدام یک از موارد زیر یک ترکیب آلی با گروه عاملی کربونیل است؟",
      options: ["الکل", "استر", "آلکان", "آلکین"],
      correctIndex: 1,
      answer: "گزینه ۲ (استر): استرها دارای گروه عاملی کربونیل (C=O) هستند."
    },
    {
      id: 48,
      text: "در یک واکنش شیمیایی، کاتالیزور چه تأثیری بر تعادل واکنش دارد؟",
      options: ["تغییر نمی‌دهد", "به سمت محصولات تغییر می‌دهد", "به سمت مواد اولیه تغییر می‌دهد", "واکنش را متوقف می‌کند"],
      correctIndex: 0,
      answer: "گزینه ۱: کاتالیزور بر تعادل واکنش تأثیری ندارد و فقط سرعت رسیدن به تعادل را افزایش می‌دهد."
    },
    {
      id: 49,
      text: "کدام یک از موارد زیر یک آلکن است؟",
      options: ["C₂H₆", "C₂H₄", "C₂H₂", "C₃H₈"],
      correctIndex: 1,
      answer: "گزینه ۲ (C₂H₄): اتن (C₂H₄) یک آلکن با پیوند دوگانه است."
    },
    {
      id: 50,
      text: "در آرایش الکترونی، اصل طرد پائولی چه می‌گوید؟",
      options: [
        "الکترون‌ها ابتدا اوربیتال‌های با انرژی کمتر را پر می‌کنند",
        "در هر اوربیتال حداکثر ۲ الکترون با اسپین مخالف قرار می‌گیرند",
        "الکترون‌ها به تنهایی اوربیتال‌ها را پر می‌کنند",
        "هیچ کدام"
      ],
      correctIndex: 1,
      answer: "گزینه ۲: اصل طرد پائولی می‌گوید در هر اوربیتال حداکثر ۲ الکترون با اسپین مخالف قرار می‌گیرند."
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
        backgroundColor: '#4a148c',
        color: 'white',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '30px',
        textAlign: 'center',
        position: 'relative'
      }}>
        <button 
          onClick={() => router.push('http://localhost:3000/exam/yazdahom/riyazi/sanjesh/first-half/shimi-2')}
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
            <h1 style={{ margin: 0, fontSize: '28px' }}>🧪 آزمون جامع کل کتاب شیمی (2)</h1>
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
                backgroundColor: '#4a148c',
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
                      border: isSelected ? '3px solid #4a148c' : '1px solid #dee2e6',
                      borderRadius: '10px',
                      backgroundColor: isSelected ? '#f3e5f5' : '#fff',
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
                      backgroundColor: isSelected ? '#4a148c' : '#fff',
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
                      backgroundColor: canCalculate ? '#6a1b9a' : '#6c757d',
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
                  <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#4a148c' }}>
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
            borderTop: '4px solid #4a148c',
            paddingTop: '40px',
            backgroundColor: '#ffffff',
            padding: '40px',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
            width: '100%'
          }}>
            <h2 style={{ 
              textAlign: 'center', 
              borderBottom: '3px solid #4a148c', 
              paddingBottom: '20px', 
              marginBottom: '40px',
              fontSize: '26px',
              color: '#4a148c'
            }}>
              📝 پاسخنامه تشریحی آزمون جامع شیمی (2)
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
                      color: '#4a148c',
                      backgroundColor: '#f3e5f5',
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
                    <span style={{ fontWeight: 'bold', color: '#6a1b9a' }}>📖 توضیح کامل:</span> 
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

export default Shimi2FinalExam;