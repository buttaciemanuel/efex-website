import React from 'react';
import { useState } from 'react';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

import './assets/styles/App.css';

import ConversionBar from './components/landing/ConversionBar';

import Background from './assets/images/background2.jpg'
import MainContent from './components/landing/MainContent';
import TopBar from './components/landing/TopBar';

function App() {
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<EventTarget | null>(null);

  const openLanguageSwitch = (event: React.SyntheticEvent) => {
    if (event !== undefined) setAnchorEl(event.currentTarget);
  };

  const onSelectLanguage = (lang: string | null) => {
    setAnchorEl(null);
    if (lang) {
      i18n.changeLanguage(lang);
    }
  };

  return <Box sx={{
    backgroundImage: `url(${Background})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    height: "100vh",
    overflow: 'auto'
  }}>
    <TopBar anchorEl={anchorEl} openLanguageSwitch={openLanguageSwitch} onSelectLanguage={onSelectLanguage} languageTranslator={i18n} translation={t}/>
    <ConversionBar translation={t} />
    <MainContent translation={t} />
  </Box>
}

export default App;
