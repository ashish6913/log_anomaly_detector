package models;

// import java.util.List;

public class UserRating {
    // private List<Rating> userrating;

    // public List<Rating> getUserrating() {
    //     return userrating;
    // }

    // public void setUserrating(List<Rating> userrating) {
    //     this.userrating = userrating;
    // }


    private int id;
    private int userId;
    private int movieId;
    private int rating;

    public UserRating() {

    }
    
    public UserRating(int id, int userId, int movieId, int rating) {
        setId(id);
        setUserId(userId);
        setMovieId(movieId);
        setRating(rating);
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getMovieId() {
        return movieId;
    }
    
    public void setMovieId(int movieId) {
        this.movieId = movieId;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }  

}
