import React, {useState, useEffect} from "react";
import {StyleSheet, css} from "aphrodite";
import {Carta2} from "./Carta2";


export function Juego2() {
    const [pH, setPH] = useState(Math.floor(window.innerHeight / 100));
    const [pW, setPW] = useState(Math.floor(window.innerWidth / 100));
    const [esPantallaCompleta, setEsPantallaCompleta] = useState(false);

    const estilos = StyleSheet.create({
        cont: {
            position: "fixed",
            top: "0",
            left: "0",
            width: `100%`,
            height: `100%`,
            textAlign: "center"
        },
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
        dora: {
            position: "fixed",
            top: `${pH * 2}px`,
            left: `${pH * 2}px`,
            padding: `${pH}px`,
            borderRadius: `${pH / 2}px`,
            fontSize: `${pH * 2.5}px`,
            boxShadow: `0 0 ${pH * 0.75}px ${pH * 0.75}px #dedede`
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
            width: `87%`,
            height: `10%`,
            border: "solid 1px red",
            bottom: "0",
            right: "0",
            textAlign: "left"
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

    const listener = () => {
        setPH(Math.floor(window.innerHeight / 100));
        setPW(Math.floor(window.innerWidth / 100));
    };

    useEffect(() => {
        window.addEventListener("resize", listener);
        return () => {
            window.removeEventListener("resize", listener);
        };
    }, []);

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

    return (
        <div>
            <div className={css(estilos.dora)}>
                <Carta2 valor={256} escala={0.75}/>
                <Carta2 valor={0} escala={0.75}/>
                <Carta2 valor={0} escala={0.75}/>
                <Carta2 valor={0} escala={0.75}/>
                <Carta2 valor={0} escala={0.75}/>
                <div/>
                <Carta2 valor={0} escala={0.75}/>
                <Carta2 valor={0} escala={0.75}/>
                <Carta2 valor={0} escala={0.75}/>
                <Carta2 valor={0} escala={0.75}/>
                <Carta2 valor={0} escala={0.75}/>
                <div/>
                <span>Sig bonus: {3} turnos</span>
            </div>
            <div className={css(estilos.cont)}>
                <div className={css(estilos.contInt)}>
                    <div className={css(estilos.cont2)}>
                        <div className={css(estilos.contCuadrante2)}>
                            <div className={css(estilos.cuadrante)}>
                                <Carta2 valor={0}/>
                                <Carta2 valor={0}/>
                                <Carta2 valor={0}/>
                                <Carta2 valor={0}/>
                                <Carta2 valor={0}/>
                                <Carta2 valor={0}/>
                                <Carta2 valor={0}/>
                                <Carta2 valor={0}/>
                                <Carta2 valor={0}/>
                                <Carta2 valor={0}/>
                            </div>
                        </div>
                        <div className={css(estilos.contCuadrante3)}>
                            <div className={css(estilos.cuadrante)}>
                                <Carta2 valor={0}/>
                                <Carta2 valor={0}/>
                                <Carta2 valor={0}/>
                                <Carta2 valor={0}/>
                                <Carta2 valor={0}/>
                                <Carta2 valor={0}/>
                                <Carta2 valor={0}/>
                                <Carta2 valor={0}/>
                                <Carta2 valor={0}/>
                                <Carta2 valor={0}/>
                            </div>
                        </div>
                        <div className={css(estilos.contCuadrante4)}>
                            <div className={css(estilos.cuadrante)}>
                                <Carta2 valor={0}/>
                                <Carta2 valor={0}/>
                                <Carta2 valor={0}/>
                                <Carta2 valor={0}/>
                                <Carta2 valor={0}/>
                                <Carta2 valor={0}/>
                                <Carta2 valor={0}/>
                                <Carta2 valor={0}/>
                                <Carta2 valor={0}/>
                                <Carta2 valor={0}/>
                            </div>
                        </div>
                        <div className={css(estilos.contCuadrante)}>
                            <div className={css(estilos.cuadrante)}>
                                <Carta2 valor={6}/>
                                <Carta2 valor={8}/>
                                <Carta2 valor={10}/>
                                <Carta2 valor={6}/>
                                <Carta2 valor={8}/>
                                <Carta2 valor={10}/>
                                <Carta2 valor={6}/>
                                <Carta2 valor={8}/>
                                <Carta2 valor={10}/>
                                <Carta2 valor={6}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={css(estilos.pantallaCompleta)}
                 onClick={esPantallaCompleta? salirPantallaCompleta: pantallaCompleta}
            >+</div>
        </div>
    );
}
