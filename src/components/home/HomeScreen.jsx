import React from 'react'
import InputHome from './InputHome'

const HomeScreen = () => {
  return (
    <div className='home-header'>
        <h1> PokeDex </h1>
        <h2>¡Hola Entrenador!</h2>
        <InputHome />
    </div>
  )
}

export default HomeScreen