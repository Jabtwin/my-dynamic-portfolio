export const extractFirstImage = (markdown: string, repoName: string, branch: string): string | null => {
  if (!markdown) return null;

  // Regex to match standard Markdown image syntax: ![alt](url)
  const mdImageRegex = /!\[.*?\]\((.*?)\)/;
  const mdMatch = markdown.match(mdImageRegex);
  
  let url: string | null = null;
  
  if (mdMatch && mdMatch[1]) {
    url = mdMatch[1];
  } else {
    // Regex to match standard HTML image syntax: <img src="url" ... />
    const htmlImageRegex = /<img[^>]+src="([^">]+)"/;
    const htmlMatch = markdown.match(htmlImageRegex);
    if (htmlMatch && htmlMatch[1]) {
      url = htmlMatch[1];
    }
  }

  if (url) {
    if (url.includes('badge') || url.includes('shield')) {
      return null;
    }
    
    if (!url.startsWith('http')) {
      const cleanUrl = url.replace(/^\.?\//, '');
      return `https://raw.githubusercontent.com/Jabtwin/${repoName}/${branch}/${cleanUrl}`;
    }
    
    return url;
  }

  return null;
};
