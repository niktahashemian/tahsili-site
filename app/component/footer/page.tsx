
import React from 'react';
import Link from 'next/link';
import '../../assets/css/style.css';

// ==================== آیکون‌های SVG ====================
const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="footer-icon-blue">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="footer-icon-blue">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="footer-icon-blue">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const TelegramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21.5 2L2 10.5l5 2 2 6 3-4 5 4 4.5-16.5z"></path>
    <path d="M9 12.5l10-7"></path>
  </svg>
);

const WhatsappIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
  </svg>
);

const HeadphoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
  </svg>
);

// ==================== داده‌ی لینک‌های آزمون‌ها ====================
// پایه‌ی دهم حذف شده؛ فقط یازدهم و دوازدهم (تجربی و ریاضی)
const EXAM_LINKS = [
  { title: 'قلم‌چی', slug: 'ghalamchi' },
  { title: 'گزینه دو', slug: 'gozine2' },
  { title: 'ماز', slug: 'maz' },
  { title: 'خیلی سبز', slug: 'kheili%20sabz' },
  { title: 'سنجش', slug: 'sanjesh' },
];

const EXAM_ITEMS = [
  { grade: 'yazdahom', gradeName: 'یازدهم', field: 'tajrobi', fieldName: 'تجربی' },
  { grade: 'yazdahom', gradeName: 'یازدهم', field: 'riyazi', fieldName: 'ریاضی' },
  { grade: 'davazdahom', gradeName: 'دوازدهم', field: 'tajrobi', fieldName: 'تجربی' },
  { grade: 'davazdahom', gradeName: 'دوازدهم', field: 'riyazi', fieldName: 'ریاضی' },
];

const ExamColumn = ({ title, slug }: { title: string; slug: string }) => (
  <div className="footer-col">
    <h4 className="footer-title">{title}</h4>
    <ul className="footer-list">
      {EXAM_ITEMS.map((item) => (
        <li className="footer-list-item" key={`${item.grade}-${item.field}`}>
          <Link
            href={`/exam/${item.grade}/${item.field}/${slug}/first-half`}
            className="footer-link"
          >
            {item.gradeName} {item.fieldName} نیم‌سال اول
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

// ==================== کامپوننت اصلی ====================
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-main" dir="rtl">
      <div className="footer-main-container">
        {/* ============ ردیف دوم: آزمون‌ها ============ */}
        <div className="footer-row footer-row-exams">
          {EXAM_LINKS.slice(0, 4).map((exam) => (
            <ExamColumn key={exam.slug} title={exam.title} slug={exam.slug} />
          ))}
        </div>

        {/* ============ ردیف سوم: سنجش و لینک‌های مفید ============ */}
        <div className="footer-row footer-row-exams">
          <ExamColumn title={EXAM_LINKS[4].title} slug={EXAM_LINKS[4].slug} />

          <div className="footer-col">
            <h4 className="footer-title">قوانین و مقررات</h4>
            <ul className="footer-list">
              <li className="footer-list-item"><Link href="/rules" className="footer-link">قوانین سایت</Link></li>
              <li className="footer-list-item"><Link href="/privacy" className="footer-link">حریم خصوصی</Link></li>
              <li className="footer-list-item"><Link href="/terms" className="footer-link">شرایط استفاده</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">لینک‌های مفید</h4>
            <ul className="footer-list">
              <li className="footer-list-item"><Link href="/answers" className="footer-link">پاسخنامه‌ها</Link></li>
              <li className="footer-list-item"><Link href="/blog" className="footer-link">وبلاگ</Link></li>
              <li className="footer-list-item"><Link href="/sitemap" className="footer-link">نقشه سایت</Link></li>
            </ul>
          </div>

          <div className="footer-row">
            {/* ستون ۴: ارتباط با ما */}
            <div className="footer-col">
              <h4 className="footer-title">ارتباط با ما</h4>
              <ul className="footer-list">
                <li className="footer-contact-item">
                  <MapPinIcon />
                  <span>تهران، خیابان آزادی، پلاک ۱۲۳</span>
                </li>
                <li className="footer-contact-item">
                  <PhoneIcon />
                  <span>۰۲۱-۱۲۳۴۵۶۷۸</span>
                </li>
                <li className="footer-contact-item">
                  <MailIcon />
                  <span>info@parto-omid.ir</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ============ درباره ما ============ */}
        <div className="footer-col">
          <h4 className="footer-title">درباره ما</h4>
          <p>
            مركز مشاوره پرتو اميد
            مركز مشاوره يرتو اميد با هدف ارتقاء سطح علمى و روانى دانشاموزان مقاطع متوسطه اول و دوم فعاليت مى كند. در اين يلتفرم، دانشاموزان بايه هاى دهم، يازدهم و دوازدهم مى توانند با انتخاب رشته تحصيلى خود، به ازمون هاى جامع و هدفمند (شامل ازمون هاى ازمايشى قلرجى، كزينهدو و خيلى سبز) دسترسى داشته باشند
            هدف ما ارانه آزمونهاى استاندارد، دريافت كارنامه دقيق (درصد و باسخنامه تشريحى) و كمك به دانش أموزان براى رسيدن به بهترين نتيجه در كنكور سراسرى است.
          </p>
        </div>

        {/* ============ بخش پایینی: پشتیبانی + شبکه‌های اجتماعی ============ */}
        <div className="footer-bottom-grid">

          {/* باکس پشتیبانی */}
          <div className="footer-ticket-section">
            <h5 className="footer-ticket-title">پشتیبانی آنلاین</h5>
            <p className="footer-ticket-description">
              در صورت بروز هرگونه مشکل در آزمون‌ها یا دریافت کارنامه، با ما در تماس باشید.
            </p>
            <Link href="/ticket" className="footer-ticket-link">
              <HeadphoneIcon />
              <span>ارسال تیکت</span>
              <span>←</span>
            </Link>
          </div>

          {/* باکس شبکه‌های اجتماعی */}
          <div className="footer-social-section">
            <h5 className="footer-social-title">با ما همراه باشید</h5>
            <div className="footer-social-list">
              <a href="https://instagram.com" target="_blank" rel="nofollow noopener" className="footer-social-link-text instagram">
                <InstagramIcon />
                <span>اینستاگرام</span>
              </a>
              <a href="https://t.me" target="_blank" rel="nofollow noopener" className="footer-social-link-text telegram">
                <TelegramIcon />
                <span>تلگرام</span>
              </a>
              <a href="https://wa.me" target="_blank" rel="nofollow noopener" aria-label="واتساپ" className="footer-social-link-icon whatsapp">
                <WhatsappIcon />
              </a>
              <a href="mailto:info@parto-omid.ir" aria-label="ایمیل" className="footer-social-link-icon email">
                <MailIcon />
              </a>
              <a href="tel:+982112345678" aria-label="تماس" className="footer-social-link-icon phone">
                <PhoneIcon />
              </a>
            </div>
          </div>
        </div>

        {/* ============ کپی‌رایت ============ */}
        <div className="footer-copyright">
          <p>© {currentYear} مرکز مشاوره پرتو امید. تمامی حقوق محفوظ است.</p>
          <p>طراحی و توسعه اختصاصی برای دانش‌آموزان متوسطه</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
