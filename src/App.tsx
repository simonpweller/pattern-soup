import React, {useState} from 'react';
import {v4 as uuid} from 'uuid';
import {Redirect, Route} from 'react-router-dom';
import {IonApp, IonRouterOutlet} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
import Home from './pages/Home';
import Add from './pages/Add';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
/* Theme variables */
import './theme/variables.css';

export type Pattern = {
    id: string,
    name: string,
}

const App: React.FC = () => {
    const [patterns, setPatterns] = useState<Pattern[]>([]);
    const addPattern = (name: string) => setPatterns([{id: uuid(), name}, ...patterns]);

    return (
        <IonApp>
            <IonReactRouter>
                <IonRouterOutlet>
                    <Route path="/home" render={() => <Home patterns={patterns}/>} exact={true}/>
                    <Route path="/add"
                           render={routeProps => <Add {...routeProps} addPattern={addPattern} />}
                           exact={true}
                    />
                    <Route exact path="/" render={() => <Redirect to="/home"/>}/>
                </IonRouterOutlet>
            </IonReactRouter>
        </IonApp>
    );
};

export default App;
