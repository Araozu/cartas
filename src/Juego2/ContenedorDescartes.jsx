import React from "react";
import {StyleSheet, css} from "aphrodite";
import {Carta2} from "./Carta2";
import {useDimensions} from "./useDimensions";

const splitArray = (arr, numElems) => {
    const res = [];
    let i = 0;
    while (true) {
        if (i >= arr.length) break;
        const arrTemp = [];
        for (let j = 0; j < numElems; i++, j++) {
            if (i >= arr.length) break;
            arrTemp.push(arr[i]);
        }
        res.push(arrTemp);
    }
    return res;
};

export function ContenedorDescartes(props) {

    const [pH] = useDimensions()
    const cartas = props.cartas ?? [];
    const escala = props.escala ?? 0.75;
    const esTurnoActual = props.esTurnoActual;

    const estilos = StyleSheet.create({
        contCuadranteDescarte: {
            position: "absolute",
            width: `25%`,
            height: `20%`,
            bottom: "17%",
            right: "37.5%",
            textAlign: "left",
            borderRadius: `${pH * 1.5 * escala}px`,
            borderTopStyle: "solid",
            borderTopWidth: `${pH * 1.25 * escala}px`,
            borderTopColor: esTurnoActual? "red": "#4CAF50"
        }
    });

    const gruposCartas = splitArray(cartas, 6);

    const elems = gruposCartas.flatMap((arr, i) => {
        const elems = arr.map((v, i2) => <Carta2 valor={v} escala={escala} key={`${i}-${i2}-${v}`}/>)
        return (i > 0)
            ? elems
            : [...elems, <div key={i + "-div"}/>];
    });

    return (
        <div className={css(estilos.contCuadranteDescarte)}>
            {elems}
        </div>
    );
}
