import React from 'react';
import {IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import {PatternData} from './Home';
import PatternForm from '../components/PatternForm';
import {RouterProps} from 'react-router';

type NewPatternProps = RouterProps & {addPattern: (patternData: PatternData) => void}

const NewPattern: React.FC<NewPatternProps> = ({history, addPattern}) =>
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot={"start"}>
                    <IonBackButton defaultHref={"/home"}/>
                </IonButtons>
                <IonTitle>New pattern</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent>
            <PatternForm
                patternData={{name: '', notes: ''}}
                save={patternData => {
                    addPattern(patternData);
                    history.goBack();
                }}
                cancel={history.goBack}
            />
        </IonContent>
    </IonPage>;

export default NewPattern;
