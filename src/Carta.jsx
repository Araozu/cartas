import React from "react";
import {StyleSheet, css} from "aphrodite";

const colorVerde = "#2E7D32";
const colorRojo = "#c62828";
const colorAzul = "#1565C0";
const estilos = StyleSheet.create({
    contCarta: {
        fontSize: "2rem",
        fontWeight: "bold",
        fontFamily: "monospace",
        display: "inline-block",
        color: "#151515",
        border: "solid 0.2rem #151515",
        borderRadius: "0.1rem",
        boxShadow: "0.1rem 0.1rem 0.3rem 0 #151515",
        width: "2.5rem",
        padding: "0.25rem",
        textAlign: "center",
        cursor: "pointer",
        transition: "transform 50ms"
    },
    carta: {
        display: "inline-block",
        padding: "1rem 0",
        borderRadius: "3px"
    },
    cRojo: {
        color: colorRojo
    },
    cReyes: {
        color: colorVerde
    },
    tRojo: {
        width: "100%",
        backgroundColor: colorRojo
    },
    tVerde: {
        width: "100%",
        backgroundColor: colorVerde
    },
    tAzul: {
        width: "100%",
        backgroundColor: colorAzul
    }
});

export function Carta(props) {

    const valor = props.valor;
    const movimiento = props.movimiento;

    const tipo = (valor << 23) >>> 28;
    const tipoCarta = (() => {
        switch (tipo) {
            case 1:
                return "cRojo";
            case 3:
                return "tRojo";
            case 4:
                return "tVerde";
            case 5:
                return "tAzul";
            case 6:
            case 7:
            case 8:
                return "cReyes";
            default:
                return "";
        }
    })();

    const valorC = (() => {
        switch (tipo) {
            case 0:
            case 1:
                return (valor << 27) >>> 28;
            case 6:
                return "J";
            case 7:
                return "Q";
            case 8:
                return "K";
            default:
                return "&nbsp;"
        }
    })();

    const transformacion = StyleSheet.create({
        tra: {
            transform: movimiento,
            ":hover": {
                transform: (movimiento === "none"? `translateY(-1rem)`: `translateY(-1rem) ${movimiento}`)
            }
        }
    });

    const clasesCartaInner = css(
        estilos.carta,
        estilos[tipoCarta]
    );

    //                   dangerouslySetInnerHTML={{__html: valorC}}>
    return (
        <span className={css(estilos.contCarta, transformacion.tra)}>
            <span className={clasesCartaInner} dangerouslySetInnerHTML={{__html: valorC}}>
            </span>
        </span>
    );
}

