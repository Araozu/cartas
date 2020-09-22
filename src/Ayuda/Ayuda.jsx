import React from "react";
import {StyleSheet, css} from "aphrodite";
import {Carta} from "../Juego/Carta";

const estilos = StyleSheet.create({
    yaku: {
        margin: "2rem 0"
    }
});

const cartas = [2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15,
    16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 34, 34, 35, 35, 36, 36, 37, 37, 38, 38, 39, 39, 40, 40, 41,
    41, 42, 42, 43, 43, 44, 44, 45, 45, 46, 46, 47, 47, 48, 48, 49, 49, 50, 50, 51, 51, 52, 52, 53, 53, 64, 64,
    64, 64, 96, 96, 96, 96, 128, 128, 128, 128, 160, 160, 160, 160, 192, 192, 192, 192, 224, 224, 224, 224,
    256, 256, 256, 256];

const cartasR = (() => {
    const indices = [];
    for (let i = 0; i < 11; i++) {
        let sigIndice = Math.floor(Math.random() * cartas.length);
        while (indices.find((s) => s === sigIndice) !== undefined) {
            sigIndice = Math.floor(Math.random() * cartas.length);
        }
        indices.push(sigIndice);
    }
    const cartasN = indices.map((i) => cartas[i]);
    const ultimaCarta = cartasN[10];
    cartasN.pop();

    const cartasN2 = cartasN.sort((x, y) => (x < y)? -1: 1);
    cartasN2.push(-1);
    cartasN2.push(ultimaCarta);

    return cartasN2;
})();

const seqCartasR = (() => {
    let base = Math.round(Math.random() * 9) + 1;

    let nums;
    switch (base) {
        case 1:
            nums = [1, 2, 3];
            break;
        case 10:
            nums = [8, 9, 10];
            break;
        default:
            const n = Math.random();
            if (n < 0.33 && base !== 2) {
                nums = [base-2, base-1, base]
            } else if (n < 0.66 && base !== 9) {
                nums = [base, base+1, base+2]
            } else {
                nums = [base-1, base, base+1]
            }
    }

    return (Math.random() < 0.5)
        ? nums.map((n) => n * 2)
        : nums.map((n) => (n + 16) * 2);

})();

const parCartasR = new Array(2).fill(cartas[Math.floor(Math.random() * cartas.length)]);
const triCartasR = new Array(3).fill(cartas[Math.floor(Math.random() * cartas.length)]);
const cuaCartasR = new Array(4).fill(cartas[Math.floor(Math.random() * cartas.length)]);

const numsACartasElem = (nums) => nums.map((c, i) => (
    <Carta valor={c} movimiento={""} fnDescartar={() => {}} key={c + "-" + i}/>
));

