export class Rating {
    public id: number = 0;
    public userId: number = 0;
    public movieId: number = 0;
    public rating: String = '';

    Constructor(id: number, userId: number, movieId: number, rating: String){
        this.id = id;
        this.userId=userId;
        this.movieId=movieId;
        this.rating=rating;
    }
}
