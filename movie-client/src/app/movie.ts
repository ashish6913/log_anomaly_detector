import { Rating } from "./rating";

export class Movie {
    public id: number = 0;
    public name: String = '';
    public description: String = '';
    public rating: Rating = new Rating();
    public cover: String = '';

    Constructor(id: number, name: String, description: String, cover: String){
        this.id = id;
        this.name=name;
        this.description=description;
        this.cover=cover;
    }

}
