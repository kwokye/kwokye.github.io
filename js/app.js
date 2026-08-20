/**
 * Markdown Academic Homepage Engine
 * Loads modular markdown files from /content and renders them into the DOM.
 */

// Helper to fetch text content with error handling
async function fetchMarkdown(url) {
  try {
    const res = await fetch(url + '?v=' + Date.now()); // cache-busting during dev
    if (!res.ok) throw new Error(`HTTP ${res.status} when fetching ${url}`);
    return await res.text();
  } catch (err) {
    console.warn(`Could not load ${url}:`, err);
    return null;
  }
}

// Split Front-Matter (YAML) and Markdown Body
function parseFrontMatter(text) {
  if (!text) return { attributes: {}, body: '' };
  
  const trimmed = text.trim();
  if (trimmed.startsWith('---')) {
    const match = trimmed.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
    if (match) {
      try {
        const attributes = typeof jsyaml !== 'undefined' ? jsyaml.load(match[1]) : {};
        return { attributes: attributes || {}, body: match[2].trim() };
      } catch (e) {
        console.error('YAML parse error in frontmatter:', e);
      }
    }
  }
  return { attributes: {}, body: text };
}

// 1. Render Profile (content/profile.md)
async function renderProfile() {
  const md = await fetchMarkdown('content/profile.md');
  if (!md) return;

  const { attributes: data, body } = parseFrontMatter(md);
  const currentYear = new Date().getFullYear();

  // Page Title & Branding
  if (data.name) {
    const cnName = data.chineseName ? ` (${data.chineseName})` : '';
    document.title = `${data.name}${cnName} | Academic Homepage`;
    
    const navBrand = document.getElementById('nav-brand');
    if (navBrand) {
      navBrand.innerHTML = `${data.name} <span class="font-normal text-zinc-500 dark:text-zinc-400 font-serif text-sm">${data.chineseName || ''}</span>`;
    }

    const footerText = document.getElementById('footer-text');
    if (footerText) {
      footerText.innerHTML = `© ${currentYear} ${data.name}${cnName}. Hosted on GitHub Pages.`;
    }
  }

  // Header Info (Name, Title, Affiliation)
  const headerEl = document.getElementById('profile-header');
  if (headerEl) {
    headerEl.innerHTML = `
      <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
        ${data.name || ''} <span class="text-xl sm:text-2xl font-normal text-zinc-500 dark:text-zinc-400 font-serif">${data.chineseName ? `（${data.chineseName}）` : ''}</span>
      </h1>
      ${data.title ? `<p class="text-base text-zinc-700 dark:text-zinc-300 font-medium mt-1">${data.title}</p>` : ''}
      ${data.affiliation ? `
        <p class="text-sm text-zinc-500 dark:text-zinc-400">
          ${data.affiliationUrl ? `<a href="${data.affiliationUrl}" target="_blank" rel="noopener noreferrer" class="text-sky-600 dark:text-sky-400 hover:underline font-medium">${data.affiliation}</a>` : data.affiliation}
        </p>
      ` : ''}
    `;
  }

  // Links & Socials
  const linksEl = document.getElementById('profile-links');
  if (linksEl && data.links) {
    const links = data.links;
    const linksHtml = [];

    if (links.googleScholar) {
      linksHtml.push(`
        <a href="${links.googleScholar}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 hover:bg-sky-50 dark:hover:bg-sky-950/40 hover:text-sky-600 dark:hover:text-sky-400 transition-colors shadow-sm">
          <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5l4.838 3.94A8 8 0 0 1 12 9a8 8 0 0 1 7.162 4.44L24 9.5z"/></svg>
          Google Scholar
        </a>
      `);
      const scholarMore = document.getElementById('scholar-more-link');
      if (scholarMore) scholarMore.href = links.googleScholar;
    }
    if (links.linkedIn) {
      linksHtml.push(`
        <a href="${links.linkedIn}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 hover:bg-sky-50 dark:hover:bg-sky-950/40 hover:text-sky-600 dark:hover:text-sky-400 transition-colors shadow-sm">
          <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
          LinkedIn
        </a>
      `);
    }
    if (links.email) {
      linksHtml.push(`
        <a href="${links.email}" class="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 hover:bg-sky-50 dark:hover:bg-sky-950/40 hover:text-sky-600 dark:hover:text-sky-400 transition-colors shadow-sm">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
          Email
        </a>
      `);
    }
    if (links.gitHub) {
      linksHtml.push(`
        <a href="${links.gitHub}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 hover:bg-sky-50 dark:hover:bg-sky-950/40 hover:text-sky-600 dark:hover:text-sky-400 transition-colors shadow-sm">
          <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
          GitHub
        </a>
      `);
    }
    if (links.cv && links.cv !== '#') {
      linksHtml.push(`
        <a href="${links.cv}" target="_blank" class="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 hover:bg-sky-50 dark:hover:bg-sky-950/40 hover:text-sky-600 dark:hover:text-sky-400 transition-colors shadow-sm">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
          CV (PDF)
        </a>
      `);
    }
    linksEl.innerHTML = linksHtml.join('');
  }

  // Bio Body Markdown Rendering
  const bioEl = document.getElementById('profile-bio');
  if (bioEl && body) {
    bioEl.innerHTML = typeof marked !== 'undefined' ? marked.parse(body) : body;
  }

  // Research Interests Badges
  const interestsEl = document.getElementById('profile-interests');
  if (interestsEl && data.interests && data.interests.length > 0) {
    interestsEl.innerHTML = `
      <span class="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 block mb-2">Research Interests:</span>
      <div class="flex flex-wrap gap-1.5">
        ${data.interests.map(item => `
          <span class="px-2.5 py-1 text-xs rounded-md bg-sky-50 dark:bg-sky-950/50 text-sky-700 dark:text-sky-300 font-medium">${item}</span>
        `).join('')}
      </div>
    `;
  }

  // Avatar Image
  const avatarContainer = document.getElementById('profile-avatar-container');
  if (avatarContainer) {
    if (data.avatar && data.avatar.trim() !== '') {
      avatarContainer.innerHTML = `
        <div class="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 border-2 border-zinc-200 dark:border-zinc-700 shadow-sm">
          <img src="${data.avatar}" alt="${data.name || 'Avatar'}" class="w-full h-full object-cover">
        </div>
      `;
    } else {
      avatarContainer.innerHTML = `
        <div class="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 border-2 border-zinc-200 dark:border-zinc-700 shadow-sm flex items-center justify-center">
          <svg class="w-20 h-20 text-zinc-400 dark:text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
      `;
    }
  }
}

