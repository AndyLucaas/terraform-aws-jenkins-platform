import { Video, UserProfile, TranscodeJob, SystemTelemetry, UserComment } from '../types';

export const INITIAL_PROFILES: UserProfile[] = [
  {
    id: 'p-1',
    name: 'Alexandre (Staff Eng)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    isKids: false,
    language: 'Français',
    autoplayNext: true
  },
  {
    id: 'p-2',
    name: 'Équipe Tech Enterprise',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    isKids: false,
    language: 'English',
    autoplayNext: true
  },
  {
    id: 'p-3',
    name: 'Espace Kids',
    avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=300&q=80',
    isKids: true,
    language: 'Français',
    autoplayNext: false
  }
];

export const MOCK_VIDEOS: Video[] = [
  {
    id: 'v-101',
    title: 'Cyberpulse: Beyond the Grid',
    description: 'Une plongée captivante dans le futur du cloud mondial et des réseaux neuronaux auto-apprenants. Produit en 4K HDR avec son Dolby Atmos spatialisé.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80',
    // Public reliable HLS / MP4 stream for realistic streaming experience
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    duration: 596,
    category: 'Tech & Innovation',
    genre: ['Sci-Fi', 'Documentaire', 'Cyberpunk', 'IA'],
    rating: 4.95,
    matchScore: 99,
    releaseYear: 2026,
    ageRating: '16+',
    badge: 'TENDANCE #1',
    qualities: ['240p', '480p', '720p', '1080p', '4K'],
    audioTracks: [
      { id: 'fr', label: 'Français (Original 5.1)', language: 'fr' },
      { id: 'en', label: 'English (Atmos 7.1)', language: 'en' }
    ],
    subtitles: [
      { id: 'sub-fr', label: 'Français [CC]', language: 'fr', fileUrl: '' },
      { id: 'sub-en', label: 'English [SDH]', language: 'en', fileUrl: '' }
    ],
    director: 'Elena Rostova',
    cast: ['Kaelen Vance', 'Sora Takahashi', 'Marcus Thorne'],
    views: 4820100,
    introStartTime: 5,
    introEndTime: 20,
    chapters: [
      { time: 0, title: 'Introduction au Réseau Global' },
      { time: 120, title: 'Architecture des Microservices' },
      { time: 340, title: 'L\'Avènement du Quantique' },
      { time: 500, title: 'Épilogue et Vision 2030' }
    ]
  },
  {
    id: 'v-102',
    title: 'Architectures Haute Disponibilité chez Netflix & Google',
    description: 'Masterclass exclusive sur la tolérance aux pannes multi-régions, la réplication Cassandra, Kafka et les CDN Edge avec distribution ABR dynamique.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1920&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    duration: 653,
    category: 'FAANG Live',
    genre: ['Génie Logiciel', 'Systèmes Distribués', 'Cloud Native'],
    rating: 4.98,
    matchScore: 97,
    releaseYear: 2026,
    ageRating: 'Tous publics',
    badge: 'EXCLUSIF SAAS',
    qualities: ['480p', '720p', '1080p', '4K'],
    audioTracks: [
      { id: 'fr', label: 'Français', language: 'fr' },
      { id: 'en', label: 'English', language: 'en' }
    ],
    subtitles: [
      { id: 'sub-fr', label: 'Français', language: 'fr', fileUrl: '' }
    ],
    director: 'Dr. David Chen (Principal Architect)',
    cast: ['Dr. David Chen', 'Sarah Jenkins'],
    views: 1250300,
    introStartTime: 0,
    introEndTime: 15,
    chapters: [
      { time: 0, title: 'Prélude System Design' },
      { time: 180, title: 'Stratégie de Cache multi-niveaux Redis' },
      { time: 420, title: 'Basculement Instantané Multi-Region' }
    ]
  },
  {
    id: 'v-103',
    title: 'Horizon Odyssey: Deep Space 9',
    description: 'Une expédition interstellaire sans précédent vers la galaxie d\'Andromède. Une superproduction visuelle époustouflante.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1920&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    duration: 734,
    category: 'Films',
    genre: ['Aventure', 'Sci-Fi', 'Action'],
    rating: 4.88,
    matchScore: 94,
    releaseYear: 2025,
    ageRating: '12+',
    badge: '4K ULTRA HD',
    qualities: ['240p', '480p', '720p', '1080p', '4K'],
    audioTracks: [{ id: 'fr', label: 'Français Atmos', language: 'fr' }],
    subtitles: [{ id: 'sub-fr', label: 'Français', language: 'fr', fileUrl: '' }],
    director: 'Christopher Nolan AI',
    cast: ['Astrid Lindgren', 'Jonathan Miller'],
    views: 8900400,
    introStartTime: 10,
    introEndTime: 35
  },
  {
    id: 'v-104',
    title: 'Silicon Core: The Semiconductor Revolution',
    description: 'Comment les puces 2nm et le packaging 3D redéfinissent la vitesse des centres de données et du streaming 8K.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1920&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    duration: 888,
    category: 'Documentaires',
    genre: ['Hardware', 'Semi-conducteurs', 'Technologie'],
    rating: 4.91,
    matchScore: 92,
    releaseYear: 2026,
    ageRating: 'Tous publics',
    qualities: ['480p', '720p', '1080p'],
    audioTracks: [{ id: 'fr', label: 'Français', language: 'fr' }],
    subtitles: [],
    director: 'Jean-Luc Godard NextGen',
    cast: ['Prof. Lisa Su', 'Jensen Huang'],
    views: 3400100
  },
  {
    id: 'v-105',
    title: 'Le Mystère de l\'Océan Abyssal',
    description: 'Voyage dans les profondeurs de la fosse des Mariannes à la découverte des espèces bioluminescentes.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    duration: 480,
    category: 'Documentaires',
    genre: ['Nature', 'Océan', 'Science'],
    rating: 4.87,
    matchScore: 90,
    releaseYear: 2024,
    ageRating: 'Tous publics',
    qualities: ['720p', '1080p', '4K'],
    audioTracks: [{ id: 'fr', label: 'Français', language: 'fr' }],
    subtitles: [],
    director: 'Sylvia Earle',
    cast: ['Jacques Cousteau Archive', 'Dr. Marine Le Petit'],
    views: 2100500
  },
  {
    id: 'v-106',
    title: 'Code Protocol: Zero Day',
    description: 'Un thriller de cybersécurité palpitant opposant des hackeurs d\'élite à la défense d\'un réacteur nucléaire.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1563206076-8e5670a96657?auto=format&fit=crop&w=1200&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1920&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    duration: 620,
    category: 'Séries',
    genre: ['Cybersécurité', 'Thriller', 'Action'],
    rating: 4.96,
    matchScore: 99,
    releaseYear: 2026,
    ageRating: '18+',
    badge: 'POPULAIRE',
    qualities: ['480p', '720p', '1080p', '4K'],
    audioTracks: [{ id: 'fr', label: 'Français', language: 'fr' }],
    subtitles: [],
    director: 'Sam Esmail',
    cast: ['Rami Malek', 'Christian Slater'],
    views: 9900000
  }
];

