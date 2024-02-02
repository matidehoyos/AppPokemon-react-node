import { useDispatch, useSelector } from "react-redux";
import style from "./Create.module.css";
import { useEffect, useState } from "react";
import { createPokemon, resetCreatedPokemon } from "../../redux/actions";
import NavBar from "../navBar/NavBar";
import { useNavigate } from "react-router-dom";

export default function Create() {
    const MAX_TYPES = 2;
    const stringRegExp = /^[a-zA-Z]{1,20}$/;
    const types = useSelector(state => state.types);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const createdPokemon = useSelector(state => state.createdPokemon);


    function validate(inputs) {
        function isURL(url) {
            var regex = /^(ftp|http|https):\/\/[^ "]+$/;
            return regex.test(url);
          }
        function isNumber(valor) {
            return !isNaN(parseFloat(valor)) && isFinite(valor);
          }
            let errors = {};
            if(inputs.id === "") {
              errors.id = "*Id is required"
            }
            else if(!isNumber(inputs.id)) {
              errors.id = "*Id must be a number"
            }
            if(!inputs.name === "") {
              errors.name = '*Name is required';
            } else if (!stringRegExp.test(inputs.name)) {
              errors.name = '*Name is invalid: <A-Z> character allowed';
            }
            if(inputs.image === ""){
              errors.image = '*Image is required';
            } else if(inputs.image.length > 20000) {
              errors.image = '*image path is too long'
            }  
            if(!inputs.height){
              errors.height = '*Height is required';
              } else if (!isNumber(inputs.height)){
              errors.height = '*Height invalid: Must be a number';
            }
            if(!inputs.weight){
              errors.weight = '*Weight is required';
              } else if (!isNumber(inputs.weight)){
              errors.weight = '*Weight invalid: must be a number';
            }
            if(!inputs.speed){
              errors.speed = '*Weight is required';
              } 
            if(inputs.types.length <= 0){
              errors.types = '*Types is required';
            }
            return errors;
    }

    const inputStateInitial = {
        id: '',
        name: '',
        hp: "",
        origin: 'DB',
        attack: "",
        defense: "",
        speed: "",
        types: [],
        height: '',
        weight: '',
        image: '',
      }

    const [inputs, setInputs] = useState(inputStateInitial);
    const [errors, setErrors] = useState({
        id: '*Id is required',
        name: '*Name is required',
        image: '*Image is required',
        height: '*Height is required',
        weight: '*Weight is required',
        hp: '*HP is required',
        attack: '*Attack is required',
        defense: '*Defense is required',
        speed: '*Speed is required',
        types:'*You must select at least one type, max two'
      });

    const handleInputChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
          });

        setErrors(validate({
           ...inputs,
            [e.target.name]: e.target.value
          }));
    }

    function onChangeTypes(e) {
        if (e.target.value === "0") return;
        if (inputs.types.filter(type => (type.name === e.target.value)).length===0) {
            let newType = e.target.value;
            setInputs({
              ...inputs,
              types: [...inputs.types, newType]
            });
            setErrors(validate({
              ...inputs,
              types: [...inputs.types, newType]
            }));
        if (inputs.types.length === MAX_TYPES-1) {
              e.target.disabled = true;
            }}
        e.target.value = "0";
      }

    const handleCreatePokemon = (e) => {
            e.preventDefault();
            dispatch(createPokemon(inputs));
            setTimeout(function() {
              document.getElementById("formCreate").reset();
              dispatch(resetCreatedPokemon());
              navigate("/home");
            }, 5000);
    }

    return(
        <div className={style.container}>
            <NavBar />
            
            <div className={style.createTitle}>
              {(Object.keys(errors).length !== 0) && !createdPokemon && (
              <h2>COMPLETE THE FORM CORRECTLY BEFORE SUBMITTING</h2> )} 
            </div>
            
            {createdPokemon && (
              <h2 className={style.succes}>Pokemon created succesfully</h2>
            )}

            <form id="formCreate">
                <div className={style.formLeft}>
                    <div className={style.box}>
                        <div className={style.inputDiv}>
                            <label>Id:</label><input type="text" name="id" placeholder="Insert n° id here" onChange={handleInputChange}/>
                        </div>
                        <div className={style.errors}> 
                                 {errors.id && (<span className={style.errors_danger}>{errors.id}</span>  )}        
                        </div>
                    </div>
                    <div className={style.box}>
                        <div className={style.inputDiv}>
                        <label>Name:</label><input type="text" name="name" placeholder="Insert pokemon´s name here" onChange={handleInputChange}/>
                        </div>
                        <div className={style.errors}> 
                                 {errors.name && (<span className={style.errors_danger}>{errors.name}</span>  )}        
                        </div>
                    </div>
                    <div className={style.box}>
                        <div className={style.inputDiv}>
                          <label>Image:</label><input type="text" name="image" placeholder="Insert url image here" onChange={handleInputChange}/>
                        </div>
                        <div className={style.errors}> 
                                 {errors.image && (<span className={style.errors_danger}>{errors.image}</span>  )}        
                        </div>
                    </div>
                    <div className={style.box}>
                        <div className={style.inputDiv}>
                           <label>Height:</label><input type="text" name="height"  placeholder="Insert height here" onChange={handleInputChange}/>      
                        </div>
                        <div className={style.errors}> 
                                 {errors.height && (<span className={style.errors_danger}>{errors.height}</span>  )}        
                        </div>
                    </div>   
                    <div className={style.box}>
                        <div className={style.inputDiv}>
                          <label>Weight:</label><input type="text" name="weight" placeholder="Insert weight here" onChange={handleInputChange}/>
                        </div>
                        <div className={style.errors}> 
                                 {errors.weight && (<span className={style.errors_danger}>{errors.weight}</span>  )}        
                        </div>
                    </div>      
                </div>
                <div className={style.formRight}>
                      <div>
                        <div className={style.rangeDiv}>
                        <label className={style.rangeLabel}>Hp:</label><input  type="range" min="0" max="999" name="hp"  onChange={handleInputChange}/>
                        </div>
                        <div className={style.errors}> 
                                 {errors.hp && (<span className={style.errors_danger}>{errors.hp}</span>  )}        
                        </div>
                      </div>
                      <div className={style.box}>
                          <div className={style.rangeDiv}>
                          <label className={style.rangeLabel}>Attack:</label><input type="range" min="0" max="999" name="attack" onChange={handleInputChange}/>
                          </div>
                          <div className={style.errors}> 
                                 {errors.attack && (<span className={style.errors_danger}>{errors.attack}</span>  )}        
                        </div>
                      </div>
                      <div className={style.box}>
                          <div className={style.rangeDiv}>
                          <label className={style.rangeLabel}>Defense:</label><input type="range" min="0" max="999" name="defense" onChange={handleInputChange}/>
                          </div>
                          <div className={style.errors}> 
                                 {errors.defense && (<span className={style.errors_danger}>{errors.defense}</span>  )}        
                         </div>
                      </div>
                      <div className={style.box}>
                          <div className={style.rangeDiv}>
                          <label className={style.rangeLabel}>Speed:</label><input type="range" min="0" max="999" name="speed" onChange={handleInputChange}/>
                          </div>
                          <div className={style.errors}> 
                                 {errors.speed && (<span className={style.errors_danger}>{errors.speed}</span>  )}        
                         </div>
                      </div>
                      <div className={style.box}>
                          <div className={style.typesDiv}>
                          <label>Types:</label>
                          <select values="All"
                                  defaultValue="0"
                                  onChange={onChangeTypes}
                                  name="types" >
                                  <option value="0">Select</option>
                              {
                                  types.map((type,index) => (
                                          <option key={index}>{type.name}</option>
                                  ))
                              }
                          </select>
                          </div>
                          <div className={style.errors}> 
                                 {errors.types && (<span className={style.errors_danger}>{errors.types}</span>  )}        
                         </div>
                      </div>
                </div>
            </form> 
            {(Object.keys(errors).length === 0) && (
                 <input type="submit" value="Create" onClick={handleCreatePokemon}/>
               )} 
        </div>
    )
}