package com.distributedApplications.Musify.controller;

import com.distributedApplications.Musify.entity.Song;
import com.distributedApplications.Musify.service.SongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/songs")
@CrossOrigin(origins = "http://localhost:4200")
public class SongController {
    @Autowired
    private SongService songService;

    @GetMapping
    public List<Song> getAllSongs() {
        return songService.getAllSongs();
    }

    @GetMapping("/{id}")
    public Song getSongById(@PathVariable int id) {
        return songService.getSongById(id);
    }

    @GetMapping("/{title}")
    public Song getSongsByTitle(@PathVariable String title) {
        return songService.getSongByTitle(title);
    }

    @PostMapping
    public void addSong(@RequestBody Song song) {
        songService.createSong(song);
    }

    @PutMapping
    public void updateSong(@RequestBody Song song) {
        songService.updateSong(song);
    }

    @DeleteMapping("/{id}")
    public void deleteSong(@PathVariable int id) {
        songService.deleteSong(id);
    }
}
