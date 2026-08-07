import React, { useState } from 'react';
import { Video } from '../../types';
import { Play, Plus, Check, ThumbsUp, ChevronDown, Sparkles } from 'lucide-react';

interface VideoCardProps {
  video: Video;
  onPlay: (video: Video) => void;
  onToggleFavorite: (videoId: string) => void;
  isFavorite: boolean;
  rankNumber?: number; // For Top 10 rows
}

export const VideoCard: React.FC<VideoCardProps> = ({
  video,
  onPlay,
  onToggleFavorite,
  isFavorite,
  rankNumber
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [liked, setLiked] = useState(false);

  const formatDuration = (sec: number) => {
    const mins = Math.floor(sec / 60);
    return `${mins} h ${sec % 60} min`;
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex-shrink-0 group cursor-pointer select-none"
    >
      {/* Top 10 Giant Rank Number */}
      {rankNumber !== undefined && (
        <div className="absolute -left-8 bottom-0 z-0 text-9xl font-black text-black stroke-slate-700 font-mono tracking-tighter opacity-80 select-none pointer-events-none drop-shadow-2xl">
          {rankNumber}
        </div>
      )}

      {/* Main Card Wrapper */}
      <div className={`relative rounded-md overflow-hidden bg-[#181818] border border-white/5 transition-all duration-300 ${
        isHovered ? 'shadow-netflix-card z-30 transform scale-105' : 'z-10'
      }`}>
        
        {/* Thumbnail */}
        <div className="relative aspect-video w-full overflow-hidden bg-[#2f2f2f]">
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />

          {/* Top Left Netflix Badge */}
          <div className="absolute top-2 left-2 flex items-center gap-1">
            <span className="text-[#E50914] font-black text-xs">N</span>
            {video.badge && (
              <span className="bg-[#E50914] text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded shadow">
                {video.badge}
              </span>
            )}
          </div>
        </div>

        {/* Hover Details Panel */}
        <div className="p-3.5 space-y-3 bg-[#181818]">
          
          {/* Action Icons Bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              
              {/* Play Button */}
              <button
                onClick={() => onPlay(video)}
                className="w-8 h-8 rounded-full bg-white hover:bg-white/80 text-black flex items-center justify-center transition-colors"
                title="Lecture"
              >
                <Play className="w-4 h-4 fill-black ml-0.5" />
              </button>

              {/* Add to List Button */}
              <button
                onClick={() => onToggleFavorite(video.id)}
                className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${
                  isFavorite
                    ? 'bg-white/20 border-white text-emerald-400'
                    : 'bg-[#2a2a2a] hover:bg-[#333] border-white/40 text-white'
                }`}
                title={isFavorite ? 'Dans ma liste' : 'Ajouter à ma liste'}
              >
                {isFavorite ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </button>

              {/* Like Button */}
              <button
                onClick={() => setLiked(!liked)}
                className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${
                  liked
                    ? 'bg-white/20 border-white text-blue-400'
                    : 'bg-[#2a2a2a] hover:bg-[#333] border-white/40 text-white'
                }`}
                title="J'aime ce titre"
              >
                <ThumbsUp className="w-3.5 h-3.5" />
              </button>

            </div>

            {/* Expand Details Arrow */}
            <button
              onClick={() => onPlay(video)}
              className="w-8 h-8 rounded-full bg-[#2a2a2a] hover:bg-[#333] border border-white/40 text-white flex items-center justify-center transition-colors"
              title="Plus d'infos"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Netflix Metadata Metrics */}
          <div className="flex items-center space-x-2 text-xs font-semibold">
            <span className="text-[#46d369] font-bold">
              {video.matchScore}% de correspondance
            </span>
            <span className="border border-white/40 px-1 py-0.2 rounded text-[10px] text-white">
              {video.ageRating}
            </span>
            <span className="border border-white/40 px-1 py-0.2 rounded text-[10px] text-white font-mono">
              HD
            </span>
          </div>

          {/* Genres & Categories */}
          <div className="flex items-center space-x-1.5 text-[11px] text-[#e5e5e5] truncate">
            {video.genre.slice(0, 3).map((g, idx) => (
              <span key={g} className="flex items-center">
                {idx > 0 && <span className="mx-1 text-gray-500">•</span>}
                {g}
              </span>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
};
