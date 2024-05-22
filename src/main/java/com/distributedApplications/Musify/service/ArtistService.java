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

    public Artist findByName(String name) {
        return artistRepository.findByName(name);
    }

    @Transactional
    public Artist createArtist(Artist artist) {
        return artistRepository.save(artist);
    }

    @Transactional
    public Artist updateArtist(int id, Artist artistDetails) {
        Artist artist = getArtistById(id);
        artist.setName(artistDetails.getName());
        artist.setCountry(artistDetails.getCountry());
        artist.setBirthDate(artistDetails.getBirthDate());
        updateArtistCollections(artist, artistDetails);
        return artistRepository.save(artist);
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