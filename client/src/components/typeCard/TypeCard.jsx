import style from "./TypeCard.module.css";
import { typeColors } from "../../utils/providers/typeColors";

export default function TypeCard({ types }) {
    return (
        <div className={style.type}>
            {types.map((type, index) => {
                const backgroundColor = typeColors[type.toLowerCase()]; 
                return (
                    <h3 
                        key={index} 
                        style={{ backgroundColor }} 
                        className={style.typeCard}
                    >
                        {type.toUpperCase()}
                    </h3>
                );
            })}
        </div>
    );
}
