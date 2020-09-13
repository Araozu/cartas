import React from "react";
import {StyleSheet, css} from "aphrodite";
import {Carta} from "./Carta";

const estilos = StyleSheet.create({
    descartes: {
        position: "fixed",
        top: "calc(50% - 2rem)",
        left: "calc(50% - 2rem)",
        fontFamily: "'PT Serif', serif",
        fontSize: "2rem"
    },
    cartasRestantes: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "4rem",
        height: "4rem",
        border: "solid 2px #151515",
    },
    contenedorDescarte1: {
        transform: "scale(0.5, 0.5)",
        width: `${3.4 * 4}rem`,
        height: `${4.5 * 5}rem`,
        position: "fixed",
        top: "calc(50% - 3.2rem)",
        left: "calc(50% - 6.8rem)"
    }
});

export function Descartes(props) {

    const descartes1 = props.descartes1;
    const fragmentos = descartes1.map((x, p) =>
        <Carta valor={x} movimiento={'none'} fnDescartar={() => {}} key={p + "-" + x}/>
    );

    return (
        <div>
            <div className={css(estilos.descartes)}>
                <div className={css(estilos.cartasRestantes)}>{props.cartasRestantes}</div>
            </div>
            <div className={css(estilos.contenedorDescarte1)}>
                {fragmentos}
            </div>
        </div>
    );
}
