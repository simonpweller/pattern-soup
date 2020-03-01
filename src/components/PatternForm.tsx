import React, {useState} from 'react';
import {IonButton, IonInput, IonItem, IonLabel, IonTextarea} from '@ionic/react';
import {PatternData} from '../pages/Home';

type PatternFormProps = { save: (patternData: PatternData) => void, cancel: () => void, patternData: PatternData }

const PatternForm: React.FC<PatternFormProps> = ({patternData, save, cancel}) => {
    const [name, setName] = useState(patternData.name);
    const [notes, setNotes] = useState(patternData.notes);

    return (
        <form>
            <IonItem>
                <IonLabel position={"floating"}>Name</IonLabel>
                <IonInput type={"text"} value={name} onIonChange={e => setName(e.detail.value || '')}/>
            </IonItem>
            <IonItem>
                <IonLabel position={"floating"}>Notes</IonLabel>
                <IonTextarea value={notes} onIonChange={e => setNotes(e.detail.value || '')}/>
            </IonItem>
            <IonButton expand={"block"} type={"button"} color={"success"} disabled={name.length === 0} onClick={() => save({name, notes})}>Save</IonButton>
            <IonButton expand={"block"} type={"button"} color={"danger"} onClick={cancel}>Cancel</IonButton>
        </form>
    );
};

export default PatternForm;