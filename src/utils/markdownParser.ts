export const extractFirstImage = (markdown: string, repoName: string, branch: string): string | null => {
  if (!markdown) return null;

  // Regex to match standard Markdown image syntax: ![alt](url)
  const mdImageRegex = /!\[.*?\]\((.*?)\)/g;
  const mdMatches = Array.from(markdown.matchAll(mdImageRegex));
  
  for (const match of mdMatches) {
    const url = match[1];
    if (url && !url.includes('badge') && !url.includes('shield')) {
      if (!url.startsWith('http')) {
        const cleanUrl = url.replace(/^\.?\//, '');
        return `https://raw.githubusercontent.com/Jabtwin/${repoName}/${branch}/${cleanUrl}`;
      }
      return url;
    }
  }

  // Regex to match standard HTML image syntax: <img src="url" ... />
  const htmlImageRegex = /<img[^>]+src="([^">]+)"/g;
  const htmlMatches = Array.from(markdown.matchAll(htmlImageRegex));
  
  for (const match of htmlMatches) {
    const url = match[1];
    if (url && !url.includes('badge') && !url.includes('shield')) {
      if (!url.startsWith('http')) {
        const cleanUrl = url.replace(/^\.?\//, '');
        return `https://raw.githubusercontent.com/Jabtwin/${repoName}/${branch}/${cleanUrl}`;
      }
      return url;
    }
  }

  return null;
};
