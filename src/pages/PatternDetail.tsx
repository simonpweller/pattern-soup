import React from 'react';
import {IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import {RouterProps} from 'react-router';
import PatternForm from '../components/PatternForm';
import {Pattern, PatternData} from '../hooks/usePatterns';

type PatternDetailProps = RouterProps & {
    pattern: Pattern | undefined,
    updatePattern: (id: string, patternData: PatternData) => void,
}

const PatternDetail: React.FC<PatternDetailProps> = ({pattern = {}, updatePattern, history}) =>
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot={"start"}>
                    <IonBackButton defaultHref={"/home"}/>
                </IonButtons>
                <IonTitle>{pattern.name}</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent>
            <PatternForm
                patternData={{name: pattern.name || '', hanger: pattern.hanger || '', notes: pattern.notes || ''}}
                save={patternData => {
                    updatePattern(pattern.id!, patternData);
                    history.goBack();
                }}
                cancel={history.goBack}
            />
        </IonContent>
    </IonPage>;

export default PatternDetail;