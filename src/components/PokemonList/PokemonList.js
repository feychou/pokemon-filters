import React from "react";

import './styles.css'

const PokemonList = ({pokemon}) => (
  <div className="PokemonWrapper">
    {pokemon.map(({ name }, index) => (
      <div className="Pokemon" key={index}>
        <img
          alt={name}
          src={`https://img.pokemondb.net/sprites/x-y/normal/${name}.png`}
          width={120}
        />
        <div className="PokemonName">{name}</div>
      </div>
    ))}
  </div>
);

export default PokemonList;