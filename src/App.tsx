import React from 'react';
import { useState } from 'react';
import { AppBar, Box, Toolbar, Button, IconButton, Link } from '@mui/material';
import { useTranslation } from 'react-i18next';

import './assets/styles/App.css';

import LanguageIcon from '@mui/icons-material/Language';
import Logo from './assets/images/logo.png';
import LanguageSwitch from './components/landing/LanguageSwitch';
import ConversionBar from './components/landing/ConversionBar';

import Background from './assets/images/background2.jpg'
import MainContent from './components/landing/MainContent';

const menuOptions = ['home', 'solutions', 'support', 'about', 'faqs'];

function App() {
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<EventTarget | null>(null);
  const [menup, setMenup] = useState(menuOptions[0]);

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
    height: "100vh"
  }}>
    <AppBar position="sticky" elevation={0} enableColorOnDark sx={{ bgcolor: 'white', color: 'black', alignItems: 'center' }}>
      <Toolbar sx={{ width: '75%' }}>

        <Box component="img" sx={{ height: 48 }} alt="EFEX" src={Logo} />

        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'safe center' }}>
          {menuOptions.map(item => {
            return <Link
              id={item}
              variant="body1"
              component="button"
              underline="none"
              onClick={() => setMenup(item)}
              fontWeight="light"
              sx={{ marginX: '1em' }}
              color={item === menup ? 'primary' : 'inherit'}
            >
              {t(item)}
            </Link>
          })}
        </Box>

        <Box>
          <Button variant="contained" color="primary" disableElevation sx={{
            boxShadow: 'none',
            borderRadius: '20px',
            '&:hover': {
              boxShadow: 'none',
            },
          }}>
            {t('login')}
          </Button>
        </Box>

        <IconButton
          edge="end"
          color="inherit"
          aria-label="language"
          sx={{ marginLeft: '1em' }}
          onClick={openLanguageSwitch}
        >
          <LanguageIcon />
        </IconButton>

        <LanguageSwitch anchorEl={anchorEl} onSelectLanguage={onSelectLanguage} currentLanguage={i18n.language} translation={t} />

      </Toolbar>
    </AppBar>

    <ConversionBar translation={t} />

    <MainContent translation={t} />
  </Box>
}

export default App;
