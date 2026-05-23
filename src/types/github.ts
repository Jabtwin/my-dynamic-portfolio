export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics: string[];
  default_branch: string;
}

export interface EnrichedRepo extends GitHubRepo {
  readmeContent: string | null;
  thumbnailUrl: string | null;
  relevanceScore: number;
}
