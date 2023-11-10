import { useState , useEffect } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css';
import Films from './components/Films';
import FilmsDetail from './components/FilmsDetail';

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
function App() {

  const [filmDetailSelected, setFilmDetailSelected] = useState<ItemFilm[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [films, setFilms] = useState<ItemFilm[]>([])

  const UpdateFilmSelected = (newFilmArray: ItemFilm[]) => {
    setFilmDetailSelected(newFilmArray)
  }

  useEffect(() => {
    setIsLoading(true)
    fetch('https://swapi.dev/api/films/?format=json')
    .then((response) => {
      if (!response.ok) {
        throw new Error('La respuesta de la red no fue satisfactoria');
      }
      return response.json();
    })
    .then((data) => {
      // Use the data in your application
      setFilms(data.results)
    })
    .catch((error) => {
      // Handle errors here
      console.error('Hubo un problema en el fetch:', error);
    }).finally(() => {
      setIsLoading(false)
    })

  }, [])
  return (
    <section style={{alignItems: 'center'}}>
    
      
      
      <div className="container">
      <h1>Films</h1>
      {!isLoading?
        <div className='row'>
          <div className='col-sm-4'>
            <Films 
              films={films}  
              UpdateFilmSelected={UpdateFilmSelected}

            />
          </div>
          <div className='col-sm-8'>
            {filmDetailSelected.length > 0 && (
              <FilmsDetail filmDetailSelected={filmDetailSelected}/>
            )}
            
          </div>
        </div>
        : <div className='d-flex justify-content-center'>
            <div className="spinner-border mt-3" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>}
      </div>
      
    </section>
  )
}

export default App
