import React from "react";
import {StyleSheet, css} from "aphrodite";
import {Carta2} from "./Carta2";
import {useDimensions} from "./useDimensions";

export function ContenedorDora(props) {
    const [pH, pW] = useDimensions();

    const dora = props.dora ?? [0, 0, 0, 0, 0];
    const doraOculto = props.doraOculto ?? [0, 0, 0, 0, 0];
    const turnosRestantes = props.turnosRestantes;

    const estilos = StyleSheet.create({
        dora: {
            position: "fixed",
            top: `${pH * 2}px`,
            left: `${pH * 2}px`,
            padding: `${pH}px`,
            borderRadius: `${pH / 2}px`,
            fontSize: `${pH * 2.5}px`,
            boxShadow: `0 0 ${pH * 0.75}px ${pH * 0.75}px #dedede`
        },
    });

    const elemsDora = dora.map((v, i) => <Carta2 valor={v} escala={0.75} key={i + "-" + v}/>);
    const elemsDoraOculto = doraOculto.map((v, i) => <Carta2 valor={v} escala={0.75} key={i + "-" + v}/>);

    return (
        <div className={css(estilos.dora)}>
            {elemsDora}
            <div/>
            {elemsDoraOculto}
            <div/>
            <span>Sig bonus: {turnosRestantes} turnos</span>
        </div>
    );
}
