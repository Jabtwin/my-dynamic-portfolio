
import type { EnrichedRepo } from '../types/github';
import { TagBadge } from './TagBadge';
import { ExternalLink, Star, GitFork } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

interface ProjectCardProps {
  repo: EnrichedRepo;
  featured?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ repo, featured = false }) => {
  const isPython = repo.language?.toLowerCase() === 'python';
  const isTypeScript = repo.language?.toLowerCase() === 'typescript';
  
  const fallbackGradient = isPython 
    ? 'bg-gradient-to-br from-blue-900 via-blue-800 to-yellow-900' 
    : isTypeScript
    ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800'
    : 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900';

  return (
    <div className={`group relative flex flex-col rounded-2xl bg-slate-900/50 border border-slate-800/50 overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.3)] hover:-translate-y-1 ${featured ? 'md:flex-row md:col-span-2' : ''}`}>
      {/* Thumbnail */}
      <div className={`relative ${featured ? 'md:w-2/5' : 'w-full'} aspect-video overflow-hidden border-b md:border-b-0 md:border-r border-slate-800/50`}>
        {repo.thumbnailUrl ? (
          <img 
            src={repo.thumbnailUrl} 
            alt={repo.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className={`w-full h-full flex items-center justify-center ${fallbackGradient} transition-transform duration-500 group-hover:scale-105`}>
            <span className="text-slate-600/50 font-mono text-4xl font-bold tracking-tighter mix-blend-overlay">
              {repo.language || 'CODE'}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />
      </div>

      {/* Content */}
      <div className={`flex flex-col flex-1 p-6 ${featured ? 'justify-center' : ''}`}>
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-slate-100 group-hover:text-cyan-400 transition-colors">
            {repo.name}
          </h3>
          <div className="flex gap-3 text-slate-400 text-sm">
            <span className="flex items-center gap-1"><Star size={14} /> {repo.stargazers_count}</span>
            <span className="flex items-center gap-1"><GitFork size={14} /> {repo.forks_count}</span>
          </div>
        </div>

        <p className="text-slate-400 text-sm mb-6 line-clamp-3">
          {repo.description || 'No description provided.'}
        </p>

        <div className="mt-auto">
          <div className="flex flex-wrap gap-2 mb-6">
            {repo.language && <TagBadge label={repo.language} variant="primary" />}
            {repo.topics?.slice(0, 3).map(topic => (
              <TagBadge key={topic} label={topic} />
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-800/50">
            <a 
              href={repo.html_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors"
            >
              <FaGithub size={16} /> View Repository
            </a>
            {repo.homepage && (
              <a 
                href={repo.homepage}
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-1 text-sm font-medium text-cyan-500 hover:text-cyan-400 transition-colors"
              >
                Live Demo <ExternalLink size={14} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
