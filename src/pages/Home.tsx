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
    IonLabel,
    IonList,
    IonPage,
    IonReorder,
    IonReorderGroup,
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
    movePattern: (from: number, to: number) => void,
}

const Home: React.FC<HomeProps> = ({patterns, deletePattern, movePattern}) =>
    <IonPage>
        <IonHeader>
            <IonToolbar>
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
                                    {pattern.hanger.length ? <p>{`Hanger: ${pattern.hanger}`}</p> : ''}
                                </IonLabel>
                                <IonReorder/>
                            </IonItem>
                            <IonItemOptions side="end">
                                <IonItemOption color="danger" onClick={() => {
                                    console.log('click');
                                    deletePattern(pattern.id);
                                }}>
                                    <IonIcon slot="icon-only" icon={trash} onClick={() => console.log()}/>
                                </IonItemOption>
                            </IonItemOptions>
                        </IonItemSliding>
                    )}
                </IonReorderGroup>
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
