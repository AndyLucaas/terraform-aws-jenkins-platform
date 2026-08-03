import React, { useState, useRef, useEffect } from 'react';
import { Video, VideoQuality } from '../../types';
import {
  X, Play, Pause, Volume2, VolumeX, Maximize, Minimize, Settings,
  RotateCcw, RotateCw, SkipForward, Monitor, Activity, Subtitles,
  Sliders, Check, Layers, ChevronRight, MessageSquare
} from 'lucide-react';

interface VideoPlayerModalProps {
  video: Video | null;
  onClose: () => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({ video, onClose }) => {
  if (!video) return null;

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Player State
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(video.duration || 600);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  
  // Customization & Menus
  const [selectedQuality, setSelectedQuality] = useState<VideoQuality | 'Auto'>('Auto');
  const [selectedAudio, setSelectedAudio] = useState(video.audioTracks[0]?.id || 'fr');
  const [selectedSub, setSelectedSub] = useState<string>('off');
  const [showSettings, setShowSettings] = useState(false);
  const [showTelemetry, setShowTelemetry] = useState(false);
  const [showChapters, setShowChapters] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);

  // QoE Telemetry metrics (Simulated live metrics for FAANG grade analytics)
  const [qoeMetrics, setQoeMetrics] = useState({
    bitrateMbps: 18.4,
    bufferHealthSec: 14.8,
    droppedFrames: 0,
    cdnPop: 'CDG1-PARIS-EDGE-04',
    abrProfile: '2160p (4K HDR10+ / HEVC)',
    networkLatencyMs: 11
  });

  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto hide controls after 3 seconds of inactivity
  const handleMouseMove = () => {
    setControlsVisible(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setControlsVisible(false);
    }, 3500);
  };

  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, []);

  // Update QoE telemetry metrics periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setQoeMetrics(prev => ({
        ...prev,
        bitrateMbps: Number((16 + Math.random() * 4).toFixed(1)),
        bufferHealthSec: Number((12 + Math.random() * 5).toFixed(1)),
        networkLatencyMs: Math.floor(9 + Math.random() * 6)
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Play / Pause toggle
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => console.error(err));
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(err => console.error(err));
      setIsFullscreen(false);
    }
  };

  // Picture in Picture toggle
  const togglePiP = async () => {
    if (!videoRef.current) return;
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else {
        await videoRef.current.requestPictureInPicture();
      }
    } catch (e) {
      console.error("PiP not supported or failed:", e);
    }
  };

  // Skip 10s forward/backward
  const skipTime = (seconds: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = Math.max(0, Math.min(duration, videoRef.current.currentTime + seconds));
  };

  // Skip Intro
  const handleSkipIntro = () => {
    if (!videoRef.current || !video.introEndTime) return;
    videoRef.current.currentTime = video.introEndTime;
  };

  // Format time (e.g. 12:45)
  const formatTime = (timeInSec: number) => {
    const mins = Math.floor(timeInSec / 60);
    const secs = Math.floor(timeInSec % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isIntro = video.introStartTime !== undefined && 
                  video.introEndTime !== undefined && 
                  currentTime >= video.introStartTime && 
                  currentTime <= video.introEndTime;

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden animate-in fade-in">
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative w-full h-full bg-black flex items-center justify-center select-none"
      >
        {/* Main HTML5 / HLS Video Element */}
        <video
          ref={videoRef}
          src={video.videoUrl}
          autoPlay
          className="w-full h-full object-contain cursor-pointer"
          onClick={togglePlay}
          onTimeUpdate={() => {
            if (videoRef.current) {
              setCurrentTime(videoRef.current.currentTime);
              if (videoRef.current.duration) setDuration(videoRef.current.duration);
            }
          }}
          onEnded={() => setIsPlaying(false)}
        />

        {/* Top Gradient Header Overlay */}
        <div className={`absolute top-0 inset-x-0 p-6 bg-gradient-to-b from-black/90 via-black/40 to-transparent transition-opacity duration-300 ${
          controlsVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onClose}
                className="p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white transition-all border border-slate-700/50"
              >
                <X className="w-6 h-6" />
              </button>
              <div>
                <h2 className="text-xl font-bold text-white tracking-wide">{video.title}</h2>
                <div className="flex items-center space-x-3 text-xs text-slate-300 mt-0.5">
                  <span className="font-mono text-emerald-400 font-semibold">{selectedQuality} ABR</span>
                  <span>•</span>
                  <span>{video.category}</span>
                  <span>•</span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 text-[10px]">
                    {video.ageRating}
                  </span>
                </div>
              </div>
            </div>

            {/* Top Right Action Icons */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowTelemetry(!showTelemetry)}
                className={`p-2.5 rounded-xl border text-xs font-mono flex items-center gap-2 transition-all ${
                  showTelemetry
                    ? 'bg-brand-500/20 border-brand-500 text-brand-400 shadow-glow-red'
                    : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:text-white'
                }`}
                title="Afficher la Télémétrie QoE en temps réel (Bitrate, Buffer, CDN)"
              >
                <Activity className="w-4 h-4 text-emerald-400" />
                <span className="hidden sm:inline">QoE Telemetry</span>
              </button>
            </div>
          </div>
        </div>

        {/* Floating Skip Intro Button */}
        {isIntro && (
          <button
            onClick={handleSkipIntro}
            className="absolute bottom-28 right-8 z-30 px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 text-white font-semibold text-sm flex items-center space-x-2 shadow-2xl transition-all hover:scale-105 animate-bounce"
          >
            <SkipForward className="w-4 h-4 text-brand-500" />
            <span>Passer l'introduction</span>
          </button>
        )}

        {/* QoE Telemetry Overlay (Netflix Stats for Nerds equivalent) */}
        {showTelemetry && (
          <div className="absolute top-24 left-8 z-40 w-80 glass-panel p-4 rounded-2xl text-xs font-mono text-slate-300 space-y-2 border border-emerald-500/30 shadow-2xl animate-in fade-in">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                <Activity className="w-4 h-4" /> Live Streaming Metrics
              </span>
              <span className="text-[10px] text-slate-500">HLS v7 / AES-128 DRM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Bitrate vidéo:</span>
              <span className="font-bold text-white">{qoeMetrics.bitrateMbps} Mbps</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Buffer Health:</span>
              <span className="font-bold text-emerald-400">{qoeMetrics.bufferHealthSec} sec</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Rendu Resolution:</span>
              <span className="font-bold text-white">{qoeMetrics.abrProfile}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">CDN Edge Node:</span>
              <span className="font-bold text-accent-cyan">{qoeMetrics.cdnPop}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Latence Réseau:</span>
              <span className="font-bold text-white">{qoeMetrics.networkLatencyMs} ms</span>
            </div>
          </div>
        )}

        {/* Bottom Control Bar */}
        <div className={`absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/95 via-black/60 to-transparent transition-opacity duration-300 ${
          controlsVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}>
          {/* Scrubber / Progress Bar */}
          <div className="relative mb-4 group cursor-pointer">
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={(e) => {
                const newTime = parseFloat(e.target.value);
                setCurrentTime(newTime);
                if (videoRef.current) videoRef.current.currentTime = newTime;
              }}
              className="w-full video-slider accent-brand-500 cursor-pointer"
            />
            {/* Chapter markers indicator */}
            {video.chapters?.map((chap, idx) => {
              const leftPct = (chap.time / duration) * 100;
              return (
                <div
                  key={idx}
                  className="absolute top-1/2 -translate-y-1/2 w-1 h-3 bg-white/70 rounded-full pointer-events-none"
                  style={{ left: `${leftPct}%` }}
                  title={chap.title}
                />
              );
            })}
          </div>

          <div className="flex items-center justify-between">
            {/* Left Controls: Play, Skip, Volume, Timer */}
            <div className="flex items-center space-x-4">
              <button
                onClick={togglePlay}
                className="p-3 rounded-full bg-brand-500 hover:bg-brand-600 text-white transition-all shadow-glow-red"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-white ml-0.5" />}
              </button>

              <button
                onClick={() => skipTime(-10)}
                className="p-2 text-slate-300 hover:text-white transition-colors"
                title="Reculer de 10 sec"
              >
                <RotateCcw className="w-5 h-5" />
              </button>

              <button
                onClick={() => skipTime(10)}
                className="p-2 text-slate-300 hover:text-white transition-colors"
                title="Avancer de 10 sec"
              >
                <RotateCw className="w-5 h-5" />
              </button>

              {/* Volume Slider */}
              <div className="flex items-center space-x-2 group">
                <button
                  onClick={() => {
                    if (videoRef.current) {
                      videoRef.current.muted = !isMuted;
                      setIsMuted(!isMuted);
                    }
                  }}
                  className="p-2 text-slate-300 hover:text-white transition-colors"
                >
                  {isMuted || volume === 0 ? <VolumeX className="w-5 h-5 text-brand-500" /> : <Volume2 className="w-5 h-5" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => {
                    const newVol = parseFloat(e.target.value);
                    setVolume(newVol);
                    if (videoRef.current) {
                      videoRef.current.volume = newVol;
                      setIsMuted(newVol === 0);
                    }
                  }}
                  className="w-20 video-slider accent-brand-500 opacity-70 group-hover:opacity-100 transition-opacity"
                />
              </div>

              {/* Time Display */}
              <span className="font-mono text-xs text-slate-300">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            {/* Right Controls: Quality, Audio/Subtitles, Speed, PiP, Fullscreen */}
            <div className="flex items-center space-x-3">
              
              {/* Chapters Drawer Button */}
              {video.chapters && video.chapters.length > 0 && (
                <div className="relative">
                  <button
                    onClick={() => setShowChapters(!showChapters)}
                    className="p-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-900/80 border border-slate-800 flex items-center gap-1.5"
                  >
                    <Layers className="w-4 h-4 text-brand-500" />
                    <span className="hidden sm:inline">Chapitres</span>
                  </button>

                  {showChapters && (
                    <div className="absolute bottom-12 right-0 w-64 glass-panel p-3 rounded-2xl space-y-1 shadow-2xl border border-slate-800 text-xs">
                      <div className="font-bold text-white pb-2 mb-1 border-b border-slate-800">Chapitres du Film</div>
                      {video.chapters.map((chap, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            if (videoRef.current) videoRef.current.currentTime = chap.time;
                            setShowChapters(false);
                          }}
                          className="w-full text-left p-2 rounded-xl hover:bg-slate-800 text-slate-300 hover:text-white transition-colors flex items-center justify-between"
                        >
                          <span className="truncate">{chap.title}</span>
                          <span className="font-mono text-[10px] text-slate-500">{formatTime(chap.time)}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Quality & Audio Settings Drawer */}
              <div className="relative">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className={`p-2.5 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-all ${
                    showSettings ? 'bg-slate-800 text-white border-slate-600' : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  <Settings className="w-4 h-4" />
                </button>

                {showSettings && (
                  <div className="absolute bottom-12 right-0 w-72 glass-panel p-4 rounded-2xl space-y-4 shadow-2xl border border-slate-800 text-xs animate-in fade-in">
                    <div>
                      <div className="font-bold text-white mb-2 flex items-center justify-between">
                        <span>Qualité d'encodage (ABR)</span>
                        <span className="text-[10px] font-mono text-emerald-400">HLS Adaptive</span>
                      </div>
                      <div className="grid grid-cols-3 gap-1.5">
                        {['Auto', ...video.qualities].map((q) => (
                          <button
                            key={q}
                            onClick={() => setSelectedQuality(q as any)}
                            className={`py-1.5 rounded-lg border text-center font-mono font-semibold transition-all ${
                              selectedQuality === q
                                ? 'bg-brand-500/20 border-brand-500 text-brand-400'
                                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                            }`}
                          >
                            {q}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-slate-800 pt-3">
                      <div className="font-bold text-white mb-2">Vitesse de lecture</div>
                      <div className="flex items-center justify-between gap-1">
                        {[0.5, 1, 1.25, 1.5, 2].map((rate) => (
                          <button
                            key={rate}
                            onClick={() => {
                              setPlaybackRate(rate);
                              if (videoRef.current) videoRef.current.playbackRate = rate;
                            }}
                            className={`px-2 py-1 rounded border text-[11px] font-mono font-medium transition-all ${
                              playbackRate === rate
                                ? 'bg-brand-500 border-brand-500 text-white'
                                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                            }`}
                          >
                            {rate}x
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* PiP Button */}
              <button
                onClick={togglePiP}
                className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
                title="Mode Picture-in-Picture"
              >
                <Monitor className="w-4 h-4" />
              </button>

              {/* Fullscreen Button */}
              <button
                onClick={toggleFullscreen}
                className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
                title="Plein écran"
              >
                {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
              </button>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
