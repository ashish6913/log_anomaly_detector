package io.javabrains.movieinfoservice;

import org.springframework.data.jpa.repository.JpaRepository;

interface MovieRepository extends JpaRepository<Movie, Integer> {

}