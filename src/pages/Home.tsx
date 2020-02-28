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
import {usePatterns} from '../hooks/usePatterns';

export type Pattern = {
    id: string,
    name: string,
}

const Home: React.FC = () => {
    const [showAdd, setShowAdd] = useState(false);
    const {patterns, addPattern} = usePatterns();

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
