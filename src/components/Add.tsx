import React, {useState} from 'react';
import {IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonTitle, IonToolbar} from '@ionic/react';

type AddProps = {addPattern: (name: string) => void, close: () => void}

const Add: React.FC<AddProps> = ({addPattern, close}) => {
    const [name, setName] = useState('');

    return (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Add Pattern</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <form>
                    <IonItem>
                        <IonLabel position={"floating"}>Name</IonLabel>
                        <IonInput type={"text"} value={name} onIonChange={e => setName(e.detail.value || '')}/>
                    </IonItem>
                    <IonButton expand={"block"} type={"button"} color={"success"} onClick={() => {
                        addPattern(name);
                        close();
                    }}>Confirm</IonButton>
                    <IonButton expand={"block"} type={"button"} color={"danger"} onClick={close}>
                        Cancel
                    </IonButton>
                </form>
            </IonContent>
        </>
    );
};

export default Add;
