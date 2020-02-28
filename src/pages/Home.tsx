import {
    IonContent,
    IonFab,
    IonFabButton,
    IonHeader,
    IonIcon,
    IonItem,
    IonList,
    IonModal,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import {add} from 'ionicons/icons';
import React, {useState} from 'react';
import Add from '../components/Add';

export type Pattern = {
    id: string,
    name: string,
    notes: string,
}

type HomeProps = {
    patterns: Pattern[],
    addPattern: (name: string) => void,
}

const Home: React.FC<HomeProps> = ({patterns, addPattern}) => {
    const [showAdd, setShowAdd] = useState(false);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Pattern Soup</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    {patterns.map(pattern =>
                        <IonItem key={pattern.id} routerLink={`/patterns/${pattern.id}`}>{pattern.name}</IonItem>
                    )}
                </IonList>
                <IonFab vertical={"bottom"} horizontal={"center"}>
                    <IonFabButton onClick={() => setShowAdd(true)}>
                        <IonIcon icon={add} />
                    </IonFabButton>
                </IonFab>
            </IonContent>
            <IonModal isOpen={showAdd} >
                <Add addPattern={addPattern} close={() => setShowAdd(false)}/>
            </IonModal>
        </IonPage>
    );
};

export default Home;
