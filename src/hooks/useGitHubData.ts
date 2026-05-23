import { useState, useEffect } from 'react';
import axios from 'axios';
import type { GitHubRepo, EnrichedRepo } from '../types/github';
import { extractFirstImage } from '../utils/markdownParser';
import { sortReposByRelevance } from '../utils/relevanceEngine';

const USERNAME = 'Jabtwin';

export const useGitHubData = () => {
  const [repos, setRepos] = useState<EnrichedRepo[]>([]);
  const [userProfile, setUserProfile] = useState<{ avatar_url: string; name: string; bio: string } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);
        // Fetch all public repos and user profile
        const [reposRes, userRes] = await Promise.all([
          axios.get<GitHubRepo[]>(`https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=100`),
          axios.get(`https://api.github.com/users/${USERNAME}`)
        ]);

        setUserProfile(userRes.data);
        const rawRepos = reposRes.data;

        // Fetch README for each repo to extract thumbnails
        const enrichedPromises = rawRepos.map(async (repo): Promise<EnrichedRepo> => {
          let readmeContent: string | null = null;
          let thumbnailUrl: string | null = null;
          
          try {
            // Using raw.githubusercontent to fetch readme directly
            const { data } = await axios.get(
              `https://raw.githubusercontent.com/${USERNAME}/${repo.name}/${repo.default_branch}/README.md`
            );
            readmeContent = data;
            thumbnailUrl = extractFirstImage(readmeContent || '', repo.name, repo.default_branch);
          } catch (e) {
            // README might not exist or be named differently, that's fine
            console.warn(`No README found for ${repo.name}`);
          }

          return {
            ...repo,
            readmeContent,
            thumbnailUrl,
            relevanceScore: 0 // Will be computed
          };
        });

        const enriched = await Promise.all(enrichedPromises);
        
        // Sort and score repos based on relevance engine
        const sorted = sortReposByRelevance(enriched);
        setRepos(sorted);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch GitHub data');
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  return { repos, userProfile, loading, error };
};
