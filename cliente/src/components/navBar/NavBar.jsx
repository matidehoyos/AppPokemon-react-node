import { Link } from "react-router-dom";
import style from "./NavBar.module.css";


export default function NavBar() {
    
    return(
        <div className={style.container}>
                         <div className={style.logo1}>
                             <Link to="/home">
                                   <img src="./logo-pokeapi.png" />
                            </Link>
                         </div>
                    <div className={style.menu}>
                        <ul>
                            <li>
                                <Link to="/home">Home</Link>
                            </li>
                            <li>
                                <Link to="/create">Create</Link>
                            </li>
                        </ul>
                    </div>
            </div>            
    )
}