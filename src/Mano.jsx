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

const swap = (posOriginalElem1, posActualElem1, posOriginalElem2, posActualElem2, numCartas) => {
    const operacion1 = moverCarta(posOriginalElem1, posActualElem2, numCartas);
    const operacion2 = moverCarta(posOriginalElem2, posActualElem1, numCartas);

    return [operacion1, operacion2];
};

const esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const swapper = (fnSetPosiciones, arr, arrSort, numElems) => (i, j) => {
    const [op1, op2] = swap(arrSort[i][1], i, arrSort[j][1], j, numElems);
    fnSetPosiciones((o) => {
        const nArr = [...o];
        if (nArr[arrSort[i][1]] !== op1) {
            nArr[arrSort[i][1]] = op1;
        }
        if (nArr[arrSort[j][1]] !== op2) {
            nArr[arrSort[j][1]] = op2;
        }
        return nArr;
    });

    const swapT = arrSort[i];
    arrSort[i] = arrSort[j];
    arrSort[j] = swapT;
};

const qsort = async (arr, fnSetPosiciones) => {
    const numElems = arr.length;
    const arrSort = arr.map((x, p) => [x, p]);
    const retraso = 50;
    const nSwap = swapper(fnSetPosiciones, arr, arrSort, numElems);

    const qsort = async (inicio, fin) => {
        if (inicio >= fin) return;

        const pivote = arrSort[fin][0];
        let i = inicio;
        for (let j = inicio; j <= fin; j++) {
            if (arrSort[j][0] < pivote) {
                nSwap(i, j);
                i++;
                await esperar(retraso);
            }
        }

        nSwap(i, fin);
        await esperar(retraso);
        
        await qsort(inicio, i -1);
        await qsort(i + 1, fin);
    };

    await qsort(0, numElems - 1);
};

export function Mano(props) {

    const [posiciones, setPosiciones] = useState(new Array(props.cartas.length).fill("none"));

    const cartas = props.cartas;//.sort((x, y) => (x < y? 0: 1));
    const cartasE = cartas.map((x, p) =>
        <Carta valor={x} movimiento={posiciones[p]} key={p + "-" + x}/>
    );

    useEffect(() => {
        qsort(cartas, setPosiciones);
    }, []);

    return (
        <div className={css(estilos.contenedorCartas)}>
            {cartasE}
        </div>
    );
}
