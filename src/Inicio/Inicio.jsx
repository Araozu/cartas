import React from "react";
import {ModuloCrearSala} from "./ModuloCrearSala";

export function Inicio(props) {

    return (
        <div>
            <h1>Ri Ma Jon</h1>
            <p>Ri Ma Jon Esmeralda!</p>
            <h2>Salas</h2>
            <div>
                <p>Entrar a una sala:</p>
                <form>
                    <input type="text" placeholder={"Codigo de sala"}/>
                    <input type="submit" value={"Entrar!"}/>
                </form>
            </div>
            <ModuloCrearSala/>
        </div>
    );
}
