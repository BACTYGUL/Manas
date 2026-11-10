import React from 'react';

/**
 * BigQuote — блок с большой цитатой (используется на внутренних страницах).
 * @param {string} text — текст цитаты
 * @param {string} cite — источник (необязательно)
 */
export default function BigQuote({ text, cite }) {
  return (
    <blockquote className="big-quote">
      <p>{text}</p>
      {cite && <cite>{cite}</cite>}
    </blockquote>
  );
}
