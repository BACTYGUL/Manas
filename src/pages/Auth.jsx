import React, { useState, useRef, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { t } from '../i18n/translations';
import LogoSVG from '../components/LogoSVG';
import COUNTRIES, { groupByContinent, CONTINENTS, countryName, validatePhone } from '../data/countries';
import './Auth.css';

const CONT_ORDER = ['asia','europe','north_america','south_america','africa','oceania'];

export default function Auth() {
  const navigate  = useNavigate();
  const { register, login, lang } = useApp();

  const [mode,    setMode]    = useState('login');
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');
  const [success, setSuccess] = useState('');

  const [form, setForm] = useState({
    name: '', email: '', password: '', confirm: '',
    phone: '', countryCode: 'KG',
  });

  // Телефонный дропдаун
  const [phoneSearch,     setPhoneSearch]     = useState('');
  const [showPhoneDrop,   setShowPhoneDrop]   = useState(false);
  const [phoneError,      setPhoneError]      = useState('');
  const dropRef = useRef(null);

  // Паспорт (опционально)
  const [showPassportInfo, setShowPassportInfo] = useState(false);
  const [passportAgreed,   setPassportAgreed]   = useState(false);
  const [passportFile,     setPassportFile]      = useState(null);
  const [passportPreview,  setPassportPreview]   = useState(null);
  const fileRef   = useRef(null);
  const cameraRef = useRef(null);

  const up = (k, v) => setForm(f => ({ ...f, [k]: v }));

  // Закрываем дропдаун при клике вне
  useEffect(() => {
    const handler = e => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setShowPhoneDrop(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Сбрасываем номер при смене страны
  const handleCountrySelect = (code) => {
    up('countryCode', code);
    up('phone', '');
    setPhoneError('');
    setShowPhoneDrop(false);
    setPhoneSearch('');
  };

  const selectedCountry = COUNTRIES.find(c => c.code === form.countryCode) || COUNTRIES[0];

  // Фильтрация стран для поиска в дропдауне телефона
  const filteredPhone = useMemo(() => {
    const q = phoneSearch.toLowerCase();
    if (!q) return COUNTRIES;
    return COUNTRIES.filter(c =>
      countryName(c, lang).toLowerCase().includes(q) ||
      c.dial.includes(q) ||
      c.code.toLowerCase().includes(q)
    );
  }, [phoneSearch, lang]);

  const groupedPhone = useMemo(() => groupByContinent(filteredPhone), [filteredPhone]);

  // Загрузка фото паспорта
  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPassportFile(file);
    const reader = new FileReader();
    reader.onload = ev => setPassportPreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  // Сообщение об ошибке телефона — через translations
  const phoneErrMsg = t('phone_invalid', lang);

  // Валидация при уходе с поля
  const handlePhoneBlur = () => {
    if (form.phone.trim() && !validatePhone(form.phone, selectedCountry)) {
      setPhoneError(phoneErrMsg);
    } else {
      setPhoneError('');
    }
  };

  // Общая валидация формы
  const validate = () => {
    if (mode === 'register') {
      if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
        return t('fill_all_fields', lang);
      }
      if (!form.phone.trim())                          return t('phone_required', lang);
      if (!validatePhone(form.phone, selectedCountry)) return t('phone_invalid', lang);
      if (form.password !== form.confirm)              return t('auth_pass_match', lang);
      if (form.password.length < 6)                   return t('pass_min_6', lang);
      return null;
    }

    if (!form.email.trim() || !form.password.trim()) {
      return t('fill_all_fields', lang);
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');
    const err = validate();
    if (err) { setError(err); return; }
    setLoading(true);

    if (mode === 'register') {
      const res = await register(form.name, form.email, form.password, {
        phone:       `${selectedCountry.dial} ${form.phone}`,
        countryCode: form.countryCode,
        passportImg: passportFile ? passportPreview : null,
      });
      setLoading(false);
      if (res.errorKey) return setError(t(res.errorKey, lang));
      if (res.error)    return setError(res.error);
      setSuccess(t('auth_success', lang));
      setTimeout(() => navigate('/'), 1200);
    } else {
      const res = await login(form.email, form.password);
      setLoading(false);
      if (res.errorKey) return setError(t(res.errorKey, lang));
      if (res.error)    return setError(res.error);
      navigate('/');
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <span className="auth-back" onClick={() => navigate('/')}>{t('auth_back', lang)}</span>

        <div className="auth-logo">
          <LogoSVG size={44}/>
          <span>{t('logo_name', lang)}</span>
        </div>

        <div className="auth-tabs">
          <button className={mode==='login'?'active':''} onClick={()=>{setMode('login');setError('');setPhoneError('');}}>
            {t('auth_login', lang)}
          </button>
          <button className={mode==='register'?'active':''} onClick={()=>{setMode('register');setError('');setPhoneError('');}}>
            {t('auth_register', lang)}
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>

          {/* Имя */}
          {mode === 'register' && (
            <div className="auth-field">
              <label>{t('auth_name', lang)} <span className="req">*</span></label>
              <input name="name" value={form.name} onChange={e=>up('name',e.target.value)}
                required placeholder={t('auth_name', lang)}/>
            </div>
          )}

          {/* Email */}
          <div className="auth-field">
            <label>{t('auth_email', lang)} <span className="req">*</span></label>
            <input name="email" type="email" value={form.email}
              onChange={e=>up('email',e.target.value)}
              required placeholder="example@mail.com"/>
          </div>

          {/* Пароль */}
          <div className="auth-field">
            <label>{t('auth_password', lang)} <span className="req">*</span></label>
            <input name="password" type="password" value={form.password}
              onChange={e=>up('password',e.target.value)}
              required placeholder="••••••••"/>
          </div>

          {/* Подтверждение пароля */}
          {mode === 'register' && (
            <div className="auth-field">
              <label>{t('auth_confirm', lang)} <span className="req">*</span></label>
              <input name="confirm" type="password" value={form.confirm}
                onChange={e=>up('confirm',e.target.value)}
                required placeholder="••••••••"/>
            </div>
          )}

          {/* Телефон с встроенным выбором страны — только регистрация */}
          {mode === 'register' && (
            <div className="auth-field">
              <label>{t('auth_phone', lang)} <span className="req">*</span></label>

              {/* Единое поле: флаг+код → ввод номера */}
              <div ref={dropRef} className="phone-field-wrap">
                <div className={`phone-combined ${phoneError ? 'error' : ''}`}>
                  {/* Кнопка выбора страны (левая часть) */}
                  <button
                    type="button"
                    className="phone-country-btn"
                    onClick={() => setShowPhoneDrop(d => !d)}
                    title={countryName(selectedCountry, lang)}
                  >
                    <span className="phone-flag">{selectedCountry.flag}</span>
                    <span className="phone-code">{selectedCountry.dial}</span>
                    <span className="phone-chevron">{showPhoneDrop ? '▲' : '▼'}</span>
                  </button>

                  <div className="phone-divider"/>

                  {/* Поле ввода номера (правая часть) */}
                  <input
                    type="tel"
                    inputMode="numeric"
                    className="phone-number-input"
                    value={form.phone}
                    onChange={e => {
                      up('phone', e.target.value.replace(/\D/g,''));
                      if (phoneError) setPhoneError('');
                    }}
                    onBlur={handlePhoneBlur}
                    placeholder={`${'0'.repeat(selectedCountry.minLen)} (${selectedCountry.minLen}–${selectedCountry.maxLen} ${t('phone_digits', lang)})`}
                    maxLength={selectedCountry.maxLen + 2}
                  />
                </div>

                {/* Ошибка под полем */}
                {phoneError && (
                  <p className="phone-error-msg">⚠ {phoneError}</p>
                )}

                {/* Дропдаун выбора страны */}
                {showPhoneDrop && (
                  <div className="phone-dropdown">
                    <div className="phone-search-wrap">
                      <input
                        autoFocus
                        value={phoneSearch}
                        onChange={e => setPhoneSearch(e.target.value)}
                        placeholder={t('search_country', lang)}
                        className="phone-search-input"
                        onClick={e => e.stopPropagation()}
                      />
                    </div>
                    <div className="phone-country-list">
                      {CONT_ORDER.map(cont => {
                        const list = groupedPhone[cont];
                        if (!list?.length) return null;
                        return (
                          <div key={cont}>
                            <div className="phone-continent-label">
                              {CONTINENTS[cont][lang] || CONTINENTS[cont].en}
                            </div>
                            {list.map(c => (
                              <button
                                key={c.code}
                                type="button"
                                className={`phone-country-option ${form.countryCode===c.code?'selected':''}`}
                                onClick={() => handleCountrySelect(c.code)}
                              >
                                <span className="pco-flag">{c.flag}</span>
                                <span className="pco-name">{countryName(c, lang)}</span>
                                <span className="pco-dial">{c.dial}</span>
                                <span className="pco-len">{c.minLen === c.maxLen ? `${c.minLen}` : `${c.minLen}–${c.maxLen}`}</span>
                              </button>
                            ))}
                          </div>
                        );
                      })}
                      {!CONT_ORDER.some(c => groupedPhone[c]?.length) && (
                        <p className="phone-no-result">{t('search_no_result', lang)}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Паспорт (опционально) */}
          {mode === 'register' && (
            <div className="auth-field">
              <div className="passport-header">
                <label>{t('auth_passport', lang)}</label>
                <button type="button" className="passport-info-btn"
                  onClick={() => setShowPassportInfo(v => !v)}>
                  {showPassportInfo ? '✕' : 'ℹ'}
                </button>
              </div>
              {showPassportInfo && (
                <div className="passport-info-box">
                  <p>{t('auth_passport_info', lang)}</p>
                  <label className="passport-agree-label">
                    <input type="checkbox" checked={passportAgreed}
                      onChange={e => setPassportAgreed(e.target.checked)}/>
                    <span>{t('auth_passport_agree', lang)}</span>
                  </label>
                </div>
              )}
              {passportAgreed && (
                <div className="passport-upload">
                  {passportPreview ? (
                    <div className="passport-preview-wrap">
                      <img src={passportPreview} alt="passport" className="passport-preview"/>
                      <button type="button" className="passport-remove"
                        onClick={() => { setPassportFile(null); setPassportPreview(null); }}>✕</button>
                    </div>
                  ) : (
                    <div className="passport-btns">
                      <button type="button" className="btn-passport" onClick={() => fileRef.current?.click()}>
                        📁 {t('auth_upload_photo', lang)}
                      </button>
                      <button type="button" className="btn-passport" onClick={() => cameraRef.current?.click()}>
                        📷 {t('auth_take_photo', lang)}
                      </button>
                    </div>
                  )}
                  <input ref={fileRef}   type="file" accept="image/*" hidden onChange={handleFile}/>
                  <input ref={cameraRef} type="file" accept="image/*" capture="environment" hidden onChange={handleFile}/>
                </div>
              )}
            </div>
          )}

          {error   && <p className="auth-error">⚠ {error}</p>}
          {success && <p className="auth-success">✓ {success}</p>}

          <button type="submit" className="auth-submit" disabled={loading}>
            {loading
              ? t('auth_loading', lang)
              : mode==='login' ? t('auth_login', lang) : t('auth_register', lang)}
          </button>
        </form>

        <p className="auth-switch">
          {mode==='login' ? t('auth_no_acc', lang) : t('auth_has_acc', lang)}{' '}
          <button onClick={() => { setMode(mode==='login'?'register':'login'); setError(''); setPhoneError(''); }}>
            {mode==='login' ? t('auth_register', lang) : t('auth_login', lang)}
          </button>
        </p>
      </div>
    </main>
  );
}
