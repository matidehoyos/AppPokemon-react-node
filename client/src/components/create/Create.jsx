import style from "./Create.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPokemon, resetCreatedPokemon } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import NavBar from "../navBar/NavBar";

export default function Create() {
  const types = useSelector(state => state.types);
  const createdPokemon = useSelector(state => state.createdPokemon);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const MAX_TYPES = 2;
  
  const validate = (inputs) => {
    const errors = {};
    const isNumber = (value) => !isNaN(Number(value)) && value !== "";
    const isURL = (url) => /^(ftp|http|https):\/\/[^ "]+$/.test(url);
    if (!inputs.name) errors.name = "*Name is required";
    else if (!/^[a-zA-Z\s]{1,20}$/.test(inputs.name)) errors.name = "*Invalid name format";
    if (!isURL(inputs.image)) errors.image = "*Invalid URL format";
    if (!isNumber(inputs.height)) errors.height = "*Height must be a number";
    if (!isNumber(inputs.weight)) errors.weight = "*Weight must be a number";
    if (!inputs.types.length) errors.types = "*At least one type is required";
    else if (inputs.types.length > MAX_TYPES) errors.types = "*Only two types allowed";
    return errors;
  };

  const [inputs, setInputs] = useState({
    name: "",
    hp: 50,
    attack: 50,
    defense: 50,
    speed: 50,
    types: [],
    height: "",
    weight: "",
    image: "",
  });

  const [errors, setErrors] = useState(validate(inputs));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => {
      const updatedInputs = { ...prev, [name]: value };
      setErrors(validate(updatedInputs));
      return updatedInputs;
    });
  };

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    if (newType === "0" || inputs.types.includes(newType) || inputs.types.length >= MAX_TYPES) return;
    setInputs((prev) => {
      const updatedTypes = [...prev.types, newType];
      setErrors(validate({ ...prev, types: updatedTypes }));
      return { ...prev, types: updatedTypes };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!Object.keys(errors).length) {
      dispatch(createPokemon(inputs));
      setInputs({
        name: "",
        hp: 50,
        attack: 50,
        defense: 50,
        speed: 50,
        types: [],
        height: "",
        weight: "",
        image: "",
      });
    }
  };

  useEffect(() => {
    if (createdPokemon) {
      alert("Pokemon created successfully!");
      dispatch(resetCreatedPokemon());
      navigate("/");
    }
  }, [createdPokemon, dispatch, navigate]);

  return (
    <div className={style.container}>
      <NavBar />
      <div className={style.subcontainer}>
        <h2>Create a New Pokémon</h2>
        <form onSubmit={handleSubmit}>
          <div className={style.box}>
            <input type="text" name="name" placeholder="Name:"  value={inputs.name} onChange={handleInputChange} />
            {errors.name && <span className={style.errors_danger}>{errors.name}</span>}
          </div>
          <div className={style.box}>
            <input type="text" name="image" placeholder="URL image:" value={inputs.image} onChange={handleInputChange} />
            {errors.image && <span className={style.errors_danger}>{errors.image}</span>}
          </div>
          <div className={style.box}>
              <input type="text" name="height"  placeholder="Height:" onChange={handleInputChange}/>      
              {errors.height && (<span className={style.errors_danger}>{errors.height}</span>  )}        
          </div>  
          <div className={style.box}>
              <input type="text" name="weight" placeholder="Weight:" onChange={handleInputChange}/>
              {errors.weight && (<span className={style.errors_danger}>{errors.weight}</span>  )}        
          </div>
          <div className={style.box}>
            <div className={style.rangeDiv}>
            <label>Hp:</label>
            <input  type="range" min="0" max="999" name="Hp:"  onChange={handleInputChange}/>
            {errors.hp && (<span className={style.errors_danger}>{errors.hp}</span>  )}        
          </div>
          </div>
          <div className={style.box}>
            <div className={style.rangeDiv}>
            <label className={style.rangeLabel}>Attack:</label>
            <input type="range" min="0" max="999" name="attack" onChange={handleInputChange}/>
            </div>
            {errors.attack && (<span className={style.errors_danger}>{errors.attack}</span>  )}        
          </div>
          <div className={style.box}>
            <div className={style.rangeDiv}>
            <label className={style.rangeLabel}>Defense:</label>
            <input type="range" min="0" max="999" name="defense" onChange={handleInputChange}/>
            </div>
                {errors.defense && (<span className={style.errors_danger}>{errors.defense}</span>  )}        
            </div>
            <div className={style.box}>
              <div className={style.rangeDiv}>
              <label className={style.rangeLabel}>Speed:</label><input type="range" min="0" max="999" name="speed" onChange={handleInputChange}/>
              </div>
              {errors.speed && (<span className={style.errors_danger}>{errors.speed}</span>  )}        
            </div>
            <div className={style.box}>
              <div>
                <label>Types:</label>
                <select onChange={handleTypeChange}>
                  <option value="0">Select</option>
                  {types?.map((type, index) => (
                    <option key={index} value={type.name}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>
              {errors.types && <span className={style.errors_danger}>{errors.types}</span>}
            </div>
            <div className={style.BotonContainer}>
              <button className={style.boton} type="submit" disabled={Object.keys(errors).length > 0}>
                    Create
              </button>
            </div>
        </form>
      </div>
    </div>
  );
}
