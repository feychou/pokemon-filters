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
  const activePokemon = usePokemon(activeType, offset, types);

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
      <PokemonList pokemon={activePokemon} />
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
