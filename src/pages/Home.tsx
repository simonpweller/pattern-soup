import {
    IonContent,
    IonFab,
    IonFabButton,
    IonHeader,
    IonIcon,
    IonItem,
    IonItemOption,
    IonItemOptions,
    IonItemSliding,
    IonList,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import {add, trash} from 'ionicons/icons';
import React from 'react';
import {Link} from 'react-router-dom';
import {Pattern} from '../hooks/usePatterns';

type HomeProps = {
    patterns: Pattern[],
    deletePattern: (id: string) => void,
}

const Home: React.FC<HomeProps> = ({patterns, deletePattern}) =>
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonTitle>Pattern Soup</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent>
            <IonList>
                {patterns.map(pattern =>
                    <IonItemSliding key={pattern.id}>
                        <IonItem routerLink={`/patterns/${pattern.id}`}>{pattern.name}</IonItem>

                        <IonItemOptions side="end">
                            <IonItemOption color="danger" onClick={() => deletePattern(pattern.id)}>
                                <IonIcon slot="icon-only" icon={trash} />
                            </IonItemOption>
                        </IonItemOptions>
                    </IonItemSliding>
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
