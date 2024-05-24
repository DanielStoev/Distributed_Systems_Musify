package com.distributedApplications.Musify.service;

import com.distributedApplications.Musify.entity.Album;
import com.distributedApplications.Musify.repository.AlbumRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AlbumService {
    @Autowired
    private AlbumRepository albumRepository;

    public List<Album> getAllAlbums() {
        return albumRepository.findAll();
    }

    public Album getAlbumById(int id) {
        return albumRepository.findById(id);
    }

    public Album getAlbumByTitle(String title) {
        return albumRepository.findByTitle(title);
    }

    @Transactional
    public void createAlbum(Album album) {
        albumRepository.save(album);
    }

    @Transactional
    public void updateAlbum(Album albumDetails) {
        Album album = getAlbumById(albumDetails.getId());
        if (album != null) {
            album.setTitle(albumDetails.getTitle());
            album.setNumberOfSongs(albumDetails.getNumberOfSongs());
            album.setReleaseDate(albumDetails.getReleaseDate());
            album.setArtist(albumDetails.getArtist());
            album.setSongs(albumDetails.getSongs() != null ? albumDetails.getSongs() : album.getSongs());
            albumRepository.save(album);
        }
    }

    @Transactional
    public void deleteAlbum(int id) {
        Album album = getAlbumById(id);
        if (album != null) {
            albumRepository.delete(album);
        }
    }
}
