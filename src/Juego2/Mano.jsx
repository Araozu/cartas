import React from "react";
import {StyleSheet, css} from "aphrodite";
import {Carta2} from "./Carta2";

const estilos = StyleSheet.create({
    cuadrante: {
        position: "absolute",
        width: `87%`,
        height: `10%`,
        bottom: "0",
        right: "0",
        textAlign: "left"
    }
});

export function Mano(props) {

    const cartas = props.cartas;
    const entrada = props.entrada ?? -1;
    const gruposAbiertos = props.gruposAbiertos ?? [];

    const cartasElem = cartas.map((v, i) => <Carta2 valor={v} key={i + "-" + v}/>);

    const entradaElem = [
        <Carta2 valor={-1} key={1 + "-" + -1}/>,
        <Carta2 valor={entrada} key={2 + "-" + entrada}/>,
        <Carta2 valor={-1} key={3 + "-" + -1}/>
    ];

    const gruposAbiertosElem = gruposAbiertos.flatMap(
        (arr, i) => arr.map(
            (v, i2) => <Carta2 valor={v} key={i + "-" + i2 + "-" + v}/>
        )
    );

    return (
        <div className={css(estilos.cuadrante)}>
            {cartasElem}
            {entradaElem}
            {gruposAbiertosElem}
        </div>
    );
}
