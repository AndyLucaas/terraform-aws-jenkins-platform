import React, { useState } from 'react';
import { TranscodeJob } from '../../types';
import { Upload, Film, CheckCircle, Clock, AlertCircle, RefreshCw, Shield, Server, Terminal, FileVideo, Layers, Play } from 'lucide-react';

interface IngestionHubProps {
  isOpen: boolean;
  onClose: () => void;
  transcodeJobs: TranscodeJob[];
  onAddJob: (job: TranscodeJob) => void;
}

export const IngestionHub: React.FC<IngestionHubProps> = ({
  isOpen,
  onClose,
  transcodeJobs,
  onAddJob
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Tech & Innovation');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Kafka live event logs
  const [kafkaLogs, setKafkaLogs] = useState<string[]>([
    '[KAFKA-TOPIC: video.ingestion.events] Message consumed: { eventId: "evt_991", action: "FILE_RECEIVED", bucket: "s3://aether-raw-ingest/master.mov" }',
    '[MINIO-S3] Object validated: SHA256 integrity OK (42.8 GB)',
    '[FFMPEG-WORKER-04] Initializing Hardware H.264/HEVC NVENC Transcoder pipeline...'
  ]);

  if (!isOpen) return null;

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      if (!title) setTitle(file.name.replace(/\.[^/.]+$/, ""));
    }
  };

  const handleStartIngest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile && !title) return;

    setIsUploading(true);
    setUploadProgress(10);

    // Simulate multi-stage upload & Kafka event pipeline
    let current = 10;
    const timer = setInterval(() => {
      current += 20;
      setUploadProgress(current);

      if (current === 30) {
        setKafkaLogs(prev => [...prev, `[KAFKA-TOPIC: video.transcode.jobs] Event emitted: TRANSCODE_STARTED for ${title}`]);
      } else if (current === 70) {
        setKafkaLogs(prev => [...prev, `[ABR-GENERATOR] Profile 1080p (8.0 Mbps) and 4K (25 Mbps) segments written to HLS index .m3u8`]);
      } else if (current >= 100) {
        clearInterval(timer);
        setIsUploading(false);
        setUploadProgress(100);

        const newJob: TranscodeJob = {
          id: `job-${Date.now()}`,
          filename: selectedFile ? selectedFile.name : `${title.toLowerCase().replace(/\s+/g, '_')}_master.mp4`,
          size: selectedFile ? `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB` : '4.2 GB',
          uploadDate: 'À l\'instant',
          status: 'COMPLETED',
          progress: 100,
          currentFps: 120,
          outputQualities: ['240p', '480p', '720p', '1080p', '4K'],
          bitratesGenerated: ['400 kbps', '1.2 Mbps', '3.5 Mbps', '8.0 Mbps', '25.0 Mbps'],
          chunkCount: 940
        };

        onAddJob(newJob);
        setKafkaLogs(prev => [...prev, `[KAFKA-TOPIC: video.transcode.completed] Transcoding successfully finished with 100% SLA.`]);
        setSelectedFile(null);
        setTitle('');
      }
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Upload className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white tracking-tight">Studio d'Ingestion Video & Transcodage ABR</h2>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Pipeline Kafka + FFmpeg NVENC + MinIO S3 Object Storage
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
          >
            Fermer
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
          
          {/* Left Column: Upload Dropzone & Form */}
          <div className="lg:col-span-7 space-y-6">
            
            <form onSubmit={handleStartIngest} className="space-y-4">
              
              {/* Drag and Drop Zone */}
              <div
                onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleDrop}
                className={`relative p-8 rounded-2xl border-2 border-dashed text-center transition-all cursor-pointer ${
                  dragActive
                    ? 'border-emerald-500 bg-emerald-500/10'
                    : 'border-slate-700 hover:border-slate-500 bg-slate-950/60'
                }`}
              >
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      const file = e.target.files[0];
                      setSelectedFile(file);
                      if (!title) setTitle(file.name.replace(/\.[^/.]+$/, ""));
                    }
                  }}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />

                <FileVideo className="w-12 h-12 text-emerald-400 mx-auto mb-3 animate-pulse" />
                
                {selectedFile ? (
                  <div className="text-sm font-semibold text-emerald-400">
                    {selectedFile.name} ({(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)
                  </div>
                ) : (
                  <div>
                    <p className="text-sm font-bold text-white">Glissez votre master vidéo ici</p>
                    <p className="text-xs text-slate-400 mt-1">Formats acceptés: .MOV, .MP4, ProRes 422, H.264 / HEVC (Jusqu'à 100 Go)</p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Titre du Contenu
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="ex: Keynote Cloud Native 2026"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Catégorie Stream
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Tech & Innovation">Tech & Innovation</option>
                    <option value="Films">Films 4K</option>
                    <option value="Séries">Séries</option>
                    <option value="FAANG Live">FAANG Live</option>
                    <option value="Documentaires">Documentaires</option>
                  </select>
                </div>
              </div>

              {/* Progress Bar during Upload */}
              {isUploading && (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-emerald-400 font-bold">Ingest & FFmpeg Transcode...</span>
                    <span className="text-white">{uploadProgress}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-accent-cyan transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isUploading}
                className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-slate-950 font-extrabold text-sm transition-all shadow-lg flex items-center justify-center space-x-2"
              >
                <Play className="w-4 h-4 fill-slate-950" />
                <span>{isUploading ? 'Traitement en cours...' : 'Lancer l\'Ingestion SaaS'}</span>
              </button>

            </form>

            {/* Transcoding Queue Table */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-400" /> Files de Transcodage Actives
              </h3>

              <div className="space-y-2">
                {transcodeJobs.map((job) => (
                  <div key={job.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs font-mono">
                    <div>
                      <p className="font-bold text-white truncate max-w-[220px]">{job.filename}</p>
                      <span className="text-[10px] text-slate-400">{job.size} • {job.chunkCount} chunks HLS</span>
                    </div>

                    <div className="flex items-center space-x-3">
                      {job.status === 'COMPLETED' ? (
                        <span className="px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30 flex items-center gap-1">
                          <CheckCircle className="w-3.5 h-3.5" /> 100% OK
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-400 font-bold border border-amber-500/30 flex items-center gap-1 animate-pulse">
                          <RefreshCw className="w-3 h-3 animate-spin" /> {job.progress}% ({job.currentFps} FPS)
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Real-time Kafka Console */}
          <div className="lg:col-span-5 flex flex-col h-full bg-slate-950 border border-slate-800 rounded-2xl p-4 overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
              <div className="flex items-center space-x-2">
                <Terminal className="w-4 h-4 text-accent-cyan" />
                <span className="font-mono text-xs font-bold text-slate-200">Kafka Event Stream Console</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            </div>

            <div className="flex-1 font-mono text-[11px] text-slate-400 space-y-2 overflow-y-auto max-h-[360px] pr-2">
              {kafkaLogs.map((log, index) => (
                <div key={index} className="p-2 rounded bg-slate-900/90 border border-slate-800/80 leading-relaxed text-slate-300">
                  {log}
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] font-mono text-slate-500 flex items-center justify-between">
              <span>Cluster Kafka: broker-01.aether.internal:9092</span>
              <span className="text-emerald-400 font-bold">Partition 0 • In-Sync Replica</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
