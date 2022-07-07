import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Pagination from '../Pagination'
import Form from './Form'
import PokeCard from './PokeCard'

const PokedexScreen = () => {

    const nameUser = useSelector(state => state.nameUser)
    const [pokemons, setPokemons] = useState()
    const [pokeSearch, setPokeSearch] = useState()
    const [filterPokemon, setFilterPokemon] = useState()
    const [typeList, setTypeList] = useState()
    const [filterType, setFilterType] = useState()

    const [currentPage, setCurrentPage] = useState(1)

    let arrayPokemons = []
    const pokemonsPerPage = 6
    if (pokemons?.length < pokemonsPerPage ){
      arrayPokemons = [...pokemons]
    } else {
      const lastpokemon = currentPage * pokemonsPerPage
      arrayPokemons = pokemons?.slice(lastpokemon - pokemonsPerPage, lastpokemon)
    console.log(arrayPokemons)
    }

    let arrayPages = []
    let quantityPages = Math.ceil(pokemons?.length / pokemonsPerPage) // 8
    const pagesPerBlock = 5
    let currentBlock = Math.ceil(currentPage / pagesPerBlock)
    if (currentBlock * pagesPerBlock >= quantityPages) {
      for(let i = currentBlock * pagesPerBlock - pagesPerBlock + 1; i  <= quantityPages; i++){
        arrayPages.push(i)
      }
    } else {
        for( let i = currentBlock * pagesPerBlock - pagesPerBlock + 1;
        i <= currentBlock * pagesPerBlock; i++ ){
        arrayPages.push(i)
      }
    }


    useEffect(() => {
      const URL_POKEMONS = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=154'
        axios.get(URL_POKEMONS)
          .then(res => {
            console.log(res.data.results)
            setPokemons(res.data.results)
            })
          .catch(err => console.log(err))

      if(filterType === 'All Pokemons'){
        // Todos los pokemons
        axios.get(URL_POKEMONS)
          .then(res => {
            console.log(res.data.results)
            setPokemons(res.data.results)
            })
          .catch(err => console.log(err))
      } else {
        // Pokemons por tipos
        const URL = `https://pokeapi.co/api/v2/type/${filterType}/`
        axios.get(URL)
          .then(res => {
            console.log(res.data.pokemon)
            const array = res.data.pokemon.map(e => e.pokemon)
            setPokemons(array)
          })
          .catch(err => console.log(err))
      }
    }, [filterType])
    
    useEffect(() => {
      const URL = 'https://pokeapi.co/api/v2/type/'
      axios.get(URL)
      .then(res => setTypeList(res.data.results))
      .catch(err => console.log(err))
    }, [])


    useEffect(() => {
      if (pokemons){
      setFilterPokemon(pokemons.filter(e => e.name.includes(pokeSearch.toLowerCase())))
      }
    },[pokeSearch])


    return (
    <div>
            <div className='header'>
            <h1>Bienvenido {nameUser} a tu </h1>
              <img src="./src/img/logo.jfif" alt="" />
            </div>
          <Pagination 
          arrayPages={arrayPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          quantityPages={quantityPages}
          />
        
        
        <div className='cards'>
            <Form 
            setTypeList={setTypeList}
            setPokeSearch={setPokeSearch}
            typeList={typeList}
            setFilterType={setFilterType}
            />
          
          <div  className='app_header'>
          
              {
                filterPokemon?
                filterPokemon?.map(pokemon => (
                  <PokeCard 
                  key={pokemon.url}
                  url={pokemon.url}
                  />
                  ))
                  :
                  arrayPokemons?.map(pokemon => (
                    <PokeCard 
                    key={pokemon.url}
                    url={pokemon.url}
                    />
                    ))
                  } 
            </div>
            <Pagination 
              arrayPages={arrayPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              quantityPages={quantityPages}
            />
        </div>
    </div>
  )
}

export default PokedexScreen