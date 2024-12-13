import style from "./Loader.module.css";


export default function Loader() {

    return(
        <div className={style.loader}>
            <img src="./pikaWalk.gif" alt="Loading..." />
            <h3>Loading...</h3>
        </div>
    )
}