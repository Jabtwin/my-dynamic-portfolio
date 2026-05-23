

interface TagBadgeProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'outline';
}

export const TagBadge: React.FC<TagBadgeProps> = ({ label, variant = 'secondary' }) => {
  const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border transition-colors';
  
  const variants = {
    primary: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20 hover:bg-cyan-500/20',
    secondary: 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700',
    outline: 'bg-transparent text-slate-400 border-slate-700 hover:text-slate-300 hover:border-slate-500',
  };

  return (
    <span className={`${baseClasses} ${variants[variant]}`}>
      {label}
    </span>
  );
};
