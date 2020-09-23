import React, {useEffect, useState} from "react";
import {StyleSheet, css} from "aphrodite";
import {Carta2} from "./Carta2";
import {useDimensions} from "./useDimensions";

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

const estaOrdenado = (nums) => {
    for (let i = 0, j = 1; j < nums.length ; i++, j++) {
        if (nums[i] > nums[j]) return false;
    }
    return true;
};

export function Mano(props) {
    const [pH] = useDimensions();
    const anchoCarta = pH * 5 + 2 * (pH * 0.225);

    const moverCarta = (posOriginal, posDestino, numCartas) => {

        if (posDestino >= 0 && posDestino < numCartas) {
            const cartasMovidas = -(posOriginal - posDestino);
            return cartasMovidas === 0 ? `none` : `translateX(${anchoCarta * cartasMovidas}px)`
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

    const retraso = 50;
    const isort = async (arr, fnSetPosiciones) => {
        const numElems = arr.length;
        const arrSort = arr.map((x, p) => [x, p]);
        const nSwap = swapper(fnSetPosiciones, arr, arrSort, numElems);

        for (let actualiter = 1; actualiter < numElems; actualiter++) {
            let posActual = actualiter;
            while (posActual > 0 && arrSort[posActual - 1][0] > arrSort[posActual][0]) {
                nSwap(posActual - 1, posActual);
                await esperar(retraso);
                posActual--;
            }
        }

        return arrSort;
    };

    const cartas = props.cartas;
    const entrada = props.entrada ?? -1;
    const gruposAbiertos = props.gruposAbiertos ?? [];
    const fnActCartas = props.fnActCartas ?? (() => {});

    const [posiciones, setPosiciones] = useState(new Array(props.cartas.length).fill("none"));

    useEffect(() => {
        (async () => {
            if (estaOrdenado(props.cartas)) return;
            const arrOrdenado = await isort(cartas, setPosiciones);
            fnActCartas(arrOrdenado.map(x => x[0]));
            setPosiciones(new Array(props.cartas.length).fill("none"));
        })();
    }, [props.cartas]);

    const cartasElem = cartas.map((v, i) => <Carta2 valor={v} movimiento={posiciones[i]} key={i + "-" + v}/>);

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
