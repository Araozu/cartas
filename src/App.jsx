import React from 'react';
import {StyleSheet, css} from "aphrodite";
import {
    HashRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import {Inicio} from "./Inicio/Inicio";
import {SalaDeEspera} from "./SalaDeEspera/SalaDeEspera";

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
                    <Route path={"/"}>
                        <Inicio/>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
