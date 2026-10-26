export function tagsFrom(languages) {
  if (Array.isArray(languages)) {
    return languages.map((item) => String(item).trim()).filter(Boolean);
  }
  if (typeof languages === 'string') {
    return languages.split(',').map((item) => item.trim()).filter(Boolean);
  }
  return [];
}

export function sortFeaturedProjects(projects) {
  const items = Array.isArray(projects) ? projects.filter((project) => project?.featured) : [];
  return items.sort((left, right) => {
    const leftOrder = left.featured_order ?? Number.MAX_SAFE_INTEGER;
    const rightOrder = right.featured_order ?? Number.MAX_SAFE_INTEGER;
    if (leftOrder !== rightOrder) return leftOrder - rightOrder;
    return (left.id ?? 0) - (right.id ?? 0);
  });
}
