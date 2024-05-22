package com.distributedApplications.Musify.service;

import com.distributedApplications.Musify.entity.Artist;
import com.distributedApplications.Musify.repository.ArtistRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ArtistService {
    @Autowired
    private ArtistRepository artistRepository;

    public List<Artist> getAllArtists() {
        return artistRepository.findAll();
    }

    public Artist getArtistById(int id) {
        return artistRepository.findById(id);
    }

    public Artist getByName(String name) {
        return artistRepository.findByName(name);
    }

    @Transactional
    public void createArtist(Artist artist) {
        artistRepository.save(artist);
    }

    @Transactional
    public void updateArtist(Artist artistDetails) {
        Artist artist = getArtistById(artistDetails.getId());
        artist.setName(artistDetails.getName());
        artist.setCountry(artistDetails.getCountry());
        artist.setBirthDate(artistDetails.getBirthDate());
        updateArtistCollections(artist, artistDetails);
        artistRepository.save(artist);
    }

    @Transactional
    public void deleteArtist(int id) {
        Artist artist = getArtistById(id);
        artistRepository.delete(artist);
    }

    private void updateArtistCollections(Artist artist, Artist artistDetails) {
        artist.getSongs().clear();
        artist.getSongs().addAll(artistDetails.getSongs());
        artist.getAlbums().clear();
        artist.getAlbums().addAll(artistDetails.getAlbums());
    }
}