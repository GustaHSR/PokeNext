import styles from '../styles/About.module.css'
import Image from 'next/image'

export default function About() {
    return(
        <>
            <div className={styles.about}>
                <h1>Sobre o Projeto</h1>

                <p>
                    Este site é um projeto de uma pokedex feita totalmente em next.js, por isso o nome PokeNext. 
                    O projeto é realizado por meio de APIs para puxar as informações dos pokemons, bem como nome, altura, largura e tipo(s). 
                    Projeto feito de acordo com o curso de Next.js do canal @hora de codar no youtube.
                </p>

                <Image
                    src='/images/charizard.png'
                    height={300}
                    width={300}
                    alt='Charizard'
                />
            </div>

        </>
    )
}
