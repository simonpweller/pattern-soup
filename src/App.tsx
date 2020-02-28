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

const App: React.FC = () => {
    const {patterns, getPattern, addPattern, deletePattern} = usePatterns();

    return (
        <IonApp>
            <IonReactRouter>
                <IonRouterOutlet>
                    <Route path="/home" render={() => <Home patterns={patterns} addPattern={addPattern}/>}
                           exact={true}/>
                    <Route
                        path="/patterns/:id"
                        render={routeProps => <PatternDetail {...routeProps}
                                                             pattern={getPattern(routeProps.match.params.id)}
                                                             deletePattern={deletePattern}/>
                        }
                        exact={true}
                    />
                    <Route exact path="/" render={() => <Redirect to="/home"/>}/>
                </IonRouterOutlet>
            </IonReactRouter>
        </IonApp>
    );
};

export default App;
