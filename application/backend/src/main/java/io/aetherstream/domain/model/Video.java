package io.aetherstream.domain.model;

import java.time.Instant;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

/**
 * Domain Aggregate Root: Video
 * Enforces business rules and invariants for video metadata & streaming quality.
 */
public class Video {
    private final UUID id;
    private String title;
    private String description;
    private UUID categoryId;
    private String thumbnailUrl;
    private String bannerUrl;
    private String masterManifestUrl;
    private int durationSeconds;
    private int releaseYear;
    private double rating;
    private String ageRating;
    private long viewCount;
    private List<String> availableQualities;
    private Instant createdAt;

    public Video(UUID id, String title, String description, UUID categoryId, 
                 String thumbnailUrl, String bannerUrl, String masterManifestUrl, 
                 int durationSeconds, int releaseYear, double rating, 
                 String ageRating, long viewCount, List<String> availableQualities, Instant createdAt) {
        
        if (title == null || title.isBlank()) {
            throw new IllegalArgumentException("Video title cannot be empty");
        }
        if (durationSeconds <= 0) {
            throw new IllegalArgumentException("Duration must be positive");
        }

        this.id = id != null ? id : UUID.randomUUID();
        this.title = title;
        this.description = description;
        this.categoryId = categoryId;
        this.thumbnailUrl = thumbnailUrl;
        this.bannerUrl = bannerUrl;
        this.masterManifestUrl = masterManifestUrl;
        this.durationSeconds = durationSeconds;
        this.releaseYear = releaseYear;
        this.rating = rating;
        this.ageRating = ageRating;
        this.viewCount = viewCount;
        this.availableQualities = availableQualities != null ? availableQualities : Collections.emptyList();
        this.createdAt = createdAt != null ? createdAt : Instant.now();
    }

    public void incrementViewCount() {
        this.viewCount++;
    }

    // Getters
    public UUID getId() { return id; }
    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public UUID getCategoryId() { return categoryId; }
    public String getThumbnailUrl() { return thumbnailUrl; }
    public String getBannerUrl() { return bannerUrl; }
    public String getMasterManifestUrl() { return masterManifestUrl; }
    public int getDurationSeconds() { return durationSeconds; }
    public int getReleaseYear() { return releaseYear; }
    public double getRating() { return rating; }
    public String getAgeRating() { return ageRating; }
    public long getViewCount() { return viewCount; }
    public List<String> getAvailableQualities() { return availableQualities; }
    public Instant getCreatedAt() { return createdAt; }
}
