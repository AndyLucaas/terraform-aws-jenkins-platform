-- ====================================================================
-- AETHER STREAM ENTERPRISE - DATABASE SCHEMA V1 (PostgreSQL 16)
-- Clean Architecture & Normalized Relational ERD with Flyway Migration
-- ====================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table: Users (Keycloak IAM Mirror)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    keycloak_sub VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table: User Profiles (Multi-profile per user e.g. Kids, Adult)
CREATE TABLE user_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    avatar_url TEXT NOT NULL,
    is_kids BOOLEAN DEFAULT FALSE,
    preferred_language VARCHAR(10) DEFAULT 'fr',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table: Categories
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT
);

-- Table: Videos (Aggregate Root Core Entity)
CREATE TABLE videos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category_id UUID NOT NULL REFERENCES categories(id),
    thumbnail_url TEXT NOT NULL,
    banner_url TEXT NOT NULL,
    master_manifest_url TEXT NOT NULL, -- HLS / DASH manifest (.m3u8 / .mpd)
    duration_seconds INT NOT NULL CHECK (duration_seconds > 0),
    release_year INT NOT NULL,
    rating NUMERIC(3,2) DEFAULT 5.00 CHECK (rating >= 0 AND rating <= 5.00),
    age_rating VARCHAR(20) NOT NULL DEFAULT 'Tous publics',
    director VARCHAR(150),
    view_count BIGINT DEFAULT 0,
    status VARCHAR(50) NOT NULL DEFAULT 'READY',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table: Video Qualities (1-to-N ABR Profiles)
CREATE TABLE video_qualities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    video_id UUID NOT NULL REFERENCES videos(id) ON DELETE CASCADE,
    resolution VARCHAR(20) NOT NULL, -- '240p', '480p', '720p', '1080p', '4K'
    bitrate_kbps INT NOT NULL,
    stream_path TEXT NOT NULL,
    codec VARCHAR(50) DEFAULT 'H.264/HEVC',
    UNIQUE (video_id, resolution)
);

-- Table: Video Chapters
CREATE TABLE video_chapters (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    video_id UUID NOT NULL REFERENCES videos(id) ON DELETE CASCADE,
    start_time_seconds INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    order_index INT NOT NULL
);

-- Indexes for Ultra-Fast Queries (FAANG Scale Performance)
CREATE INDEX idx_videos_category_year ON videos(category_id, release_year DESC);
CREATE INDEX idx_videos_status_view_count ON videos(status, view_count DESC);
CREATE INDEX idx_qualities_video_resolution ON video_qualities(video_id, resolution);
CREATE INDEX idx_profiles_user_id ON user_profiles(user_id);
