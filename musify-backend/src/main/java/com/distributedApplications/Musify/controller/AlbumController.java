package com.distributedApplications.Musify.controller;

import com.distributedApplications.Musify.entity.Album;
import com.distributedApplications.Musify.service.AlbumService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/albums")
@CrossOrigin(origins = "http://localhost:4200")
public class AlbumController {
    @Autowired
    private AlbumService albumService;

    @GetMapping
    public List<Album> getAllAlbums() {
        return albumService.getAllAlbums();
    }

    @GetMapping("/{id}")
    public Album getAlbumById(@PathVariable int id) {
        return albumService.getAlbumById(id);
    }

    @GetMapping("/{title}")
    public Album getAlbumsByTitle(@PathVariable String title) {
        return albumService.getAlbumByTitle(title);
    }

    @PostMapping
    public void addAlbum(@RequestBody Album album) {
        albumService.createAlbum(album);
    }

    @PutMapping
    public void updateAlbum(@RequestBody Album album) {
        albumService.updateAlbum(album);
    }

    @DeleteMapping("/{id}")
    public void deleteAlbum(@PathVariable int id) {
        albumService.deleteAlbum(id);
    }
}
