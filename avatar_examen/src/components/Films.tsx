import { useState } from "react";
import "./Films.css";

interface Childprops {
    films: ItemFilm[];
    UpdateFilmSelected: (value: ItemFilm[]) => void;
}
interface ItemFilm {
    episode_id: number;
    title: string;
    opening_crawl: string;
    director: string;
    producer: string;
    release_date: string;
    characters: Array<string>;
    planets: Array<string>;
    starships: Array<string>;
    vehicles: Array<string>;
    species: Array<string>;
    created: string;
    edited: string;
    url: string
}
const Films = (props: Childprops) => {

    const [filmIndexSelected, setFilmIndexSelected] = useState<number>(-1); 

    const setActive = (id: number, episode_id: number) =>{
      setFilmIndexSelected(id)
      props.films.forEach( (element) => {
        if (element.episode_id == episode_id){
          props.UpdateFilmSelected([element]);
        }
      })
    }
    
    
  return (

    <div className="list-group list-group-films">
      {props.films.map((item, id) =>(
        <li className={id == filmIndexSelected? "list-group-item active": "list-group-item"} 
        key={item.episode_id} onClick={() => setActive(id, item.episode_id)} >{item.title}</li>
      ))}
    </div>

  )
}

export default Films
