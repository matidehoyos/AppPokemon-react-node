import style from "./Attack.module.css";
import { GiCrossedSwords } from "react-icons/gi";

export default function Attack ({attack}) {
    
    return(
        <div className={style.attack}>
            <h4><GiCrossedSwords size={18} />{attack}</h4>
        </div> 
    )
}