export const MOCK_TRANSCODE_JOBS: TranscodeJob[] = [
  {
    id: 'job-9901',
    filename: 'master_raw_keynote_8k_prores.mov',
    size: '42.8 GB',
    uploadDate: 'Il y a 3 minutes',
    status: 'TRANSCODING',
    progress: 74,
    currentFps: 142,
    outputQualities: ['240p', '480p', '720p', '1080p', '4K'],
    bitratesGenerated: ['400 kbps', '1.2 Mbps', '3.5 Mbps', '8.0 Mbps', '25.0 Mbps'],
    chunkCount: 1420
  },
  {
    id: 'job-9902',
    filename: 'ep4_cyberpulse_4k_master.mp4',
    size: '18.4 GB',
    uploadDate: 'Il y a 22 minutes',
    status: 'COMPLETED',
    progress: 100,
    currentFps: 0,
    outputQualities: ['240p', '480p', '720p', '1080p', '4K'],
    bitratesGenerated: ['350 kbps', '1.0 Mbps', '3.0 Mbps', '7.5 Mbps', '22.0 Mbps'],
    chunkCount: 890
  },
  {
    id: 'job-9903',
    filename: 'live_stream_segment_ch2.ts',
    size: '2.1 GB',
    uploadDate: 'Il y a 45 secondes',
    status: 'ANALYZING',
    progress: 18,
    currentFps: 60,
    outputQualities: ['720p', '1080p'],
    bitratesGenerated: [],
    chunkCount: 120
  }
];

export const INITIAL_TELEMETRY: SystemTelemetry = {
  liveViewers: 1482930,
  egressBandwidthGbps: 482.4,
  bufferUnderrunRatePct: 0.08,
  cdnHitRatioPct: 99.4,
  activeTranscodeJobs: 14,
  clusterCpuPct: 41.2,
  clusterMemoryPct: 58.7,
  kafkaEventsPerSec: 28450
};

export const INITIAL_COMMENTS: UserComment[] = [
  {
    id: 'c-1',
    videoId: 'v-101',
    author: 'Sophie L. (Lead DevOps)',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
    content: 'La transition ABR sur HLS.js est d’une fluidité incroyable ! Aucun buffering détecté même lors des coupures simulées.',
    timestamp: 'Il y a 10 min',
    likes: 42
  },
  {
    id: 'c-2',
    videoId: 'v-101',
    author: 'Marc V. (Cloud Architect)',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80',
    content: 'La doc de l\'architecture Kafka + Redis pour les sessions de streaming est ultra propre. Bravo à l\'équipe backend !',
    timestamp: 'Il y a 35 min',
    likes: 28
  }
];
