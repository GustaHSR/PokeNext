import { useState, useEffect } from 'react';
import searchstyles from '../styles/SearchBar.module.css';
import styles from '../styles/Home.module.css';
import Card from "@/components/Card";
import Image from "next/image";
import SearchBar from '../components/SearchBar'

export async function getStaticProps() {
  const maxPokemons = 5000;
  const api = 'https://pokeapi.co/api/v2/pokemon/';
  const res = await fetch(`${api}/?limit=${maxPokemons}`);
  const data = await res.json();

  data.results.forEach((item, index) => {
    item.id = index + 1;
  });

  return {
    props: {
      pokemons: data.results.slice(0, 151), // Limitando os primeiros 151 pokémons
      allPokemons: data.results // Mantendo uma lista de todos os pokémons
    },
  };
}

const handleSearch = (pokemons, input) => {
  let filteredPokemons = pokemons.filter(pokemon =>
    pokemon.name.toLowerCase().includes(input.toLowerCase()) || 
    pokemon.id.toString() === input
  );

  if (filteredPokemons.length > 0) {
    return (
      <div className={styles.pokemon_container}>
        {filteredPokemons.map((pokemon) => (
          <Card key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    );
  } else {
    return <h1 className={searchstyles.result}>Não foi possível encontrar esse Pokémon</h1>;
  }
};

export default function Home({ pokemons, allPokemons }) {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchInput = (input) => {
    setSearchInput(input);
  };

  return (
    <>
      <SearchBar onSearch={handleSearchInput} />
      {searchInput ? handleSearch(allPokemons, searchInput) : (
        <>
          <div className={styles.title_container}>
            <h1 className={styles.title}>Poke<span>Next</span></h1>
            <Image
              src='/images/pokeball.png'
              width={50}
              height={50}
              alt='PokeNext'
            />
          </div>
          <div className={styles.pokemon_container}>
            {pokemons.map((pokemon) => (
              <Card key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>
        </>
      )}
    </>
  );
}
