import React, {useState} from 'react';
import {StyleSheet, css} from "aphrodite";
import {Mano} from "./Mano";
import {Descartes} from "./Descartes";
import JSSHA from "jssha/dist/sha512";

const esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const estilos = StyleSheet.create({
    contJuego: {
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%"
    }
});

const cartasRandom = (() => {
    const cartas = [];
    // numeros
    for (let i = 1; i < 11; i++) {
        const base = 16;
        const nRojoB = (base + i) << 1;
        const nNegroB = i << 1;
        cartas.push(nRojoB, nRojoB, nNegroB, nNegroB, nRojoB + 1, nRojoB + 1, nNegroB + 1, nNegroB + 1);
    }

    // Colores
    for (let i = 2; i < 6; i++) {
        const n = i << 5;
        cartas.push(n, n, n, n);
    }

    // Reyes
    for (let i = 0; i < 4; i++) {
        cartas.push(192, 224, 256);
    }
    let s = "";
    cartas.forEach(x => s += `${x}, `);

    // Hacer aleatorio
    const cartasRandom = [];
    for (let i = cartas.length; i > 0; i--) {
        const pos = Math.floor(Math.random() * i);
        cartasRandom.push(cartas.splice(pos, 1)[0]);
    }
    return cartasRandom
})();
const numCartasRestantes = cartasRandom.length - 40;

// Mano del jugador
const cartasMano = cartasRandom.splice(0, 10);

// Manos de otros jugadores
cartasRandom.splice(0, 30);

const cartasSerializadas = cartasRandom.join(",");
const shaObj = new JSSHA("SHA-512", "TEXT", {encoding: "UTF8"});
shaObj.update(cartasSerializadas);
const sha512 = shaObj.getHash("HEX");

export function Juego() {

    // num cartas Restantes
    const [numCartas, setNumCartas] = useState(numCartasRestantes);
    const [descartes1, setDescartes1] = useState([]);
    const [descartes2, setDescartes2] = useState([]);
    const [descartes3, setDescartes3] = useState([]);
    const [descartes4, setDescartes4] = useState([]);

    const sigCarta = () => {
        const c = cartasRandom.shift();
        setNumCartas(cartasRandom.length);
        return c;
    }
    const descartarCarta =  async (carta) => {
        setDescartes1((arr) => [...arr, carta]);
        await esperar(1000);

        const e2 = cartasRandom.shift();
        setDescartes2((arr) => [...arr, e2]);
        setNumCartas(cartasRandom.length);
        await esperar(1000);

        const e3 = cartasRandom.shift();
        setDescartes3((arr) => [...arr, e3]);
        setNumCartas(cartasRandom.length);
        await esperar(1000);

        const e4 = cartasRandom.shift();
        setDescartes4((arr) => [...arr, e4]);
        setNumCartas(cartasRandom.length);
    };

    return (
        <div>
            <div className={css(estilos.contJuego)}>
                <table border={1}>
                    <tbody>
                    <tr>
                        <td>Baraja aleatoria:</td>
                        <td style={{wordBreak: "break-all"}}>
                            {cartasSerializadas}
                        </td>
                    </tr>
                    <tr>
                        <td>SHA-512:</td>
                        <td>{sha512}</td>
                    </tr>
                    </tbody>
                </table>
                <Descartes
                    cartasRestantes={numCartas}
                    descartes1={descartes1}
                    descartes2={descartes2}
                    descartes3={descartes3}
                    descartes4={descartes4}
                />
                <Mano cartas={cartasMano} fnSolicitar={sigCarta} fnDescartar={descartarCarta}/>
            </div>
        </div>
    )
}
