import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../navbar';
import { fetchProjectsData, fetchRootData } from '../../api';
import { ProjectList } from '../Root/sections';

import '../Root/style.css';
import './style.css';

function languageKey(i18n) {
  const code = i18n.resolvedLanguage || i18n.language || 'en';
  return code.split('-')[0];
}

function readStored(lang) {
  const saved = sessionStorage.getItem('projectsData');
  if (!saved) return undefined;
  try {
    const parsed = JSON.parse(saved);
    if (parsed[lang] != null) return parsed[lang];
    if (parsed.en != null) return parsed.en;
    return null;
  } catch {
    return undefined;
  }
}

export default function ProjectsPage() {
  const { t, i18n } = useTranslation();
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    let cancelled = false;
    const lang = languageKey(i18n);

    async function load() {
      let projectData = readStored(lang);
      if (projectData === undefined) {
        try {
          projectData = await fetchProjectsData(lang);
        } catch {
          projectData = [];
        }
      }

      let root = null;
      try {
        const storedRoot = sessionStorage.getItem('rootData');
        if (storedRoot) {
          const parsed = JSON.parse(storedRoot);
          root = parsed[lang] ?? parsed.en;
        } else {
          root = await fetchRootData(lang);
        }
      } catch {
        root = null;
      }

      if (cancelled) return;
      setProjects(Array.isArray(projectData) ? projectData : []);
      setProfile(root && typeof root === 'object' ? root : {});
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [i18n, i18n.language]);

  return (
    <div>
      <Navbar fullName={profile?.full_name || profile?.name || ''} />
      <main className="page projects-page">
        <p className="back-link">
          <Link to="/">{t('backToHome')}</Link>
        </p>
        <ProjectList projects={projects} showHeading />
      </main>
    </div>
  );
}
