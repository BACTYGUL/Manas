/**
 * Утилиты для Google Translate Widget.
 *
 * Принцип работы:
 * - Загружаем скрипт Google Translate
 * - Создаём скрытый элемент #google_translate_element
 * - Программно меняем язык через cookie googtrans
 * - При отключении — сбрасываем перевод
 */

const GT_SCRIPT_ID  = 'gt-script';
const GT_ELEM_ID    = 'google_translate_element';
const GT_COOKIE_KEY = 'googtrans';

/** Устанавливает cookie googtrans для нужного языка */
function setGtCookie(lang) {
  const val = `/en/${lang}`;
  const host = window.location.hostname;
  // Ставим и на текущий домен и на родительский (для localhost)
  document.cookie = `${GT_COOKIE_KEY}=${val}; path=/; domain=${host}`;
  document.cookie = `${GT_COOKIE_KEY}=${val}; path=/`;
}

/** Удаляет cookie googtrans */
function removeGtCookie() {
  const host = window.location.hostname;
  document.cookie = `${GT_COOKIE_KEY}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=${host}`;
  document.cookie = `${GT_COOKIE_KEY}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
}

/** Создаёт скрытый контейнер для GT widget */
function ensureContainer() {
  if (!document.getElementById(GT_ELEM_ID)) {
    const div = document.createElement('div');
    div.id = GT_ELEM_ID;
    div.style.display = 'none';
    document.body.appendChild(div);
  }
}

/** Загружает скрипт Google Translate (один раз) */
function loadGtScript() {
  return new Promise(resolve => {
    if (document.getElementById(GT_SCRIPT_ID)) { resolve(); return; }

    // Callback, который вызовет GT после загрузки
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { pageLanguage: 'ky', autoDisplay: false },
        GT_ELEM_ID
      );
      resolve();
    };

    const s = document.createElement('script');
    s.id  = GT_SCRIPT_ID;
    s.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    s.onerror = resolve; // не блокируем если скрипт не загрузился
    document.head.appendChild(s);
  });
}

/** Активирует перевод на нужный язык */
export async function enableGoogleTranslate(targetLang) {
  try {
    ensureContainer();
    setGtCookie(targetLang);

    await loadGtScript();

    // Ждём появления select в GT toolbar
    let tries = 0;
    const waitAndSelect = setInterval(() => {
      tries++;
      // Метод 1: через select элемент GT
      const sel = document.querySelector('.goog-te-combo');
      if (sel) {
        sel.value = targetLang;
        sel.dispatchEvent(new Event('change'));
        clearInterval(waitAndSelect);
        return;
      }
      // Метод 2: перезагрузка с cookie (fallback)
      if (tries > 20) {
        clearInterval(waitAndSelect);
        // Если GT не смог — просто оставляем cookie и перезагружаем
        // window.location.reload();
      }
    }, 300);
  } catch (e) {
    console.warn('Google Translate error:', e);
  }
}

/** Отключает Google Translate, возвращает оригинальный текст */
export function disableGoogleTranslate() {
  try {
    removeGtCookie();

    // Метод 1: через GT API
    const frame = document.querySelector('.goog-te-banner-frame');
    if (frame) {
      // Кликаем "Показать оригинал"
      const inner = frame.contentDocument || frame.contentWindow?.document;
      const btn = inner?.querySelector('.goog-te-banner-frame, [id="gt-restore"]');
      if (btn) btn.click();
    }

    // Метод 2: убираем iframe и toolbar
    const gtBar = document.querySelector('.goog-te-banner-frame');
    if (gtBar) gtBar.style.display = 'none';

    // Метод 3: reset через select
    const sel = document.querySelector('.goog-te-combo');
    if (sel) {
      sel.value = 'ky';
      sel.dispatchEvent(new Event('change'));
    }

    // Убираем body margin от GT toolbar
    document.body.style.top = '';
    document.documentElement.style.overflow = '';

    // Скрываем GT toolbar
    const toolbar = document.getElementById(':1.container');
    if (toolbar) toolbar.style.display = 'none';
  } catch (e) {
    // silent
  }
}

/** Скрывает GT toolbar (верхний баннер) через CSS */
export function hideGoogleTranslateToolbar() {
  const style = document.getElementById('gt-hide-style');
  if (style) return;
  const s = document.createElement('style');
  s.id = 'gt-hide-style';
  s.textContent = `
    .goog-te-banner-frame { display: none !important; }
    .goog-te-menu-value span { display: none; }
    body { top: 0 !important; }
    #google_translate_element { display: none !important; }
    .skiptranslate { display: none !important; }
    .translated-ltr, .translated-rtl { margin-top: 0 !important; top: 0 !important; }
  `;
  document.head.appendChild(s);
}
