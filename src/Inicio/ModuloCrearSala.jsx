import React, {useState} from "react";
import {StyleSheet, css} from "aphrodite";
import {useHistory} from "react-router-dom";
import {servidorF} from "../variables";


const estilos = StyleSheet.create({
    codSala: {
        fontFamily: "monospace",
        fontSize: "1.2rem",
        display: "inline-block",
        padding: "0 0.5rem",
        border: "solid 1px #151515",
        borderRadius: "3px",
        margin: "0.5rem"
    }
});

export function ModuloCrearSala(props) {
    /*
        Estados:
        inactivo  -  No se creo ninguna sala
        creando   -  Se intento crear una sala y se espera respuesta del servidor
        error     -  Hubo un error al crear la sala
        listo     -  Exito al crear la sala
    */
    const [estado, setEstado] = useState("inactivo");
    const [codigoSala, setCodigoSala] = useState(null);
    const reactRouterHistory = useHistory();
    const idUsuario = localStorage.getItem("id_usuario");

    const almacenarSalaId = (idPartida) => {
        localStorage.setItem("id_partida", idPartida);
        reactRouterHistory.push("/sala");
    };

    const crearSala = async (ev) => {
        ev.preventDefault();

        setEstado("creando");

        try {
            const url = `${servidorF}/partida`;
            const respuesta = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({idUsuario})
            });

            if (respuesta.ok) {
                const {id} = await respuesta.json();
                setCodigoSala(id);
                setEstado("listo");
                almacenarSalaId(id);
            } else {
                console.error(respuesta);
                setEstado("error");
            }
        } catch (e) {
            console.log(e);
            setEstado("error");
        }

    };

    const infoSalaCreada = (() => {
        switch (estado) {
            case "creando":
                return <div>
                    Se está creando la sala...
                </div>;
            case "error":
                return <div>
                    Hubo un error al crear la sala.
                </div>;
            case "listo":
                return <div>
                    La sala ha sido creada. El código de la sala es
                    <span className={css(estilos.codSala)}>{codigoSala}</span>
                </div>;
            default:
                return <></>;
        }
    })();

    return (
        <div>
            <p>Crear una sala:</p>
            <form onSubmit={crearSala}>
                <input type="submit" value={"Crear!"}/>
            </form>
            {infoSalaCreada}
        </div>
    );
}
