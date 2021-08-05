package lad.comments;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
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
@RequestMapping("/movie/{movieId}/comments")
public class CommentsResource {

    private final CommentRepository repository;
    private final CommentModelAssembler assembler;

    public CommentsResource(CommentRepository repository,CommentModelAssembler assembler) {
        this.repository = repository;
        this.assembler = assembler;
        
    }

    @GetMapping("")
    public CollectionModel<EntityModel<Comment>> getCommentsByMovieId(@PathVariable("movieId") int movieId) {
        List<EntityModel<Comment>> comments = repository.findByMovieId(movieId).stream()
            .map(assembler::toModel)
            .collect(Collectors.toList());

        return CollectionModel.of(comments, linkTo(methodOn(CommentsResource.class).getCommentsByMovieId(movieId)).withSelfRel());
    }

    @GetMapping("/users/{userId}")
    public CollectionModel<EntityModel<Comment>> getCommentsByUserId(@PathVariable("userId") int userId) {
        List<EntityModel<Comment>> comments = repository.findByUserId(userId).stream()
            .map(assembler::toModel)
            .collect(Collectors.toList());

        return CollectionModel.of(comments, linkTo(methodOn(CommentsResource.class).getCommentsByUserId(userId)).withSelfRel());
    }

    
    @PostMapping("")
    public ResponseEntity<?> createNewComment(@PathVariable("movieId") int movieId, @RequestBody Comment newComment) {
        EntityModel<Comment> entityModel = assembler.toModel(repository.save(newComment));

        return ResponseEntity
            .created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri())
            .body(entityModel);

    }

    @PutMapping("/{id}")
    public ResponseEntity<?> replaceComment(@RequestBody Comment newComment, @PathVariable("id") int id) {
        Comment updatedComment = repository.findById(id)
            .map(comment -> {
                comment.setDescription(newComment.getDescription());
                return repository.save(comment);
            })
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cannot find comment with id: " + id));

        EntityModel<Comment> entityModel = assembler.toModel(updatedComment);

        return ResponseEntity
            .created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri())
            .body(entityModel);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteComment(@PathVariable("id") int id) {
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
