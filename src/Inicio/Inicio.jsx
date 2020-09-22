import React, {useState, useEffect} from "react";
import {ModuloCrearSala} from "./ModuloCrearSala";
import {ModuloEntrarSala} from "./ModuloEntrarSala";
import {servidor} from "../variables";
import {Link} from "react-router-dom"

function CrearUsuario(props) {
    const fnNotificar = props.fn;
    const [apodo, setApodo] = useState("");

    const registrar = async (ev) => {
        ev.preventDefault();

        try {
            const peticion = await fetch(`${servidor}/usuario/crear`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombreUsuario: apodo
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
    const [datosVerificados, setDatosVerificados] = useState(false)

    useEffect(() => {
        if (idUsuario && apodoUsuario) {
            (async () => {
                const solicitud = await fetch(`${servidor}/usuario/validar`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        nombreUsuario: apodoUsuario,
                        idUsuario
                    })
                });

                if (solicitud.ok) {

                    const datos = await solicitud.json();
                    switch (datos.estado) {
                        case "ok": {
                            setDatosVerificados(true);
                            break;
                        }
                        case "nombreUsuarioInvalido": {
                            setApodoUsuario(datos.nombreUsuario);
                            setDatosVerificados(true);
                            break;
                        }
                        case "idInvalido": {
                            console.log("El id provisto es invalido.");
                            localStorage.removeItem("id_usuario");
                            localStorage.removeItem("apodo_usuario");
                            setIdUsuario(undefined);
                            setApodoUsuario(undefined);
                            setDatosVerificados(true);
                            break;
                        }
                    }

                } else {
                    // TODO
                    console.error("TODO");
                }

            })();
        } else {
            setDatosVerificados(true);
        }
    }, []);

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
        <ModuloEntrarSala/>
        <ModuloCrearSala/>
    </div>;

    const contenido = (() => {
        if (datosVerificados) {
            return (idUsuario && apodoUsuario)? elemSala: elemCrearUsuario;
        } else {
            return <p>Conectandose...</p>;
        }
    })();

    return (
        <div>
            <h1>Ri Ma Jon</h1>
            <p>Ri Ma Jon Esmeralda!</p>
            {contenido}
            <br/>
            <br/>
            <p>
                <Link to={"/ayuda"}>Ayuda</Link>
            </p>
        </div>
    );
}
