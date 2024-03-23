import styles from '../styles/About.module.css'
import Image from 'next/image'

export default function About() {
    return(
        <>
            <div className={styles.about}>
                <h1>Sobre o Projeto</h1>

                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>

                <Image
                    src='/images/charizard.png'
                    height={300}
                    width={300}
                />
            </div>

        </>
    )
}
