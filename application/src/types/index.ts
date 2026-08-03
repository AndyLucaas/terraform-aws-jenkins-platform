export type VideoQuality = '240p' | '480p' | '720p' | '1080p' | '4K';

export interface AudioTrack {
  id: string;
  label: string;
  language: string;
}

export interface SubtitleTrack {
  id: string;
  label: string;
  language: string;
  fileUrl: string;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  bannerUrl: string;
  videoUrl: string;
  trailerUrl?: string;
  duration: number; // in seconds
  category: 'Films' | 'Séries' | 'Documentaires' | 'Tech & Innovation' | 'FAANG Live';
  genre: string[];
  rating: number; // e.g. 4.9
  matchScore: number; // e.g. 98 (% match)
  releaseYear: number;
  ageRating: 'Tous publics' | '12+' | '16+' | '18+';
  badge?: string; // 'TENDANCE #1', 'NOUVEAU', 'EXCLUSIF'
  qualities: VideoQuality[];
  audioTracks: AudioTrack[];
  subtitles: SubtitleTrack[];
  director: string;
  cast: string[];
  views: number;
  isFavorite?: boolean;
  introStartTime?: number; // for Skip Intro button
  introEndTime?: number;
  chapters?: { time: number; title: string }[];
}

export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  isKids: boolean;
  language: string;
  autoplayNext: boolean;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: string;
  resolution: string;
  maxConcurrentDevices: number;
  hasHDR: boolean;
  hasDolbyAtmos: boolean;
  downloadOffline: boolean;
}

export interface TranscodeJob {
  id: string;
  filename: string;
  size: string;
  uploadDate: string;
  status: 'QUEUED' | 'ANALYZING' | 'TRANSCODING' | 'GENERATING_THUMBNAILS' | 'COMPLETED' | 'FAILED';
  progress: number;
  currentFps?: number;
  outputQualities: VideoQuality[];
  bitratesGenerated: string[];
  chunkCount: number;
}

export interface SystemTelemetry {
  liveViewers: number;
  egressBandwidthGbps: number;
  bufferUnderrunRatePct: number;
  cdnHitRatioPct: number;
  activeTranscodeJobs: number;
  clusterCpuPct: number;
  clusterMemoryPct: number;
  kafkaEventsPerSec: number;
}

export interface UserComment {
  id: string;
  videoId: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
}
