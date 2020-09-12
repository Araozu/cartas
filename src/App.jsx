import React from 'react';
import {StyleSheet, css} from "aphrodite";
import {Mano} from "./Mano";

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
    for (let i = 0; i < 11; i++) {
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
        cartasRandom.push(cartas.splice(pos, 1));
    }
    return cartasRandom
})();

function App() {

    const cartasMano = cartasRandom.splice(0, 10);

    return (
        <div className={css(estilos.contJuego)}>
            <Mano cartas={cartasMano}/>
        </div>
    )
}

export default App;
