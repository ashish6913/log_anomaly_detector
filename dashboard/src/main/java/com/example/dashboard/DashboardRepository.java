package com.example.dashboard;
import javax.persistence.*;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.Query;

interface DashboardRepository extends JpaRepository<Dashboard, String> {
    List<Dashboard> findByUserId(String userId);
    List<Dashboard> findByMovieId(String movieId);
    List<Dashboard> findByCommentDate(String commentDate);
    @Query(value = "SELECT * FROM predicted_normal_1 WHERE comment_date = :commentDate", nativeQuery = true)
    List<Dashboard> findDataByDate(@Param("commentDate") String commentDate);
}