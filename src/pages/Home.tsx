import {
    IonContent,
    IonFab,
    IonFabButton,
    IonHeader,
    IonIcon,
    IonItem,
    IonList,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import {add} from 'ionicons/icons';
import React from 'react';
import {Link} from 'react-router-dom';

export type Pattern = PatternData & {id: string}

export type PatternData = {
    name: string,
    notes: string,
}

type HomeProps = {
    patterns: Pattern[],
}

const Home: React.FC<HomeProps> = ({patterns}) =>
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
                <Link to="/patterns/new">
                    <IonFabButton>
                        <IonIcon icon={add}/>
                    </IonFabButton>
                </Link>
            </IonFab>
        </IonContent>
    </IonPage>;

export default Home;
