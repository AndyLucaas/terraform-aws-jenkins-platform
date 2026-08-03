import React, { useState } from 'react';
import { Video } from '../../types';
import { Play, Info, Volume2, VolumeX, Plus, Check, Star } from 'lucide-react';

interface HeroBannerProps {
  video: Video;
  onPlay: (video: Video) => void;
  onToggleFavorite: (videoId: string) => void;
  isFavorite: boolean;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  video,
  onPlay,
  onToggleFavorite,
  isFavorite
}) => {
  const [isMuted, setIsMuted] = useState(true);

  return (
    <div className="relative w-full h-[75vh] sm:h-[85vh] min-h-[550px] max-h-[900px] overflow-hidden -mt-16 sm:-mt-20 select-none">
      
      {/* Background Hero Banner Image */}
      <img
        src={video.bannerUrl}
        alt={video.title}
        className="absolute inset-0 w-full h-full object-cover object-center transform scale-105"
      />

      {/* Netflix Vignette Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/50 to-transparent w-full md:w-3/4"></div>
      <div className="absolute inset-0 bg-netflix-vignette"></div>

      {/* Hero Billboard Content */}
      <div className="absolute bottom-16 sm:bottom-24 left-4 sm:left-12 lg:left-16 max-w-2xl z-20 space-y-4">
        
        {/* Netflix Original Badge */}
        <div className="flex items-center space-x-2">
          <span className="text-[#E50914] font-black text-xl tracking-tighter">N</span>
          <span className="text-xs font-bold text-[#e5e5e5] tracking-widest uppercase">FILM ORIGINAL NETFLIX</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight drop-shadow-2xl font-sans">
          {video.title}
        </h1>

        {/* Top 10 Rank Badge */}
        <div className="flex items-center space-x-3 pt-1">
          <div className="flex items-center space-x-1.5 bg-[#E50914] text-white px-2 py-0.5 rounded font-black text-xs shadow-md">
            <span>N°1</span>
          </div>
          <span className="text-sm font-bold text-white tracking-wide">
            N°1 du Top 10 des films aujourd'hui
          </span>
        </div>

        {/* Synopsis */}
        <p className="text-[#e5e5e5] text-sm sm:text-base line-clamp-3 font-normal leading-snug drop-shadow max-w-xl">
          {video.description}
        </p>

        {/* Netflix CTA Action Buttons */}
        <div className="flex items-center space-x-4 pt-3">
          
          {/* White Play Button */}
          <button
            onClick={() => onPlay(video)}
            className="px-6 sm:px-8 py-2.5 sm:py-3 rounded bg-white hover:bg-white/80 text-black font-extrabold text-sm sm:text-base flex items-center space-x-2 shadow-lg transition-all duration-200"
          >
            <Play className="w-6 h-6 fill-black" />
            <span>Lecture</span>
          </button>

          {/* Semi-Transparent Info Button */}
          <button
            onClick={() => onPlay(video)}
            className="px-6 sm:px-8 py-2.5 sm:py-3 rounded bg-[#6d6d6e]/70 hover:bg-[#6d6d6e]/40 text-white font-extrabold text-sm sm:text-base flex items-center space-x-2 backdrop-blur transition-all duration-200"
          >
            <Info className="w-6 h-6" />
            <span>Plus d'infos</span>
          </button>

          {/* Add to List Toggle Button */}
          <button
            onClick={() => onToggleFavorite(video.id)}
            className={`p-3 rounded-full border transition-all duration-200 ${
              isFavorite
                ? 'bg-white/20 border-white text-emerald-400'
                : 'bg-black/40 hover:bg-black/60 border-white/40 text-white'
            }`}
            title={isFavorite ? 'Dans ma liste' : 'Ajouter à ma liste'}
          >
            {isFavorite ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
          </button>

        </div>

      </div>

      {/* Right Side Maturity Rating & Mute Control */}
      <div className="absolute bottom-24 right-0 z-20 flex items-center space-x-3">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="p-2.5 rounded-full border border-white/40 bg-black/40 hover:bg-black/60 text-white transition-colors"
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>

        <div className="bg-[#333]/80 border-l-4 border-white px-3 py-1 text-xs font-bold text-white font-mono">
          {video.ageRating}
        </div>
      </div>

    </div>
  );
};
