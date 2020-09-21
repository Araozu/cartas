import React, {useState} from "react";
import {servidor} from "../variables";
import {useHistory} from "react-router-dom"

export function ModuloEntrarSala() {

    const [codigoSala, setCodigoSala] = useState("");
    const reactRouterHistory = useHistory();

    const fnOnChange = (ev) => setCodigoSala(ev.target.value);

    const almacenarSalaId = (idPartida) => {
        localStorage.setItem("id_partida", idPartida);
        reactRouterHistory.push("/sala");
    };

    const ingresar = async (ev) => {
        ev.preventDefault();
        const request = await fetch(`${servidor}/partida-join`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({id: codigoSala})
        });

        if (request.ok) {
            const data = await request.json();
            if (data.ok) {
                almacenarSalaId(codigoSala);
            }
        } else {
            console.error(request);
        }
    };

    return (
        <div>
            <p>Entrar a una sala:</p>
            <form onSubmit={ingresar}>
                <input type="text" name={"id_sala"} placeholder={"Codigo de sala"} value={codigoSala}
                       onChange={fnOnChange}
                />
                <input type="submit" value={"Entrar!"}/>
            </form>
        </div>
    );
}
