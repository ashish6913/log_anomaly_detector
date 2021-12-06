package com.example.dashboard;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;

@Component
class DashboardModelAssembler implements RepresentationModelAssembler<Dashboard, EntityModel<Dashboard>> {

  @Override
  public EntityModel<Dashboard> toModel(Dashboard dashboard) {
    return EntityModel.of(dashboard
        // linkTo(methodOn(DashboardResource.class).getRating(rating.getId())).withSelfRel(),
        // linkTo(methodOn(DashboardResource.class).getAllRatings()).withRel("ratings"));
    );
  }
}