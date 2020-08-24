import { useEffect, useState } from "react";
import axios from "axios";

function usePokemon(activeType, offset, types) {
  const [pokemon, setPokemon] = useState([]);
  const [activePokemon, setActivePokemon] = useState([]);

  const loadPokemon = () => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=721`)
      .then((response) => setPokemon(response.data.results))
      .catch((error) => {
        console.log("Request failed");
      });
  };

  const getOffsetPokemon = (activePokemon) => activePokemon.slice(offset, offset + 9);
  
  const getPokemonToDisplay = () => {
    if (!activeType) {
      setActivePokemon(getOffsetPokemon(pokemon))
      return
    }

    const activePokemon =  types.find(({ name }) => name === activeType).pokemon;
    const activePokemonNames = activePokemon.map(({pokemon}) => pokemon.name);
    const activePokemonSubset = pokemon.filter(({name}) => activePokemonNames.includes(name))
    setActivePokemon(getOffsetPokemon(activePokemonSubset));
  }

  useEffect(loadPokemon, []);
  useEffect(getPokemonToDisplay, [pokemon, activeType, offset])

  return activePokemon;
}

export default usePokemon;