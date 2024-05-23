package com.distributedApplications.Musify.service;

import com.distributedApplications.Musify.entity.Song;
import com.distributedApplications.Musify.repository.SongRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SongService {
    @Autowired
    private SongRepository songRepository;

    public List<Song> getAllSongs() {
        return songRepository.findAll();
    }

    public Song getSongById(int id) {
        return songRepository.findById(id).orElse(null);
    }

    public Song getSongByTitle(String title) {
        return songRepository.findByTitle(title);
    }

    @Transactional
    public void createSong(Song song) {
        songRepository.save(song);
    }

    @Transactional
    public void updateSong(Song songDetails) {
        Song song = getSongById(songDetails.getId());
        if (song != null) {
            song.setTitle(songDetails.getTitle());
            song.setDuration(songDetails.getDuration());
            song.setAlbum(songDetails.getAlbum());
            song.setArtist(songDetails.getArtist());
            song.setGenre(songDetails.getGenre());
            song.setReleaseDate(songDetails.getReleaseDate());
            songRepository.save(song);
        }
    }

    @Transactional
    public void deleteSong(int id) {
        Song song = getSongById(id);
        if (song != null) {
            songRepository.delete(song);
        }
    }
}
