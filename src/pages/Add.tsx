import React, {useState} from 'react';
import {
    IonButton,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import {RouteComponentProps} from 'react-router';

type AddProps = RouteComponentProps & {addPattern: (name: string) => void}

const Add: React.FC<AddProps> = ({history, addPattern}) => {
    const [name, setName] = useState('');

    return (
        <IonPage>
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
                    <IonButton expand={"block"} type={"submit"} color={"success"} onClick={() => {
                        addPattern(name);
                        history.goBack();
                    }}>Confirm</IonButton>
                    <IonButton expand={"block"} type={"button"} color={"danger"} onClick={() => history.goBack()}>
                        Cancel
                    </IonButton>
                </form>
            </IonContent>
        </IonPage>
    );
};

export default Add;
