import style from "./Attack.module.css";
import { GiCrossedSwords } from "react-icons/gi";

export default function Attack ({attack}) {
    
    return(
        <div className={style.attack}>
            <h4><GiCrossedSwords className={style.icon} />{attack}</h4>
        </div> 
    )
}