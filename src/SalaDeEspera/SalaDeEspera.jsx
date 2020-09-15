import React, {useEffect, useState} from "react";
import {Socket} from "phoenix/assets/js/phoenix";
import {useHistory, Link} from "react-router-dom";


export function SalaDeEspera(props) {

    const idSala = localStorage.getItem("id_partida_actual");
    const idUsuario = localStorage.getItem("id_usuario_actual");
    const [estado, setEstado] = useState("conectando");

    useEffect(() => {
        if (!idSala || !idUsuario) return;

        const socket = new Socket("ws:/localhost:4000/socket", {params: {}});
        socket.connect();

        const channel = socket.channel(`sala:${idSala}`, {idUsuario});
        channel.join()
            .receive("ok", (res) => {
                setEstado("conectado");
                console.log(res);
            })
            .receive("error", (res) => {
                setEstado(`error ${res.reason}`);
                console.log(res);
                localStorage.removeItem("id_partida_actual");
                localStorage.removeItem("id_usuario_actual");
                channel.leave();
            });
    }, []);

    const elemConectando = (
        <div>
            <h1>Sala de espera - Conectando</h1>
            <h2>El código de la sala es {idSala}</h2>
            <p>Conectando al servidor...</p>
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
        if (estado.startsWith("error")) {
            const razon = estado.substring(6);
            switch (razon) {
                case "Sala no existe": return elemErrorSalaNoExiste;
            }
        }
    })();
}
