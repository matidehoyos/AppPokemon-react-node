import { useState } from "react";
import style from "./Paginator.module.css";


export default function Paginator({currentPokemons, currentPage, totalPages, paginate}) {

      const pageSize = 8;

    return(
        <div className={style.pagination}>
            {Array.from({ length: Math.ceil(currentPokemons.length / pageSize) }, (_, index) => (
                <div key={index}>
                    <button key="previous" 
                            onClick={() => paginate(currentPage -1)}
                            className={style.boton}
                            disabled={currentPage === 1} >
                    Previous
                    </button>

                    <span className={style.pagination_span}>{`Page: ${currentPage} of ${totalPages}`}</span>

                    <button key="next" 
                            className={style.boton}
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === totalPages}>
                    Next
                    </button>
                </div>
            ))}
        </div>
    )
}