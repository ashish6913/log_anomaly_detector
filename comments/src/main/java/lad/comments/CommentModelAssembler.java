package lad.comments;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;

@Component
class CommentModelAssembler implements RepresentationModelAssembler<Comment, EntityModel<Comment>> {

  @Override
  public EntityModel<Comment> toModel(Comment comment) {
    return EntityModel.of(comment,
        linkTo(methodOn(CommentsResource.class).getCommentsByMovieId(comment.getMovieId())).withSelfRel());
  }
}