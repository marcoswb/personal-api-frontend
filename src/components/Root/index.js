import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import Navbar from '../navbar';
import {
  fetchRootData,
  fetchExperienceData,
  fetchFormationData,
  fetchProjectsData,
  fetchBlogData,
} from '../../api';
import {
  Hero,
  Projects,
  Experience,
  Stack,
  About,
  Writing,
  Contact,
} from './sections';

import './style.css';

function languageKey(i18n) {
  const code = i18n.resolvedLanguage || i18n.language || 'en';
  return code.split('-')[0];
}

function readStored(storageKey, lang) {
  const saved = sessionStorage.getItem(storageKey);
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

export default function Root() {
  const { i18n } = useTranslation();
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [formations, setFormations] = useState([]);
  const [posts, setPosts] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const lang = languageKey(i18n);

    async function load(storageKey, fetcher) {
      const stored = readStored(storageKey, lang);
      if (stored !== undefined) return stored;
      try {
        return await fetcher(lang);
      } catch {
        return null;
      }
    }

    async function loadAll() {
      const [root, projectData, experienceData, formationData, blogData] = await Promise.all([
        load('rootData', fetchRootData),
        load('projectsData', fetchProjectsData),
        load('experienceData', fetchExperienceData),
        load('formationData', fetchFormationData),
        load('blogData', fetchBlogData),
      ]);

      if (cancelled) return;
      setProfile(root && typeof root === 'object' && !Array.isArray(root) ? root : {});
      setProjects(Array.isArray(projectData) ? projectData : []);
      setExperiences(Array.isArray(experienceData) ? experienceData : []);
      setFormations(Array.isArray(formationData) ? formationData : []);
      setPosts(Array.isArray(blogData) ? blogData : []);
      setReady(true);
    }

    loadAll();
    return () => {
      cancelled = true;
    };
  }, [i18n, i18n.language]);

  useEffect(() => {
    document.documentElement.lang = languageKey(i18n);
  }, [i18n, i18n.language]);

  useEffect(() => {
    if (!ready || !window.location.hash) return;
    const target = document.querySelector(window.location.hash);
    if (target) target.scrollIntoView();
  }, [ready]);

  return (
    <div>
      <Navbar fullName={profile?.full_name || profile?.name || ''} />
      <main className="page" id="top">
        <Hero profile={profile} />
        <About about={profile?.about} />
        <Stack skills={profile?.skills} />
        <Projects projects={projects} />
        <Experience experiences={experiences} formations={formations} />
        <Writing posts={posts} />
        <Contact profile={profile} />
      </main>
    </div>
  );
}
