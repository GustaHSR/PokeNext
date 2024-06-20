import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import styles from '../styles/Card.module.css';

const Card = ({ pokemon }) => {
    const [imageSrc, setImageSrc] = useState(
        `https://img.pokemondb.net/sprites/home/normal/${pokemon.name}.png`
    );

    const handleImageError = () => {
        setImageSrc(`https://projectpokemon.org/images/shiny-sprite/${pokemon.name}.gif`);
    };

    return (
        <div className={styles.card}>
            <Image
                src={imageSrc}
                width={120}
                height={120}
                alt={pokemon.name}
                onError={handleImageError}
            />
            <p className={styles.id}>#{pokemon.id}</p>
            <h3 className={styles.title}>{pokemon.name}</h3>
            <Link legacyBehavior href={`/pokemon/${pokemon.id}`}><a className={styles.btn}>Detalhes</a></Link>
        </div>
    );
};

export default Card;
