/**
 * 45 языков для переключателя с флагами.
 * code   — ISO 639-1 код языка (используется Google Translate)
 * flag   — emoji флага страны
 * native — название языка на родном языке
 * region — регион для группировки
 */

export const LANGUAGES = [
  // ── Кыргызстан и соседи ──────────────────────────────────────────────────
  { code: 'ky', flag: '🇰🇬', native: 'Кыргызча',    en: 'Kyrgyz',     region: 'central_asia' },
  { code: 'ru', flag: '🇷🇺', native: 'Русский',      en: 'Russian',    region: 'central_asia' },
  { code: 'kk', flag: '🇰🇿', native: 'Қазақша',      en: 'Kazakh',     region: 'central_asia' },
  { code: 'uz', flag: '🇺🇿', native: "O'zbek",       en: 'Uzbek',      region: 'central_asia' },
  { code: 'tg', flag: '🇹🇯', native: 'Тоҷикӣ',       en: 'Tajik',      region: 'central_asia' },
  { code: 'tk', flag: '🇹🇲', native: 'Türkmen',      en: 'Turkmen',    region: 'central_asia' },
  { code: 'mn', flag: '🇲🇳', native: 'Монгол',       en: 'Mongolian',  region: 'central_asia' },

  // ── Азия ─────────────────────────────────────────────────────────────────
  { code: 'en', flag: '🇬🇧', native: 'English',      en: 'English',    region: 'europe' },
  { code: 'zh', flag: '🇨🇳', native: '中文',          en: 'Chinese',    region: 'asia' },
  { code: 'ja', flag: '🇯🇵', native: '日本語',         en: 'Japanese',   region: 'asia' },
  { code: 'ko', flag: '🇰🇷', native: '한국어',         en: 'Korean',     region: 'asia' },
  { code: 'tr', flag: '🇹🇷', native: 'Türkçe',       en: 'Turkish',    region: 'asia' },
  { code: 'ar', flag: '🇸🇦', native: 'العربية',       en: 'Arabic',     region: 'middle_east' },
  { code: 'fa', flag: '🇮🇷', native: 'فارسی',         en: 'Persian',    region: 'middle_east' },
  { code: 'hi', flag: '🇮🇳', native: 'हिन्दी',         en: 'Hindi',      region: 'asia' },
  { code: 'bn', flag: '🇧🇩', native: 'বাংলা',          en: 'Bengali',    region: 'asia' },
  { code: 'ur', flag: '🇵🇰', native: 'اردو',           en: 'Urdu',       region: 'asia' },
  { code: 'vi', flag: '🇻🇳', native: 'Tiếng Việt',   en: 'Vietnamese', region: 'asia' },
  { code: 'th', flag: '🇹🇭', native: 'ไทย',           en: 'Thai',       region: 'asia' },
  { code: 'id', flag: '🇮🇩', native: 'Indonesia',    en: 'Indonesian', region: 'asia' },
  { code: 'ms', flag: '🇲🇾', native: 'Melayu',       en: 'Malay',      region: 'asia' },

  // ── Европа ───────────────────────────────────────────────────────────────
  { code: 'de', flag: '🇩🇪', native: 'Deutsch',      en: 'German',     region: 'europe' },
  { code: 'fr', flag: '🇫🇷', native: 'Français',     en: 'French',     region: 'europe' },
  { code: 'es', flag: '🇪🇸', native: 'Español',      en: 'Spanish',    region: 'europe' },
  { code: 'it', flag: '🇮🇹', native: 'Italiano',     en: 'Italian',    region: 'europe' },
  { code: 'pt', flag: '🇵🇹', native: 'Português',    en: 'Portuguese', region: 'europe' },
  { code: 'pl', flag: '🇵🇱', native: 'Polski',       en: 'Polish',     region: 'europe' },
  { code: 'uk', flag: '🇺🇦', native: 'Українська',   en: 'Ukrainian',  region: 'europe' },
  { code: 'nl', flag: '🇳🇱', native: 'Nederlands',   en: 'Dutch',      region: 'europe' },
  { code: 'sv', flag: '🇸🇪', native: 'Svenska',      en: 'Swedish',    region: 'europe' },
  { code: 'no', flag: '🇳🇴', native: 'Norsk',        en: 'Norwegian',  region: 'europe' },
  { code: 'da', flag: '🇩🇰', native: 'Dansk',        en: 'Danish',     region: 'europe' },
  { code: 'fi', flag: '🇫🇮', native: 'Suomi',        en: 'Finnish',    region: 'europe' },
  { code: 'cs', flag: '🇨🇿', native: 'Čeština',      en: 'Czech',      region: 'europe' },
  { code: 'ro', flag: '🇷🇴', native: 'Română',       en: 'Romanian',   region: 'europe' },
  { code: 'hu', flag: '🇭🇺', native: 'Magyar',       en: 'Hungarian',  region: 'europe' },
  { code: 'el', flag: '🇬🇷', native: 'Ελληνικά',     en: 'Greek',      region: 'europe' },

  // ── Америка ───────────────────────────────────────────────────────────────
  { code: 'pt', flag: '🇧🇷', native: 'Português (BR)', en: 'Portuguese (BR)', region: 'america' },

  // ── Африка ────────────────────────────────────────────────────────────────
  { code: 'sw', flag: '🇰🇪', native: 'Kiswahili',    en: 'Swahili',    region: 'africa' },
  { code: 'am', flag: '🇪🇹', native: 'አማርኛ',          en: 'Amharic',    region: 'africa' },
  { code: 'ha', flag: '🇳🇬', native: 'Hausa',        en: 'Hausa',      region: 'africa' },

  // ── Другие ────────────────────────────────────────────────────────────────
  { code: 'he', flag: '🇮🇱', native: 'עברית',          en: 'Hebrew',     region: 'middle_east' },
  { code: 'az', flag: '🇦🇿', native: 'Azərbaycanca',  en: 'Azerbaijani', region: 'central_asia' },
  { code: 'ka', flag: '🇬🇪', native: 'ქართული',        en: 'Georgian',   region: 'central_asia' },
];

export const REGION_LABELS = {
  central_asia: { ky: 'Борбор Азия',    ru: 'Центральная Азия', en: 'Central Asia' },
  asia:         { ky: 'Азия',           ru: 'Азия',             en: 'Asia' },
  europe:       { ky: 'Европа',         ru: 'Европа',           en: 'Europe' },
  middle_east:  { ky: 'Орто Чыгыш',    ru: 'Ближний Восток',   en: 'Middle East' },
  america:      { ky: 'Америка',        ru: 'Америка',          en: 'America' },
  africa:       { ky: 'Африка',         ru: 'Африка',           en: 'Africa' },
};

export const REGION_ORDER = ['central_asia','europe','asia','middle_east','america','africa'];

export function getLangByCode(code) {
  return LANGUAGES.find(l => l.code === code);
}

export default LANGUAGES;
