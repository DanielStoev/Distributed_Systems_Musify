package com.distributedApplications.Musify.repository;

import com.distributedApplications.Musify.entity.Album;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AlbumRepository extends JpaRepository<Album, Integer> {

    Album findByTitle(String name);

    Album findById(int albumId);

    List<Album> findByArtistName(String name);
}