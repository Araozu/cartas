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
        top: "calc(50% - 1.7rem)",
        left: "calc(50% - 6.8rem)"
    },
    contenedorDescarte2: {
        transform: "scale(0.5, 0.5) rotate(270deg) translateY(20rem)",
        width: `${3.4 * 4}rem`,
        height: `${4.5 * 5}rem`,
        position: "fixed",
        top: `calc(50% - ${4.5 * 5 / 2}rem)`,
        left: `calc(50% - ${3.4 * 4 / 2}rem)`
    },
    contenedorDescarte3: {
        transform: "scale(0.5, 0.5) rotate(180deg) translateY(20rem)",
        width: `${3.4 * 4}rem`,
        height: `${4.5 * 5}rem`,
        position: "fixed",
        top: `calc(50% - ${4.5 * 5 / 2}rem)`,
        left: `calc(50% - ${3.4 * 4 / 2}rem)`
    },
    contenedorDescarte4: {
        transform: "scale(0.5, 0.5) rotate(90deg) translateY(20rem)",
        width: `${3.4 * 4}rem`,
        height: `${4.5 * 5}rem`,
        position: "fixed",
        top: `calc(50% - ${4.5 * 5 / 2}rem)`,
        left: `calc(50% - ${3.4 * 4 / 2}rem)`
    }
});

export function Descartes(props) {

    const descartes1 = props.descartes1;
    const descartes2 = props.descartes2;
    const descartes3 = props.descartes3;
    const descartes4 = props.descartes4;

    const fragmentos1 = descartes1.map((x, p) =>
        <Carta valor={x} movimiento={'none'} fnDescartar={() => {}} key={p + "-" + x}/>
    );
    const fragmentos2 = descartes2.map((x, p) =>
        <Carta valor={x} movimiento={'none'} fnDescartar={() => {}} key={p + "-" + x}/>
    );
    const fragmentos3 = descartes3.map((x, p) =>
        <Carta valor={x} movimiento={'none'} fnDescartar={() => {}} key={p + "-" + x}/>
    );
    const fragmentos4 = descartes4.map((x, p) =>
        <Carta valor={x} movimiento={'none'} fnDescartar={() => {}} key={p + "-" + x}/>
    );

    return (
        <div>
            <div className={css(estilos.descartes)}>
                <div className={css(estilos.cartasRestantes)}>{props.cartasRestantes}</div>
            </div>
            <div className={css(estilos.contenedorDescarte1)}>
                {fragmentos1}
            </div>
            <div className={css(estilos.contenedorDescarte2)}>
                {fragmentos2}
            </div>
            <div className={css(estilos.contenedorDescarte3)}>
                {fragmentos3}
            </div>
            <div className={css(estilos.contenedorDescarte4)}>
                {fragmentos4}
            </div>
        </div>
    );
}
