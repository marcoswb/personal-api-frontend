import { useTranslation } from 'react-i18next';

import './style.css';

export default function Footer({ posts }) {
  const { t } = useTranslation();
  const items = Array.isArray(posts) ? posts.filter((post) => post?.link) : [];

  return (
    <footer className="site-footer">
      {items.length > 0 ? (
        <div className="writing">
          <p className="section-label">{t('blog')}</p>
          <ul>
            {items.map((post, index) => (
              <li key={post.id ?? index}>
                <a href={post.link} target="_blank" rel="noreferrer">{post.name}</a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      <p className="built-with">{t('builtWith')}</p>
    </footer>
  );
}
