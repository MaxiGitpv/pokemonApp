import React, { useEffect, useState, } from 'react'
import axios from 'axios'
import { useNavigate} from 'react-router-dom'

const PokeCard = ({url}) => {

const [pokemon, setPokemon] = useState()

useEffect(() => {
    axios.get(url)
    .then(res => setPokemon(res.data))
    .catch(err => console.log(err))
    
}, [])

const navigate = useNavigate()

const clickCard = () => navigate(`/pokedex/${pokemon.id}`)
  return (
    <article onClick={clickCard}>
      <div className='card-pokemon'>
        <div  className='card'>
          <img src={pokemon?.sprites.other
          ['official-artwork'].front_default} alt="" />
          <h3 className='namepokemon'>{pokemon?.name} </h3>
          
          <div className='caja'><hr />
            <ul className='abilities'>
              <div className='abilities1'>
                <li><span>Type: </span> {pokemon?.types[0].type.name}</li>
                <li><span>Stats: </span>{pokemon?.stats[0].base_stat}</li>
              </div>
              <div className='abilities2'>
                <li><span>Number: </span>{pokemon?.id}</li>
                <li><span>Heigth: </span>{pokemon?.height}</li>
              </div>
            </ul>
          </div>
        </div>
      </div> 
    </article>
  )
}

export default PokeCard