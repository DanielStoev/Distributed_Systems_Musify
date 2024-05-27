package com.distributedApplications.Musify.repository;

import com.distributedApplications.Musify.entity.Song;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SongRepository extends JpaRepository<Song, Long> {

    Song findByTitle(String name);

    List<Song> findByArtistName(String name);

    List<Song> findByAlbumTitle(String name);
}