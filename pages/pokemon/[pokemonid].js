import styles from '../../styles/Pokemon.module.css'
import Image from 'next/image'
import Head from 'next/head'

export const getStaticPaths = async () => {
  const maxPokemons = 5000; // Ajuste do limite de Pokémons
  const api = `https://pokeapi.co/api/v2/pokemon/`;

  const res = await fetch(`${api}/?limit=${maxPokemons}`);
  const data = await res.json();

  const paths = data.results.map((pokemon, index) => {
    return {
      params: { pokemonid: (index + 1).toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const ide = context.params.pokemonid;
  let id = ide;
  if (ide > 1025) {
    id = 10000 + ide % 1025;
  }

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (!res.ok) {
    return { notFound: true };
  }
  const data = await res.json();

  return {
    props: { pokemon: data },
  };
};

const PokemonTypes = ({ types }) => (
  <div className={styles.types_container}>
    {types.map((item, index) => (
      <span
        key={index}
        className={`${styles.type} ${styles['type_' + item.type.name]}`}
      >
        {item.type.name}
      </span>
    ))}
  </div>
);

const PokemonData = ({ height, weight }) => (
  <div className={styles.data_container}>
    <div className={styles.data_height}>
      <h4>Altura:</h4>
      <p>{height * 10} cm</p>
    </div>
    <div className={styles.data_weight}>
      <h4>Peso:</h4>
      <p>{weight / 10} kg</p>
    </div>
  </div>
)

export default function Pokemon({ pokemon }) {
  return (
    <>
      <Head>
        <title>{pokemon.name}</title>
        <meta name="description" content={`Details about Pokémon ${pokemon.name}`} />
      </Head>
      <div className={styles.pokemon_container}>
        <h1 className={styles.title}>{pokemon.name}</h1>
        <Image
          src={`https://img.pokemondb.net/sprites/home/normal/${pokemon.name}.png`}
          width="200"
          height="200"
          alt={pokemon.name}
        />
        <div>
          <h3>Número:</h3>
          <p>#{pokemon.id}</p>
        </div>
        <div>
          <h3>Tipo:</h3>
          <PokemonTypes types={pokemon.types} />
        </div>
        <PokemonData height={pokemon.height} weight={pokemon.weight} />
      </div>
    </>
  );
}
