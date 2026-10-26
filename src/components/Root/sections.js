import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { sortFeaturedProjects, tagsFrom } from './projectUtils';

const CATEGORIES = ['language', 'framework', 'data', 'ops', 'other'];

function highlightsFrom(item) {
  if (Array.isArray(item?.highlights)) {
    return item.highlights.map((line) => String(line).trim()).filter(Boolean);
  }
  if (typeof item?.highlights === 'string') {
    return item.highlights.split('\n').map((line) => line.trim()).filter(Boolean);
  }
  return [];
}

function groupSkills(skills) {
  const groups = {};
  (Array.isArray(skills) ? skills : []).forEach((skill) => {
    const key = CATEGORIES.includes(skill.category) ? skill.category : 'other';
    groups[key] = groups[key] || [];
    groups[key].push(skill);
  });
  return CATEGORIES
    .filter((key) => groups[key]?.length)
    .map((key) => ({ key, skills: groups[key] }));
}

function whatsappHref(phone) {
  if (!phone) return '';
  return `https://api.whatsapp.com/send/?phone=${phone}&app_absent=0`;
}

export function Hero({ profile }) {
  const { t } = useTranslation();
  const title = profile?.role_title || profile?.short_description || profile?.full_name || profile?.name || '';
  const lede = profile?.role_title ? profile?.short_description : '';
  const email = profile?.email ? `mailto:${profile.email}?subject=Hello` : '';

  return (
    <section className="hero">
      {title ? <h1>{title}</h1> : null}
      {lede ? <p className="lede">{lede}</p> : null}
      <div className="cta-row">
        {profile?.github_link ? (
          <a className="cta" href={profile.github_link} target="_blank" rel="noreferrer">{t('github')}</a>
        ) : null}
        {profile?.linkedin_link ? (
          <a className="cta" href={profile.linkedin_link} target="_blank" rel="noreferrer">{t('linkedin')}</a>
        ) : null}
        {email ? <a className="cta" href={email}>{t('email')}</a> : null}
      </div>
    </section>
  );
}

export function ProjectList({ projects, showHeading = false }) {
  const { t } = useTranslation();
  const items = Array.isArray(projects) ? projects : [];

  return (
    <section id={showHeading ? undefined : 'projects'} className={showHeading ? 'projects-all' : undefined}>
      {showHeading ? <h1 className="page-title">{t('allProjects')}</h1> : null}
      {!showHeading ? <h2 className="section-label">{t('projects')}</h2> : null}
      <div className="project-list">
        {items.map((project, index) => {
          const tags = tagsFrom(project.languages);
          return (
            <a
              key={project.id ?? project.name ?? index}
              className="project-card"
              href={project.link || undefined}
              target="_blank"
              rel="noreferrer"
            >
              <h3>{project.name}</h3>
              {project.description ? <p>{project.description}</p> : null}
              {tags.length > 0 ? (
                <ul className="tags">
                  {tags.map((tag, tagIndex) => <li key={`${tag}-${tagIndex}`}>{tag}</li>)}
                </ul>
              ) : null}
            </a>
          );
        })}
      </div>
    </section>
  );
}

export function Projects({ projects }) {
  const { t } = useTranslation();
  const items = sortFeaturedProjects(projects);
  const total = Array.isArray(projects) ? projects.length : 0;
  const showViewAll = total > 0 && total > items.length;

  return (
    <div className="projects-section">
      <ProjectList projects={items} />
      {showViewAll ? (
        <p className="view-all">
          <Link to="/projects">{t('viewAllProjects')}</Link>
        </p>
      ) : null}
    </div>
  );
}

export function Experience({ experiences, formations }) {
  const { t } = useTranslation();
  const jobs = Array.isArray(experiences) ? experiences : [];
  const studies = Array.isArray(formations) ? formations : [];

  return (
    <section id="experience">
      <h2 className="section-label">{t('experience')}</h2>
      <div className="timeline">
        {jobs.map((job, index) => {
          const highlights = highlightsFrom(job);
          return (
            <article key={job.id ?? index} className="timeline-item">
              <div className="role-line">
                <h3>{job.ocuppation}</h3>
                <p className="period">{job.period}</p>
              </div>
              <p className="company">{job.company}</p>
              {highlights.length > 0 ? (
                <ul className="highlights">
                  {highlights.map((line) => <li key={line}>{line}</li>)}
                </ul>
              ) : null}
            </article>
          );
        })}
      </div>
      {studies.length > 0 ? (
        <div className="education" id="education">
          <h3>{t('formation')}</h3>
          {studies.map((item, index) => (
            <p key={item.id ?? index}>
              {item.formation}
              {item.institution ? ` · ${item.institution}` : ''}
              {item.period ? ` · ${item.period}` : ''}
            </p>
          ))}
        </div>
      ) : null}
    </section>
  );
}

export function Stack({ skills }) {
  const { t } = useTranslation();
  const groups = groupSkills(skills);
  const onlyOther = groups.length === 1 && groups[0].key === 'other';

  return (
    <section id="stack">
      <h2 className="section-label">{t('stack')}</h2>
      {onlyOther ? (
        <ul className="pills">
          {groups[0].skills.map((skill, index) => (
            <li key={skill.name ?? index}>{skill.name}</li>
          ))}
        </ul>
      ) : (
        <div className="stack-grid">
          {groups.map((group) => (
            <div key={group.key} className="stack-group">
              <h3>{t(`category_${group.key}`)}</h3>
              <ul className="pills">
                {group.skills.map((skill, index) => (
                  <li key={skill.name ?? index}>{skill.name}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export function About({ about }) {
  const { t } = useTranslation();

  return (
    <section id="about">
      <h2 className="section-label">{t('about')}</h2>
      {about ? <p className="about-copy">{about}</p> : null}
    </section>
  );
}

export function Writing({ posts }) {
  const { t } = useTranslation();
  const items = Array.isArray(posts) ? posts.filter((post) => post?.link) : [];

  if (items.length === 0) return null;

  return (
    <section id="writing">
      <h2 className="section-label">{t('blog')}</h2>
      <ul className="writing-list">
        {items.map((post, index) => (
          <li key={post.id ?? index}>
            <a href={post.link} target="_blank" rel="noreferrer">{post.name}</a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Contact({ profile }) {
  const { t } = useTranslation();
  const email = profile?.email ? `mailto:${profile.email}?subject=Hello` : '';
  const whatsapp = whatsappHref(profile?.number_phone);

  return (
    <section id="contact">
      <h2 className="section-label">{t('contact')}</h2>
      <ul className="contact-list">
        {profile?.github_link ? (
          <li><a href={profile.github_link} target="_blank" rel="noreferrer">{t('github')}</a></li>
        ) : null}
        {profile?.linkedin_link ? (
          <li><a href={profile.linkedin_link} target="_blank" rel="noreferrer">{t('linkedin')}</a></li>
        ) : null}
        {email ? <li><a href={email}>{t('email')}</a></li> : null}
        {whatsapp ? (
          <li><a href={whatsapp} target="_blank" rel="noreferrer">{t('whatsapp')}</a></li>
        ) : null}
      </ul>
    </section>
  );
}
