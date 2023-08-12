import { useState } from 'react';
import PokemonCard from './PokemonCard';

let nextId = 0;
let url = 'https://pokeapi.co/api/v2/pokemon/';

export default function PokemonList() {
    /* variable definitions */
  const [name, setName] = useState('');
  const [pokemonList, setPokemonList] = useState([]);

  /* pokemon state and fetch */
  const heyStupid = async () => {
    setName('');
    const path = url + name;
    const response = await fetch(path);
    const pokemon = await response.json();
    const altText = "Image of " + pokemon.name;
    setPokemonList([...pokemonList, { id: pokemon.id, name: pokemon.name, image: pokemon.sprites.front_default,
      alt: altText, cardID: nextId++}]);
  }



  /* trying this again a dif way */
  const updateList = async (updateId, newName) => {
    console.log("update called");
    const path = url + newName;
    const response = await fetch(path);
    const newPokemon = await response.json();
    const newAltText = "Image of " + newPokemon.name;


    const newPokemonList = pokemonList.map(item => {
      if (item.cardID === updateId) {
        /* update the card data */
        const updatedItem = {
          ...item, id: newPokemon.id, name: newPokemon.name, image: newPokemon.sprites.front_default,
          alt: newAltText,
        };
        return updatedItem;
      } else {
        return item;
      }});
    setPokemonList(newPokemonList);


    //setPokemonList([...pokemonList, { id: pokemon.id, name: pokemon.name, image: pokemon.sprites.front_default,
      //alt: altText, cardID: nextId++}]);
    /* const newPokemonList = pokemonList.map(async item => {
      if (item.cardID === updateId) {
         perform fetch for new pokemon data
        const path = url + newName;
        const response = await fetch(path);
        const pokemon = await response.json();
        const newPokeName = pokemon.name;
        const altText = "Image of " + pokemon.name;
        console.log(altText);
        console.log(item.cardID);

         update the card data
        const updatedItem = {
          id: pokemon.id, name: pokemon.name, image: pokemon.sprites.front_default,
            alt: altText, cardID: item.cardID,
          ...item, id: pokemon.id, name: "YourMom", image: pokemon.sprites.front_default,
          alt: altText 
        };
        console.log(updatedItem.name);
        return updatedItem;
      }
        return item;
      });
    setPokemonList(newPokemonList); */
  }





  const updateList2 = (updateId, newName) => {
    console.log("update called");
    const newPokemonList = pokemonList.map(item => {
      if (item.cardID === updateId) {
        /* update the card data */
        const updatedItem = {
          ...item, name: "YourMom",
        };
        return updatedItem;
      } else {
        return item;
      }});
    setPokemonList(newPokemonList);
  }

  /* use state to update input value */
  const updateNameValue = (event) => {
    setName(event.target.value);
  }

  return (
    <>
    {/* Input for new pokemon cards */}
    <input value={name} onChange={updateNameValue} />
    <button onClick={heyStupid}>Add Pokemon</button>

    {/* List of pokemon cards */}
    <div id="pokemonListDiv">
      {pokemonList.map(item => (
        <PokemonCard key={nextId++} id={item.id} name={item.name} image={item.image}
          altText={item.alt} buttonClick={updateList} cardID={item.cardID}/>
      ))}
    </div>

    </>
  );
}