import React, { useState } from "react";
import style from "../recipe.module.css";
import Modal from "react-modal";
import { v4 as uuidv4 } from "uuid";



const Recipe = ({ title, calories, image, ingredients, cautions }) => {
    
  const [showPopUp, setShowPopUp] = useState(false);

    return (
        <div className={style.recipe}>
            <h1>{title}</h1>
            <p>Calories: {Math.floor(calories)}</p>
            <ul>
                {ingredients.map(ingredient => (
                    <li>{ingredient.text}</li>
                ))}
            </ul>
            {cautions.length!==0 && 
                <button 
                    className="button" 
                    onClick={() => setShowPopUp(true)}
                 >
                    Dietary Cautions
                </button>
            }
                
            <Modal 
                key={uuidv4()}
                isOpen={showPopUp} 
                onRequestClose={() => setShowPopUp(false)}
                className="my-modal"
                style={
                    {
                        content: {
                            backgroundColor: "lightcoral",
                            borderRadius: "1px",   
                        }
                    }
                }
            >
              <h3 style={{textAlign: "center"}}>Dietary Cautions</h3>
              <ul>
                  {cautions.map(caution => (
                      <li>{caution}</li>
                  ))}
              </ul>
              <button onClick={() => setShowPopUp(false)}>Close</button>
            </Modal>

            <img style={{padding:"10px"}} src={image} alt="" />
        </div>
    );
}

export default Recipe;