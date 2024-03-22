import Link from "next/link"
import Image from "next/image"
import styles from "../styles/Navbar.module.css"

export default function Navbar() {
    return(
        <>
            <nav className={styles.navbar}>
                <div className={styles.logo}>
                   <Link href='/'> 
                        <Image 
                            src='/images/pokeball.png'
                            width={30}
                            height={30}
                            alt = "PokeNext"
                        />
                    </Link>
                    <h1><Link href='/'>PokeNext</Link></h1>
                    
                </div>
                <ul className={styles.link_itens}>
                    <li>
                        <Link href='/'>Home</Link>
                    </li>
                    <li>
                        <Link href='/about'>Sobre</Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}