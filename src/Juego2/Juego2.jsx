import React, {useEffect, useState} from "react";
import {StyleSheet, css} from "aphrodite";
import {ContenedorDora} from "./ContenedorDora";
import {useDimensions} from "./useDimensions";
import {Mano} from "./Mano";
import {wsServidor} from "../variables";

let socket;
const map = {};

const manoInicial = {
    cartas: [],
    allIn: false,
    cartaSig: -1,
    cartasReveladas: [],
    descartes: [],
    sigCarta: -1,
};

const obtClave = (obj, valor) => {
    for (const k in obj) {
        if (obj[k] === valor) return k;
    }
}

export function Juego2() {
    const [pH, pW] = useDimensions();
    const [esPantallaCompleta, setEsPantallaCompleta] = useState(false);

    const [dora, setDora] = useState(undefined);
    const [doraOculto, setDoraOculto] = useState(undefined);
    const [turnoActual, setTurnoActual] = useState(false);
    const [cartasRestantes, setCartasRestantes] = useState(58);
    const [cartaDescartada, setCartaDescartada] = useState(false);
    const [turnosDora, setTurnosDora] = useState(15);

    const [mano1, setMano1] = useState(manoInicial);
    const [mano2, setMano2] = useState(manoInicial);
    const [mano3, setMano3] = useState(manoInicial);
    const [mano4, setMano4] = useState(manoInicial);

    const idJuego = localStorage.getItem("id_partida");
    const idUsuario = localStorage.getItem("id_usuario");

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
        pantallaCompleta: {
            position: "fixed",
            bottom: "0",
            right: "0",
            fontSize: `${pH * 13}px`,
            padding: `0 ${pH * 5}px`,
            boxShadow: `0 0 ${pH * 0.75}px ${pH * 0.75}px #dedede`,
            cursor: "pointer"
        },
        contCuadranteCartas: {
            position: "absolute",
            display: "inline-block",
            width: `18%`,
            height: `18%`,
            bottom: "41%",
            right: "41%",
            textAlign: "center"
        }
    });

    useEffect(() => {
        if (!idJuego || !idUsuario) return;

        socket = new WebSocket(`${wsServidor}/juego`);

        socket.addEventListener("open", () => {
            socket.send(JSON.stringify({
                operacion: "conectar",
                datos: JSON.stringify({
                    idJuego,
                    idUsuario
                })
            }));
        });

        socket.addEventListener("message", (ev) => {
            const info = JSON.parse(ev.data);
            switch (info.operacion) {
                case "actualizar_datos": {
                    const d = info.datos;
                    console.log(info.datos);
                    setDora(info.datos.dora);
                    setDoraOculto(info.datos.doraOculto);
                    setTurnosDora(info.datos.turnosHastaDora);

                    // Mapear IDS a posiciones
                    const turnoJugador = d.ordenJugadores.findIndex((id) => id === idUsuario);
                    map[idUsuario] = "1";
                    map[d.ordenJugadores[(turnoJugador + 1) % 4]] = "2";
                    map[d.ordenJugadores[(turnoJugador + 2) % 4]] = "3";
                    map[d.ordenJugadores[(turnoJugador + 3) % 4]] = "4";

                    for (const idUsuario in d.manos) {
                        const mano = d.manos[idUsuario];
                        const posMano = map[idUsuario];

                        const fnSetMano = (() => {
                            switch (posMano) {
                                case "1": return setMano1;
                                case "2": return setMano2;
                                case "3": return setMano3;
                                case "4": return setMano4;
                            }
                        })();
                        fnSetMano(mano);
                    }

                    setCartasRestantes(d.cartasRestantes);
                    setTurnoActual(d.turnoActual);

                    break;
                }
                case "actualizar_manos": {
                    const d = info.datos;
                    console.log(info.datos);
                    setDora(info.datos.dora);
                    setDoraOculto(info.datos.doraOculto);
                    setCartaDescartada(false);
                    setTurnosDora(info.datos.turnosHastaDora);

                    for (const idUsuario in d.manos) {
                        const mano = d.manos[idUsuario];
                        const posMano = map[idUsuario];
                        console.log("idUsuario", idUsuario);
                        console.log("pos mano", posMano);

                        const fnSetMano = (() => {
                            switch (posMano) {
                                case "1": return setMano1;
                                case "2": return setMano2;
                                case "3": return setMano3;
                                case "4": return setMano4;
                            }
                        })();
                        fnSetMano(mano);
                    }

                    setCartasRestantes(d.cartasRestantes);
                    setTurnoActual(d.turnoActual);

                    break;
                }
            }
        });

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

    const descartarCarta = (valorCarta) => {
        if (turnoActual === obtClave(map, "1") && !cartaDescartada) {
            setCartaDescartada(true);
            socket.send(JSON.stringify({
                operacion: "descarte",
                datos: JSON.stringify({
                    idJuego,
                    idUsuario,
                    carta: valorCarta
                })
            }));
        }
    };

    return (
        <div>
            <ContenedorDora dora={dora} doraOculto={doraOculto} turnosRestantes={turnosDora}/>
            <div className={css(estilos.contInt)}>
                <div className={css(estilos.cont2)}>
                    <div className={css(estilos.contCuadranteCartas)}>
                        <span style={{fontSize: `${pH * 10}px`}}>{cartasRestantes}</span>
                        <br/>
                        <span style={{fontSize: `${pH * 2.5}px`}}>Cartas restantes</span>
                    </div>
                    <Mano mano={mano2} posicion={2} esTurnoActual={turnoActual === obtClave(map, "2")}/>
                    <Mano mano={mano3} posicion={3} esTurnoActual={turnoActual === obtClave(map, "3")}/>
                    <Mano mano={mano4} posicion={4} esTurnoActual={turnoActual === obtClave(map, "4")}/>
                    <Mano mano={mano1} posicion={1} esTurnoActual={turnoActual === obtClave(map, "1")}
                          fnDescartarCarta={descartarCarta}/>
                </div>
            </div>
            <div className={css(estilos.pantallaCompleta)}
                 onClick={esPantallaCompleta? salirPantallaCompleta: pantallaCompleta}
            >+</div>
        </div>
    );
}
