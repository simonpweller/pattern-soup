import React, {useState} from 'react';
import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonInput,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import {Pattern} from './Home';
import {RouterProps} from 'react-router';

type PatternDetailProps = RouterProps & {
    pattern: Pattern | undefined,
    deletePattern: (id: string) => void,
    updatePattern: (id: string, pattern: Pattern) => void,
}

const PatternDetail: React.FC<PatternDetailProps> = ({pattern = {}, deletePattern, updatePattern,  history}) => {
    const [notes, setNotes] = useState(pattern.notes || '');

    const handleUpdate = () => {
        updatePattern(pattern.id!, {...pattern, notes} as Pattern);
        history.goBack();
    };

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
                <h1>{pattern.name}</h1>
                <IonInput value={notes} onIonChange={e => setNotes(e.detail.value || '')}/>
                <IonButton expand={"block"} type={"button"} color={"success"} onClick={handleUpdate}>
                    Save
                </IonButton>
                <IonButton expand={"block"} type={"button"} color={"danger"} onClick={handleDeletion}>
                    Delete
                </IonButton>
            </IonContent>
        </IonPage>
    );
};

export default PatternDetail;