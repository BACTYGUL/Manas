import React from 'react';
import { t } from '../i18n/translations';

// Технические ключи (используются как value в select и для фильтрации)
const CATS_DATA = [
  { value: 'Books',      labelKey: 'cat_books_short'  },
  { value: 'Souvenirs',  labelKey: 'cat_sov_short'    },
  { value: 'Clothing',   labelKey: 'cat_cloth_short'  },
  { value: 'Music',      labelKey: 'cat_music_short'  },
];
const IMGS  = ['book','book2','book3','book4','book5','book6','souvenir','horse','cloth','poster','ornament','mug','music','scarf'];
const EMPTY = { title:'', titleRu:'', titleEn:'', category:'Books', price:'', stock:'', desc:'', descRu:'', descEn:'', image:'book', imageUrl:'' };

export default function AdminProductForm({ lang, form, setForm, editingId, message, onSave, onCancel }) {
  return (
    <div className="admin-form-wrap">
      <form className="admin-form" onSubmit={onSave}>
        <h3>{editingId ? t('admin_edit_product',lang) : t('admin_add_product',lang)}</h3>
        <div className="admin-form-grid">
          <div className="admin-form-field">
            <label>{t('admin_name_ky', lang)}</label>
            <input required value={form.title}    onChange={e=>setForm(f=>({...f,title:e.target.value}))}/>
          </div>
          <div className="admin-form-field">
            <label>{t('admin_name_ru', lang)}</label>
            <input        value={form.titleRu}  onChange={e=>setForm(f=>({...f,titleRu:e.target.value}))}/>
          </div>
          <div className="admin-form-field">
            <label>{t('admin_name_en', lang)}</label>
            <input        value={form.titleEn}  onChange={e=>setForm(f=>({...f,titleEn:e.target.value}))}/>
          </div>
          <div className="admin-form-field">
            <label>{t('admin_category', lang)}</label>
            <select value={form.category} onChange={e=>setForm(f=>({...f,category:e.target.value}))}>
              {CATS_DATA.map(c=>(
                <option key={c.value} value={c.value}>{t(c.labelKey, lang)}</option>
              ))}
            </select>
          </div>
          <div className="admin-form-field">
            <label>{t('admin_img_type', lang)}</label>
            <select value={form.image} onChange={e=>setForm(f=>({...f,image:e.target.value}))}>
              {IMGS.map(i=><option key={i} value={i}>{i}</option>)}
            </select>
          </div>
          <div className="admin-form-field admin-form-field--full">
            <label>Image URL</label>
            <input value={form.imageUrl || ''} onChange={e=>setForm(f=>({...f,imageUrl:e.target.value}))} placeholder="https://example.com/image.jpg"/>
          </div>
          <div className="admin-form-field">
            <label>{t('admin_price', lang)}</label>
            <input required type="number" min="0" value={form.price} onChange={e=>setForm(f=>({...f,price:e.target.value}))}/>
          </div>
          <div className="admin-form-field">
            <label>{t('admin_stock_field', lang)}</label>
            <input required type="number" min="0" value={form.stock} onChange={e=>setForm(f=>({...f,stock:e.target.value}))}/>
          </div>
          <div className="admin-form-field admin-form-field--full">
            <label>{t('admin_desc_ky', lang)}</label>
            <textarea rows={3} value={form.desc}   onChange={e=>setForm(f=>({...f,desc:e.target.value}))}/>
          </div>
          <div className="admin-form-field admin-form-field--full">
            <label>{t('admin_desc_ru', lang)}</label>
            <textarea rows={3} value={form.descRu} onChange={e=>setForm(f=>({...f,descRu:e.target.value}))}/>
          </div>
          <div className="admin-form-field admin-form-field--full">
            <label>{t('admin_desc_en', lang)}</label>
            <textarea rows={3} value={form.descEn} onChange={e=>setForm(f=>({...f,descEn:e.target.value}))}/>
          </div>
        </div>
        {message && <p className="admin-saved">{message}</p>}
        <div className="admin-form-btns">
          <button type="submit" className="btn-gold">
            {editingId ? t('admin_save',lang) : t('admin_add',lang)}
          </button>
          {editingId && (
            <button type="button" className="btn-outline" onClick={onCancel}>
              {t('admin_cancel', lang)}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export { EMPTY };
