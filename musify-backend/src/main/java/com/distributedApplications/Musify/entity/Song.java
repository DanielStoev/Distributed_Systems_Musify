package com.distributedApplications.Musify.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
public class Song {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column
    private String title;

    @Column
    private Double duration;

    @Column
    @ManyToOne
    private Artist artist;

    @Column(length = 50)
    private String genre;

    @Column
    private Date releaseDate;
}