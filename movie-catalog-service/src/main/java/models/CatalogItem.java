package models;

import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.core.Relation;

@Relation(collectionRelation="data")
public class CatalogItem {

    private int id;
    private EntityModel<Movie> movie;
    private EntityModel<UserRating> rating;

    public CatalogItem() {

    }

    public CatalogItem(int id, EntityModel<Movie> movie, EntityModel<UserRating> rating) {
        setId(id);
        setMovie(movie);
        setRating(rating);
    }

    public EntityModel<Movie> getMovie() {
        return movie;
    }

    public void setMovie(EntityModel<Movie> movie) {
        this.movie = movie;
    }

    public EntityModel<UserRating> getRating() {
        return rating;
    }

    public void setRating(EntityModel<UserRating> rating) {
        this.rating = rating;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}
