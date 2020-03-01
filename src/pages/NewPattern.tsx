import React from 'react';
import {IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import PatternForm from '../components/PatternForm';
import {RouteComponentProps} from 'react-router';
import {PatternData} from '../hooks/usePatterns';

type NewPatternProps = RouteComponentProps & {addPattern: (patternData: PatternData) => void}

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
                patternData={{name: '', hanger: '', notes: ''}}
                save={patternData => {
                    addPattern(patternData);
                    history.goBack();
                }}
                cancel={history.goBack}
            />
        </IonContent>
    </IonPage>;

export default NewPattern;
