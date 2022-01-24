package io.javabrains.ratingsdataservice;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.IanaLinkRelations;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
@RestController
@RequestMapping("/ratings")
public class RatingsDataResource {

    private final UserRatingRepository repository;
    private final UserRatingModelAssembler assembler;

    public RatingsDataResource(UserRatingRepository repository, UserRatingModelAssembler assembler) {
        this.repository = repository;
        this.assembler = assembler;
    }

    // Get all ratings
    @GetMapping("")
    public CollectionModel<EntityModel<UserRating>> getAllRatings() {
        List<EntityModel<UserRating>> ratings = repository.findAll().stream()
            .map(assembler::toModel)
            .collect(Collectors.toList());

        return CollectionModel.of(ratings, linkTo(methodOn(RatingsDataResource.class).getAllRatings()).withSelfRel());
    }

    // Create rating
    @PostMapping(path= "", consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> createNewRating(@RequestBody UserRating newRating) {
        EntityModel<UserRating> entityModel = assembler.toModel(repository.save(newRating));

        return ResponseEntity
            .created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri())
            .body(entityModel);
    }

    // Get a single rating by id
    @GetMapping("/{id}")
    public EntityModel<UserRating> getRating(@PathVariable("id") int id) {
        UserRating rating = repository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cannot find rating with id: " + id));

        return assembler.toModel(rating);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> replaceRating(@RequestBody UserRating newRating, @PathVariable("id") int id) {
        UserRating updatedRating = repository.findById(id)
            .map(rating -> {
                rating.setRating(newRating.getRating());
                return repository.save(rating);
            })
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cannot find rating with id: " + id));

        EntityModel<UserRating> entityModel = assembler.toModel(updatedRating);

        return ResponseEntity
            .created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri())
            .body(entityModel);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteRating(@PathVariable("id") int id) {
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // Get all ratings by user id
    @GetMapping("/users/{userId}")
    public CollectionModel<EntityModel<UserRating>> getRatingsByUserId(@PathVariable("userId") int userId) {
        List<EntityModel<UserRating>> ratings = repository.findByUserId(userId).stream()
            .map(assembler::toModel)
            .collect(Collectors.toList());

        return CollectionModel.of(ratings, linkTo(methodOn(RatingsDataResource.class).getRatingsByUserId(userId)).withSelfRel());
    }

    // Get all ratings by movie id
    @GetMapping("/movies/{movieId}")
    public CollectionModel<EntityModel<UserRating>> getRatingsByMovieId(@PathVariable("movieId") int movieId) {
        List<EntityModel<UserRating>> ratings = repository.findByMovieId(movieId).stream()
            .map(assembler::toModel)
            .collect(Collectors.toList());

        return CollectionModel.of(ratings, linkTo(methodOn(RatingsDataResource.class).getRatingsByMovieId(movieId)).withSelfRel());
    }

}
