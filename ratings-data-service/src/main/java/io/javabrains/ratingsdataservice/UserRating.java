package io.javabrains.ratingsdataservice;

import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.GenerationType;
import javax.persistence.GeneratedValue;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import org.springframework.hateoas.server.core.Relation;

@Relation(collectionRelation="data")
@Entity
@Table(name="USER_RATINGS")
public class UserRating {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="ID")
    private int id;

    @Column(name="USER_ID")
    private int userId;

    @Column(name="MOVIE_ID")
    private int movieId;

    @Column(name="RATING")
    private int rating;

    public UserRating() {

    }
    
    public UserRating(int id, int userId, int movieId, int rating) {
        setId(id);
        setUserId(userId);
        setMovieId(movieId);
        setRating(rating);
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getMovieId() {
        return movieId;
    }
    
    public void setMovieId(int movieId) {
        this.movieId = movieId;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }  
    
}
