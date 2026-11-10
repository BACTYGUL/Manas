import React from 'react';

/**
 * AdminTable — универсальная таблица для Admin-панели.
 * @param {Array}  columns  — [{key, label}]
 * @param {Array}  rows     — массив объектов
 * @param {node}   actions  — рендер-функция (row) => JSX для колонки действий
 * @param {string} emptyMsg — сообщение если rows пустой
 */
export default function AdminTable({ columns, rows, actions, emptyMsg }) {
  return (
    <div className="admin-list-wrap">
      <table className="admin-table">
        <thead>
          <tr>
            {columns.map(c => <th key={c.key}>{c.label}</th>)}
            {actions && <th>—</th>}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr><td colSpan={columns.length + (actions?1:0)} className="admin-empty">{emptyMsg}</td></tr>
          ) : (
            rows.map((row, idx) => (
              <tr key={row.id ?? row.email ?? idx}>
                {columns.map(c => <td key={c.key}>{c.render ? c.render(row) : (row[c.key] ?? '—')}</td>)}
                {actions && <td>{actions(row)}</td>}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
