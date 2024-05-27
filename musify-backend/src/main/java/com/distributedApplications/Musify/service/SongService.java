package com.distributedApplications.Musify.service;

import com.distributedApplications.Musify.converter.SongMapper;
import com.distributedApplications.Musify.dto.SongDTO;
import com.distributedApplications.Musify.entity.Song;
import com.distributedApplications.Musify.repository.AlbumRepository;
import com.distributedApplications.Musify.repository.ArtistRepository;
import com.distributedApplications.Musify.repository.SongRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SongService {

    @Autowired
    private SongRepository songRepository;

    @Autowired
    private AlbumRepository albumRepository;

    @Autowired
    private ArtistRepository artistRepository;

    @Autowired
    private SongMapper songMapper;

    public List<SongDTO> getAllSongs() {
        return songRepository.findAll().stream()
                .map(songMapper::convertToDTO)
                .collect(Collectors.toList());
    }

    public SongDTO createSong(SongDTO songDTO) {
        Song song = songMapper.convertToEntity(songDTO);
        song = songRepository.save(song);
        return songMapper.convertToDTO(song);
    }

    public SongDTO updateSong(Long id, SongDTO songDTO) {
        Optional<Song> song = songRepository.findById(id);
        Song songEntity = new Song();
        if (song.isPresent()) {
            songEntity.setId(songDTO.getId());
            songEntity.setTitle(songDTO.getTitle());
            songEntity.setDuration(songDTO.getDuration());
            songEntity.setGenre(songDTO.getGenre());
            songEntity.setReleaseDate(songDTO.getReleaseDate());
            songEntity.setArtist(artistRepository.findById(songDTO.getArtistId()).isPresent() ? artistRepository.findById(songDTO.getArtistId()).get() : null);
            songEntity.setAlbum(albumRepository.findById(songDTO.getAlbumId()).isPresent() ? albumRepository.findById(songDTO.getAlbumId()).get() : null);
            songEntity = songRepository.save(songEntity);
        }

        return songMapper.convertToDTO(songEntity);
    }

    public void deleteSong(Long id) {
        songRepository.deleteById(id);
    }
}
