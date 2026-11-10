import React from 'react';
import { useApp } from '../context/AppContext';
import { t } from '../i18n/translations';
import HeroSection from '../components/HeroSection';
import HomeCards from '../components/HomeCards';
import HomeAbout from '../components/HomeAbout';
import WelcomeBlock from '../components/WelcomeBlock';
import './Home.css';

export default function Home() {
  const { lang } = useApp();
  return (
    <main className="home">
      <WelcomeBlock lang={lang}/>
      <HeroSection lang={lang}/>
      <HomeCards   lang={lang}/>
      <HomeAbout   lang={lang}/>
    </main>
  );
}
