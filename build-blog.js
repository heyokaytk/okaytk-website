const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { marked } = require('marked');

const SITE_URL = 'https://okaytk.com';
const POSTS_DIR = path.join(__dirname, 'posts');
const BLOG_DIR = path.join(__dirname, 'blog');

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC'
  });
}

function readPosts() {
  return fs.readdirSync(POSTS_DIR)
    .filter(f => f.endsWith('.md'))
    .map(file => {
      const { data, content } = matter(fs.readFileSync(path.join(POSTS_DIR, file), 'utf8'));
      return {
        title: data.title,
        date: data.date,
        description: data.description,
        slug: data.slug,
        html: marked(content),
        excerpt: data.description,
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

function nav() {
  return `<nav class="tk-nav">
  <a href="/" class="tk-nav-logo">OKAY <span class="tk-gold">⚡</span> TK</a>
  <ul class="tk-nav-links">
    <li><a href="/#about">About</a></li>
    <li><a href="/#events">Events</a></li>
    <li><a href="/#mixes">Mixes</a></li>
    <li><a href="/#tk-clients">Clientele</a></li>
    <li><a href="/blog">Blog</a></li>
  </ul>
  <a href="/#booking" class="tk-nav-cta">Book Now</a>
</nav>`;
}

function footer() {
  return `<footer>
  <div class="tk-footer">
    <div class="tk-footer-links">
      <a href="https://www.facebook.com/heyokaytk" target="_blank">Facebook</a>
      <a href="https://www.instagram.com/heyokaytk" target="_blank">Instagram</a>
      <a href="https://www.mixcloud.com/heyokaytk" target="_blank">MixCloud</a>
      <a href="https://soundcloud.com/heyokaytk" target="_blank">SoundCloud</a>
      <a href="https://www.twitch.tv/heyokaytk" target="_blank">Twitch</a>
      <a href="https://twitter.com/heyokaytk" target="_blank">Twitter</a>
      <a href="https://www.youtube.com/heyokaytk" target="_blank">YouTube</a>
    </div>
    <div class="tk-footer-copy">© 2026 OKAY TK</div>
  </div>
</footer>`;
}

function head({ title, description, canonicalUrl, type = 'website' }) {
  return `<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title>
<meta name="description" content="${description}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:url" content="${canonicalUrl}">
<meta property="og:type" content="${type}">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${description}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;1,9..40,300&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/styles.css">
</head>`;
}

function postPage(post) {
  return `<!doctype html>
<html lang="en">
${head({
  title: `${post.title} — OKAY TK`,
  description: post.description,
  canonicalUrl: `${SITE_URL}/blog/${post.slug}/`,
  type: 'article',
})}
<body>
${nav()}
<article class="tk-post">
  <header class="tk-post-header">
    <p class="tk-eyebrow">Blog</p>
    <h1 class="tk-post-title">${post.title}</h1>
    <p class="tk-post-meta">${formatDate(post.date)}</p>
    <p class="tk-post-desc">${post.description}</p>
  </header>
  <div class="tk-post-body">
    ${post.html}
  </div>
</article>
${footer()}
</body>
</html>`;
}

function blogIndex(posts) {
  const rows = posts.map(p => `
  <div class="tk-blog-row">
    <div class="tk-blog-date">${formatDate(p.date)}</div>
    <div class="tk-blog-info">
      <div class="tk-blog-title">${p.title}</div>
      <div class="tk-blog-excerpt">${p.excerpt}</div>
    </div>
    <a href="/blog/${p.slug}/" class="tk-blog-read">Read →</a>
  </div>`).join('\n');

  return `<!doctype html>
<html lang="en">
${head({
  title: 'Blog — OKAY TK',
  description: 'Thoughts, stories, and notes from OKAY TK.',
  canonicalUrl: `${SITE_URL}/blog/`,
})}
<body>
${nav()}
<section class="tk-blog-index">
  <div class="tk-section-header">
    <div>
      <p class="tk-eyebrow" style="margin-bottom:0">Writing</p>
      <h1 class="tk-section-title">THE BLOG</h1>
    </div>
  </div>
  ${rows}
</section>
${footer()}
</body>
</html>`;
}

function sitemap(posts) {
  const postUrls = posts.map(p => `
  <url>
    <loc>${SITE_URL}/blog/${p.slug}/</loc>
    <lastmod>${new Date(p.date).toISOString().split('T')[0]}</lastmod>
  </url>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/</loc>
  </url>
  <url>
    <loc>${SITE_URL}/blog/</loc>
  </url>${postUrls}
</urlset>`;
}

// --- Main ---
const posts = readPosts();

if (fs.existsSync(BLOG_DIR)) fs.rmSync(BLOG_DIR, { recursive: true });
fs.mkdirSync(BLOG_DIR);

posts.forEach(post => {
  const dir = path.join(BLOG_DIR, post.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), postPage(post));
  console.log(`  ✓ /blog/${post.slug}/`);
});

fs.writeFileSync(path.join(BLOG_DIR, 'index.html'), blogIndex(posts));
console.log('  ✓ /blog/');

fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), sitemap(posts));
console.log('  ✓ sitemap.xml');

console.log(`\nBuild complete — ${posts.length} post(s)`);
