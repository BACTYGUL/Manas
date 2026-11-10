import React, { useState } from 'react';

/**
 * StarRating — универсальный компонент звёздного рейтинга.
 * @param {number}   value     — текущее значение (1–5)
 * @param {number}   size      — размер звёзд в px (default: 16)
 * @param {function} onChange  — если передан, компонент становится интерактивным
 */
export default function StarRating({ value = 0, size = 16, onChange }) {
  const [hover, setHover] = useState(0);
  const interactive = !!onChange;

  return (
    <div
      className="stars"
      style={{ cursor: interactive ? 'pointer' : 'default', display: 'flex', gap: 2 }}
    >
      {[1, 2, 3, 4, 5].map(n => (
        <span
          key={n}
          className={n <= Math.round(hover || value) ? 'star star--on' : 'star'}
          style={{ fontSize: size }}
          onMouseEnter={() => interactive && setHover(n)}
          onMouseLeave={() => interactive && setHover(0)}
          onClick={() => interactive && onChange(n)}
        >
          ★
        </span>
      ))}
    </div>
  );
}
