import React, {useEffect, useState} from "react";
import {StyleSheet, css} from "aphrodite";
import {ContenedorDora} from "./ContenedorDora";
import {useDimensions} from "./useDimensions";
import {Mano} from "./Mano";

let socket;

export function Juego2() {
    const [pH, pW] = useDimensions();
    const [esPantallaCompleta, setEsPantallaCompleta] = useState(false);

    const [dora, setDora] = useState(undefined);
    const [doraOculto, setDoraOculto] = useState(undefined);
    const [cartasJ, setCartas1] = useState([]);
    const [cartas2, setCartas2] = useState([]);
    const [cartas3, setCartas3] = useState([]);
    const [cartas4, setCartas4] = useState([]);
    const [map, setMap] = useState({});

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

    useEffect(() => {
        if (!idJuego || !idUsuario) return;

        socket = new WebSocket(`ws:/0.0.0.0:8080/juego`);

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


                    // Mapear IDS a posiciones
                    const mapa = {};
                    const turnoJugador = d.ordenJugadores.findIndex((id) => id === idUsuario);
                    mapa[idUsuario] = "1";
                    mapa[d.ordenJugadores[(turnoJugador + 1) % 4]] = "2";
                    mapa[d.ordenJugadores[(turnoJugador + 2) % 4]] = "3";
                    mapa[d.ordenJugadores[(turnoJugador + 3) % 4]] = "4";
                    setMap(Object.freeze(mapa));

                    for (const idUsuario in d.manos) {
                        const mano = d.manos[idUsuario];
                        const posMano = mapa[idUsuario];
                        const cartas = mano.cartas;
                        const fnSetCartas = (() => {
                            switch (posMano) {
                                case "1": return setCartas1;
                                case "2": return setCartas2;
                                case "3": return setCartas3;
                                case "4": return setCartas4;
                            }
                        })();
                        fnSetCartas(cartas);
                    }

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

    const actMano = (cartas) => {
        setCartas1(cartas);
    };

    return (
        <div>
            <ContenedorDora dora={dora} doraOculto={doraOculto} turnosRestantes={15}/>
            <div className={css(estilos.contInt)}>
                <div className={css(estilos.cont2)}>
                    <div className={css(estilos.contCuadrante2)}>
                        <Mano cartas={cartas2}/>
                    </div>
                    <div className={css(estilos.contCuadrante3)}>
                        <Mano cartas={cartas3}/>
                    </div>
                    <div className={css(estilos.contCuadrante4)}>
                        <Mano cartas={cartas4}/>
                    </div>
                    <div className={css(estilos.contCuadrante)}>
                        <Mano cartas={cartasJ} entrada={undefined} fnActCartas={actMano}/>
                    </div>
                </div>
            </div>
            <div className={css(estilos.pantallaCompleta)}
                 onClick={esPantallaCompleta? salirPantallaCompleta: pantallaCompleta}
            >+</div>
        </div>
    );
}
