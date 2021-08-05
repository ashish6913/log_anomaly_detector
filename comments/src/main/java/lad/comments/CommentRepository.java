package lad.comments;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

interface CommentRepository extends JpaRepository<Comment, Integer> {
    List<Comment> findByMovieId(int movieId);
    List<Comment> findByUserId(int userId);

}