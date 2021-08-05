package io.javabrains.movieinfoservice;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;

@Component
class MovieModelAssembler implements RepresentationModelAssembler<Movie, EntityModel<Movie>> {

  @Override
  public EntityModel<Movie> toModel(Movie movie) {
    return EntityModel.of(movie,
        linkTo(methodOn(MovieResource.class).getMovie(movie.getId())).withSelfRel(),
        linkTo(methodOn(MovieResource.class).getAllMovies()).withRel("movies"));
  }
}