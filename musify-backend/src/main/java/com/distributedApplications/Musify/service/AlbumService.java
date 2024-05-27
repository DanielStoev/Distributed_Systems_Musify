package com.distributedApplications.Musify.service;

import com.distributedApplications.Musify.converter.AlbumConverter;
import com.distributedApplications.Musify.dto.AlbumDTO;
import com.distributedApplications.Musify.entity.Album;
import com.distributedApplications.Musify.repository.AlbumRepository;
import com.distributedApplications.Musify.repository.ArtistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AlbumService {

    @Autowired
    private AlbumRepository albumRepository;

    @Autowired
    private ArtistRepository artistRepository;

    @Autowired
    private AlbumConverter albumConverter;

    public List<AlbumDTO> getAllAlbums() {
        return albumRepository.findAll().stream()
                .map(albumConverter::convertToDTO)
                .collect(Collectors.toList());
    }

    public AlbumDTO createAlbum(AlbumDTO albumDTO) {
        Album album = albumConverter.convertToEntity(albumDTO);
        album = albumRepository.save(album);
        return albumConverter.convertToDTO(album);
    }

    public AlbumDTO updateAlbum(Long id, AlbumDTO albumDTO) {
        Optional<Album> album = albumRepository.findById(id);
        Album albumEntity = new Album();

        if (album.isPresent()) {
            albumEntity = album.get();
            albumEntity.setTitle(albumDTO.getTitle());
            albumEntity.setNumberOfSongs(albumDTO.getNumberOfSongs());
            albumEntity.setReleaseDate(albumDTO.getReleaseDate());
            albumEntity.setArtist(artistRepository.findById(albumDTO.getArtistId()).isPresent() ? artistRepository.findById(albumDTO.getArtistId()).get() : null);
            albumRepository.save(albumEntity);
        }

        return albumConverter.convertToDTO(albumEntity);
    }

    public void deleteAlbum(Long id) {
        albumRepository.deleteById(id);
    }
}