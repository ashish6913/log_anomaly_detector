package io.javabrains.moviecatalogservice;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.core.ParameterizedTypeReference;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.CollectionModel;

import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import models.CatalogItem;
import models.Movie;
import models.UserRating;

@RestController
@RequestMapping("/catalog")
public class MovieCatalogResource {

    @Autowired
    private RestTemplate restTemplate;

    @GetMapping("/{userId}")
    public CollectionModel<CatalogItem> getCatalog(@PathVariable("userId") String userId) {

        ResponseEntity<CollectionModel<EntityModel<UserRating>>> ratingsHttpResponse = restTemplate.exchange(
            "http://ratings-micro-54d5dcdcdb-vngm8/ratings/users/" + userId,
            HttpMethod.GET,
            null,
            new ParameterizedTypeReference<CollectionModel<EntityModel<UserRating>>>(){});

        Collection<EntityModel<UserRating>> ratingEntityModels = ratingsHttpResponse.getBody().getContent();

        List<CatalogItem> catalogItems = ratingEntityModels.stream()
            .map(ratingEntityModel -> {
                UserRating rating = ratingEntityModel.getContent();

                ResponseEntity<EntityModel<Movie>> movieHttpResponse = restTemplate.exchange(
                    "http://movie-info-service/movies/" + rating.getMovieId(),
                    HttpMethod.GET,
                    null,
                    new ParameterizedTypeReference<EntityModel<Movie>>(){});

                // Movie movie = movieHttpResponse.getBody().getContent();
                EntityModel<Movie> movieEntityModel = movieHttpResponse.getBody();
                Movie movie = movieEntityModel.getContent();

                return new CatalogItem(movie.getId(), movieEntityModel, ratingEntityModel);
                // return new CatalogItem(movie.getId(), movie.getName(), movie.getDescription(), rating.getRating());
            })
            .collect(Collectors.toList());

        return CollectionModel.of(catalogItems, linkTo(methodOn(MovieCatalogResource.class).getCatalog(userId)).withSelfRel());
    }
}