// 2. Render News (content/news.md)
async function renderNews() {
  const md = await fetchMarkdown('content/news.md');
  if (!md) return;

  const newsList = document.getElementById('news-list');
  if (!newsList) return;

  // Split into lines or list items
  const lines = md.split('\n').filter(line => line.trim().startsWith('-') || line.trim().startsWith('*'));
  
  if (lines.length === 0) {
    // Fallback: render raw markdown if not standard list
    newsList.innerHTML = typeof marked !== 'undefined' ? marked.parse(md) : md;
    return;
  }

  const itemsHtml = lines.map(line => {
    // Remove leading bullet marker
    let content = line.trim().replace(/^[-*]\s+/, '');
    
    // Extract date pattern like **[10/2025]** or [10/2025] or (2025-10)
    let dateStr = '';
    const dateMatch = content.match(/^(\*\*\[(.*?)\]\*\*|\[(.*?)\]|\*\*(.*?)\*\*)\s*(.*)$/);
    if (dateMatch) {
      dateStr = dateMatch[2] || dateMatch[3] || dateMatch[4] || '';
      content = dateMatch[5] || '';
    }

    const parsedContent = typeof marked !== 'undefined' ? marked.parseInline(content) : content;

    return `
      <li class="flex items-start gap-3">
        ${dateStr ? `<span class="text-xs font-mono font-semibold text-zinc-400 dark:text-zinc-500 whitespace-nowrap pt-0.5">[${dateStr}]</span>` : ''}
        <span class="flex-1">${parsedContent}</span>
      </li>
    `;
  }).join('');

  newsList.innerHTML = itemsHtml;
}

