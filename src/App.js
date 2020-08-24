import React, { useState } from "react";

import useTypes from './hooks/useTypes';
import usePokemon from './hooks/usePokemon';
import Pagination from './Pagination';
import Types from './Types';
import PokemonList from './PokemonList';

import "./styles.css";

function App() {
  const [offset, setOffset] = useState(0);
  const [activeType, setActiveType] = useState('');

  const types = useTypes();
  const pokemon = usePokemon();
 
  const getOffsetPokemon = (activePokemon) => activePokemon.slice(offset, offset + 9);
  
  const getPokemonToDisplay = () => {
    if (!activeType) return getOffsetPokemon(pokemon);

    const activePokemon =  types.find(({ name }) => name === activeType).pokemon;
    const activePokemonNames = activePokemon.map(({pokemon}) => pokemon.name);
    const activePokemonSubset = pokemon.filter(({name}) => activePokemonNames.includes(name))
    const offsetPokemon = getOffsetPokemon(activePokemonSubset);
    return offsetPokemon;
  }

  const onClickPrev = () => {
    setOffset(offset - 9);
  };

  const onClickNext = () => {
    setOffset(offset + 9);
  };

  const onClickReset = () => {
    setOffset(0);
    setActiveType('');
  };

  const onFilterType = (type) => {
    setOffset(0);
    setActiveType(type);
  };

  return (
    <div className="App">
      <Types
        types={types}
        activeType={activeType}
        onFilterType={onFilterType}
      />
      <PokemonList pokemon={getPokemonToDisplay()} />
      <Pagination 
        offset={offset}
        onClickNext={onClickNext}
        onClickPrev={onClickPrev}
        onClickReset={onClickReset}
      />
    </div>
  );
}

export default App;
