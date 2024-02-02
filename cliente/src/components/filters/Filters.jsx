import { useDispatch, useSelector } from "react-redux";
import style from "./Filters.module.css";
import { setFilterType, setOrderBy, setOrigin, setSort } from "../../redux/actions";
import SearchBar from "../searchBar/SearchBar";


export default function Filters() {
    const dispatch = useDispatch();
    const types = useSelector(state => state.types);


const handleFilterOrigin = (event) => {
        event.preventDefault();
        dispatch(setOrigin(event.target.value));
}

const handleFilterTypes = (event) => {
        event.preventDefault();
        dispatch(setFilterType(event.target.value));
}

const handleOrderBy = (event) => {
        event.preventDefault();
        dispatch(setOrderBy(event.target.value));
}


const handleSort = (event) => {
        event.preventDefault();
        dispatch(setSort(event.target.value));
}

    return(
        <div className={style.container}>
                <div>
                    <label>Origin:</label>
                    <select onChange={handleFilterOrigin}>
                        <option  value="all">All origins</option>
                        <option  value="api">From api</option>
                        <option  value="DB">From dataBase</option>
                    </select>
                </div>
                <div>
                    <label>Type:</label>
                    <select onChange={handleFilterTypes} >
                        <option key="all" value="all">All types</option>
                    { types.map((type) => (
                        <option key={type.id} value={type.name}>{type.name}</option>
                    ))
                    }
                    </select>
                </div>
                <div>
                    <label>Order by:</label>
                    <select onChange={handleOrderBy} >
                        <option value="name">Name</option>
                        <option value="attack">Attack</option>
                    </select>
                </div>
                <div>
                <label>Direction:</label>
                <select onChange={handleSort} >
                    <option value="asc">Asc</option>
                    <option value="desc">Desc</option>
                </select>
                </div>
                <SearchBar />
    </div>
    )
}