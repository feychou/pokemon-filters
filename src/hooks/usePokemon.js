import { useEffect, useState } from "react";
import axios from "axios";

function usePokemon() {
  const [pokemon, setPokemon] = useState([]);

  const loadPokemon = () => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=721`)
      .then((response) => setPokemon(response.data.results))
      .catch((error) => {
        console.log("Request failed");
      });
  };

  useEffect(loadPokemon, []);

  return pokemon;
}

export default usePokemon;