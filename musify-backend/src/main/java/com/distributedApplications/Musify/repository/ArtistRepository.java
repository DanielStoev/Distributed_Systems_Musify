package com.distributedApplications.Musify.repository;

import com.distributedApplications.Musify.entity.Artist;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArtistRepository extends JpaRepository<Artist, Long> {

    Artist findByName(String name);
}