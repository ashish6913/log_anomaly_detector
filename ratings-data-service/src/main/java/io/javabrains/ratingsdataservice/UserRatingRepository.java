package io.javabrains.ratingsdataservice;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

interface UserRatingRepository extends JpaRepository<UserRating, Integer> {
    List<UserRating> findByUserId(int userId);
    List<UserRating> findByMovieId(int movieId);
}