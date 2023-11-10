import "./CardList.css"

const Card = ({pokemonData}) => {

  console.log(pokemonData)
  return (
    <div className="container-card">
      {pokemonData?.map((item) => 
      (<div className="card" key={item}>
        <h4>{item.name}</h4>
        <h3>Habilidades</h3>
        {item.detail.abilities.map((item2, index) => (
          <ul key={index}>
            <li>{item2.ability.name}</li>
            <li>{item2.ability.url}</li>
          </ul>
        ))}
          
        
      </div>)
      )}
      
    </div>
  )
}

export default Card
