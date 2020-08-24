import React, { useEffect, useState } from "react";
import classnames from "classnames";
import axios from "axios";

import "./styles.css";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [offset, setOffset] = useState(0);
  const [types, setTypes] = useState([]);

  const fetchTypeData = (typeUrl) => {
    axios.get(typeUrl).then((type) => {
      setTypes((prev) => {
        const filteredTypes = prev.filter(({ url }) => url !== typeUrl);
        const newTypes = [...filteredTypes, type.data];
        return newTypes;
      });
    });
  };

  const getAllTypes = () => {
    axios
      .get("https://pokeapi.co/api/v2/type")
      .then((response) => response.data.results)
      .then((resTypes) =>
        resTypes
          .filter(({ name }) => name !== "shadow")
          .forEach(({ url }) => fetchTypeData(url))
      )
      .catch((error) => {
        console.log("Request failed");
      });
  };

  console.log(types);

  const loadPokemon = () => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=9&offset=${offset}`)
      .then((response) => setPokemon(response.data.results))
      .catch((error) => {
        console.log("Request failed");
      });
  };

  useEffect(getAllTypes, []);
  useEffect(loadPokemon, [offset]);

  const onClickPrev = () => {
    setOffset(offset - 9);
  };

  const onClickNext = () => {
    setOffset(offset + 9);
  };

  return (
    <div className="App">
      <div className="TypesContainer">
        {types.map(({ name }, index) => (
          <span
            key={name}
            className={classnames("TypeContainer", `TypeContainer--${name}`)}
          >
            <span className="TypeName">{name}</span>
          </span>
        ))}
      </div>
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
      <div className="Pagination">
        <button disabled={offset === 0} onClick={onClickPrev}>
          Prev
        </button>
        <button onClick={onClickNext} className="next">
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
