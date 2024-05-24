import React from 'react';
import { TFunction } from 'i18next';
import { Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';

import { US, ES } from 'country-flag-icons/react/3x2'

const languages = [
  { id: 'en', icon: US, language: 'english' },
  { id: 'es', icon: ES, language: 'spanish' }
]

interface LanguageSwitchProps {
  anchorEl: any;
  onSelectLanguage: (language: string | null) => void;
  translation: TFunction;
  currentLanguage: string;
}

export default function LanguageSwitch({ anchorEl, onSelectLanguage, translation, currentLanguage }: LanguageSwitchProps) {
  return <Menu
    anchorEl={anchorEl}
    open={Boolean(anchorEl)}
    onClose={() => onSelectLanguage(null)}
  >
    {languages.map(item => {
      return <MenuItem disabled={currentLanguage === item.id} onClick={() => onSelectLanguage(item.id)}>
        <ListItemIcon>
          <item.icon />
        </ListItemIcon>
        <ListItemText sx={{ marginLeft: '10pt' }} primary={translation(item.language)} />
      </MenuItem>
    })}
  </Menu>
}