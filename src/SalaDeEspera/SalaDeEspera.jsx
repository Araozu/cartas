import React, {useEffect, useState} from "react";
import {useHistory, Link} from "react-router-dom";

let socket;

export function SalaDeEspera() {

    const idSala = localStorage.getItem("id_partida");
    const idUsuario = localStorage.getItem("id_usuario");
    const nombreUsuario = localStorage.getItem("apodo_usuario");
    const [estado, setEstado] = useState("conectando");
    const [usuarios, setUsuarios] = useState([]);
    const reactRouterHistory = useHistory();

    useEffect(() => {
        if (!idSala || !idUsuario) return;

        socket = new WebSocket(`ws:/0.0.0.0:8080/socket`);

        socket.addEventListener("open", (ev) => {
            socket.send(JSON.stringify({
                operacion: "conectar",
                datos: JSON.stringify({
                    idJuego: idSala,
                    idUsuario
                })
            }));
        });

        socket.addEventListener("message", (ev) => {
            const datos = JSON.parse(ev.data);
            switch (datos.operacion) {
                case "conexion_exitosa": {
                    setEstado("conectado");
                    const jugadores = datos.jugadores;
                    jugadores.push({idUsuario, nombreUsuario})
                    setUsuarios(jugadores);
                    break;
                }
                case "usuario_conectado": {
                    const idUsuario = datos.idUsuario;
                    const nombreUsuario = datos.nombreUsuario;
                    setUsuarios((u) => {
                       const s = [...u];
                       s.push({idUsuario, nombreUsuario})
                       return s;
                    });
                    break;
                }
                case "juego_iniciado": {
                    reactRouterHistory.push("/juego2");
                }
            }
        });

        return () => {
            socket.close();
        }
    }, []);

    const iniciarJuego = () => {
        socket.send(JSON.stringify({
            operacion: "iniciar",
            datos: JSON.stringify({
                idJuego: idSala
            })
        }));
    };

    const usuariosElem = usuarios.map((u) => {
        return (
            <p key={u.idUsuario}>Usuario: {u.nombreUsuario}</p>
        )
    });

    const elemConectando = (
        <div>
            <h1>Sala de espera - Conectando</h1>
            <h2>El código de la sala es {idSala}</h2>
            <p>Conectando al servidor...</p>
        </div>
    );

    const elemConectado = (
        <div>
            <h1>Sala de espera</h1>
            <h2>El código de la sala es {idSala}</h2>
            <div>
                <p>Jugadores conectados:</p>
                {usuariosElem}
                {usuariosElem.length === 4? <div>
                    <button onClick={iniciarJuego}>Iniciar el juego!</button>
                </div>: <></>}
            </div>
        </div>
    );

    const elemErrorSalaNoExiste = (
        <div>
            <h1>Sala de espera - Error</h1>
            <p>No existe la sala {idSala}.</p>
            <Link to={"/"}>Regresar al inicio.</Link>
        </div>
    );

    const elemErrorSalaUndefined = (
        <div>
            <h1>Sala de espera - Error</h1>
            <p>No te has conectado a ninguna sala.</p>
            <Link to={"/"}>Regresar al inicio.</Link>
        </div>
    );

    return (() => {
        if (!idSala || !idUsuario) return elemErrorSalaUndefined;
        if (estado === "conectando") return elemConectando;
        if (estado === "conectado") return elemConectado;
        if (estado.startsWith("error")) {
            const razon = estado.substring(6);
            switch (razon) {
                case "Sala no existe": return elemErrorSalaNoExiste;
            }
        }
        return <div>
            <p>Algo salió mal...</p>
            <Link to={"/"}>Regresar al inicio.</Link>
        </div>
    })();
}