// 3. Render Publications (content/publications.md)
async function renderPublications() {
  const md = await fetchMarkdown('content/publications.md');
  if (!md) return;

  const pubList = document.getElementById('publications-list');
  if (!pubList) return;

  // Split into publication blocks starting with `### `
  const rawBlocks = md.split(/^###\s+/m).filter(b => b.trim().length > 0);
  
  if (rawBlocks.length === 0) {
    pubList.innerHTML = typeof marked !== 'undefined' ? marked.parse(md) : md;
    return;
  }

  const pubsHtml = rawBlocks.map(block => {
    const lines = block.trim().split('\n');
    const title = lines[0].trim();
    const rest = lines.slice(1).join('\n');

    // Extract Authors, Venue, VenueDetail, Links, BibTeX
    let authors = '';
    let venue = '';
    let venueDetail = '';
    let links = [];
    let bibtex = '';

    // Extract BibTeX code block
    const bibMatch = rest.match(/```(?:bibtex|bib)?\r?\n([\s\S]*?)\r?\n```/);
    if (bibMatch) {
      bibtex = bibMatch[1].trim();
    }

    // Extract metadata fields from list items
    const restWithoutBib = rest.replace(/```(?:bibtex|bib)?\r?\n[\s\S]*?\r?\n```/, '');
    const metaLines = restWithoutBib.split('\n');

    metaLines.forEach(l => {
      const trimmed = l.trim().replace(/^[-*]\s+/, '');
      if (/^\*\*Authors?:\*\*/i.test(trimmed)) {
        authors = trimmed.replace(/^\*\*Authors?:\*\*\s*/i, '');
      } else if (/^\*\*Venue:\*\*/i.test(trimmed)) {
        venue = trimmed.replace(/^\*\*Venue:\*\*\s*/i, '');
      } else if (/^\*\*VenueDetail:\*\*/i.test(trimmed)) {
        venueDetail = trimmed.replace(/^\*\*VenueDetail:\*\*\s*/i, '');
      } else if (/^\*\*Links?:\*\*/i.test(trimmed)) {
        const rawLinks = trimmed.replace(/^\*\*Links?:\*\*\s*/i, '');
        // Find markdown links like [IEEE Xplore](https://...) or [[IEEE Xplore](https://...)]
        const linkMatches = [...rawLinks.matchAll(/\[(.*?)\]\((.*?)\)/g)];
        links = linkMatches.map(m => ({ label: m[1].replace(/^[\[\(]+|[\]\)]+$/g, ''), url: m[2] }));
      }
    });

    const parsedTitle = typeof marked !== 'undefined' ? marked.parseInline(title) : title;
    const parsedAuthors = typeof marked !== 'undefined' ? marked.parseInline(authors) : authors;
    const parsedVenue = typeof marked !== 'undefined' ? marked.parseInline(venue) : venue;

    const linksHtml = links.map(l => `
      <a href="${l.url}" target="_blank" rel="noopener noreferrer" class="px-2 py-0.5 rounded border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:border-sky-500 hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
        ${l.label.startsWith('[') ? l.label : `[${l.label}]`}
      </a>
    `).join('');

    const bibtexBlock = bibtex ? `
      <details class="inline-block">
        <summary class="px-2 py-0.5 rounded border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:border-sky-500 hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
          [BibTeX]
        </summary>
        <pre class="mt-2 p-3 bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 rounded-lg text-[11px] font-mono overflow-x-auto select-all whitespace-pre">${bibtex}</pre>
      </details>
    ` : '';

    return `
      <article class="space-y-1.5 p-4 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-900/60 transition-colors border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800">
        <h3 class="text-base font-bold text-zinc-900 dark:text-zinc-100 leading-snug">
          ${parsedTitle}
        </h3>
        ${parsedAuthors ? `<p class="text-sm text-zinc-600 dark:text-zinc-300">${parsedAuthors}</p>` : ''}
        <p class="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
          ${parsedVenue ? `<span class="text-sky-600 dark:text-sky-400 font-semibold">${parsedVenue}</span>` : ''} 
          ${venueDetail ? '• ' + venueDetail : ''}
        </p>
        <div class="flex flex-wrap items-center gap-2 pt-1 text-xs">
          ${linksHtml}
          ${bibtexBlock}
        </div>
      </article>
    `;
  }).join('');

  pubList.innerHTML = pubsHtml;
}

// 4. Render Education (content/education.md)
async function renderEducation() {
  const md = await fetchMarkdown('content/education.md');
  if (!md) return;

  const eduList = document.getElementById('education-list');
  if (!eduList) return;

  // Split into education blocks starting with `### `
  const rawBlocks = md.split(/^###\s+/m).filter(b => b.trim().length > 0);
  
  if (rawBlocks.length === 0) {
    eduList.innerHTML = typeof marked !== 'undefined' ? marked.parse(md) : md;
    return;
  }

  const edusHtml = rawBlocks.map(block => {
    const lines = block.trim().split('\n');
    const institution = lines[0].trim();
    let degree = '';
    let period = '';
    let detail = '';
    let badge = 'EDU';
    let badgeColor = 'bg-sky-800 text-white';

    lines.slice(1).forEach(l => {
      const trimmed = l.trim().replace(/^[-*]\s+/, '');
      if (/^\*\*Degree:\*\*/i.test(trimmed)) {
        degree = trimmed.replace(/^\*\*Degree:\*\*\s*/i, '');
      } else if (/^\*\*Period:\*\*/i.test(trimmed)) {
        period = trimmed.replace(/^\*\*Period:\*\*\s*/i, '');
      } else if (/^\*\*Detail:\*\*/i.test(trimmed) || /^\*\*SubDetail:\*\*/i.test(trimmed)) {
        detail = trimmed.replace(/^\*\*(?:Detail|SubDetail):\*\*\s*/i, '');
      } else if (/^\*\*Badge:\*\*/i.test(trimmed)) {
        badge = trimmed.replace(/^\*\*Badge:\*\*\s*/i, '');
      } else if (/^\*\*BadgeColor:\*\*/i.test(trimmed)) {
        badgeColor = trimmed.replace(/^\*\*BadgeColor:\*\*\s*/i, '');
      }
    });

    const parsedInstitution = typeof marked !== 'undefined' ? marked.parseInline(institution) : institution;
    const parsedDegree = typeof marked !== 'undefined' ? marked.parseInline(degree) : degree;
    const parsedDetail = typeof marked !== 'undefined' ? marked.parseInline(detail) : detail;

    return `
      <div class="flex items-start gap-4">
        <div class="w-10 h-10 rounded-xl ${badgeColor} font-bold flex items-center justify-center text-xs flex-shrink-0 shadow-sm">
          ${badge}
        </div>
        <div class="flex-1 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
          <div>
            <h4 class="font-bold text-zinc-900 dark:text-white text-base">${parsedInstitution}</h4>
            <p class="text-zinc-700 dark:text-zinc-300 text-sm font-medium">${parsedDegree}</p>
            ${parsedDetail ? `<p class="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">${parsedDetail}</p>` : ''}
          </div>
          ${period ? `<span class="text-xs font-mono text-zinc-400 dark:text-zinc-500 whitespace-nowrap">${period}</span>` : ''}
        </div>
      </div>
    `;
  }).join('');

  eduList.innerHTML = edusHtml;
}

// 5. Render Services & Honors (content/services.md)
async function renderServices() {
  const md = await fetchMarkdown('content/services.md');
  if (!md) return;

  const container = document.getElementById('services-container');
  if (!container) return;

  // Split by `### `
  const rawSections = md.split(/^###\s+/m).filter(s => s.trim().length > 0);
  
  if (rawSections.length === 0) {
    container.innerHTML = typeof marked !== 'undefined' ? marked.parse(md) : md;
    return;
  }

  const sectionsHtml = rawSections.map(section => {
    const lines = section.trim().split('\n');
    const title = lines[0].trim();
    const items = lines.slice(1)
      .filter(l => l.trim().startsWith('-') || l.trim().startsWith('*'))
      .map(l => {
        const text = l.trim().replace(/^[-*]\s+/, '');
        return typeof marked !== 'undefined' ? marked.parseInline(text) : text;
      });

    return `
      <div class="space-y-2 p-4 sm:p-0 rounded-xl bg-zinc-50/50 sm:bg-transparent dark:bg-zinc-900/30 sm:dark:bg-transparent">
        <h4 class="font-semibold text-zinc-900 dark:text-white text-xs uppercase tracking-wider text-zinc-400">${title}</h4>
        <ul class="list-disc list-inside text-zinc-600 dark:text-zinc-300 text-xs sm:text-sm space-y-1.5">
          ${items.map(item => `<li>${item}</li>`).join('')}
        </ul>
      </div>
    `;
  }).join('');

  container.innerHTML = sectionsHtml;
}

// Global bootstrap
document.addEventListener('DOMContentLoaded', async () => {
  // Execute all renders in parallel for maximum speed
  await Promise.all([
    renderProfile(),
    renderNews(),
    renderPublications(),
    renderEducation(),
    renderServices()
  ]);
});
