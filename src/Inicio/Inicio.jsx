import React, {useState} from "react";
import {ModuloCrearSala} from "./ModuloCrearSala";
import {servidor} from "../variables";

function CrearUsuario(props) {
    const fnNotificar = props.fn;
    const [apodo, setApodo] = useState("");

    const registrar = async (ev) => {
        ev.preventDefault();

        try {
            const peticion = await fetch(`${servidor}/usuario`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    apodo: apodo
                })
            });
            if (peticion.ok) {

                const {id} = await peticion.json();
                fnNotificar(id, apodo);

            } else {
                console.error("D:");
                console.error(peticion);
            }
        } catch (e) {
            console.error("D:");
            console.error(e);
        }

    };

    const fnOnChange = (ev) => setApodo(ev.target.value);

    return (
        <div>
            <h2>Coloca un nombre para comenzar:</h2>
            <form onSubmit={registrar}>
                <input type="text" name={"id_usuario"} placeholder={"nombre"} value={apodo} onChange={fnOnChange}/>
                <input type="submit" value={"Registrar"}/>
            </form>
        </div>
    );
}

export function Inicio() {

    const [idUsuario, setIdUsuario] = useState(localStorage.getItem("id_usuario"));
    const [apodoUsuario, setApodoUsuario] = useState(localStorage.getItem("apodo_usuario"));

    const actualizarIdApodoUsuario = (id, apodo) => {
        localStorage.setItem("id_usuario", id);
        localStorage.setItem("apodo_usuario", apodo);
        setIdUsuario(id);
        setApodoUsuario(apodo);
    };

    const elemCrearUsuario = <CrearUsuario fn={actualizarIdApodoUsuario}/>;

    const elemSala = <div>
        <h2>Salas</h2>
        <p>Bienvenido, {apodoUsuario}</p>
        <div>
            <p>Entrar a una sala:</p>
            <form>
                <input type="text" placeholder={"Codigo de sala"}/>
                <input type="submit" value={"Entrar!"}/>
            </form>
        </div>
        <ModuloCrearSala/>
    </div>;

    return (
        <div>
            <h1>Ri Ma Jon</h1>
            <p>Ri Ma Jon Esmeralda!</p>
            {(idUsuario && apodoUsuario)? elemSala: elemCrearUsuario}
        </div>
    );
}
