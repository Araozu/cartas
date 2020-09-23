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
    const [cartasJ, setCartasJ] = useState([]);

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
            const datos = JSON.parse(ev.data);
            switch (datos.operacion) {
                case "actualizar_datos": {
                    console.log(datos.datos);
                    setDora(datos.datos.dora);
                    setDoraOculto(datos.datos.doraOculto);
                    console.log(datos.datos.manos[idUsuario].cartas);
                    setCartasJ(datos.datos.manos[idUsuario].cartas);
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

    const cartasVacias = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    return (
        <div>
            <ContenedorDora dora={dora} doraOculto={doraOculto} turnosRestantes={15}/>
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
                        <Mano cartas={cartasJ} entrada={undefined}/>
                    </div>
                </div>
            </div>
            <div className={css(estilos.pantallaCompleta)}
                 onClick={esPantallaCompleta? salirPantallaCompleta: pantallaCompleta}
            >+</div>
        </div>
    );
}
