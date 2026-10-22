import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import './style.css';

const LINKS = [
  ['projects', '#projects'],
  ['experience', '#experience'],
  ['stack', '#stack'],
  ['about', '#about'],
  ['contact', '#contact'],
];

export default function Navbar({ fullName }) {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const lang = (i18n.resolvedLanguage || i18n.language || 'en').split('-')[0];

  function handleChangeLanguage(event) {
    i18n.changeLanguage(event.target.value);
    setOpen(false);
  }

  return (
    <header className="site-header">
      <a className="brand" href="#top">{fullName}</a>
      <button
        type="button"
        className="nav-toggle"
        aria-expanded={open}
        aria-label={t('menu')}
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
        <span />
      </button>
      <nav className={open ? 'nav-links open' : 'nav-links'}>
        {LINKS.map(([key, href]) => (
          <a key={key} href={href} onClick={() => setOpen(false)}>{t(key)}</a>
        ))}
        <label className="lang">
          <span className="visually-hidden">{t('language')}</span>
          <select aria-label={t('language')} value={['en', 'pt', 'es'].includes(lang) ? lang : 'en'} onChange={handleChangeLanguage}>
            <option value="en">{t('english')}</option>
            <option value="pt">{t('portuguese')}</option>
            <option value="es">{t('spanish')}</option>
          </select>
        </label>
      </nav>
    </header>
  );
}
