
import { useGitHubData } from './hooks/useGitHubData';
import { FeaturedSection } from './components/FeaturedSection';
import { PhysicalDesignSection } from './components/PhysicalDesignSection';
import { Mail, Terminal, Loader2 } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

function App() {
  const { repos, userProfile, loading, error } = useGitHubData();

  return (
    <div className="min-h-screen bg-slate-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.1),rgba(255,255,255,0))]">
      {/* Header / Hero */}
      <header className="pt-24 pb-16 px-6 sm:px-12 max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-8">
        {userProfile?.avatar_url && (
          <img 
            src={userProfile.avatar_url} 
            alt="Profile Avatar" 
            className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-slate-800 shadow-[0_0_30px_-5px_rgba(6,182,212,0.5)] object-cover"
          />
        )}
        <div className="flex-1 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-6">
            <Terminal size={16} />
            <span>Open for Opportunities</span>
          </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-cyan-200 to-cyan-500 tracking-tight mb-6">
          Software & <br className="hidden md:block" />
          Physical AI Engineer
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
          Building autonomous systems, intelligent robots, and robust machine learning pipelines. 
          Bridging the gap between software algorithms and physical execution.
        </p>

          <div className="flex items-center justify-center md:justify-start gap-4">
            <a href="https://github.com/Jabtwin" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 transition-all hover:shadow-[0_0_20px_-5px_rgba(6,182,212,0.3)]">
              <FaGithub size={24} />
            </a>
            <a href="https://www.linkedin.com/in/thanh-dat-nguyen-6412141b4" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 transition-all hover:shadow-[0_0_20px_-5px_rgba(6,182,212,0.3)]">
              <FaLinkedin size={24} />
            </a>
            <a href="mailto:datnguyenqn01@gmail.com" className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 transition-all hover:shadow-[0_0_20px_-5px_rgba(6,182,212,0.3)]">
              <Mail size={24} />
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 sm:px-12 max-w-7xl mx-auto pb-24">
        <PhysicalDesignSection />

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 text-cyan-500">
            <Loader2 className="animate-spin mb-4" size={48} />
            <p className="text-slate-400 font-medium">Fetching neural weights & compiling repos...</p>
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-6 rounded-xl text-center">
            <p>Error loading portfolio data: {error}</p>
          </div>
        ) : (
          <FeaturedSection repos={repos} />
        )}
      </main>
      
      {/* Footer */}
      <footer className="border-t border-slate-800/50 py-8 text-center text-slate-500 text-sm">
        <p>© {new Date().getFullYear()} Dynamic Portfolio. Auto-generated via GitHub API.</p>
      </footer>
    </div>
  );
}

export default App;
