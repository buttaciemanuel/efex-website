import React from 'react';
import MediaQuery from 'react-responsive';
import { useState } from 'react';
import { AppBar, Box, Toolbar, Button, IconButton, Link, Menu, MenuItem, ListItemText } from '@mui/material';
import { TFunction, i18n } from 'i18next';

import MenuIcon from '@mui/icons-material/Menu';
import LanguageIcon from '@mui/icons-material/Language';
import Logo from '../../assets/images/logo.png';
import LanguageSwitch from './LanguageSwitch';

interface TopBarProps {
    anchorEl: any;
    openLanguageSwitch: (event: React.SyntheticEvent) => void;
    onSelectLanguage: (language: string | null) => void;
    languageTranslator: i18n,
    translation: TFunction;
}

const menuOptions = ['home', 'solutions', 'support', 'about', 'faqs'];

export default function TopBar({ anchorEl, openLanguageSwitch, onSelectLanguage, languageTranslator, translation }: TopBarProps) {
    const [menu, setMenu] = useState(menuOptions[0]);
    const [menuAnchorEl, setMenuAnchorEl] = useState<Element | null>(null);
    const openMobileMenu = (event: React.SyntheticEvent) => {
        if (event !== undefined) setMenuAnchorEl(event.currentTarget);
    };
    const onSelectMobileMenuOption = (item: string | null) => {
        setMenuAnchorEl(null);

        if (item !== null) setMenu(item);
    };

    return <>
        <MediaQuery minWidth={1224}>
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
                                onClick={() => setMenu(item)}
                                fontWeight="light"
                                sx={{ marginX: '1em' }}
                                color={item === menu ? 'primary' : 'inherit'}
                            >
                                {translation(item)}
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
                            {translation('login')}
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

                    <LanguageSwitch anchorEl={anchorEl} onSelectLanguage={onSelectLanguage} currentLanguage={languageTranslator.language} translation={translation} />

                </Toolbar>
            </AppBar>
        </MediaQuery>
        <MediaQuery maxWidth={1224}>
            <AppBar position="sticky" elevation={0} enableColorOnDark sx={{ bgcolor: 'white', color: 'black', justifyContent: 'center', alignItems: 'center' }}>
                <Toolbar sx={{ width: '80%' }}>

                    <Box component="img" alt="EFEX" src={Logo} sx={{ height: 48 }} />

                    <Box marginLeft="auto">
                        <Button size='small' variant="contained" color="primary" disableElevation sx={{
                            boxShadow: 'none',
                            borderRadius: '20px',
                            '&:hover': {
                                boxShadow: 'none',
                            },
                        }}>
                            {translation('login')}
                        </Button>
                    </Box>

                    <IconButton
                        edge="end"
                        color="inherit"
                        aria-label="language"
                        sx={{ marginLeft: '0.5em' }}
                        onClick={openLanguageSwitch}
                    >
                        <LanguageIcon />
                    </IconButton>

                    <LanguageSwitch anchorEl={anchorEl} onSelectLanguage={onSelectLanguage} currentLanguage={languageTranslator.language} translation={translation} />

                    <IconButton
                        edge="end"
                        color="inherit"
                        aria-label="language"
                        sx={{ marginLeft: '0.5em' }}
                        onClick={openMobileMenu}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Menu
                        anchorEl={menuAnchorEl}
                        open={Boolean(menuAnchorEl)}
                        onClose={() => onSelectMobileMenuOption(null)}
                    >
                        {menuOptions.map(item => {
                            return <MenuItem onClick={() => onSelectMobileMenuOption(item)}>
                                <ListItemText primary={translation(item)} color={item === menu ? 'primary' : 'inherit'} />
                            </MenuItem>
                        })}
                    </Menu>

                </Toolbar>
            </AppBar>
        </MediaQuery>
    </>
}