
import { useState, useEffect } from 'react';
import styles from '../styles/Pokedex.module.css';

export default function PokedexPage() {
    const [pokemon, setPokemon] = useState({});
    const [searchPokemon, setSearchPokemon] = useState(1);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {

        renderPokemon(searchPokemon);
    }, [searchPokemon]);

    const fetchPokemon = async (pokemon) => {
        const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        if (APIResponse.status === 200) {
        return await APIResponse.json();
        }
        return null;
    };


    const renderPokemon = async (pokemon) => {
        setPokemon({ name: 'Loading...', id: '' });

        const data = await fetchPokemon(pokemon);
        if (data) {
            setPokemon({
                name: data.name,
                id: data.id,
                image: data.sprites.versions['generation-v']['black-white'].animated.front_default || data.sprites.front_default
                
            });
        setSearchPokemon(data.id)
        setInputValue('');
        } else {
        setPokemon({ name: 'Not found :c', id: '', image: '' });
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        renderPokemon(inputValue.toLowerCase());
    };

    const handlePrev = () => {
        if (searchPokemon === 10001) {
            setSearchPokemon(1025);
        }
        else if (searchPokemon > 1) {
            setSearchPokemon(searchPokemon-1)
        }
    };

    const handleNext = () => {
        if (searchPokemon === 1025)
            setSearchPokemon(10000 + (searchPokemon%1025) + 1);
        else  {
            setSearchPokemon(searchPokemon + 1)
        }
    };


    return (
        <div className={styles.all}>
            <body className={styles.corpo}>
                <main className={styles.main}>
                    <img src={pokemon.image || '#'} alt="pokemon" className={styles.pokemon__image} />
                    <img src="/images/pokedex.png" alt="pokedex" className={styles.pokedex} />
                    <h1 className={styles.pokemon__data}>
                        <span className={styles.pokemon__number}>{pokemon.id}</span> - <span className={styles.pokemon__name}>{pokemon.name}</span>
                    </h1>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <input
                        type="search"
                        className={styles.input__search}
                        placeholder="Nome ou Número"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        required
                        />
                    </form>
                    <div className={styles.buttons}>
                        <button className={`${styles.button} ${styles.btnPrev}`} onClick={handlePrev}>&lt; Prev </button>
                        <button className={`${styles.button} ${styles.btnNext}`} onClick={handleNext}>Next &gt;</button>
                    </div>
                </main>
            </body>
        </div>

    )
}
