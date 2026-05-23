
import type { EnrichedRepo } from '../types/github';
import { ProjectCard } from './ProjectCard';
import { Cpu } from 'lucide-react';

interface FeaturedSectionProps {
  repos: EnrichedRepo[];
}

export const FeaturedSection: React.FC<FeaturedSectionProps> = ({ repos }) => {
  if (!repos.length) return null;

  // Take the top 2 highly relevant repos as featured
  const featuredRepos = repos.slice(0, 2);
  const otherRepos = repos.slice(2);

  return (
    <div className="space-y-12">
      <section>
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-cyan-500/10 rounded-lg">
            <Cpu className="text-cyan-400" size={24} />
          </div>
          <h2 className="text-2xl font-bold text-slate-100">Featured Work</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredRepos.map(repo => (
            <ProjectCard key={repo.id} repo={repo} featured={true} />
          ))}
        </div>
      </section>

      {otherRepos.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-slate-100 mb-8">More Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherRepos.map(repo => (
              <ProjectCard key={repo.id} repo={repo} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
