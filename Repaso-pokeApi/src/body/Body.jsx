import CardList from "./CardList"
import "./Body.css"
import { useEffect, useState } from "react"

const Body = () => {
  const [pokemonData, setpokemonData] = useState([])
  const [offset, setoffset] = useState(0)
  const [loading, setLoading] = useState(true);
  const limit = 7;


  useEffect(() => {

    const fetchPokemonData = async () => {
      //https://pokeapi.co/api/v2/pokemon?limit=3&offset=0
      //`https://pokeapi.co/api/v2/pokemon/1/`
      const pokemonFirtData = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (!pokemonFirtData.ok){
        throw new Error('No se pudo obtener la data');
      }
      const resultPokemonFirstData = await pokemonFirtData.json();
      try {
        const requests = resultPokemonFirstData.results.map((item) => fetch(item.url));
        const responses = await Promise.all(requests);
        const pokemonDetailData = await Promise.all(responses.map(res => res.json()));
        
        const pokemonDataModified = resultPokemonFirstData.results.map((item)=>{
          // Utilizando expresión regular para extraer el número
          const match = item.url.match(/\/(\d+)\/$/);
          // Verificando si se encontró una coincidencia
          const id = match ? [1] : null;
          const detail = pokemonDetailData.find((item2) => item2.id = id);
          return {...item, detail}
        })
        setpokemonData(pokemonDataModified)
      } catch (error) {
        console.error("Hubo un error al obtener el detalle de pokemones :c");
      } finally{
        setLoading(false)
      }

    }
    fetchPokemonData()
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  if (loading){
    return <p style={{color:"red"}}>Cargando.......</p>
  }
  return (
    <main>
      <section className="container">
        <h2>Lista de pokemones</h2>
        <CardList 
          pokemonData={pokemonData}
        />
      </section>
    </main>
  )
}

export default Body
