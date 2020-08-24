import { useEffect, useState } from "react";
import axios from "axios";

function useTypes() {
  const [types, setTypes] = useState([]);


  const getAllTypes = () => {
    axios
      .get("https://pokeapi.co/api/v2/type")
      .then((response) => response.data.results)
      .then((resTypes) => {
        const realTypes = resTypes.filter(({ name }) => name !== "shadow" && name !== "unknown");
        const typePromises = realTypes.map(({ url }) =>  axios.get(url).then((type) => type.data ));
        Promise.all(typePromises).then(results => setTypes(results))
      })
      .catch((error) => {
        console.log("Request failed");
      });
  };

  useEffect(getAllTypes, []);

  return types;
}

export default useTypes;