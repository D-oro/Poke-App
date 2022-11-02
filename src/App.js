import { useState, useEffect } from 'react';
import './App.css';
import { NavBar } from './components/NavBar';

const App = ()=> {

  const [pokemon, setPokemon] = useState([])

  useEffect (() =>{
    fetchPokemon();
  })

  const fetchPokemon = async () => {
    for (let i = 1; i < 10; i++) {
      const response = await fetch(`https://pokeapi.co/v2/pokemon/1`
      , {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      });

    const data = await response.json();
    console.log(data);
   }
  };

  return (
    <div>
      <NavBar/>

      <ul>
      {pokemon.map((pok) => (
      <div>
        <img src={pok.sprites.front_default}/>
        <li>{pok.name}</li>
      </div>
      ))}
      </ul>

    </div>
  );

}

export default App;
