import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const PokeInfoScreen = ({pokemons}) => {

  const [pokemonInfo, setPokemonInfo] = useState()
  
  const {id} = useParams()




  useEffect(() => {
    const URL = `https://pokeapi.co/api/v2/pokemon/${id}/`
    axios.get(URL)
     .then(res => setPokemonInfo(res.data))  
     .catch(err => console.log(err))
  }, [])



const navigates = useNavigate()

const clickCard2 = () => navigates('/pokedex')

  return (
    <div>
        <h1>Pokemon Info</h1>
        <button onClick={clickCard2} className="btn-card">Return</button>
        <div className='card-info'>
          <img src={pokemonInfo?.sprites.other['official-artwork'].
           front_default} alt="pokemon" />
          <h2>{pokemonInfo?.name}</h2>
          <ul className='descrption'>
            {
              pokemonInfo?.moves.map(move => (
                <li className='poke-info' key={move.move.url }> {move.move.name}</li>
              ))
            }
          </ul>

        </div>
    </div>
  )
}

export default PokeInfoScreen