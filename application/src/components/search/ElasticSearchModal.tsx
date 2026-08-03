import React, { useState, useEffect } from 'react';
import { Video } from '../../types';
import { Search, X, Film, Play, Sparkles, Filter } from 'lucide-react';

interface ElasticSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  videos: Video[];
  onPlayVideo: (video: Video) => void;
}

export const ElasticSearchModal: React.FC<ElasticSearchModalProps> = ({
  isOpen,
  onClose,
  videos,
  onPlayVideo
}) => {
  const [query, setQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  // Keyboard shortcut listener ⌘K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const genres = ['Sci-Fi', 'Cybersécurité', 'IA', 'Cloud Native', 'Aventure', 'Nature'];

  const results = videos.filter((vid) => {
    const matchesQuery = query === '' || 
      vid.title.toLowerCase().includes(query.toLowerCase()) ||
      vid.description.toLowerCase().includes(query.toLowerCase()) ||
      vid.director.toLowerCase().includes(query.toLowerCase()) ||
      vid.genre.some(g => g.toLowerCase().includes(query.toLowerCase()));

    const matchesGenre = selectedGenre === null || vid.genre.includes(selectedGenre);

    return matchesQuery && matchesGenre;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-xl animate-in fade-in">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl overflow-hidden">
        
        {/* Search Input Bar */}
        <div className="relative flex items-center mb-4">
          <Search className="absolute left-4 w-5 h-5 text-brand-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher par titre, genre, acteur, réalisateur ou technologie (ex: Kafka, Sci-Fi)..."
            className="w-full pl-12 pr-12 py-4 rounded-2xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 text-sm font-medium shadow-inner"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-4 p-1 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Genre Tags Filter */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-3 mb-4 border-b border-slate-800">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 mr-1">
            <Filter className="w-3 h-3" /> Genres:
          </span>
          <button
            onClick={() => setSelectedGenre(null)}
            className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              selectedGenre === null
                ? 'bg-brand-500 text-white'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Tous
          </button>
          {genres.map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGenre(g === selectedGenre ? null : g)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedGenre === g
                  ? 'bg-brand-500 text-white'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        {/* Search Results */}
        <div className="max-h-[60vh] overflow-y-auto space-y-3 pr-1">
          {results.length > 0 ? (
            results.map((vid) => (
              <div
                key={vid.id}
                onClick={() => {
                  onPlayVideo(vid);
                  onClose();
                }}
                className="p-3 rounded-2xl bg-slate-950 border border-slate-800/80 hover:border-slate-700 flex items-center justify-between group cursor-pointer transition-all hover:bg-slate-850/80"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={vid.thumbnailUrl}
                    alt={vid.title}
                    className="w-20 h-12 object-cover rounded-xl border border-slate-800 group-hover:scale-105 transition-transform"
                  />
                  <div>
                    <h4 className="font-bold text-white text-sm group-hover:text-brand-400 transition-colors">
                      {vid.title}
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                      {vid.description}
                    </p>
                    <div className="flex items-center space-x-2 text-[10px] font-mono text-slate-500 mt-1">
                      <span className="text-emerald-400 font-bold">{vid.matchScore}% Match</span>
                      <span>•</span>
                      <span>{vid.category}</span>
                      <span>•</span>
                      <span>{vid.releaseYear}</span>
                    </div>
                  </div>
                </div>

                <button
                  className="p-2.5 rounded-xl bg-brand-500/10 group-hover:bg-brand-500 text-brand-400 group-hover:text-white transition-all shadow-sm"
                  title="Lancer la lecture"
                >
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </button>
              </div>
            ))
          ) : (
            <div className="py-12 text-center text-slate-500 text-xs">
              Aucun résultat correspondant à votre recherche.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
