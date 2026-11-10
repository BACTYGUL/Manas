import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { t } from '../i18n/translations';
import InnerPageHero from '../components/InnerPageHero';
import BigQuote from '../components/BigQuote';
import './InnerPage.css';

function HeroAvatar({ hero }) {
  const [src, setSrc] = useState(hero.imageUrl);
  const [tried, setTried] = useState(0);

  const handleError = () => {
    if (tried === 0 && hero.imageFallback) {
      // Пробуем fallback URL
      setSrc(hero.imageFallback);
      setTried(1);
    } else if (tried === 1) {
      // Показываем SVG-заглушку
      setSrc(null);
      setTried(2);
    }
  };

  if (src && tried < 2) {
    return (
      <img
        src={src}
        alt={hero.nameKey}
        className="hero-card__img-real"
        onError={handleError}
        loading="lazy"
      />
    );
  }

  // SVG-заглушка
  return (
    <svg width="100%" height="100%" viewBox="0 0 200 220" fill="none">
      <rect width="200" height="220" fill={hero.color} opacity="0.08"/>
      <ellipse cx="100" cy="80" rx="30" ry="34" fill={hero.color} opacity="0.4"/>
      <path d="M40 200 Q100 160 160 200" fill={hero.color} opacity="0.25"/>
      <path d="M75 55 Q100 30 125 55" fill={hero.color} opacity="0.55"/>
      <line x1="100" y1="46" x2="100" y2="30" stroke="#c9a84c" strokeWidth="2"/>
      <path d="M96 30 L100 20 L104 30Z" fill="#c9a84c" opacity="0.9"/>
    </svg>
  );
}

const HEROES = [
  { id:1, color:'#8b1a1a',
    nameKey:'h1_name', roleKey:'h1_role', descKey:'h1_desc',
    facts: ['h1_f1','h1_f2','h1_f3','h1_f4'],
    // Манас — фото 3: воин с копьём и флагом
    imageUrl:'/heroes/manas.jpg',
    imageFallback:'https://images.unsplash.com/photo-1564419320461-6870880221ad?auto=format&fit=crop&w=600&q=80',
  },
  { id:2, color:'#1a4a8b',
    nameKey:'h2_name', roleKey:'h2_role', descKey:'h2_desc',
    facts: ['h2_f1','h2_f2','h2_f3','h2_f4'],
    // Семетей — фото 4: воин ведёт войско
    imageUrl:'/heroes/semetey.jpg',
    imageFallback:'https://images.unsplash.com/photo-1554188248-986adbb73be4?auto=format&fit=crop&w=600&q=80',
  },
  { id:3, color:'#1a6b2a',
    nameKey:'h3_name', roleKey:'h3_role', descKey:'h3_desc',
    facts: ['h3_f1','h3_f2','h3_f3','h3_f4'],
    // Сейтек — фото 5: молодой воин на коне
    imageUrl:'/heroes/seitek.jpg',
    imageFallback:'https://images.unsplash.com/photo-1593351415075-3bac9f45c877?auto=format&fit=crop&w=600&q=80',
  },
  { id:4, color:'#6b4a1a',
    nameKey:'h4_name', roleKey:'h4_role', descKey:'h4_desc',
    facts: ['h4_f1','h4_f2','h4_f3','h4_f4'],
    // Алмамбет — фото 2: воин на чёрном коне с мечом
    imageUrl:'/heroes/almambet.jpg',
    imageFallback:'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
  },
  { id:5, color:'#6b1a6b',
    nameKey:'h5_name', roleKey:'h5_role', descKey:'h5_desc',
    facts: ['h5_f1','h5_f2','h5_f3','h5_f4'],
    // Каныкей — фото 6: женщины в нацодежде у юрты
    imageUrl:'/heroes/kanikey.jpg',
    imageFallback:'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=600&q=80',
  },
  { id:6, color:'#2a6b6b',
    nameKey:'h6_name', roleKey:'h6_role', descKey:'h6_desc',
    facts: ['h6_f1','h6_f2','h6_f3','h6_f4'],
    // Чыйырды — мать Манаса
    imageUrl:'/heroes/chiyirdi.jpg',
    imageFallback:'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
  },
];

export default function Heroes() {
  const { lang } = useApp();
  const [selected, setSelected] = useState(null);

  return (
    <main className="inner-page">
      <InnerPageHero variant="heroes" lang={lang}
        title={t('heroes_title', lang)} subtitle={t('heroes_sub', lang)}/>

      <section className="inner-page__section">
        <div className="inner-page__container">
          <div className="heroes-grid">
            {HEROES.map(hero => (
              <div key={hero.id}
                className={`hero-card ${selected===hero.id ? 'hero-card--active' : ''}`}
                onClick={() => setSelected(selected===hero.id ? null : hero.id)}
                style={{ '--hero-color': hero.color }}>

                {/* Изображение — занимает верхнюю часть карточки */}
                <div className="hero-card__cover">
                  <HeroAvatar hero={hero}/>
                  <div className="hero-card__cover-overlay"/>
                </div>

                {/* Контент под изображением */}
                <div className="hero-card__content">
                  <h3 className="hero-card__name">{t(hero.nameKey, lang)}</h3>
                  <span className="hero-card__role">{t(hero.roleKey, lang)}</span>

                  {selected===hero.id && (
                    <div className="hero-card__detail">
                      <p className="hero-card__desc">{t(hero.descKey, lang)}</p>
                      <ul className="hero-card__facts">
                        {hero.facts.map(fk => <li key={fk}>{t(fk, lang)}</li>)}
                      </ul>
                    </div>
                  )}

                  <button className="hero-card__btn">
                    {selected===hero.id ? t('heroes_close', lang) : t('heroes_full', lang)}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="inner-page__section inner-page__section--quote">
        <div className="inner-page__container">
          <BigQuote text={t('heroes_quote', lang)} cite={t('heroes_cite', lang)}/>
        </div>
      </section>
    </main>
  );
}
