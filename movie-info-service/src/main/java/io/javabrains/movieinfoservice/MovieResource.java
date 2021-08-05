package io.javabrains.movieinfoservice;

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

@RestController
@RequestMapping("/movies")
public class MovieResource {
    
    private final MovieRepository repository;
    private final MovieModelAssembler assembler;

    public MovieResource(MovieRepository repository, MovieModelAssembler assembler) {
        this.repository = repository;
        this.assembler = assembler;
    }

    @GetMapping("")
    public CollectionModel<EntityModel<Movie>> getAllMovies() {
        List<EntityModel<Movie>> movies = repository.findAll().stream() //
            .map(assembler::toModel)
            .collect(Collectors.toList());
    
        return CollectionModel.of(movies, linkTo(methodOn(MovieResource.class).getAllMovies()).withSelfRel());
    }

    @PostMapping("")
    public ResponseEntity<?> createNewMovie(@RequestBody Movie newMovie) {
        EntityModel<Movie> entityModel = assembler.toModel(repository.save(newMovie));

        return ResponseEntity
            .created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri())
            .body(entityModel);
    }

    @GetMapping("/{id}")
    public EntityModel<Movie> getMovie(@PathVariable("id") int id) {
        Movie movie = repository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cannot find movie with id: " + id));

        return assembler.toModel(movie);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> replaceMovie(@RequestBody Movie newMovie, @PathVariable int id) {
        Movie updatedMovie = repository.findById(id)
            .map(movie -> {
                movie.setName(newMovie.getName());
                movie.setDescription(newMovie.getDescription());
                return repository.save(movie);
            })
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cannot find movie with id: " + id));

        EntityModel<Movie> entityModel = assembler.toModel(updatedMovie);

        return ResponseEntity
            .created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri())
            .body(entityModel);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMovie(@PathVariable("id") int id) {
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
