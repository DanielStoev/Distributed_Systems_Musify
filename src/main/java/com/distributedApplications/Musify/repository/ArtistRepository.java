package com.distributedApplications.Musify.repository;

import com.distributedApplications.Musify.entity.Artist;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArtistRepository extends JpaRepository<Artist, Integer> {

    Artist findById(int id);

    Artist findByName(String name);
}