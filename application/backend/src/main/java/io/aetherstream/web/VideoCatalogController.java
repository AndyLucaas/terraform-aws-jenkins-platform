package io.aetherstream.web;

import io.aetherstream.domain.model.Video;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

/**
 * REST Controller for Video Catalog & Adaptive HLS Streaming Endpoints
 */
@RestController
@RequestMapping("/api/v1/videos")
@CrossOrigin(origins = "*")
public class VideoCatalogController {

    @GetMapping
    public ResponseEntity<List<Video>> getCatalog() {
        Video sampleVideo = new Video(
            UUID.fromString("11111111-1111-1111-1111-111111111111"),
            "Cyberpulse: Beyond the Grid",
            "Une plongée captivante dans le futur du cloud mondial et des réseaux neuronaux auto-apprenants.",
            UUID.randomUUID(),
            "https://images.unsplash.com/photo-1518770660439-4636190af475",
            "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            596,
            2026,
            4.95,
            "16+",
            4820100L,
            List.of("240p", "480p", "720p", "1080p", "4K"),
            Instant.now()
        );
        return ResponseEntity.ok(List.of(sampleVideo));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Video> getVideoById(@PathVariable UUID id) {
        Video sampleVideo = new Video(
            id,
            "Cyberpulse: Beyond the Grid",
            "Masterclass streaming 4K avec transcodage ABR HLS",
            UUID.randomUUID(),
            "https://images.unsplash.com/photo-1518770660439-4636190af475",
            "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            596,
            2026,
            4.95,
            "16+",
            4820101L,
            List.of("240p", "480p", "720p", "1080p", "4K"),
            Instant.now()
        );
        return ResponseEntity.ok(sampleVideo);
    }
}
