import React from "react";
import {Carta} from "./Carta";
import {StyleSheet, css} from "aphrodite";

const estilos = StyleSheet.create({
    contenedorCartas: {
        textAlign: "center",
        position: "absolute",
        bottom: "1rem",
        left: "0",
        width: "100%"
    }
});

export function Mano(props) {

    const cartas = props.cartas;
    const cartasE = cartas.map((x, p) =>
        <Carta valor={x} key={p + "-" + x} />
    );

    return (
        <div className={css(estilos.contenedorCartas)}>
            {cartasE}
        </div>
    );
}
