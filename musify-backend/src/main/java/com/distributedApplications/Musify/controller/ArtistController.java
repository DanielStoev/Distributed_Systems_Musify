package com.distributedApplications.Musify.controller;

import com.distributedApplications.Musify.entity.Artist;
import com.distributedApplications.Musify.service.ArtistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/artists")
public class ArtistController {
    @Autowired
    private ArtistService artistService;

    @GetMapping
    public List<Artist> getAllArtists() {
       return artistService.getAllArtists();
    }

    @GetMapping("/{id}")
    public Artist getArtistById(@PathVariable int id) {
        return artistService.getArtistById(id);
    }

    @GetMapping("/{name}")
    public Artist getArtistByName(@PathVariable String name) {
        return artistService.getByName(name);
    }

    @PostMapping
    public void addArtist(@RequestBody Artist artist) {
        artistService.createArtist(artist);
    }

    @PutMapping
    public void updateArtist(@RequestBody Artist artist) {
        artistService.updateArtist(artist);
    }

    @DeleteMapping("/{id}")
    public void deleteArtist(@PathVariable int id) {
        artistService.deleteArtist(id);
    }
}