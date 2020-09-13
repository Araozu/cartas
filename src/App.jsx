import React from 'react';
import {StyleSheet, css} from "aphrodite";
import {Mano} from "./Mano";
import JSSHA from "jssha/dist/sha512";

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

    // Hacer aleatorio
    const cartasRandom = [];
    for (let i = cartas.length; i > 0; i--) {
        const pos = Math.floor(Math.random() * i);
        cartasRandom.push(cartas.splice(pos, 1)[0]);
    }
    return cartasRandom
})();

function App() {

    // Mano del jugador
    const cartasMano = cartasRandom.splice(0, 10);

    // Manos de otros jugadores
    cartasRandom.splice(0, 30);

    const cartasSerializadas = cartasRandom.join(",");
    const shaObj = new JSSHA("SHA-512", "TEXT", {encoding: "UTF8"});
    shaObj.update(cartasSerializadas);
    const sha512 = shaObj.getHash("HEX");

    const sigCarta = () => {
        const c = cartasRandom.splice(0, 1)[0];
        cartasRandom.splice(0, 3);
        console.log("Quedan", cartasRandom.length, "cartas");
        return c;
    }
    const descartarCarta = (carta) => {
        console.log("Carta descartada:", carta);
    };

    return (
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
            <Mano cartas={cartasMano} fnSolicitar={sigCarta} fnDescartar={descartarCarta}/>
        </div>
    )
}

export default App;
