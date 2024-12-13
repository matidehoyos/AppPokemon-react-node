import { Link } from "react-router-dom";
import style from "./NavBar.module.css";


export default function NavBar() {
    
    return(
        <div className={style.container}>
                <Link to="/" className={style.logo1}>
                    <img src="./logo-pokeapi.png" />
                </Link>
                <div className={style.menu}>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/create">Create</Link>
                        </li>
                    </ul>
                </div>
            </div>            
    )
}