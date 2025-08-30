// src/theme/rtlCache.js
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';

/**
 * ينشئ Emotion cache حسب الاتجاه:
 * - RTL: يفعّل rtlPlugin
 * - LTR: بدون rtlPlugin
 */
export function createEmotionCache(dir = 'ltr') {
  const isRTL = dir === 'rtl';
  return createCache({
    key: isRTL ? 'mui-rtl' : 'mui',
    stylisPlugins: isRTL ? [rtlPlugin, prefixer] : [prefixer],
    prepend: true,
  });
}
