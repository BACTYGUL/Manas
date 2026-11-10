import React from 'react';

/**
 * LogoSVG — единый логотип сайта (звезда в круге).
 * Используется в Header, Footer, Auth.
 * @param {number} size — размер иконки (default: 36)
 */
export default function LogoSVG({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="18" stroke="#c9a84c" strokeWidth="2" />
      <path
        d="M20 6 L22 14 L30 14 L24 19 L26 27 L20 22 L14 27 L16 19 L10 14 L18 14 Z"
        fill="#c9a84c"
      />
    </svg>
  );
}
