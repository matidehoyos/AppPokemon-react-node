import { Link } from "react-router-dom";
import style from "./NavBar.module.css";


export default function NavBar() {
    
    return(
        <div className={style.container}>
            <div className={style.firstRow}>
                    <Link to="/">
                         <div className={style.logo1}>
                            <img src="./logo-pokeapi.png" />
                         </div>
                    </Link>
                    <div className={style.menu}>
                        <ul>
                            <li>
                                <Link to="/home">HOME</Link>
                            </li>
                            <li>
                                <Link to="/create">CREATE</Link>
                            </li>
                        </ul>
                    </div>
                    <div className={style.logo2}>
                            <img src="./icono.png" />
                    </div>
            </div>            
        </div>
    )
}