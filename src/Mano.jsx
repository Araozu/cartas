import React, {useState, useEffect} from "react";
import {Carta} from "./Carta";
import {StyleSheet, css} from "aphrodite";

const anchoCarta = 3.4; // rem
const estilos = StyleSheet.create({
    contenedorCartas: {
        textAlign: "center",
        position: "absolute",
        bottom: "1rem",
        left: "0",
        width: "100%"
    },
    separador: {
        display: "inline-block",
        width: `${anchoCarta}rem`
    }
});

const moverCarta = (posOriginal, posDestino, numCartas) => {

    if (posDestino >= 0 && posDestino < numCartas) {
        const cartasMovidas = -(posOriginal - posDestino);
        return cartasMovidas === 0 ? `none` : `translateX(${anchoCarta * cartasMovidas}rem)`
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
const qsort = async (arr, fnSetPosiciones) => {
    const numElems = arr.length;
    const arrSort = arr.map((x, p) => [x, p]);
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

        await qsort(inicio, i - 1);
        await qsort(i + 1, fin);
    };

    await qsort(0, numElems - 1);

    return arrSort;
};

const hsort = async (arr, fnSetPosiciones) => {
    const numElems = arr.length;
    const arrSort = arr.map((x, p) => [x, p]);
    const nSwap = swapper(fnSetPosiciones, arr, arrSort, numElems);

    const heapify = async (n, i) => {
        let largest = i;
        const l = 2 * i + 1;
        const r = 2 * i + 2;

        if (l < n && arrSort[l][0] > arrSort[largest][0]) {
            largest = l;
        }

        if (r < n && arrSort[r][0] > arrSort[largest][0]) {
            largest = r;
        }

        if (largest !== i) {
            nSwap(i, largest);
            await esperar(retraso);

            await heapify(n, largest);
        }
    };

    const n = arrSort.length;

    for (let i = Math.round(n / 2 - 1); i >= 0; i--) {
        await heapify(n, i);
    }

    for (let i = n - 1; i >= 0; i--) {
        nSwap(0, i);
        await esperar(retraso);

        await heapify(i, 0);
    }

    return arrSort;
};

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

export function Mano(props) {

    const [cartas, setCartas] = useState(props.cartas);
    const [posiciones, setPosiciones] = useState(new Array(props.cartas.length).fill("none"));
    const [cartaAdicional, setCartaAdicional] = useState(-1);

    const fnSolicitarCarta = props.fnSolicitar;
    const fnDescartar = props.fnDescartar;

    const descartar = async (carta) => {
        if (carta === cartaAdicional) {
            setCartaAdicional(-1);
        } else {
            const posicion = cartas.findIndex(x => x === carta);
            // Ocultar la carta
            const nuevasCartas = [...cartas];
            nuevasCartas[posicion] = -1;
            setCartas(nuevasCartas);
            await esperar(50);

            // Mover la carta entrante a su posicion
            const nArr = [...cartas];
            nArr.splice(nArr.findIndex(x => x === carta), 1);
            nArr.push(cartaAdicional);
            setCartas(nArr);
            setPosiciones(new Array(props.cartas.length).fill("none"));
            setCartaAdicional(-1);
            const res = await isort(nArr, setPosiciones);
            setCartas(res.map(x => x[0]));
            setPosiciones(new Array(props.cartas.length).fill("none"));
        }
        fnDescartar(carta);
        setTimeout(() => setCartaAdicional(fnSolicitarCarta()), 2000);
    };

    const cartasE = cartas.map((x, p) =>
        <Carta valor={x} movimiento={posiciones[p]} key={p + "-" + x} fnDescartar={descartar}/>
    );

    useEffect(() => {
        (async () => {
            const arrOrdenado = await hsort(cartas, setPosiciones);
            setCartas(arrOrdenado.map(x => x[0]));
            setPosiciones(new Array(props.cartas.length).fill("none"));
            await esperar(500);
            setCartaAdicional(fnSolicitarCarta());
        })();
    }, []);

    return (
        <div className={css(estilos.contenedorCartas)}>
            {cartasE}
            <span className={css(estilos.separador)}/>
            {cartaAdicional
                ? <Carta valor={cartaAdicional} movimiento={'none'} fnDescartar={descartar}/>
                : ""
            }
        </div>
    );
}