export function Ayuda() {

    const elemCartas = cartas.map((c, i) => (
        <Carta valor={c} movimiento={""} fnDescartar={() => {
        }} key={c + "-" + i}/>
    ));

    const elemCartasR = cartasR.map((c, i) => (
        <Carta valor={c} movimiento={""} fnDescartar={() => {
        }} key={c + "-" + i}/>
    ));

    const elemCartasParR = parCartasR.map((c, i) => (
        <Carta valor={c} movimiento={""} fnDescartar={() => {
        }} key={c + "-" + i}/>
    ));

    const elemCartasSeqR = seqCartasR.map((c, i) => (
        <Carta valor={c} movimiento={""} fnDescartar={() => {
        }} key={c + "-" + i}/>
    ));

    const elemCartasTrR = triCartasR.map((c, i) => (
        <Carta valor={c} movimiento={""} fnDescartar={() => {
        }} key={c + "-" + i}/>
    ));

    const elemCartasCuaR = cuaCartasR.map((c, i) => (
        <Carta valor={c} movimiento={""} fnDescartar={() => {
        }} key={c + "-" + i}/>
    ));

    return (
        <div>
            <h1>Sobre el juego</h1>
            <p>Ri Ma Jon es un juego inspirado en Mahjong, pero ejecutado con cartas.</p>
            <h2>Cartas</h2>
            <p>Existen 108 cartas en el juego:</p>
            {elemCartas}
            <p>4 cartas de los números 1 al 10 de color negro y rojo, 4 cartas de dragones de 4 colores, 4 J, Q y K.</p>
            <h2>Mano</h2>
            <p>Cada mano se compone de 10 + 1 cartas aleatorias.</p>
            {elemCartasR}
            <p>El objetivo del juego es formar una mano con 3 grupos y 1 par de cartas.</p>
            <h2>Par de cartas</h2>
            <p>Un par son 2 cartas del mismo color y valor.</p>
            {elemCartasParR}
            <h2>Grupo de cartas</h2>
            <p>Un grupo de cartas puede ser cualquiera de los siguientes:</p>

            <div style={{paddingLeft: "2rem"}}>
                <h3>Sequencia</h3>
                <p>3 cartas del mismo color y con números consecutivos</p>
                {elemCartasSeqR}
                <p>J, Q, K y los dragones no pueden formar sequencias.</p>
                <p>Los números deben ser consecutivos: 1 2 3 es válido, pero 9 10 1 no lo es.</p>

                <h3>Triple</h3>
                <p>3 cartas del mismo color y valor</p>
                {elemCartasTrR}

                <h3>Cuádruple</h3>
                <p>4 cartas del mismo color y valor</p>
                {elemCartasCuaR}
                <p>Cuando se forma un cuádruple se agrega una carta a la mano.</p>
            </div>

            <br/>
            <h2>Puntaje</h2>
            <p>Cada mano completa vale una cantidad de puntos según las combinaciones de cartas que posee.</p>

            <div className="tablaPuntos" style={{paddingLeft: "2rem"}}>
                <h3>1 punto</h3>

                <div className={css(estilos.yaku)}>
                    <p>Mano válida cualquiera.</p>
                </div>

                <div className={css(estilos.yaku)}>
                    <p>2 secuencias iguales del mismo color </p>
                    <div>

                    </div>
                </div>

                <div className={css(estilos.yaku)}>
                    <p>1 triple de J, K o Q (acumulable)</p>
                </div>

                <div className={css(estilos.yaku)}>
                    <p>1 cuádruple de J, K o Q (acumulable)</p>
                </div>

                <div className={css(estilos.yaku)}>
                    <p>1 triple de cualquier dragón (acumulable)</p>
                </div>

                <div className={css(estilos.yaku)}>
                    <p>1 cuádruple de cualquier dragón (acumulable)</p>
                </div>

                <div className={css(estilos.yaku)}>
                    <p>3 secuencias</p>
                </div>

                <div className={css(estilos.yaku)}>
                    <p>3 triples</p>
                </div>

                <div className={css(estilos.yaku)}>
                    <p>1 secuencia del mismo símbolo (no disponible)</p>
                </div>

                <div className={css(estilos.yaku)}>
                    <p>Solo números del 2 al 9</p>
                </div>

                <div className={css(estilos.yaku)}>
                    <p>Cada par o grupo contiene al menos un 1, 10, J, Q, K o dragón</p>
                </div>

                <div className={css(estilos.yaku)}>
                    <p>Solo cartas de color rojo</p>
                </div>

                <div className={css(estilos.yaku)}>
                    <p>Solo cartas de color negro</p>
                </div>

                <h3>2 puntos</h3>

                <div className={css(estilos.yaku)}>
                    <p>1,2,3,4,5,6,7,8,9 del mismo color</p>
                    <div>
                        {numsACartasElem([2, 4, 6, 8, 10, 12, 14, 16, 18, 128, 128])}
                    </div>
                </div>

                <div className={css(estilos.yaku)}>
                    <p>2,3,4,5,6,7,8,9,10 del mismo color</p>
                    <div>
                        {numsACartasElem([4, 6, 8, 10, 12, 14, 16, 18, 20, 41, 41])}
                    </div>
                </div>

                <div className={css(estilos.yaku)}>
                    <p>3 cuádruples</p>
                    {numsACartasElem([44, 44, -1, 128, 128, 128, 128, -1, 20, 20, 20, 20, -1, 40, 40, 40, 40])}
                </div>

                <div className={css(estilos.yaku)}>
                    <p>1 par del mismo número, mismo color y mismo símbolo (no disponible)</p>
                </div>

                <h3>3 puntos</h3>

                <div className={css(estilos.yaku)}>
                    <p>1,1,2,3,4,5,6,7,8,9,10 del mismo color</p>
                    <div>
                        {numsACartasElem([2, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20])}
                    </div>
                </div>

                <div className={css(estilos.yaku)}>
                    <p>1,2,3,4,5,6,7,8,9,10,10 del mismo color</p>
                    <div>
                        {numsACartasElem([34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 52])}
                    </div>
                </div>

                <div className={css(estilos.yaku)}>
                    <p>Solo 1 y 10</p>
                    <div>
                        {numsACartasElem([2, 2, 3, 20, 20, 21, 52, 52, 53, 34, 35])}
                    </div>
                </div>

                <div className={css(estilos.yaku)}>
                    <p>3 triples o cuádruples de J, Q y K</p>
                    <div>
                        {numsACartasElem([192, 192, 192, 224, 224, 224, 256, 256, 256, 16, 16])}
                    </div>
                </div>

                <h3>5 puntos</h3>

                <div className={css(estilos.yaku)}>
                    <p>Solo dragones</p>
                    <div>
                        {numsACartasElem([64, 64, 64, 96, 96, 96, 128, 128, 128, 160, 160])}
                    </div>
                </div>

                <div className={css(estilos.yaku)}>
                    <p>Solo cartas de color verde</p>
                    <div>
                        {numsACartasElem([128, 128, 128, 192, 192, 192, 224, 224, 224, 256, 256])}
                    </div>
                </div>

            </div>

            <div className="separador" style={{minHeight: "25rem"}}/>
            <br/>
        </div>
    );
}

/*
<div className={css(estilos.yaku)}>
    <p></p>
</div>
*/
