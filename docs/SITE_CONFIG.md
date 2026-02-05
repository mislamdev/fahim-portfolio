# Site Configuration Guide

This project uses a dedicated configuration file for site metadata. All site information is centrally managed in a TypeScript config file for simplicity and type safety.

## Configuration File

**Location**: `src/config/site.ts`

This file contains all the information about your site that appears in meta tags, page titles, and throughout the application.

## Quick Start

To update your site information, simply edit the config file:

**`src/config/site.ts`**
```typescript
export const siteConfig = {
  url: 'https://fahimkamal.dev',
  title: 'Fahim Kamal Ahmed | Game Developer & Level Designer',
  description: 'Game Developer with 3+ years of experience specializing in Unreal Engine and Unity. Creating immersive gameplay experiences and innovative game mechanics.',
  keywords: 'Game Developer, Level Designer, Unreal Engine, Unity, C++, C#, Game Design',
  author: 'Fahim Kamal Ahmed',
  
  // Social Media (optional - add your links)
  social: {
    github: '',
    linkedin: '',
    twitter: '',
    email: '',
  },
} as const;
```

## Available Configuration Options

| Property | Description | Example |
|----------|-------------|---------|
| `url` | Canonical URL of your site | `https://fahimkamal.dev` |
| `title` | Page title and og:title | `Fahim Kamal Ahmed \| Game Developer...` |
| `description` | Meta description and og:description | Game Developer with 3+ years... |
| `keywords` | SEO keywords | Game Developer, Level Designer... |
| `author` | Author name | `Fahim Kamal Ahmed` |
| `social.*` | Social media links (optional) | GitHub, LinkedIn, etc. |

## How It Works

### 1. Configuration File (`src/config/site.ts`)
Contains all site metadata in a typed TypeScript object.

### 2. Build-Time Replacement
During build, Vite reads the config and replaces placeholders in `index.html`:

```html
<title>%VITE_SITE_TITLE%</title>
<meta name="description" content="%VITE_SITE_DESCRIPTION%" />
<link rel="canonical" href="%VITE_SITE_URL%" />
```

### 3. Runtime Access
Import and use the config anywhere in your code:

```typescript
import { siteConfig } from './config/site';

console.log(siteConfig.url); // https://fahimkamal.dev
console.log(siteConfig.title); // Fahim Kamal Ahmed | Game Developer...
```

## Updating Site Information

1. **Open** `src/config/site.ts`
2. **Edit** the values you want to change
3. **Save** the file
4. **Rebuild**: `npm run build` (for production) or changes are hot-reloaded in dev mode

Changes will be reflected in:
- Page title
- Meta tags (description, keywords, author)
- Open Graph tags (for social media sharing)
- Canonical URL
- Any component that imports `siteConfig`

## Adding New Configuration

### Step 1: Add to Config
Edit `src/config/site.ts`:
```typescript
export const siteConfig = {
  // ...existing properties...
  myNewValue: 'some value',
}
```

### Step 2: Use in HTML (Optional)
If you need it in meta tags, add to `index.html`:
```html
<meta name="my-meta" content="%VITE_MY_NEW_VALUE%" />
```

### Step 3: Update Vite Config (if using in HTML)
Edit the `loadSiteConfig()` function in `vite.config.ts` to extract your new value.

### Step 4: Use in Code
```typescript
import { siteConfig } from './config/site';
console.log(siteConfig.myNewValue);
```

## Why Config File Instead of .env?

For portfolio sites, a TypeScript config file is better than environment variables:

✅ **Type-safe**: Full TypeScript autocomplete and type checking  
✅ **No setup needed**: No `.env` files to manage  
✅ **Version controlled**: Config is part of your source code  
✅ **IDE support**: Better editor integration  
✅ **Simpler**: One file to update  
✅ **Public data**: Portfolio metadata isn't sensitive  

**Note**: If you need actual secrets (API keys, tokens), use environment variables. This config is for public metadata only.

## Examples

### Updating Your Domain
```typescript
// src/config/site.ts
export const siteConfig = {
  url: 'https://yournewdomain.com', // Change this
  // ...rest
}
```

### Adding Social Links
```typescript
// src/config/site.ts
export const siteConfig = {
  // ...
  social: {
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourprofile',
    twitter: 'https://twitter.com/yourhandle',
    email: 'your.email@example.com',
  },
}
```

### Using Social Links in Components
```typescript
import { siteConfig } from '@/config/site';

function SocialLinks() {
  return (
    <div>
      {siteConfig.social.github && (
        <a href={siteConfig.social.github}>GitHub</a>
      )}
      {siteConfig.social.linkedin && (
        <a href={siteConfig.social.linkedin}>LinkedIn</a>
      )}
    </div>
  );
}
```

## Testing

### Development
Changes are hot-reloaded automatically:
```bash
npm run dev
```

### Production Build
Verify your configuration:
```bash
npm run build
cat dist/index.html | grep -E "title|canonical|keywords"
```

## Troubleshooting

### Changes not appearing in build
- Run `npm run build` after editing `site.ts`
- Clear the `dist` folder: `rm -rf dist && npm run build`
- Check for syntax errors in `site.ts`

### TypeScript errors
- Ensure `site.ts` has valid syntax
- The `as const` makes the object read-only (recommended)
- Import with: `import { siteConfig } from './config/site'`

### HTML placeholders not replaced
- Check placeholder names in `index.html` match vite config
- Verify `loadSiteConfig()` function in `vite.config.ts`
- Ensure the regex patterns extract values correctly

## Best Practices

✅ Keep all public metadata in `site.ts`  
✅ Use the `as const` assertion for immutability  
✅ Add TypeScript comments for documentation  
✅ Group related settings together (social, contact, etc.)  
✅ Commit `site.ts` to version control  
❌ Don't store sensitive data in this file  
❌ Don't use this for environment-specific configs  

For environment-specific or sensitive data, use proper environment variables instead.
