package com.distributedApplications.Musify.service;

import com.distributedApplications.Musify.converter.ArtistConverter;
import com.distributedApplications.Musify.dto.ArtistDTO;
import com.distributedApplications.Musify.entity.Artist;
import com.distributedApplications.Musify.repository.ArtistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ArtistService {

    @Autowired
    private ArtistRepository artistRepository;

    @Autowired
    private ArtistConverter artistConverter;

    public List<ArtistDTO> getAllArtists() {
        return artistRepository.findAll().stream()
                .map(artistConverter::convertToDTO)
                .collect(Collectors.toList());
    }

    public ArtistDTO createArtist(ArtistDTO artistDTO) {
        Artist artist = artistConverter.convertToEntity(artistDTO);
        artist = artistRepository.save(artist);
        return artistConverter.convertToDTO(artist);
    }

    public ArtistDTO updateArtist(Long id, ArtistDTO artistDTO) {
        Optional<Artist> artist = artistRepository.findById(id);
        Artist artistEntity = new Artist();

        if (artist.isPresent()) {
            artistEntity.setName(artistDTO.getName());
            artistEntity.setCountry(artistDTO.getCountry());
            artistEntity.setBirthDate(artistDTO.getBirthDate());
            artistEntity = artistRepository.save(artistEntity);
        }

        return artistConverter.convertToDTO(artistEntity);
    }

    public void deleteArtist(Long id) {
        artistRepository.deleteById(id);
    }
}