package io.javabrains.ratingsdataservice;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;

@Component
class UserRatingModelAssembler implements RepresentationModelAssembler<UserRating, EntityModel<UserRating>> {

  @Override
  public EntityModel<UserRating> toModel(UserRating rating) {
    return EntityModel.of(rating,
        linkTo(methodOn(RatingsDataResource.class).getRating(rating.getId())).withSelfRel(),
        linkTo(methodOn(RatingsDataResource.class).getAllRatings()).withRel("ratings"));
  }
}