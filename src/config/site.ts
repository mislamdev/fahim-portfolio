export const siteConfig = {
  url: import.meta.env.VITE_SITE_URL || 'https://fahimkamal.dev',
  title: import.meta.env.VITE_SITE_TITLE || 'Fahim Kamal Ahmed | Game Developer & Level Designer',
  description: import.meta.env.VITE_SITE_DESCRIPTION || 'Game Developer with 3+ years of experience specializing in Unreal Engine and Unity. Creating immersive gameplay experiences and innovative game mechanics.',
  keywords: import.meta.env.VITE_SITE_KEYWORDS || 'Game Developer, Level Designer, Unreal Engine, Unity, C++, C#, Game Design',
  author: import.meta.env.VITE_SITE_AUTHOR || 'Fahim Kamal Ahmed',
};

// Function to update meta tags dynamically
export const updateMetaTags = (overrides?: Partial<typeof siteConfig>) => {
  const config = { ...siteConfig, ...overrides };

  // Update title
  document.title = config.title;

  // Update or create meta tags
  const updateMetaTag = (name: string, content: string, property?: string) => {
    const selector = property ? `meta[property="${property}"]` : `meta[name="${name}"]`;
    let meta = document.querySelector(selector);

    if (!meta) {
      meta = document.createElement('meta');
      if (property) {
        meta.setAttribute('property', property);
      } else {
        meta.setAttribute('name', name);
      }
      document.head.appendChild(meta);
    }

    meta.setAttribute('content', content);
  };

  // Update canonical link
  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = config.url;

  // Update meta tags
  updateMetaTag('description', config.description);
  updateMetaTag('keywords', config.keywords);
  updateMetaTag('author', config.author);
  updateMetaTag('', config.title, 'og:title');
  updateMetaTag('', config.description, 'og:description');
  updateMetaTag('', 'website', 'og:type');
  updateMetaTag('', config.url, 'og:url');
};
