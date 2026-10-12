import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './Auth.css';

export default function Auth() {
  const navigate = useNavigate();
  const { register, login, lang } = useApp();
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const t = {
    login: { ky: 'Кирүү', ru: 'Войти' }[lang],
    register: { ky: 'Катталуу', ru: 'Регистрация' }[lang],
    name: { ky: 'Аты-жөнү', ru: 'Имя' }[lang],
    email: { ky: 'Email', ru: 'Email' }[lang],
    password: { ky: 'Сырсөз', ru: 'Пароль' }[lang],
    confirm: { ky: 'Сырсөздү ырастоо', ru: 'Подтвердите пароль' }[lang],
    noAccount: { ky: 'Аккаунт жокпу?', ru: 'Нет аккаунта?' }[lang],
    hasAccount: { ky: 'Аккаунт барбы?', ru: 'Уже есть аккаунт?' }[lang],
    back: { ky: '← Башкы бет', ru: '← Главная' }[lang],
    passMatch: { ky: 'Сырсөздөр дал келбейт', ru: 'Пароли не совпадают' }[lang],
    successReg: { ky: 'Ийгиликтүү каттaldых!', ru: 'Успешно зарегистрированы!' }[lang],
  };

  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');
    setLoading(true);

    if (mode === 'register') {
      if (form.password !== form.confirm) {
        setError(t.passMatch);
        setLoading(false);
        return;
      }
      const res = await register(form.name, form.email, form.password);
      setLoading(false);
      if (res.error) return setError(res.error);
      setSuccess(t.successReg);
      setTimeout(() => navigate('/'), 1000);
    } else {
      const res = await login(form.email, form.password);
      setLoading(false);
      if (res.error) return setError(res.error);
      navigate('/');
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <span className="auth-back" onClick={() => navigate('/')}>{t.back}</span>

        <div className="auth-logo">
          <svg width="48" height="48" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="18" stroke="#c9a84c" strokeWidth="2"/>
            <path d="M20 6 L22 14 L30 14 L24 19 L26 27 L20 22 L14 27 L16 19 L10 14 L18 14 Z" fill="#c9a84c"/>
          </svg>
          <span>МАНАС ЭПОСУ</span>
        </div>

        <div className="auth-tabs">
          <button className={mode === 'login' ? 'active' : ''} onClick={() => setMode('login')}>{t.login}</button>
          <button className={mode === 'register' ? 'active' : ''} onClick={() => setMode('register')}>{t.register}</button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {mode === 'register' && (
            <div className="auth-field">
              <label>{t.name}</label>
              <input name="name" value={form.name} onChange={handleChange} required placeholder={t.name} />
            </div>
          )}
          <div className="auth-field">
            <label>{t.email}</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="example@mail.com" />
          </div>
          <div className="auth-field">
            <label>{t.password}</label>
            <input name="password" type="password" value={form.password} onChange={handleChange} required placeholder="••••••••" />
          </div>
          {mode === 'register' && (
            <div className="auth-field">
              <label>{t.confirm}</label>
              <input name="confirm" type="password" value={form.confirm} onChange={handleChange} required placeholder="••••••••" />
            </div>
          )}
          {error && <p className="auth-error">{error}</p>}
          {success && <p className="auth-success">{success}</p>}
          <button type="submit" className="auth-submit" disabled={loading}>
            {loading
              ? (lang === 'ky' ? 'Жүктөлүүдө...' : 'Загрузка...')
              : (mode === 'login' ? t.login : t.register)}
          </button>
        </form>

        <p className="auth-switch">
          {mode === 'login' ? t.noAccount : t.hasAccount}{' '}
          <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
            {mode === 'login' ? t.register : t.login}
          </button>
        </p>
      </div>
    </main>
  );
}
