import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {IonApp, IonRouterOutlet} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
import Home from './pages/Home';
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
import {usePatterns} from './hooks/usePatterns';
import PatternDetail from './pages/PatternDetail';
import NewPattern from './pages/NewPattern';

const App: React.FC = () => {
    const {patterns, getPattern, addPattern, updatePattern, deletePattern, movePattern} = usePatterns();

    return (
        <IonApp>
            <IonReactRouter>
                <IonRouterOutlet>
                    <Route
                        path="/home"
                        exact={true}
                        render={() => <Home patterns={patterns} deletePattern={deletePattern} movePattern={movePattern}/>}
                    />
                    <Route
                        path="/patterns/new"
                        exact={true}
                        render={routeProps => <NewPattern {...routeProps} addPattern={addPattern} />}
                    />
                    <Route
                        path="/patterns/:id"
                        exact={true}
                        render={routeProps => <PatternDetail {...routeProps} pattern={getPattern(routeProps.match.params.id)} updatePattern={updatePattern}/>}
                    />
                    <Route exact path="/" render={() => <Redirect to="/home"/>}/>
                </IonRouterOutlet>
            </IonReactRouter>
        </IonApp>
    );
};

export default App;
