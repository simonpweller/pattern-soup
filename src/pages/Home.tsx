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
import {v4 as uuid} from 'uuid';

type Pattern = {
    id: string,
    name: string,
}

const Home: React.FC = () => {
    const [showAdd, setShowAdd] = useState(false);
    const [patterns, setPatterns] = useState<Pattern[]>([]);
    const addPattern = (name: string) => setPatterns([{id: uuid(), name}, ...patterns]);

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
                        <IonItem key={pattern.id}>{pattern.name}</IonItem>
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
