export class Comment {
    public id: number = 0;
    public userId: number = 0;
    public movieId: number = 0;
    public description: String = '';

    Constructor(id: number, userId: number, movieId: number, description: String){
        this.id = id;
        this.userId = userId;
        this.movieId = movieId;
        this.description = description;
    }
}
