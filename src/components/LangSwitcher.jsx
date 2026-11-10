import React, { useState, useRef, useEffect, useMemo } from 'react';
import LANGUAGES, { REGION_LABELS, REGION_ORDER, getLangByCode } from '../data/languages';
import './LangSwitcher.css';

/**
 * LangSwitcher — переключатель из 40+ языков с флагами.
 * При выборе языка:
 *   1. Обновляет state в AppContext (ky/ru/en — через props)
 *   2. Для остальных языков — активирует Google Translate
 */
export default function LangSwitcher({ currentLang, onChangeLang, displayLang = 'en' }) {
  const [open,   setOpen]   = useState(false);
  const [search, setSearch] = useState('');
  const dropRef = useRef(null);

  // Закрытие по клику вне
  useEffect(() => {
    const handler = e => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Текущий язык
  const current = getLangByCode(currentLang) || LANGUAGES[0];

  // Поиск
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    if (!q) return LANGUAGES;
    return LANGUAGES.filter(l =>
      l.native.toLowerCase().includes(q) ||
      l.en.toLowerCase().includes(q) ||
      l.code.toLowerCase().includes(q)
    );
  }, [search]);

  // Группировка по регионам
  const grouped = useMemo(() => {
    const map = {};
    filtered.forEach(l => {
      if (!map[l.region]) map[l.region] = [];
      map[l.region].push(l);
    });
    return map;
  }, [filtered]);

  const handleSelect = lang => {
    onChangeLang(lang.code);
    setOpen(false);
    setSearch('');
  };

  return (
    <div ref={dropRef} className="ls-wrap">
      {/* Кнопка — показывает флаг + код текущего языка */}
      <button
        className={`ls-trigger ${open ? 'ls-trigger--open' : ''}`}
        onClick={() => setOpen(o => !o)}
        title="Select language"
        type="button"
      >
        <span className="ls-flag">{current.flag}</span>
        <span className="ls-code">{current.code.toUpperCase()}</span>
        <span className="ls-chevron">▾</span>
      </button>

      {/* Выпадающий список */}
      {open && (
        <div className="ls-dropdown">
          {/* Поиск */}
          <div className="ls-search-wrap">
            <span className="ls-search-icon">🔍</span>
            <input
              autoFocus
              className="ls-search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={
                displayLang === 'ru' ? 'Поиск языка...' :
                displayLang === 'ky' ? 'Тил издөө...' : 'Search language...'
              }
            />
            {search && (
              <button className="ls-clear" onClick={() => setSearch('')}>✕</button>
            )}
          </div>

          <div className="ls-list">
            {REGION_ORDER.map(region => {
              const list = grouped[region];
              if (!list?.length) return null;
              const label = REGION_LABELS[region];
              return (
                <div key={region}>
                  <div className="ls-region">
                    {label[displayLang] || label.en}
                  </div>
                  {list.map(lang => (
                    <button
                      key={lang.code + lang.native}
                      type="button"
                      className={`ls-option ${currentLang === lang.code ? 'ls-option--active' : ''}`}
                      onClick={() => handleSelect(lang)}
                    >
                      <span className="ls-opt-flag">{lang.flag}</span>
                      <span className="ls-opt-native">{lang.native}</span>
                      <span className="ls-opt-en">{lang.en}</span>
                      {currentLang === lang.code && (
                        <span className="ls-opt-check">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              );
            })}

            {/* Нет результатов */}
            {!REGION_ORDER.some(r => grouped[r]?.length) && (
              <p className="ls-no-result">
                {displayLang === 'ru' ? 'Не найдено' : displayLang === 'ky' ? 'Табылган жок' : 'Not found'}
              </p>
            )}
          </div>

          {/* Подсказка о Google Translate */}
          <div className="ls-footer">
            <span>
              {displayLang === 'ru' ? '🌐 Перевод через Google Translate' :
               displayLang === 'ky' ? '🌐 Google Translate аркылуу' :
               '🌐 Powered by Google Translate'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
