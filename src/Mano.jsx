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

const esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const qsort = async (arr, fnSetPosiciones) => {
    const numElems = arr.length;
    const arrSort = arr.map((x, p) => [x, p]);

    const qsort = async (inicio, fin) => {

        // particion
        const pivote = arrSort[fin - 1][0];
        let i = inicio;
        console.log("pivote: ", pivote);

        for (let j = inicio + 1; j < fin; j++) {
            if (arrSort[j][0] < pivote) {
                i++;
                const [op1, op2] = swap(arrSort[i][1], i, arrSort[j][1], j, numElems);
                console.log("Intercambiar", arrSort[i][1], "con", arrSort[j][1]);

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

                const swapT = arrSort[i][0];
                arrSort[i][0] = arrSort[j][0];
                arrSort[j][0] = swapT;

                await esperar(250);
            }
        }

        const [op1, op2] = swap(arrSort[i + 1][1], i + 1, arrSort[fin - 1][1], fin - 1, numElems);

        fnSetPosiciones((o) => {
            const nArr = [...o];
            if (nArr[arrSort[i + 1][1]] !== op1) {
                nArr[arrSort[i + 1][1]] = op1;
            }
            if (nArr[arrSort[fin - 1][1]] !== op2) {
                nArr[arrSort[fin - 1][1]] = op2;
            }
            return nArr;
        });

        const swapT = arrSort[i + 1][0];
        arrSort[i + 1][0] = arrSort[fin - 1][0];
        arrSort[fin - 1][0] = swapT;

        console.log(arrSort);
    };

    await qsort(0, numElems);
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
