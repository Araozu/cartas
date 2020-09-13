import React from "react";
import {css, StyleSheet} from "aphrodite";

const colorVerde = "#2E7D32";
const colorRojo = "#c62828";
const colorAzul = "#1565C0";
const estilos = StyleSheet.create({
    contCarta: {
        position: "relative",
        fontSize: "2rem",
        fontWeight: "bold",
        fontFamily: "'PT Serif', serif",
        display: "inline-block",
        color: "#151515",
        backgroundColor: "white",
        border: "solid 0.2rem #151515",
        borderRadius: "0.1rem",
        boxShadow: "0.1rem 0.1rem 0.3rem 0 #151515",
        width: "2.5rem",
        height: "4.5rem",
        padding: "0.25rem",
        textAlign: "center",
        cursor: "pointer",
        transition: "transform 50ms, opacity 50ms"
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
    },
    imgDragon: {
        width: "90%",
        height: "auto",
        display: "inline-block",
        bottom: "0",
        verticalAlign: "middle"
    }
});

export function Carta(props) {

    const valor = props.valor;
    const movimiento = props.movimiento;
    const fnDescartar = props.fnDescartar;

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
        tra: valor !== -1
            ? {
                opacity: "1",
                transform: movimiento,
                ":hover": {
                    transform: (movimiento === "none" ? `translateY(-1rem)` : `translateY(-1rem) ${movimiento}`)
                }
            }
            : {
                opacity: "0",
                transform: "translateY(-1rem)",
                cursor: "default",
                zIndex: "-1"
            }
    });

    const clasesCartaInner = css(
        estilos.carta,
        estilos[tipoCarta]
    );

    return (() => {
        let e;
        if (tipo === 2 || tipo === 3 || tipo === 4 || tipo === 5) {
            let color;
            switch (tipo) {
                case 2:
                    color = "negro";
                    break;
                case 3:
                    color = "rojo";
                    break;
                case 4:
                    color = "verde";
                    break;
                default:
                    color = "azul";
            }
            e = (
                <span style={{display: "flex", alignItems: "center", height: "inherit"}}>
                    <img className={css(estilos.imgDragon)} src={`/img/Dragon_${color}.webp`} alt="Dragon"/>
                </span>
                )
        } else {
            e = <span className={clasesCartaInner} dangerouslySetInnerHTML={{__html: valorC}}/>;
        }
        return (
            <span className={css(estilos.contCarta, transformacion.tra)} onClick={() => fnDescartar(valor)}>
                {e}
            </span>
        );
    })();
}

