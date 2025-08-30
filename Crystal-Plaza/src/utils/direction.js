// src/utils/direction.js
export function getLangFromPath(pathname = (typeof window !== 'undefined' ? window.location.pathname : '/ar')) {
  // نتوقع مسارين علويين: /ar أو /en
  const seg = pathname.split('/').filter(Boolean)[0];
  if (seg === 'en') return 'en';
  return 'ar'; // الافتراضي عربي
}

export function isRTL(lang) {
  return lang === 'ar';
}

export function getDir(lang) {
  return isRTL(lang) ? 'rtl' : 'ltr';
}

/**
 * يضبط اتجاه المستند (HTML dir) — يُستدعى لاحقًا عند التبديل بين اللغات.
 * لا نفعّله هنا حتى نربطه في App.jsx لاحقًا حسب الخطوات.
 */
export function setDocumentDir(dir) {
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('dir', dir);
  }
}
