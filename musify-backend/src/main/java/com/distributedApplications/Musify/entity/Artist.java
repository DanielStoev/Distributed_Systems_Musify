package com.distributedApplications.Musify.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
public class Artist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column
    @OneToMany
    private List<Song> songs;

    @Column
    @OneToMany
    private List<Album> albums;

    @Column(length = 50)
    private String country;

    @Column
    private Date birthDate;
}