export function slugifyCategory(name: string) {
  return name
    .toString()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function unslugifyCategory(slug: string, allCategories: string[]) {
  const normalized = slug.replace(/-/g, '').toLowerCase()
  return allCategories.find(c => c.replace(/\s+/g,'').normalize('NFD').replace(/\p{Diacritic}/gu,'').toLowerCase() === normalized) || slug
}
