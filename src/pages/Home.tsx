import {
    IonButton,
    IonButtons,
    IonContent,
    IonFab,
    IonFabButton,
    IonHeader,
    IonIcon,
    IonItem,
    IonItemOption,
    IonItemOptions,
    IonItemSliding,
    IonLabel,
    IonList,
    IonPage,
    IonReorder,
    IonReorderGroup,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import {add, albumsOutline, trash} from 'ionicons/icons';
import React from 'react';
import {Link} from 'react-router-dom';
import {Pattern} from '../hooks/usePatterns';

type HomeProps = {
    patterns: Pattern[],
    deletePattern: (id: string) => void,
    movePattern: (from: number, to: number) => void,
    sortPatterns: () => void,
}

const Home: React.FC<HomeProps> = ({patterns, deletePattern, movePattern, sortPatterns}) =>
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="primary">
                    <IonButton onClick={sortPatterns}>
                        <IonIcon slot="icon-only" icon={albumsOutline}/>
                    </IonButton>
                </IonButtons>
                <IonTitle>Pattern Soup</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent>
            <IonList>
                <IonReorderGroup disabled={false} onIonItemReorder={e => {
                    movePattern(e.detail.from, e.detail.to);
                    e.detail.complete();
                }}>
                    {patterns.map(pattern =>
                        <IonItemSliding key={pattern.id}>
                            <IonItem routerLink={`/patterns/${pattern.id}`}>
                                <IonLabel>
                                    <h2>{pattern.name}</h2>
                                    {pattern.hanger ? <p>{`Hanger: ${pattern.hanger}`}</p> : ''}
                                </IonLabel>
                                <IonReorder/>
                            </IonItem>
                            <IonItemOptions side="end">
                                <IonItemOption color="danger" onClick={() => deletePattern(pattern.id)}>
                                    <IonIcon slot="icon-only" icon={trash}/>
                                </IonItemOption>
                            </IonItemOptions>
                        </IonItemSliding>
                    )}
                </IonReorderGroup>
            </IonList>
        </IonContent>
        <IonFab vertical={"bottom"} horizontal={"center"}>
            <Link to="/patterns/new">
                <IonFabButton>
                    <IonIcon icon={add}/>
                </IonFabButton>
            </Link>
        </IonFab>
    </IonPage>;

export default Home;
