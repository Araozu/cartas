import React from "react";
import {StyleSheet, css} from "aphrodite";
import {Carta2} from "./Carta2";

const pH = Math.floor(window.innerHeight / 100);
const pW = Math.floor(window.innerWidth / 100);

const estilos = StyleSheet.create({
    cont: {
        border: "solid 1px black",
        position: "fixed",
        top: "0",
        left: "0",
        width: `${pW * 100}px`,
        height: `${pH * 100}px`,
        textAlign: "center"
    },
    contInt: {
        position: "absolute",
        top: "0",
        left: `${(pW * 100 - (pH * 95)) / 2}px`,
        width: `${pH * 95}px`,
        height: `${pH * 95}px`,
        border: "solid 1px blue",
        perspective: `${pW * 15}px`,
    },
    cont2: {
        position: "absolute",
        border: "solid 2px green",
        transform: "rotateX(6deg)",
        width: `100%`,
        height: `100%`,
    },
    dora: {
        position: "fixed",
        top: `${pH * 2}px`,
        left: `${pH * 2}px`,
        border: "solid 1px black",
        padding: `${pH}px`,
        borderRadius: `${pH / 2}px`
    },
    contCuadrante: {
        position: "absolute",
        width: `100%`,
        height: `100%`,
    },
    contCuadrante2: {
        position: "absolute",
        width: `100%`,
        height: `100%`,
        transform: `rotate(270deg)`
    },
    contCuadrante3: {
        position: "absolute",
        width: `100%`,
        height: `100%`,
        transform: "rotate(180deg)"
    },
    contCuadrante4: {
        position: "absolute",
        width: `100%`,
        height: `100%`,
        transform: `rotate(90deg)`
    },
    cuadrante: {
        position: "absolute",
        width: `84%`,
        height: `15%`,
        border: "solid 1px red",
        bottom: "0",
        right: "0"
    }
});

export function Juego2() {
    return (
        <div>
            <div className={css(estilos.dora)}>
                <Carta2 valor={256} escala={0.75}/>
                <Carta2 valor={0} escala={0.75}/>
                <Carta2 valor={0} escala={0.75}/>
                <Carta2 valor={0} escala={0.75}/>
                <Carta2 valor={0} escala={0.75}/>
                <br/>
                <Carta2 valor={0} escala={0.75}/>
                <Carta2 valor={0} escala={0.75}/>
                <Carta2 valor={0} escala={0.75}/>
                <Carta2 valor={0} escala={0.75}/>
                <Carta2 valor={0} escala={0.75}/>
                <br/>
                <span>Sig bonus: {3} turnos</span>
            </div>
            <div className={css(estilos.cont)}>
                <div className={css(estilos.contInt)}>
                    <div className={css(estilos.cont2)}>
                        <div className={css(estilos.contCuadrante)}>
                            <div className={css(estilos.cuadrante)}>
                                <Carta2 valor={6}/>
                                <Carta2 valor={8}/>
                                <Carta2 valor={10}/>
                            </div>
                        </div>
                        <div className={css(estilos.contCuadrante2)}>
                            <div className={css(estilos.cuadrante)}>
                                <Carta2 valor={21}/>
                                <Carta2 valor={44}/>
                                <Carta2 valor={44}/>
                            </div>
                        </div>
                        <div className={css(estilos.contCuadrante3)}>
                            <div className={css(estilos.cuadrante)}>
                                <Carta2 valor={128}/>
                                <Carta2 valor={128}/>
                                <Carta2 valor={192}/>
                            </div>
                        </div>
                        <div className={css(estilos.contCuadrante4)}>
                            <div className={css(estilos.cuadrante)}>
                                <Carta2 valor={256}/>
                                <Carta2 valor={256}/>
                                <Carta2 valor={256}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
