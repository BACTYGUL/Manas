import React from 'react';
import { useNavigate } from 'react-router-dom';
import './InnerPage.css';

const timeline = [
  {
    year: 'VIII–X кк.',
    title: 'Эпостун пайда болушу',
    desc: 'Манас эпосу байыркы кыргыз уруулары арасында оозеки түрдө жаралган. Баатырдык жырлардын биринчи варианттары ушул доордо калыптанган деп эсептелет.',
  },
  {
    year: 'XI–XV кк.',
    title: 'Манасчылар доору',
    desc: 'Манасчылар — эпосту жатка айткан, муундан муунга өткөрүп берген касиеттүү жомокчулар. Алардын аркасында эпостун текстери сакталып, байыган.',
  },
  {
    year: 'XIX к.',
    title: 'Жазылып алынышы',
    desc: 'Орус окумуштуусу Чокан Валиханов 1856-жылы эпостун "Кокөтөйдүн ашы" бөлүгүн биринчи жолу жазып алган. Кийин Радлов да чоң үлүш кошкон.',
  },
  {
    year: '1920–1940',
    title: 'Советтик доор',
    desc: 'Манасчы Сагымбай Орозбаков 500 000 ыр сабын айтып берген — бул эпостун эң чоң варианты болгон. Кийинчерээк Саякбай Каралаев да зор салым кошкон.',
  },
  {
    year: '1995',
    title: 'ЮНЕСКО таануусу',
    desc: 'Манас эпосунун 1000 жылдыгы ЮНЕСКО тарабынан расмий белгиленген. Бул Кыргызстан үчүн чоң маданий жеңиш болгон.',
  },
  {
    year: 'Бүгүнкү күн',
    title: 'Дүйнөлүк мурас',
    desc: 'Бүгүн Манас эпосу дүйнөнүн 40дан ашуун тилине которулган. Ал адамзаттын материалдык эмес маданий мурасынын бир бөлүгү катары таанылган.',
  },
];

export default function EposHistory() {
  const navigate = useNavigate();
  return (
    <main className="inner-page">
      {/* Hero banner */}
      <section className="inner-page__hero inner-page__hero--history">
        <div className="inner-page__hero-overlay" />
        <div className="inner-page__hero-content">
          <span className="inner-page__breadcrumb" onClick={() => navigate('/')}>
            ← Башкы бет
          </span>
          <h1 className="inner-page__hero-title">Эпостун тарыхы</h1>
          <p className="inner-page__hero-sub">
            Дүйнөдөгү эң чоң эпостордун бирин жараткан улуу маданий мурастын тарыхы
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="inner-page__section">
        <div className="inner-page__container">
          <div className="inner-page__intro">
            <div className="inner-page__intro-text">
              <h2>Манас эпосу деген эмне?</h2>
              <p>
                Манас эпосу — кыргыз элинин улуттук баатырдык эпосу. Ал дүйнөдөгү эң чоң оозеки
                адабий чыгармалардын бири болуп эсептелет жана 500 000 ыр сабынан ашат — бул
                Илиада менен Одиссеяны чогуу алганда 20 эсе чоңураак.
              </p>
              <p>
                Эпос үч бөлүктөн турат: <strong>Манас</strong>, <strong>Семетей</strong> жана
                <strong> Сейтек</strong> — бул үч муундун баатырдык жолун баяндайт.
              </p>
            </div>
            <div className="inner-page__intro-stat">
              <div className="stat-box">
                <span className="stat-box__num">500 000+</span>
                <span className="stat-box__label">ыр сабы</span>
              </div>
              <div className="stat-box">
                <span className="stat-box__num">40+</span>
                <span className="stat-box__label">тилге которулган</span>
              </div>
              <div className="stat-box">
                <span className="stat-box__num">1000+</span>
                <span className="stat-box__label">жыл тарых</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="inner-page__section inner-page__section--dark">
        <div className="inner-page__container">
          <h2 className="inner-page__section-title">Тарыхый хронология</h2>
          <div className="timeline">
            {timeline.map((item, i) => (
              <div className="timeline__item" key={i}>
                <div className="timeline__year">{item.year}</div>
                <div className="timeline__dot" />
                <div className="timeline__content">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="inner-page__section inner-page__section--quote">
        <div className="inner-page__container">
          <blockquote className="big-quote">
            <p>«Манас — кыргыз элинин жүрөгү, тарыхы жана келечеги»</p>
            <cite>— Чыңгыз Айтматов</cite>
          </blockquote>
        </div>
      </section>
    </main>
  );
}
