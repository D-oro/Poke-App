import { useState, useEffect } from 'react';
import './App.css';
import NavBar from './components/NavBar';

const App = () => {
  const [pokemon, setPokemon] = useState([]);

  const fetchPokemon = async () => {
    const data = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10&offset=0');
    const pokemon = await data.json();
    pokemon.results.forEach(async (pokemon) => {
      const data = await fetch(pokemon.url);
      const pokemonData = await data.json();
      setPokemon((currentPokemon) => [...currentPokemon, pokemonData]);
    });
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  return (
    <div className="h-full bg-[#AFE2E9]">
      <NavBar />
      <ul className="grid grid-cols-6 mx-10">
        {pokemon.map((pok) => (
          <div key={pok.name} className="mx-5 my-5 bg-[#217394] bg-opacity-50 backdrop-blur-sm rounded">
            {/* {fetchSpecies(pok.url)} */}
            <li className="shadow-md px-5 text-center">
              <img className="w-32 mx-auto" src={pok.sprites.front_default} alt={pok.name} />
              <p className="text-white font-bold text-xl">{pok.name.substring(0, 1).toUpperCase() + pok.name.substring(1)}</p>
              <p className="my-5">Abilities</p>
              <ul className="flex justify-center mb-2">
                {pok.abilities.map((ability) => (
                  <li className="mx-2 rounded-md px-2 py-1 bg-gradient-to-r  from-[#E4504E] via-[#dc7d7b] to-[#eaa2a1] bg-opacity-75 text-white" key={ability.ability.name}>{ability.ability.name}</li>
                ))}
              </ul>
            </li>
          </div>
        ))}
      </ul>

    </div>
  );
};

export default App;
