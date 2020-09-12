import React, {useState, useEffect} from "react";
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

const moverCarta = (posOriginal, posDestino, numCartas) => {
    const anchoCarta = 3.4; // rem

    if (posDestino >= 0 && posDestino < numCartas) {
        const cartasMovidas = -(posOriginal - posDestino);
        return cartasMovidas === 0? `none`: `translateX(${anchoCarta * cartasMovidas}rem)`
    } else {
        throw new Error("Movimiento (de posicion) de carta invalido");
    }
};

const swap = (posOriginalElem1, posPreviaElem1, posOriginalElem2, posPreviaElem2, numCartas) => {
    const operacion1 = moverCarta(posOriginalElem1, posPreviaElem2, numCartas);
    const operacion2 = moverCarta(posOriginalElem2, posPreviaElem1, numCartas);

    return [operacion1, operacion2];
};

const sort = (arr, fnSetPosiciones) => {
    const [op1, op2] = swap(0, 0, 1, 1, arr.length);
    fnSetPosiciones((o) => {
        const nArr = [...o];
        if (nArr[0] !== op1) {
            nArr[0] = op1;
        }
        if (nArr[1] !== op2) {
            nArr[1] = op2;
        }
        return nArr;
    });
};

export function Mano(props) {

    const [posiciones, setPosiciones] = useState(new Array(props.cartas.length).fill("none"));

    const cartas = props.cartas;//.sort((x, y) => (x < y? 0: 1));
    const cartasE = cartas.map((x, p) =>
        <Carta valor={x} movimiento={posiciones[p]} key={p + "-" + x}/>
    );

    useEffect(() => {
        sort(cartas, setPosiciones);
    }, []);

    return (
        <div className={css(estilos.contenedorCartas)}>
            {cartasE}
        </div>
    );
}
