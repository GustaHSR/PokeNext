import { useState } from 'react';
import searchstyles from '../styles/SearchBar.module.css';
import styles from '../styles/Home.module.css';
import Card from "@/components/Card";
import Image from "next/image";
import { useRouter } from 'next/router';
import SearchBar from '@/components/SearchBar';

export async function getStaticProps() {
  const maxPokemons = 1015;
  const api = 'https://pokeapi.co/api/v2/pokemon/';
  const res = await fetch(`${api}/?limit=${maxPokemons}`);
  const data = await res.json();

  data.results.forEach((item, index) => {
    item.id = index + 1;
  });

  return {
    props: {
      pokemons: data.results
    },
  };
}

const handleSearch = (pokemons, input) => {
  let filteredPokemons = pokemons.slice(0, 251); // Limitando o mapeamento para os primeiros 251 pokémons

  if (!input) {
    return (
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
          {filteredPokemons.map((pokemon) => (
            <Card key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      </>
    );
  }

  return <h1 className={searchstyles.result}>Não foi possível encontrar esse Pokémon</h1>;
};

export default function Home({ pokemons }) {
  const [searchInput, setSearchInput] = useState('');
  const router = useRouter();

  const handleSearchInput = (input) => {
    setSearchInput(input);
  };

  const searchResult = pokemons.find(pokemon => pokemon.id.toString() === searchInput || pokemon.name === searchInput.toLowerCase());
  
  return (
    <>
      <SearchBar onSearch={handleSearchInput} />
      {searchResult ? (
        <div className={searchstyles.result}>
          <Card key={searchResult.id} pokemon={searchResult} />
        </div>
      ) : (
        handleSearch(pokemons, searchInput)
      )}
    </>
  );
}
