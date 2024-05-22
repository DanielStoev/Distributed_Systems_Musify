package com.distributedApplications.Musify.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
public class Album {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column
    private String title;

    @Column
    private int numberOfSongs;

    @Column
    private Date releaseDate;

    @Column
    @ManyToOne
    private Artist artist;

    @Column
    @OneToMany
    private List<Song> songs;
}