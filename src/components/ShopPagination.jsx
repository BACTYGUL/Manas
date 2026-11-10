import React from 'react';

export default function ShopPagination({ page, totalPages, onPage }) {
  if (totalPages <= 1) return null;
  return (
    <div className="shop-pagination">
      <button disabled={page===1} onClick={() => onPage(p=>p-1)}>←</button>
      {Array.from({length: totalPages}, (_,i) => (
        <button key={i+1}
          className={page===i+1 ? 'active' : ''}
          onClick={() => onPage(i+1)}>
          {i+1}
        </button>
      ))}
      <button disabled={page===totalPages} onClick={() => onPage(p=>p+1)}>→</button>
    </div>
  );
}
