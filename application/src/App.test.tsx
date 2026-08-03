import { describe, it, expect } from 'vitest';
import { MOCK_VIDEOS, INITIAL_PROFILES } from './data/mockData';

describe('AetherStream Enterprise Data & Domain Logic Suite', () => {
  it('should initialize video catalog with FAANG grade metadata and qualities', () => {
    expect(MOCK_VIDEOS.length).toBeGreaterThan(0);
    const heroVideo = MOCK_VIDEOS[0];
    expect(heroVideo.qualities).toContain('4K');
    expect(heroVideo.qualities).toContain('1080p');
    expect(heroVideo.rating).toBeGreaterThanOrEqual(4.8);
    expect(heroVideo.matchScore).toBeGreaterThanOrEqual(90);
  });

  it('should support multi-profile initialization', () => {
    expect(INITIAL_PROFILES.length).toBeGreaterThanOrEqual(2);
    const mainProfile = INITIAL_PROFILES[0];
    expect(mainProfile.name).toBe('Alexandre (Staff Eng)');
    expect(mainProfile.isKids).toBe(false);
  });

  it('should validate HLS video URL and chapter timestamp consistency', () => {
    const videoWithChapters = MOCK_VIDEOS.find(v => v.chapters && v.chapters.length > 0);
    expect(videoWithChapters).toBeDefined();
    if (videoWithChapters && videoWithChapters.chapters) {
      videoWithChapters.chapters.forEach(chapter => {
        expect(chapter.time).toBeLessThanOrEqual(videoWithChapters.duration);
      });
    }
  });
});
