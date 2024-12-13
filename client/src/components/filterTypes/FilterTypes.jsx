import style from "./FilterTypes.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setFilterType } from "../../redux/actions";


export default function FilterTypes() {
    const types = useSelector(state => state.types);
    const dispatch = useDispatch();

    const handleType = (e) => {
      dispatch(setFilterType(e.target.value))
    }


    return(
        <div className={style.types}>
            <button value="all" onClick={handleType}>All types</button>
            {types.map(type => (
            <li key={type.id} value={type.name}><button value={type.name} onClick={handleType}>{type.name}</button></li>
            ))}
        </div>
    )
}