import type { EnrichedRepo } from '../types/github';

const KEYWORD_WEIGHTS: Record<string, number> = {
  'ros2': 10,
  'yolov9': 10,
  'mattersim': 10,
  'computer vision': 8,
  'pytorch': 8,
  'mlops': 8,
  'simulation': 7,
  'automated framework': 7,
  'python': 5,
  'robotics': 10,
  'physical ai': 10
};

export const calculateRelevanceScore = (repo: EnrichedRepo): number => {
  let score = 0;
  
  const searchText = [
    repo.name,
    repo.description || '',
    repo.readmeContent || '',
    ...(repo.topics || [])
  ].join(' ').toLowerCase();

  for (const [keyword, weight] of Object.entries(KEYWORD_WEIGHTS)) {
    if (searchText.includes(keyword)) {
      // Add weight. If the keyword appears in the name, give it double weight.
      score += weight;
      if (repo.name.toLowerCase().includes(keyword)) {
        score += weight; 
      }
    }
  }

  // Base score boost for stars and forks
  score += repo.stargazers_count * 2;
  score += repo.forks_count * 1;

  return score;
};

export const sortReposByRelevance = (repos: EnrichedRepo[]): EnrichedRepo[] => {
  const scoredRepos = repos.map(repo => ({
    ...repo,
    relevanceScore: calculateRelevanceScore(repo)
  }));

  // Sort descending by score
  return scoredRepos.sort((a, b) => b.relevanceScore - a.relevanceScore);
};
