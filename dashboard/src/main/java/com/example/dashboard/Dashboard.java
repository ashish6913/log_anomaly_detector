package com.example.dashboard;

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
@Table(name="PREDICTED_NORMAL_1")
public class Dashboard {

    @Id
    // @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="spanId")
    private String id;

    @Column(name="userId")
    private String userId;

    @Column(name="movieId")
    private String movieId;

    @Column(name="comment")
    private String comment;
    
    @Column(name="status")
    private String status;
    
    @Column(name="comment_date")
    private String commentDate;

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return this.userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getMovieId() {
        return this.movieId;
    }

    public void setMovieId(String movieId) {
        this.movieId = movieId;
    }

    public String getComment() {
        return this.comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getCommentDate() {
        return this.commentDate;
    }

    public void setCommentDate(String commentDate) {
        this.commentDate = commentDate;
    }

    public Dashboard() {

    }
    
    public Dashboard(String id, String userId, String movieId, String comment, String status, String commentDate ) {
      setCommentDate(commentDate);
      setStatus(status);
      setComment(comment);
      setMovieId(movieId);
      setUserId(userId);
      setId(id);
    }
}

   