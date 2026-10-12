import { useState } from "react";
import "Home/";

const sections = [
{
    title:"Эпосундагы тарыхы",
    image:"https://open.kg/uploads/posts/2020-03/1585027557_screenshot_2.webp",
    text:"<Манас>-Кыргыз элинин улуу мурасы.Эпос элдин тарыхынб эрдигин жана каада-салтын чагылдырат"
},
{
    title:"Кармандар",
image:"https:encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbiEK4tZzRDf9cb3k0BaA9oKHDp93R7Tgvem5zg7kjxGQf7csavQDK8i-W&s=10",
text:"Манас, Каныкей , Бакай, Алмамбет,Семетей жана Сейтек-Эпостун белгилуу каармандары",
},
{
title:"Мурас жана мааниси",
image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsjf4B3fcY_CBeMKbPP9kXEEOsyewVhfKqrSo4V7Jutw&s=10",
text:"<Манас>иэпосу кыргыз элинин руханий байлыгы жана келекчек муундарга калтырган мурасы",
},
{
title:"Манасчылар",
image:"data:image/jpeg;base64,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",
text:"Манасчылар эпосту айтып, муундан муунга жеткирип келишкен"
},


    ];

    return (
    <div className="website">
      <header className="header">
        <div className="logo">
          <span>❖</span>
          <div>
            <h2>МАНАС</h2>
            <p>Кыргыз элинин улуу эпосу</p>
          </div>
        </div>

        <nav>
          <a href="#home">Башкы бет</a>
          <a href="#history">Эпостун тарыхы</a>
          <a href="#heroes">Каармандар</a>
          <a href="#heritage">Мурас жана мааниси</a>
        </nav>
      </header>

      <section className="hero" id="home">
        <div className="hero-text">
          <p className="subtitle">КЫРГЫЗ ЭЛИНИН УЛУУ МУРАСЫ</p>
          <h1>МАНАС</h1>
          <div className="line">────── ❖ ──────</div>

          <p className="description">
            Манас — кыргыз элинин тарыхын, эрдигин,
            ынтымагын жана мекенге болгон сүйүүсүн
            даңазалаган улуу баатыр.
          </p>

          <a className="button" href="#history">
            Эпостун тарыхын окуу →
          </a>
        </div>

        <div className="hero-image">
      
            alt="Кыргызстандын бийик тоолору"
          /
          <div className="image-caption">
            «Манас — кыргыз элинин өчпөс мурасы!»
          </div>
        </div>
      </section>

      <section className="content" id="history">
        <p className="subtitle">НЕГИЗГИ БӨЛҮКТӨР</p>
        <h2 className="section-title">Манас эпосу</h2>

        <div className="cards">
          {sections.map((item, index) => (
            <article
              className="card"
              key={item.title}
              id={index === 1 ? "heroes" : index === 2 ? "heritage" : undefined}
            >
              <div className="card-image">
                <img src={item.image} alt={item.title} />
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>

              <div className="card-body">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <button onClick={() => setSelected(item)}>
                  Толугураак окуу →
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="quote">
        <span className="symbol">❖</span>
        <div>
          <p>«Элдин руху — анын тарыхында,</p>
          <p>тарыхы — анын эпосунда.»</p>
          <small>— Манас эпосуна арналган сөз</small>
        </div>
      </section>

      <footer>
        <h2>❖ МАНАС ЭПОСУ ❖</h2>
        <p>Кыргыз элинин улуу мурасы</p>
        <p>© 2026</p>
      </footer>

      {selected && (
        <div className="overlay" onClick={() => setSelected(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="close"
              onClick={() => setSelected(null)}
            >
              ✕
            </button>
            <h2>{selected.title}</h2>
            <img src={selected.image} alt={selected.title} />
            <p>{selected.text}</p>
          </div>
        </div>
      )}
    </div>
  );
