import React, { useRef } from 'react';
import { Video } from '../../types';
import { VideoCard } from './VideoCard';
import { ChevronLeft, ChevronRight, Flame, Sparkles, Heart, Tv, Film } from 'lucide-react';

interface VideoGridProps {
  videos: Video[];
  favorites: string[];
  onPlay: (video: Video) => void;
  onToggleFavorite: (videoId: string) => void;
  activeCategory: string;
}

export const VideoGrid: React.FC<VideoGridProps> = ({
  videos,
  favorites,
  onPlay,
  onToggleFavorite,
  activeCategory
}) => {

  const rowRef1 = useRef<HTMLDivElement>(null);
  const rowRef2 = useRef<HTMLDivElement>(null);
  const rowRef3 = useRef<HTMLDivElement>(null);

  const scrollRow = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const { scrollLeft, clientWidth } = ref.current;
      const scrollAmount = direction === 'left' ? scrollLeft - clientWidth * 0.75 : scrollLeft + clientWidth * 0.75;
      ref.current.scrollTo({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const favoriteVideos = videos.filter(v => favorites.includes(v.id));

  // Category filter override
  const filteredVideos = videos.filter((vid) => {
    if (activeCategory === 'favoris') return favorites.includes(vid.id);
    if (activeCategory === 'films' && vid.category !== 'Films') return false;
    if (activeCategory === 'series' && vid.category !== 'Séries') return false;
    if (activeCategory === 'tech' && vid.category !== 'Tech & Innovation' && vid.category !== 'FAANG Live') return false;
    return true;
  });

  return (
    <div className="space-y-12 pb-16 select-none">

      {/* Mode Specific Grid View (e.g. Ma Liste, Films, Séries) */}
      {activeCategory !== 'accueil' ? (
        <div className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            {activeCategory === 'favoris' && <Heart className="w-6 h-6 text-[#E50914] fill-[#E50914]" />}
            {activeCategory === 'favoris'
              ? 'Ma Liste de Favoris'
              : activeCategory === 'films'
              ? 'Films 4K Ultra HD'
              : activeCategory === 'series'
              ? 'Séries Originales'
              : 'Nouveautés & Keynotes FAANG'}
          </h2>

          {filteredVideos.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
              {filteredVideos.map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  onPlay={onPlay}
                  onToggleFavorite={onToggleFavorite}
                  isFavorite={favorites.includes(video.id)}
                />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center text-gray-400 bg-[#181818] rounded-xl p-8 max-w-md mx-auto border border-white/10">
              <Film className="w-12 h-12 text-[#E50914] mx-auto mb-3" />
              <p className="font-bold text-white text-base">Votre liste est vide</p>
              <p className="text-xs text-gray-400 mt-1">Ajoutez des films et séries pour les retrouver facilement ici.</p>
            </div>
          )}
        </div>
      ) : (
        /* Netflix Multi-Row Home Layout */
        <div className="space-y-12">
          
          {/* ROW 1: Tendances actuelles */}
          <div className="space-y-3 relative group">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center space-x-2">
              <Flame className="w-5 h-5 text-[#E50914]" />
              <span>Tendances actuelles</span>
            </h2>

            <div className="relative">
              {/* Left Arrow */}
              <button
                onClick={() => scrollRow(rowRef1, 'left')}
                className="absolute left-0 top-0 bottom-0 z-40 w-12 bg-black/60 hover:bg-black/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>

              {/* Horizontal Scroll Row */}
              <div
                ref={rowRef1}
                className="flex items-center space-x-4 overflow-x-auto no-scrollbar scroll-smooth py-2 px-1"
              >
                {videos.map((video) => (
                  <div key={video.id} className="w-[240px] sm:w-[280px] flex-shrink-0">
                    <VideoCard
                      video={video}
                      onPlay={onPlay}
                      onToggleFavorite={onToggleFavorite}
                      isFavorite={favorites.includes(video.id)}
                    />
                  </div>
                ))}
              </div>

              {/* Right Arrow */}
              <button
                onClick={() => scrollRow(rowRef1, 'right')}
                className="absolute right-0 top-0 bottom-0 z-40 w-12 bg-black/60 hover:bg-black/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </div>
          </div>

          {/* ROW 2: Top 10 des films aujourd'hui (With Big Rank Numbers) */}
          <div className="space-y-3 relative group">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center space-x-2">
              <span className="text-[#E50914] font-extrabold text-xl">TOP 10</span>
              <span>des films en France aujourd'hui</span>
            </h2>

            <div className="relative">
              <button
                onClick={() => scrollRow(rowRef2, 'left')}
                className="absolute left-0 top-0 bottom-0 z-40 w-12 bg-black/60 hover:bg-black/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>

              <div
                ref={rowRef2}
                className="flex items-center space-x-12 overflow-x-auto no-scrollbar scroll-smooth py-4 pl-8 pr-4"
              >
                {videos.slice(0, 5).map((video, index) => (
                  <div key={video.id} className="w-[240px] sm:w-[280px] flex-shrink-0">
                    <VideoCard
                      video={video}
                      onPlay={onPlay}
                      onToggleFavorite={onToggleFavorite}
                      isFavorite={favorites.includes(video.id)}
                      rankNumber={index + 1}
                    />
                  </div>
                ))}
              </div>

              <button
                onClick={() => scrollRow(rowRef2, 'right')}
                className="absolute right-0 top-0 bottom-0 z-40 w-12 bg-black/60 hover:bg-black/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </div>
          </div>

          {/* ROW 3: Recommandés pour votre profil */}
          <div className="space-y-3 relative group">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-[#E50914]" />
              <span>Recommandés pour vous (Basé sur vos visionnages)</span>
            </h2>

            <div className="relative">
              <button
                onClick={() => scrollRow(rowRef3, 'left')}
                className="absolute left-0 top-0 bottom-0 z-40 w-12 bg-black/60 hover:bg-black/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>

              <div
                ref={rowRef3}
                className="flex items-center space-x-4 overflow-x-auto no-scrollbar scroll-smooth py-2 px-1"
              >
                {[...videos].reverse().map((video) => (
                  <div key={video.id} className="w-[240px] sm:w-[280px] flex-shrink-0">
                    <VideoCard
                      video={video}
                      onPlay={onPlay}
                      onToggleFavorite={onToggleFavorite}
                      isFavorite={favorites.includes(video.id)}
                    />
                  </div>
                ))}
              </div>

              <button
                onClick={() => scrollRow(rowRef3, 'right')}
                className="absolute right-0 top-0 bottom-0 z-40 w-12 bg-black/60 hover:bg-black/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </div>
          </div>

          {/* ROW 4: Ma Liste (If populated) */}
          {favoriteVideos.length > 0 && (
            <div className="space-y-3 relative">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center space-x-2">
                <Heart className="w-5 h-5 text-[#E50914] fill-[#E50914]" />
                <span>Ma liste</span>
              </h2>

              <div className="flex items-center space-x-4 overflow-x-auto no-scrollbar py-2 px-1">
                {favoriteVideos.map((video) => (
                  <div key={video.id} className="w-[240px] sm:w-[280px] flex-shrink-0">
                    <VideoCard
                      video={video}
                      onPlay={onPlay}
                      onToggleFavorite={onToggleFavorite}
                      isFavorite={true}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
