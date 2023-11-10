import { useEffect , useState} from "react"
import "./FilmsDetail.css"

interface propsFilmDetail{
  filmDetailSelected: ItemFilm[],
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
    url: string;
}

interface Characterdata{
  name: string;
  height: string;
  mass: string;
}
const FilmsDetail = (props: propsFilmDetail) => {


  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [characterData, setCharacterData] = useState<Characterdata[]>([]);
  const [messageError, setMessageError] = useState<string | null>(null);

  const changeDateFormat = (date : string): string => {
    let dateSplited:string[] = date.split("-");
    let dateSplitedopposite:string[] = [];
    let dateChanged:string = "";

    for (let i = dateSplited.length - 1; i >= 0; i-- ){
      dateSplitedopposite[dateSplited.length - 1 - i] = dateSplited[i];
    }
    dateChanged = dateSplitedopposite.join("-")
    return dateChanged;
  }
  useEffect(() => {

    const fetchAll = async () =>{
      try {
        setIsLoading(true);
        setMessageError(null)
        const responses = await Promise.all(props.filmDetailSelected[0].characters.map(url => fetch(url + "?format=json")));
        const data = await Promise.all(responses.map(response => response.json()));
        setCharacterData(data);
      } catch (error:any) {
        setMessageError(error);
      } finally{
        setIsLoading(false)
      }
      
    }
    if (props?.filmDetailSelected[0] || props?.filmDetailSelected[0]?.episode_id) fetchAll();
    

  }, [props.filmDetailSelected])

  if (messageError){
    return <div>{messageError}</div>;
  }

  if (isLoading){
    return <div className="d-flex justify-content-center">
      <div className="spinner-border mt-3 text-secondary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>;
  }
  return (
      <section>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{props?.filmDetailSelected[0]?.title}</h5>
              <h6 className="card-subtitle mb-2 text-body-secondary">{props?.filmDetailSelected[0]?.opening_crawl}</h6>
            </div>
            <ul className="list-group list-group-flush list-group-detail-film-parent">
              <li className="list-group-item">

                <b>Director: </b> {props?.filmDetailSelected[0]?.director}
              </li>
              <li className="list-group-item"><b>Producers: </b> {props?.filmDetailSelected[0]?.producer}</li>
              <li className="list-group-item"><b>Release date:</b> {changeDateFormat(props?.filmDetailSelected[0]?.release_date)}</li>
              <li className="list-group-item"><b>Characters({characterData.length}):</b>
                <div className="scrollable-container">
                  <ul className="list-group list-group-flush scroll-list">
                    {characterData?.map((item, id) => (
                      <li className="list-group-item" key={id}>{item.name} (est: {item.height}cm, peso: {item.mass} kg)</li>
                    ))}
                  </ul>
                </div>
                
              </li>
            </ul>
          </div>:
          
      </section>
  )
}

export default FilmsDetail
