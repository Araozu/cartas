import React from 'react';
import {StyleSheet, css} from "aphrodite";
import {
    HashRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import {Inicio} from "./Inicio/Inicio";
import {SalaDeEspera} from "./SalaDeEspera/SalaDeEspera";
import {Ayuda} from "./Ayuda/Ayuda";
import {Juego} from "./Juego/Juego";
import {Juego2} from "./Juego2/Juego2";

const estilosGlobales = StyleSheet.create({
    global: {
        fontFamily: "'PT Serif', serif",
    }
});

function App() {
    return (
        <div className={css(estilosGlobales.global)}>
            <Router>
                <Switch>
                    <Route path={"/sala"}>
                        <SalaDeEspera/>
                    </Route>
                    <Route path={"/ayuda"}>
                        <Ayuda/>
                    </Route>
                    <Route path={"/juego2"}>
                        <Juego2/>
                    </Route>
                    <Route path={"/juego"}>
                        <Juego/>
                    </Route>
                    <Route path={"/"}>
                        <Inicio/>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
