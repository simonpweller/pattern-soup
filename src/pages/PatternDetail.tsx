import React from 'react';
import {IonButtons, IonHeader, IonPage, IonTitle, IonToolbar, IonBackButton, IonContent, IonButton} from '@ionic/react';
import {Pattern} from './Home';
import {RouterProps} from 'react-router';

type PatternDetailProps = RouterProps & {
    pattern: Pattern | undefined,
    deletePattern: (id: string) => void,
}

const PatternDetail: React.FC<PatternDetailProps> = ({pattern = {}, deletePattern, history}) => {
    const handleDeletion = () => {
        deletePattern(pattern.id!);
        history.goBack();
    };

    return (
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
                {JSON.stringify(pattern)}
                <IonButton expand={"block"} type={"button"} color={"danger"} onClick={handleDeletion}>
                    Delete
                </IonButton>
            </IonContent>
        </IonPage>
    );
};

export default PatternDetail;