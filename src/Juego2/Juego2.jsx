import React, {useState} from "react";
import {StyleSheet, css} from "aphrodite";
import {ContenedorDora} from "./ContenedorDora";
import {useDimensions} from "./useDimensions";
import {Mano} from "./Mano";

export function Juego2() {
    const [pH, pW] = useDimensions();
    const [esPantallaCompleta, setEsPantallaCompleta] = useState(false);

    const estilos = StyleSheet.create({
        contInt: {
            position: "absolute",
            top: "0",
            left: `${(pW * 100 - (pH * 100)) / 2}px`,
            width: `${pH * 100}px`,
            height: `${pH * 100}px`,
            perspective: `${pW * 15}px`,
        },
        cont2: {
            position: "absolute",
            border: "solid 2px green",
            transform: "rotateX(3deg)",
            width: `100%`,
            height: `100%`,
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
        pantallaCompleta: {
            position: "fixed",
            bottom: "0",
            right: "0",
            fontSize: `${pH * 13}px`,
            padding: `0 ${pH * 5}px`,
            boxShadow: `0 0 ${pH * 0.75}px ${pH * 0.75}px #dedede`,
            cursor: "pointer"
        }
    });

    const pantallaCompleta = () => {
        const elem = document.documentElement;

        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) { /* Firefox */
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE/Edge */
            elem.msRequestFullscreen();
        }
        setEsPantallaCompleta(true);
    }

    const salirPantallaCompleta = () => {
        const elem = document.documentElement;

        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { /* Firefox */
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE/Edge */
            document.msExitFullscreen();
        }
        setEsPantallaCompleta(false);
    };

    const cartasVacias = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    return (
        <div>
            <ContenedorDora turnosRestantes={15}/>
            <div className={css(estilos.contInt)}>
                <div className={css(estilos.cont2)}>
                    <div className={css(estilos.contCuadrante2)}>
                        <Mano cartas={cartasVacias}/>
                    </div>
                    <div className={css(estilos.contCuadrante3)}>
                        <Mano cartas={cartasVacias}/>
                    </div>
                    <div className={css(estilos.contCuadrante4)}>
                        <Mano cartas={cartasVacias}/>
                    </div>
                    <div className={css(estilos.contCuadrante)}>
                        <Mano cartas={[20]} entrada={192}
                              gruposAbiertos={[[192, 192, 192, 192], [168, 168, 168, 168], [8, 10, 12, 4]]}/>
                    </div>
                </div>
            </div>
            <div className={css(estilos.pantallaCompleta)}
                 onClick={esPantallaCompleta? salirPantallaCompleta: pantallaCompleta}
            >+</div>
        </div>
    );
}
