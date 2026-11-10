import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { t } from '../i18n/translations';
import './Chat.css';

function fmt(ts) {
  if (!ts) return '';
  const d = new Date(ts);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) +
    ' ' + d.toLocaleDateString([], { day: '2-digit', month: '2-digit' });
}

export default function Chat() {
  const navigate = useNavigate();
  const { user, lang, chatSend, chatGetMessages, chatMarkRead, chatUnreadForUser } = useApp();
  const [text, setText] = useState('');
  const [msgs, setMsgs] = useState([]);
  const bottomRef = useRef(null);

  const refresh = () => {
    if (!user) return;
    setMsgs(chatGetMessages(user.id));
  };

  useEffect(() => { refresh(); }, [user]);

  // Отмечаем admin-сообщения прочитанными когда заходим в чат
  useEffect(() => {
    if (user) { chatMarkRead(user.id, 'admin'); refresh(); }
  }, [user]);

  // Автопрокрутка вниз
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs]);

  if (!user) return (
    <main className="chat-page">
      <div className="chat-login-req">
        <p>{t('chat_login_req', lang)}</p>
        <button className="btn-gold" onClick={() => navigate('/auth')}>
          {t('auth_login', lang)}
        </button>
      </div>
    </main>
  );

  const handleSend = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    chatSend(user.id, 'user', text);
    setText('');
    setTimeout(refresh, 50);
  };

  const unread = chatUnreadForUser(user.id);

  return (
    <main className="chat-page">
      <div className="chat-container">
        <div className="chat-header">
          <span className="inner-page__breadcrumb" onClick={() => navigate('/')}>
            ← {t('breadcrumb_home', lang)}
          </span>
          <h1>{t('chat_title', lang)}</h1>
          <div className="chat-with">
            <div className="chat-admin-avatar">A</div>
            <span>{t('chat_admin', lang)}</span>
            {unread > 0 && <span className="chat-unread-badge">{unread}</span>}
          </div>
        </div>

        <div className="chat-messages">
          {msgs.length === 0 ? (
            <div className="chat-empty-msg">
              <span>💬</span>
              <p>{t('chat_empty', lang)}</p>
            </div>
          ) : (
            msgs.map(m => (
              <div key={m.id} className={`chat-msg chat-msg--${m.from}`}>
                <div className="chat-bubble">
                  <p>{m.text}</p>
                  <span className="chat-time">{fmt(m.ts)}</span>
                </div>
              </div>
            ))
          )}
          <div ref={bottomRef}/>
        </div>

        <form className="chat-input-row" onSubmit={handleSend}>
          <input
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder={t('chat_placeholder', lang)}
            className="chat-input"
          />
          <button type="submit" className="chat-send-btn" disabled={!text.trim()}>
            {t('chat_send', lang)}
          </button>
        </form>
      </div>
    </main>
  );
}
